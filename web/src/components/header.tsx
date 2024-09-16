import { Link } from 'react-router-dom'

import logo from '@/assets/images/artifact-hub-logo.png'

import { ToggleTheme } from './toggle-theme'

export function Header() {
  return (
    <header className="shadow-md">
      <div className="flex mx-auto max-w-[90rem] items-center py-4 gap-2 justify-between p-2">
        <div>
          <img src={logo} className="h-[48px]" alt="" />
        </div>
        <div className="flex items-center gap-8">
          <Link to="/" className="font-semibold ">
            Home
          </Link>
          <ToggleTheme />
        </div>
      </div>
    </header>
  )
}
