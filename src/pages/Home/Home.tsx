import { useEffect, useState } from 'react'
import usePodcastStore from '../../store/podcastStore'
import { useLoading } from '../../store/loadingStore'
import { Podcast } from '../../types'
import { CardPodcast } from '../../components'

import './Home.css'
import { Search } from '../../components'

export const Home = () => {
  const { setIsLoading } = useLoading()
  const { podcasts, fetchPodcasts } = usePodcastStore()
  const [filterPodcasts, setFilterPodcasts] = useState<string>('')

  const getDataPodcast = async () => {
    setIsLoading(true)
    try {
      await fetchPodcasts()
    } catch (error) {
      console.error('error fetching data podcasts', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getDataPodcast()
  }, [])

  const searchList = podcasts.filter(
    (podcast: Podcast) =>
      podcast.title.toLowerCase().includes(filterPodcasts.toLowerCase()) ||
      podcast.author.toLowerCase().includes(filterPodcasts.toLowerCase()) ||
      podcast.description.toLowerCase().includes(filterPodcasts.toLowerCase()),
  )

  return (
    <div>
      <Search
        filterPodcasts={filterPodcasts}
        searchList={searchList}
        podcasts={podcasts}
        setFilterPodcasts={setFilterPodcasts}
      />
      <div className="wrapper-card">
        {searchList.map((podcast: Podcast) => (
          <CardPodcast key={podcast.id} podcast={podcast} />
        ))}
      </div>
    </div>
  )
}
