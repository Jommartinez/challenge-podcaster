import { Link } from 'react-router-dom'
import type { Episode } from '../../types'
import { formatDate, formatTime } from '../../utils'
import './List.css'

export const List = ({
  episodes,
  podcastId,
}: {
  episodes: Episode[]
  podcastId: string
}) => {
  return (
    <>
      <div className="row">
        <div className="w-75">
          <strong>Title</strong>
        </div>
        <div className="w-15">
          <strong>Date</strong>
        </div>
        <div className="w-10 last">
          <strong>Duration</strong>
        </div>
      </div>
      {episodes.map((episode: Episode) => (
        <div className="row" key={episode.id}>
          <Link
            className="w-75 link"
            to={`/podcast/${podcastId}/episode/${episode.id}`}
          >
            {episode.name}
          </Link>
          <div className="w-15">{formatDate(episode.releaseDate)}</div>
          <div className="w-10 last">{formatTime(episode.time)}</div>
        </div>
      ))}
    </>
  )
}
