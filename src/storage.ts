import { LocalStorage } from '@zero-dependency/storage'

export interface PlayerOptions {
  id: string
  time: number
  volume: number
  rate: number
}

export const storage = new LocalStorage<PlayerOptions[]>('podcast-options', [])

export function getPlayerOptions(podcastId: string): PlayerOptions | undefined {
  return storage.value.find((podcast) => podcast.id === podcastId)
}

export function updatePlayerOptions(
  podcastId: string,
  options: Partial<PlayerOptions>
): void {
  storage.write((values) => {
    const podcastIndex = values.findIndex((podcast) => podcast.id === podcastId)
    if (podcastIndex !== -1) {
      // @ts-ignore
      values[podcastIndex] = { ...values[podcastIndex], ...options }
    }
    return values
  })
}

export function addPlayerOptions(options: PlayerOptions): void {
  storage.write((values) => {
    values.push(options)
    return values
  })
}
