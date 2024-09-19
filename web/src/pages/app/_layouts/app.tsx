import { Outlet } from 'react-router'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

export function AppLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
