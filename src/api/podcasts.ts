import type { Podcast } from '../types'
import { mappedPodcasts } from '../utils'
import { api } from './'

export const fetchPodcasts = async (): Promise<Podcast[]> => {
  try {
    const resp = await api('/us/rss/toppodcasts/limit=100/genre=1310/json')
    const data = resp && (await JSON.parse(resp?.contents))
    return data.feed.entry.map(mappedPodcasts)
  } catch (error) {
    console.error('Error fetching podcasts:', error)
    return []
  }
}
