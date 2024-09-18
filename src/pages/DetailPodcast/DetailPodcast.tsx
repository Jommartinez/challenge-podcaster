import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useLoading } from '../../store/loadingStore'
import usePodcastStore from '../../store/podcastStore'
import { List } from '../../components'

import './DetailPodcast.css'

export const DetailPodcast = () => {
  const { setIsLoading } = useLoading()
  const { podcastId } = useParams<{ podcastId: string }>()
  const { getEpisodes, fetchEpisodes, episodes } = usePodcastStore()

  const getDataEpisodes = async () => {
    setIsLoading(true)
    try {
      if (podcastId) {
        if (!episodes[Number(podcastId)]) {
          await fetchEpisodes(Number(podcastId))
        }
      } else {
        console.log('podcastId is not defined')
      }
    } catch (error) {
      console.log('error fetching data episodes', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getDataEpisodes()
  }, [podcastId])

  const podcastEpisodes = podcastId ? getEpisodes(Number(podcastId)) : []

  return (
    <div className="wrapperDetail">
      <div className="count">Episodes: {podcastEpisodes.length}</div>
      <div className="wrapperList">
        <List episodes={podcastEpisodes} podcastId={podcastId || ''} />
      </div>
    </div>
  )
}
