import { Outlet } from 'react-router-dom'
import { useLoading } from '../context'
import { Header } from '../components'

export const MainLayout = () => {
  const { isLoading } = useLoading()

  return (
    <>
      <Header loading={isLoading} />
      <Outlet />
    </>
  )
}
