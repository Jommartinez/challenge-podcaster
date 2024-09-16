interface HeaderProps {
  loading: boolean
}

export const Header = ({ loading }: HeaderProps) => {
  return (
    <>
      <h1>Podcasts</h1>
      <p>{loading ? 'Si' : 'NO'}</p>
    </>
  )
}
