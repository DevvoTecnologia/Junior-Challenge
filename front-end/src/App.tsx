
import './app.scss'
import AppRoutes from './routes';
import { ToastContainer } from 'react-toastify';
import background from '../src/assets/background.jpg'

function App() {
  return <>
    <div className="img-background">
      <img src={background} alt="" />
    </div>
    <div className="content-container">
      <AppRoutes />
    </div>
    <ToastContainer position='top-center' />
  </>
}

export default App
