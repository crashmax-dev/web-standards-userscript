import { el } from '@zero-dependency/dom'
import {
  addPlayerOptions,
  getPlayerOptions,
  updatePlayerOptions
} from './storage.js'

export function patchPlayer(player: HTMLAudioElement): void {
  const clonedPlayer = player.cloneNode() as HTMLAudioElement
  const playerContainer = el('div', {
    className: 'player__container'
  })

  const playerPlaybackRateInput = el('input', {
    name: 'player__playbackrate',
    type: 'range',
    value: `${clonedPlayer.playbackRate}`,
    step: '0.25',
    min: '0.75',
    max: '2',
    oninput: () => {
      const playbackRate = parseFloat(playerPlaybackRateInput.value)
      clonedPlayer.playbackRate = playbackRate
      playerPlaybackRateLabel.textContent = `${clonedPlayer.playbackRate}x`
    }
  })

  const playerPlaybackRateLabel = el(
    'label',
    {
      className: 'player__playbackrate-label',
      htmlFor: 'player__playbackrate'
    },
    `${clonedPlayer.playbackRate}x`
  )

  playerContainer.append(
    clonedPlayer,
    playerPlaybackRateInput,
    playerPlaybackRateLabel
  )
  player.replaceWith(playerContainer)

  const podcastId = location.pathname.split('/').filter(Boolean).pop()
  if (!podcastId) return

  const defaultOptions = { id: podcastId, time: 0, volume: 0.1 }
  const playerOptions = getPlayerOptions(podcastId)
  if (!playerOptions) {
    addPlayerOptions(defaultOptions)
  }

  clonedPlayer.addEventListener('timeupdate', () => {
    updatePlayerOptions(podcastId, { time: clonedPlayer.currentTime })
  })

  clonedPlayer.addEventListener('volumechange', () => {
    updatePlayerOptions(podcastId, { volume: clonedPlayer.volume })
  })

  clonedPlayer.currentTime = playerOptions?.time ?? defaultOptions.time
  clonedPlayer.volume = playerOptions?.volume ?? defaultOptions.volume
}
