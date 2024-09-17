import type { Episode, EpisodeInterface } from '../types'
import { isExpired, mappedEpisode } from '../utils'
import { api } from '.'

const cacheEpisodes = (podcastId: number, episodes: Episode[]) => {
  const cacheData = {
    timestamp: Date.now(),
    episodes,
  }
  localStorage.setItem(`episode_${podcastId}`, JSON.stringify(cacheData))
}

const getCachedEpisodes = (podcastId: number) => {
  const cached = localStorage.getItem(`episode_${podcastId}`)
  if (!cached) return null

  const { timestamp, episodes } = JSON.parse(cached)

  if (isExpired(timestamp)) {
    localStorage.removeItem(`episode_${podcastId}`)
    return null
  }

  return episodes
}

export const getEpisodes = async (podcastId: number) => {
  try {
    const cachedEpisodes = getCachedEpisodes(podcastId)

    if (cachedEpisodes) {
      return cachedEpisodes
    }

    const resp = await api(
      `/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`,
    )
    const data: EpisodeInterface = await JSON.parse(resp.contents)
    const listEpisodes: Episode[] = data.results.map(mappedEpisode)

    cacheEpisodes(podcastId, listEpisodes)

    return listEpisodes
  } catch (error) {
    console.log('Error fetching episodes:', error)
  }
}
