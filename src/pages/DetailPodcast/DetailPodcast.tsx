import { useEffect, useState } from 'react'
import { useLoading } from '../../context'
import { useParams } from 'react-router-dom'
import { getEpisodes } from '../../api'
import { Episode } from '../../types'

import './DetailPodcast.css'
import { List } from '../../components'

export const DetailPodcast = () => {
  const { setIsLoading } = useLoading()
  const { podcastId } = useParams<{ podcastId: string }>()
  const [episodes, setEpisodes] = useState<Episode[]>([])

  const getDataEpisodes = async () => {
    setIsLoading(true)

    try {
      if (podcastId) {
        const data = await getEpisodes(Number(podcastId))
        if (data) setEpisodes(data)
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

  return (
    <div className="wrapperDetail">
      <div className="count">Episodes: {episodes.length}</div>
      <div className="wrapperList">
        <List episodes={episodes} podcastId={podcastId || ''} />
      </div>
    </div>
  )
}
