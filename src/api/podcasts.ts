import type { Podcast } from '../types'
import { isExpired, mappedPodcasts } from '../utils'
import { api } from './'

export const getPodcasts = async () => {
  try {
    const storedPodcasts = localStorage.getItem('podcastsList')
    const storedPodcastsDate = localStorage.getItem('podcastsDate')

    if (
      storedPodcasts &&
      storedPodcastsDate &&
      !isExpired(Number(storedPodcastsDate))
    ) {
      return JSON.parse(storedPodcasts)
    }

    const resp = await api('/us/rss/toppodcasts/limit=100/genre=1310/json')
    const data = await JSON.parse(resp.contents)
    const listPodcasts: Podcast[] = data.feed.entry.map(mappedPodcasts)

    localStorage.setItem('podcastsList', JSON.stringify(listPodcasts))
    localStorage.setItem('podcastsDate', String(Date.now()))

    return listPodcasts
  } catch (error) {
    console.log('Error fetching podcasts:', error)
  }
}
