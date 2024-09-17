import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Episode } from '../../types'
import { useLoading } from '../../context'
import { isExpired } from '../../utils'

import './EpisodeDetail.css'

export const EpisodeDetail = () => {
  const { setIsLoading } = useLoading()
  const [episode, setEpisode] = useState<Episode | null>(null)
  const { podcastId, episodeId } = useParams<{
    podcastId: string
    episodeId: string
  }>()

  useEffect(() => {
    setIsLoading(true)

    const cachedData = localStorage.getItem(`episode_${podcastId}`)
    if (cachedData) {
      const {
        timestamp,
        episodes,
      }: { timestamp: number; episodes: Episode[] } = JSON.parse(cachedData)

      if (!isExpired(timestamp)) {
        const episodeData = episodes.find(
          episode => episode.id === parseInt(episodeId || ''),
        )
        if (episodeData) {
          setEpisode(episodeData)
        } else {
          console.log('Episode not found')
        }
      } else {
        console.log('Cached episode data expired')
        localStorage.removeItem(`episode_${podcastId}`)
      }
    } else {
      console.log('No cached episodes found')
    }

    setIsLoading(false)
  }, [episodeId, podcastId, setIsLoading])

  return (
    <div className="wrapperInfo">
      <h2>{episode?.name}</h2>
      <div dangerouslySetInnerHTML={{ __html: episode?.description || '' }} />
      {episode?.url && (
        <div>
          <audio controls className="w-100">
            <source src={episode?.url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  )
}
