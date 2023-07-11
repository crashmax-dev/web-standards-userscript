import { el } from '@zero-dependency/dom'
import { addZero } from '@zero-dependency/utils'
import { storage } from './storage.js'

export function patchPodcasts(podcastsElements: HTMLElement[]): void {
  for (const podcast of storage.value) {
    const podcastElement = podcastsElements.find(
      (el) => el.textContent?.trim() === podcast.id
    )
    if (!podcastElement) continue

    const time = podcast.time
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time - hours * 3600) / 60)
    const seconds = Math.floor(time - hours * 3600 - minutes * 60)
    const timeString = `/ ${addZero(hours)}:${addZero(minutes)}:${addZero(
      seconds
    )}`

    const timeElement = el('span', timeString)
    podcastElement.appendChild(timeElement)
    podcastElement.classList.add('visited')
  }
}
