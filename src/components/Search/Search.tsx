import { Podcast } from '../../types'
import './Search.css'

interface SearchProps {
  filterPodcasts: string
  searchList: Podcast[]
  podcasts: Podcast[]
  setFilterPodcasts: (value: string) => void
}
export const Search = ({
  filterPodcasts,
  searchList,
  podcasts,
  setFilterPodcasts,
}: SearchProps) => {
  return (
    <div className="search">
      <span className="badge">
        {filterPodcasts ? searchList.length : podcasts.length}
      </span>
      <input
        className="input"
        type="text"
        placeholder="Filter podcasts..."
        value={filterPodcasts}
        onChange={e => setFilterPodcasts(e.target.value)}
      />
    </div>
  )
}
