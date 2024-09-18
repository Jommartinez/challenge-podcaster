import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useLoading } from '../../store/loadingStore'
import usePodcastStore from '../../store/podcastStore'

import './EpisodeDetail.css'

export const EpisodeDetail = () => {
  const { setIsLoading } = useLoading()
  const { podcastId, episodeId } = useParams<{
    podcastId: string
    episodeId: string
  }>()
  const { getEpisodes, fetchEpisodes } = usePodcastStore()

  useEffect(() => {
    const loadEpisode = async () => {
      setIsLoading(true)
      let episodes = getEpisodes(parseInt(podcastId!))
      if (episodes.length === 0) {
        await fetchEpisodes(parseInt(podcastId!))
        episodes = getEpisodes(parseInt(podcastId!))
      }
      setIsLoading(false)
    }
    loadEpisode()
  }, [podcastId, episodeId, setIsLoading, getEpisodes, fetchEpisodes])

  const episode = getEpisodes(parseInt(podcastId!)).find(
    ep => ep.id === parseInt(episodeId!),
  )

  if (!episode) return null
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
