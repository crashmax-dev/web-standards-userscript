import { el } from '@zero-dependency/dom'

import { getPodcastId } from './podcast.js'
import {
  addPlayerOptions,
  getPlayerOptions,
  PlayerOptions,
  updatePlayerOptions
} from './storage.js'

export function patchPlayer(playerContainer: HTMLDivElement): void {
  const podcastId = getPodcastId()
  if (!podcastId) return

  const audioPlayer = playerContainer.querySelector('audio')
  if (!audioPlayer) return

  const initialPlayerOptions: PlayerOptions = {
    id: podcastId,
    time: 0,
    volume: 0.1,
    rate: audioPlayer.playbackRate
  }

  const playerOptions = getPlayerOptions(podcastId)
  if (!playerOptions) {
    addPlayerOptions(initialPlayerOptions)
  }

  audioPlayer.currentTime = playerOptions?.time ?? initialPlayerOptions.time
  audioPlayer.volume = playerOptions?.volume ?? initialPlayerOptions.volume
  audioPlayer.playbackRate = playerOptions?.rate ?? initialPlayerOptions.rate

  const playerPlaybackRateInput = el('input', {
    name: 'player__playbackrate',
    type: 'range',
    value: `${audioPlayer.playbackRate}`,
    step: '0.25',
    min: '0.75',
    max: '2',
    oninput: () => {
      const playbackRate = parseFloat(playerPlaybackRateInput.value)
      audioPlayer.playbackRate = playbackRate
      playerPlaybackRateLabel.textContent = `${playbackRate}x`
      updatePlayerOptions(podcastId, { rate: playbackRate })
    }
  })

  const playerPlaybackRateLabel = el(
    'label',
    {
      htmlFor: 'player__playbackrate'
    },
    `${audioPlayer.playbackRate}x`
  )

  playerContainer.append(playerPlaybackRateInput, playerPlaybackRateLabel)

  audioPlayer.addEventListener('timeupdate', () => {
    updatePlayerOptions(podcastId, { time: audioPlayer.currentTime })
  })

  audioPlayer.addEventListener('volumechange', () => {
    updatePlayerOptions(podcastId, { volume: audioPlayer.volume })
  })
}
