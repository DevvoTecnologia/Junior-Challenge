import { Link } from 'react-router-dom';

import { routes } from '@/app/Router/routes';

import { ThemeSwitcher } from './ThemeSwitcher';
import { Button } from './ui/button';

function Header() {
  return (
    <nav className='flex items-between px-4 border-b p-6 mb-10 justify-between'>
      <div className='flex items-center space-x-6'>
        <button type='button'>
          <Link to={routes.home}>Rings</Link>{' '}
        </button>{' '}
        <Button>
          <Link
            className='flex items-center justify-center'
            to={routes.createRing}
          >
            Cadastrar Anel
          </Link>
        </Button>
      </div>
      <ThemeSwitcher />
    </nav>
  );
}

export default Header;
