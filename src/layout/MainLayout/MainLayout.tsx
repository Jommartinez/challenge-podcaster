import { Outlet } from 'react-router-dom'
import { useLoading } from '../../context'
import { Header } from '../../components'

import './MainLayout.css'

export const MainLayout = () => {
  const { isLoading } = useLoading()

  return (
    <div className="layout">
      <Header loading={isLoading} />
      <Outlet />
    </div>
  )
}
