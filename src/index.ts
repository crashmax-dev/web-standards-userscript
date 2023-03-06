import './style.scss'
import { podcastPlayer } from './player.js'

const banner = document.querySelector('.page__war')
if (banner) {
  banner.remove()
}

const player = document.querySelector<HTMLAudioElement>('.podcast__player')
if (player) {
  podcastPlayer(player)
}
