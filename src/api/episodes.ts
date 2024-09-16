import type { Episode, EpisodeInterface } from '../types'
import { isExpired, mappedEpisode } from '../utils'
import { api } from '.'

export const getEpisodes = async (podcastId: number) => {
  try {
    const storedEpisode = localStorage.getItem(`episode_${podcastId}`)
    const storedEpisodeDate = localStorage.getItem(`episodeDate_${podcastId}`)

    if (
      storedEpisode &&
      storedEpisodeDate &&
      !isExpired(Number(storedEpisodeDate))
    ) {
      return JSON.parse(storedEpisode)
    }

    const resp = await api(
      `/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`,
    )
    const data: EpisodeInterface = await JSON.parse(resp.contents)
    const listEpisodes: Episode[] = data.results.map(mappedEpisode)

    localStorage.setItem(`episode_${podcastId}`, JSON.stringify(listEpisodes))
    localStorage.setItem(`episodeDate_${podcastId}`, String(Date.now()))

    return listEpisodes
  } catch (error) {
    console.log('Error fetching episodes:', error)
  }
}
