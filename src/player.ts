import { addPodcast, getPodcast, updatePodcast } from './storage.js'

export function podcastPlayer(player: HTMLAudioElement): void {
  const podcastId = location.pathname.split('/').filter(Boolean).pop()
  if (!podcastId) return

  const defaultOptions = { id: podcastId, time: 0, volume: 0.1 }
  const playerOptions = getPodcast(podcastId)
  if (!playerOptions) {
    addPodcast(defaultOptions)
  }

  player.addEventListener('timeupdate', () => {
    updatePodcast(podcastId, { time: player.currentTime })
  })

  player.addEventListener('volumechange', () => {
    updatePodcast(podcastId, { volume: player.volume })
  })

  player.currentTime = playerOptions?.time ?? defaultOptions.time
  player.volume = playerOptions?.volume ?? defaultOptions.volume
}
