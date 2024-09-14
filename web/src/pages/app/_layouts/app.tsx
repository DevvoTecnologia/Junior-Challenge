import { Outlet } from 'react-router'

export function AppLayout() {
  return (
    <div>
      Layout base
      <Outlet />
      <main />
    </div>
  )
}
