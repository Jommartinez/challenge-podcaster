import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
  return (
    <>
      <p>Header</p>
      <Outlet />
    </>
  )
}
