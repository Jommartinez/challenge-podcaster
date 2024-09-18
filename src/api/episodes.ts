import type { Episode } from '../types'
import { mappedEpisode } from '../utils'
import { api } from '.'

export const fetchEpisodes = async (podcastId: number): Promise<Episode[]> => {
  try {
    const resp = await api(
      `/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`,
    )
    const data = resp && (await JSON.parse(resp?.contents))
    return data.results.map(mappedEpisode)
  } catch (error) {
    console.error('Error fetching episodes:', error)
    return []
  }
}
