import { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import { Podcast } from '../../types'

import './DetailLayout.css'

export const DetailLayout = () => {
  const navigate = useNavigate()
  const { podcastId } = useParams<{ podcastId: string }>()
  const [podcast, setPodcast] = useState<Podcast | null>(null)

  useEffect(() => {
    const storedPodcasts = localStorage.getItem('podcastsList')
    if (storedPodcasts) {
      const listPodcasts: Podcast[] = JSON.parse(storedPodcasts)
      const podcast = listPodcasts.find(
        (podcast: Podcast) => podcast.id === podcastId,
      )
      if (podcast) {
        setPodcast(podcast)
      } else {
        console.log('Podcast not found')
        navigate('/')
      }
    } else {
      console.log('No local storage')
      navigate('/')
    }
  }, [podcastId])

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
