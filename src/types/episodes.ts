export type Episode = {
  id: number
  name: string
  releaseDate: string
  description: string
  time: number
  url: string
}

export interface EpisodeApi {
  trackId: number
  trackName: string
  releaseDate: string
  description: string
  trackTimeMillis: number
  episodeUrl: string
}

export interface EpisodeInterface {
  resultCount: number
  results: EpisodeApi[]
}
