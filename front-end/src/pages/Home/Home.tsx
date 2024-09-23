//Components
import Menu from '../../components/Menu/Menu';
import Cards from '../../components/Cards/Cards';

//Styles
import './home.css';

const Home: React.FC = () => {
  return (
    <header className='container'>
      <Menu />

      <main className='container-cards'>
        <Cards />
      </main>
    </header>
  );
}

export default Home;
