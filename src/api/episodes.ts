import type { Episode, EpisodeInterface } from '../types'
import { isExpired, mappedEpisode } from '../utils'
import { api } from '.'

export const cacheEpisodes = (podcastId: number, episodes: Episode[]) => {
  const cacheData = {
    timestamp: Date.now(),
    episodes,
  }
  localStorage.setItem(`episode_${podcastId}`, JSON.stringify(cacheData))
}

export const getCachedEpisodes = (podcastId: number) => {
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
    const data: EpisodeInterface = resp && (await JSON.parse(resp?.contents))
    const listEpisodes: Episode[] = data.results.map(mappedEpisode)

    cacheEpisodes(podcastId, listEpisodes)

    return listEpisodes
  } catch (error) {
    console.log('Error fetching episodes:', error)
  }
}
