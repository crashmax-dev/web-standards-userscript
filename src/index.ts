import { patchPlayer } from './player.js'
import { patchPodcasts } from './podcast.js'

import './style.scss'

const banner = document.querySelector('.page__war')
if (banner) {
  banner.remove()
}

const playerContainer =
  document.querySelector<HTMLDivElement>('.podcast__player')
if (playerContainer) {
  patchPlayer(playerContainer)
}

const podcasts = Array.from(
  document.querySelectorAll<HTMLElement>('.podcast-preview__number')
)
if (podcasts.length) {
  patchPodcasts(podcasts)
}
