import { Episode, PodcastsApi, EpisodeApi } from '../types'

export const mappedPodcasts = (entry: PodcastsApi['feed']['entry'][0]) => ({
  id: entry.id.attributes['im:id'],
  title: entry['im:name'].label,
  author: entry['im:artist'].label,
  description: entry.summary.label,
  image: entry['im:image'][2].label,
})

export const mappedEpisode = (episode: EpisodeApi): Episode => ({
  id: episode.trackId,
  name: episode.trackName,
  releaseDate: episode.releaseDate,
  description: episode.description || '',
  time: episode.trackTimeMillis || 0,
  url: episode.episodeUrl || '',
})
