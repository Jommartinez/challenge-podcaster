import { Link } from 'react-router-dom'
import './Header.css'

interface HeaderProps {
  loading: boolean
}

export const Header = ({ loading }: HeaderProps) => {
  return (
    <div className="header">
      <Link to={'/'}>
        <h1>Podcaster</h1>
      </Link>
      <div>{loading && <div className="loader" role="status"></div>}</div>
    </div>
  )
}
