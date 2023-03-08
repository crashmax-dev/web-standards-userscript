import './style.scss'
import { patchPlayer } from './player.js'
import { patchPodcasts } from './podcast'

const banner = document.querySelector('.page__war')
if (banner) {
  banner.remove()
}

const player = document.querySelector<HTMLAudioElement>('.podcast__player')
if (player) {
  patchPlayer(player)
}

const podcasts = [
  ...document.querySelectorAll<HTMLElement>('.podcast-preview__number')
]
if (podcasts.length) {
  patchPodcasts(podcasts)
}
