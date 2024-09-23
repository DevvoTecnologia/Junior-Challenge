//React config
import { Link } from 'react-router-dom';

//Styles
import './menu.css';
import '../../assets/styles/Buttons/button.css';

const Menu: React.FC = () => {
    return (
        <nav className='container-menu'>
            <ul className='menu-links'>
                <li className='links'><Link to='/'>HOME</Link></li>
                <li className='links'>ABOUT</li>
            </ul>

            <Link className='btn-primary' to='/forge'>FORJAR ANEL</Link>
            <Link className='btn-primary' to='/reforger'>REFORJAR</Link>
        </nav>

    );
}

export default Menu;