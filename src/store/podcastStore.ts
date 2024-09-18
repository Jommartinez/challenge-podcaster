import { create } from 'zustand'
import { persist, StorageValue } from 'zustand/middleware'
import type { Podcast, Episode } from '../types'
import { fetchPodcasts, fetchEpisodes } from '../api'

interface PodcastStore {
  lastFetchTime: Record<string, number>
  podcasts: Podcast[]
  episodes: Record<number, Episode[]>
  fetchPodcasts: () => Promise<void>
  fetchEpisodes: (podcastId: number) => Promise<void>
  getPodcast: (podcastId: string) => Podcast | undefined
  getEpisodes: (podcastId: number) => Episode[]
}

const CACHE_TIME = 24 * 60 * 60 * 1000

const usePodcastStore = create<PodcastStore>()(
  persist(
    (set, get) => ({
      podcasts: [],
      episodes: {},
      lastFetchTime: {},

      fetchPodcasts: async () => {
        const now = Date.now()
        if (now - (get().lastFetchTime['podcasts'] || 0) > CACHE_TIME) {
          const listPodcasts = await fetchPodcasts()
          set({
            podcasts: listPodcasts,
            lastFetchTime: { ...get().lastFetchTime, podcasts: now },
          })
        }
      },

      fetchEpisodes: async (podcastId: number) => {
        const now = Date.now()
        if (
          now - (get().lastFetchTime[`episodes_${podcastId}`] || 0) >
          CACHE_TIME
        ) {
          const listEpisodes = await fetchEpisodes(podcastId)
          set(state => ({
            episodes: { ...state.episodes, [podcastId]: listEpisodes },
            lastFetchTime: {
              ...state.lastFetchTime,
              [`episodes_${podcastId}`]: now,
            },
          }))
        }
      },

      getPodcast: (podcastId: string) => {
        return get().podcasts.find(podcast => podcast.id === podcastId)
      },

      getEpisodes: (podcastId: number) => {
        return get().episodes[podcastId] || []
      },
    }),
    {
      name: 'podcast-store',
      partialize: (state: PodcastStore) => ({
        lastFetchTime: state.lastFetchTime,
        podcasts: state.podcasts,
        episodes: state.episodes,
        fetchPodcasts: state.fetchPodcasts,
        fetchEpisodes: state.fetchEpisodes,
        getPodcast: state.getPodcast,
        getEpisodes: state.getEpisodes,
      }),
      version: 1,
      storage: {
        getItem: (name: string) => {
          const storedData = localStorage.getItem(name)
          if (!storedData) return null
          const { state, timestamp } = JSON.parse(storedData)
          if (Date.now() - timestamp > CACHE_TIME) {
            localStorage.removeItem(name)
            return null
          }
          return state as StorageValue<PodcastStore>
        },
        setItem: (name: string, value: StorageValue<PodcastStore>) => {
          const data = { state: value, timestamp: Date.now() }
          localStorage.setItem(name, JSON.stringify(data))
        },
        removeItem: (name: string) => localStorage.removeItem(name),
      },
    },
  ),
)

export default usePodcastStore
