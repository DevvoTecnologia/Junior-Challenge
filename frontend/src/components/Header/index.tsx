import { FaRing } from 'react-icons/fa';
import './header.scss';

const Header = () => {
  return (
    <header className='header'>
      <div className='container'>
        <div className='header-content'>
          <FaRing className='header-icon' />
          <h1 className='title'>The Ring</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
