import { Outlet } from 'react-router'

import { Header } from '@/components/header'

export function AppLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
