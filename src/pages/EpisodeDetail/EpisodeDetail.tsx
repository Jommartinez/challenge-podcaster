import { useParams } from 'react-router-dom'
import './EpisodeDetail.css'
import { useEffect, useState } from 'react'
import { Episode } from '../../types'
import { useLoading } from '../../context'

export const EpisodeDetail = () => {
  const { setIsLoading } = useLoading()
  const [episode, setEpisode] = useState<Episode | null>(null)
  const { podcastId, episodeId } = useParams<{
    podcastId: string
    episodeId: string
  }>()

  useEffect(() => {
    setIsLoading(true)
    const storedEpisode = localStorage.getItem(`episode_${podcastId}`)
    if (storedEpisode) {
      const listEpisodes: Episode[] = JSON.parse(storedEpisode)
      const episodeData = listEpisodes.find(
        episode => episode.id === parseInt(episodeId || ''),
      )
      if (episodeData) {
        setEpisode(episodeData)
      }
    }
    setIsLoading(false)
  }, [episodeId, podcastId])
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
