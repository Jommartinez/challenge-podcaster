import './Header.css'

interface HeaderProps {
  loading: boolean
}

export const Header = ({ loading }: HeaderProps) => {
  return (
    <div className="header">
      <h1>Podcaster</h1>
      <div>{loading && <div className="loader"></div>}</div>
    </div>
  )
}
