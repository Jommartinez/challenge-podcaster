import { PodcastsApi } from '../types'

export const mappedPodcasts = (entry: PodcastsApi['feed']['entry'][0]) => ({
  id: entry.id.attributes['im:id'],
  title: entry['im:name'].label,
  author: entry['im:artist'].label,
  description: entry.summary.label,
  image: entry['im:image'][2].label,
})
