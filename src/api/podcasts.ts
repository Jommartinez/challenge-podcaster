import type { Podcast } from '../types'
import { isExpired, mappedPodcasts } from '../utils'
import { api } from './'

const cachePodcasts = (podcasts: Podcast[]) => {
  const cacheData = {
    timestamp: Date.now(),
    podcasts,
  }
  localStorage.setItem('podcastsCache', JSON.stringify(cacheData))
}

const getCachedPodcasts = () => {
  const cached = localStorage.getItem('podcastsCache')
  if (!cached) return null

  const { timestamp, podcasts } = JSON.parse(cached)

  if (isExpired(timestamp)) {
    localStorage.removeItem('podcastsCache')
    return null
  }

  return podcasts
}

export const getPodcasts = async () => {
  try {
    const cachedPodcasts = getCachedPodcasts()

    if (cachedPodcasts) {
      return cachedPodcasts
    }

    const resp = await api('/us/rss/toppodcasts/limit=100/genre=1310/json')
    const data = await JSON.parse(resp.contents)
    const listPodcasts: Podcast[] = data.feed.entry.map(mappedPodcasts)

    cachePodcasts(listPodcasts)

    return listPodcasts
  } catch (error) {
    console.log('Error fetching podcasts:', error)
  }
}
