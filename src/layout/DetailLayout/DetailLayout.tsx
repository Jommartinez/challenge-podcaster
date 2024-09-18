import { useEffect } from 'react'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import usePodcastStore from '../../store/podcastStore'

import './DetailLayout.css'

export const DetailLayout = () => {
  const navigate = useNavigate()
  const { podcastId } = useParams<{ podcastId: string }>()
  const { getPodcast, fetchPodcasts } = usePodcastStore()

  useEffect(() => {
    const loadPodcast = async () => {
      let podcast = getPodcast(podcastId!)
      if (!podcast) {
        await fetchPodcasts()
        podcast = getPodcast(podcastId!)
      }
      if (!podcast) {
        console.log('Podcast not found')
        navigate('/')
      }
    }
    loadPodcast()
  }, [podcastId, navigate, getPodcast, fetchPodcasts])

  const podcast = getPodcast(podcastId!)

  if (!podcast) return null

  return (
    <div className="layout-detail">
      <div className="wrapper">
        <Link to={`/podcast/${podcastId}`}>
          <img
            src={podcast?.image}
            alt={`${podcast?.title} cover`}
            className="imageSquare"
          />
        </Link>
        <hr className="divider" />
        <Link to={`/podcast/${podcastId}`}>
          <h2 className="title">
            <strong>{podcast?.title}</strong>
          </h2>
          <p className="subtitle">by {podcast?.author}</p>
        </Link>
        <hr className="divider" />
        <div>
          <p>
            <strong>Description:</strong>
          </p>
          <p className="desc">{podcast?.description}</p>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
