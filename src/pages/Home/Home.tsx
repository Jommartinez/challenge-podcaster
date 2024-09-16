import { useEffect, useState } from 'react'
import { useLoading } from '../../context'
import { getPodcasts } from '../../api'
import { Podcast } from '../../types'
import { CardPodcast } from '../../components/CardPodcast/CardPodcast'

import './Home.css'
import { Search } from '../../components/Search/Search'

export const Home = () => {
  const { setIsLoading } = useLoading()
  const [podcasts, setPodcasts] = useState<Podcast[]>([])
  const [filterPodcasts, setFilterPodcasts] = useState<string>('')

  const getDataPodcast = async () => {
    setIsLoading(true)
    try {
      const data = await getPodcasts()
      if (data) setPodcasts(data)
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
      podcast.author.toLowerCase().includes(filterPodcasts.toLowerCase()),
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
