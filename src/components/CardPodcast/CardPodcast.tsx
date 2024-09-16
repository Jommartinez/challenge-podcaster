import { Link } from 'react-router-dom'
import { Podcast } from '../../types'

import './CardPodcast.css'

interface CardPodcastProps {
  podcast: Podcast
}

export const CardPodcast = ({ podcast }: CardPodcastProps) => {
  return (
    <Link key={podcast.id} to={`/${podcast.id}`} className="card">
      <img className="image" src={podcast.image} alt={podcast.title} />
      <div className="data">
        <h3 className="title">{podcast.title}</h3>
        <p className="author">Author: {podcast.author}</p>
      </div>
    </Link>
  )
}
