export type PodcastsApi = {
  feed: {
    entry: {
      id: { attributes: { 'im:id': string } }
      'im:name': { label: string }
      'im:image': { label: string }[]
      'im:artist': { label: string }
      summary: { label: string }
    }[]
  }
}

export type Podcast = {
  id: string
  title: string
  author: string
  description: string
  image: string
}
