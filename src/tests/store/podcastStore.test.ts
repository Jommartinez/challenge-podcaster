import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchPodcasts, fetchEpisodes } from '../../api'
import { act } from 'react-dom/test-utils'
import usePodcastStore from '../../store/podcastStore'

vi.mock('../../api', () => ({
  fetchPodcasts: vi.fn(),
  fetchEpisodes: vi.fn(),
}))

describe('podcastStore', () => {
  beforeEach(() => {
    usePodcastStore.setState({ podcasts: [], episodes: {} })
    vi.clearAllMocks()
  })

  it('fetchPodcasts updates the state correctly', async () => {
    const mockPodcasts = [
      {
        id: '1',
        title: 'Podcast 1',
        author: 'Author 1',
        description: 'Description 1',
        image: 'image1.jpg',
      },
      {
        id: '2',
        title: 'Podcast 2',
        author: 'Author 2',
        description: 'Description 2',
        image: 'image2.jpg',
      },
    ]

    ;(fetchPodcasts as ReturnType<typeof vi.fn>).mockResolvedValue(mockPodcasts)

    await act(async () => {
      await usePodcastStore.getState().fetchPodcasts()
    })

    expect(usePodcastStore.getState().podcasts).toEqual(mockPodcasts)
  })

  it('fetchEpisodes updates the state correctly', async () => {
    const mockEpisodes = [
      {
        id: 1,
        name: 'Episode 1',
        releaseDate: '2023-01-01',
        time: 3600,
        url: 'http://audio1.mp3',
        description: 'Episode 1 description',
      },
      {
        id: 2,
        name: 'Episode 2',
        releaseDate: '2023-01-02',
        time: 4200,
        url: 'http://audio2.mp3',
        description: 'Episode 2 description',
      },
    ]

    ;(fetchEpisodes as ReturnType<typeof vi.fn>).mockResolvedValue(mockEpisodes)

    await act(async () => {
      await usePodcastStore.getState().fetchEpisodes(1)
    })

    expect(usePodcastStore.getState().episodes[1]).toEqual(mockEpisodes)
  })

  it('getPodcast returns the correct podcast', async () => {
    const mockPodcasts = [
      {
        id: '1',
        title: 'Podcast 1',
        author: 'Author 1',
        description: 'Description 1',
        image: 'image1.jpg',
      },
      {
        id: '2',
        title: 'Podcast 2',
        author: 'Author 2',
        description: 'Description 2',
        image: 'image2.jpg',
      },
    ]
    usePodcastStore.setState({ podcasts: mockPodcasts })

    const podcast = usePodcastStore.getState().getPodcast('1')
    expect(podcast).toEqual(mockPodcasts[0])
  })

  it('getEpisodes returns the correct episodes', async () => {
    const mockEpisodes = [
      {
        id: 1,
        name: 'Episode 1',
        releaseDate: '2023-01-01',
        time: 3600,
        url: 'http://audio1.mp3',
        description: 'Episode 1 description',
      },
      {
        id: 2,
        name: 'Episode 2',
        releaseDate: '2023-01-02',
        time: 4200,
        url: 'http://audio2.mp3',
        description: 'Episode 2 description',
      },
    ]
    usePodcastStore.setState({ episodes: { 1: mockEpisodes } })

    const episodes = usePodcastStore.getState().getEpisodes(1)
    expect(episodes).toEqual(mockEpisodes)
  })
})
