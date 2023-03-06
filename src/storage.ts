import { LocalStorage } from '@zero-dependency/storage'

interface PodcastOptions {
  id: string
  time: number
  volume: number
}

export const storage = new LocalStorage<PodcastOptions[]>('podcast-options', [])

export function getPodcast(podcastId: string): PodcastOptions | undefined {
  return storage.values.find((podcast) => podcast.id === podcastId)
}

export function updatePodcast(
  podcastId: string,
  options: Partial<PodcastOptions>
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

export function addPodcast(options: PodcastOptions): void {
  storage.write((values) => {
    values.push(options)
    return values
  })
}
