import {
  addPlayerOptions,
  getPlayerOptions,
  updatePlayerOptions
} from './storage.js'

export function patchPlayer(player: HTMLAudioElement): void {
  const podcastId = location.pathname.split('/').filter(Boolean).pop()
  if (!podcastId) return

  const defaultOptions = { id: podcastId, time: 0, volume: 0.1 }
  const playerOptions = getPlayerOptions(podcastId)
  if (!playerOptions) {
    addPlayerOptions(defaultOptions)
  }

  player.addEventListener('timeupdate', () => {
    updatePlayerOptions(podcastId, { time: player.currentTime })
  })

  player.addEventListener('volumechange', () => {
    updatePlayerOptions(podcastId, { volume: player.volume })
  })

  player.currentTime = playerOptions?.time ?? defaultOptions.time
  player.volume = playerOptions?.volume ?? defaultOptions.volume
}
