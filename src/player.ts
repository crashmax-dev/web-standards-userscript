import { el } from '@zero-dependency/dom'
import { getPodcastId } from './podcast.js'
import {
  addPlayerOptions,
  getPlayerOptions,
  PlayerOptions,
  updatePlayerOptions
} from './storage.js'

export function patchPlayer(targetPlayer: HTMLAudioElement): void {
  const podcastId = getPodcastId()
  if (!podcastId) return

  const player = targetPlayer.cloneNode() as HTMLAudioElement
  const initialPlayerOptions: PlayerOptions = {
    id: podcastId,
    time: 0,
    volume: 0.1,
    rate: player.playbackRate
  }
  const playerOptions = getPlayerOptions(podcastId)
  if (!playerOptions) {
    addPlayerOptions(initialPlayerOptions)
  }

  player.currentTime = playerOptions?.time ?? initialPlayerOptions.time
  player.volume = playerOptions?.volume ?? initialPlayerOptions.volume
  player.playbackRate = playerOptions?.rate ?? initialPlayerOptions.rate

  const playerContainer = el('div', {
    className: 'player__container'
  })

  const playerPlaybackRateInput = el('input', {
    name: 'player__playbackrate',
    type: 'range',
    value: `${player.playbackRate}`,
    step: '0.25',
    min: '0.75',
    max: '2',
    oninput: () => {
      const playbackRate = parseFloat(playerPlaybackRateInput.value)
      player.playbackRate = playbackRate
      playerPlaybackRateLabel.textContent = `${playbackRate}x`
      updatePlayerOptions(podcastId, { rate: playbackRate })
    }
  })

  const playerPlaybackRateLabel = el(
    'label',
    {
      className: 'player__playbackrate-label',
      htmlFor: 'player__playbackrate'
    },
    `${player.playbackRate}x`
  )

  playerContainer.append(
    player,
    playerPlaybackRateInput,
    playerPlaybackRateLabel
  )
  targetPlayer.replaceWith(playerContainer)

  player.addEventListener('timeupdate', () => {
    updatePlayerOptions(podcastId, { time: player.currentTime })
  })

  player.addEventListener('volumechange', () => {
    updatePlayerOptions(podcastId, { volume: player.volume })
  })
}
