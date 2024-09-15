import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <div className="bg-gray-100 flex min-h-screen flex-col antialiased py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Outlet />
      </div>
    </div>
  )
}
