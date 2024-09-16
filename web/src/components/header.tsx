import { IoMdExit } from 'react-icons/io'
import { Link } from 'react-router-dom'

import logo from '@/assets/images/artifact-hub-logo.png'
import { useAuth } from '@/hooks/useAuth'

import { ToggleTheme } from './toggle-theme'
import { Button } from './ui/button'

export function Header() {
  const { logout, isAuthenticated } = useAuth()
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
          <div className="flex gap-2">
            <ToggleTheme />
            {isAuthenticated && (
              <Button size="icon" variant="ghost" onClick={logout}>
                <IoMdExit className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
