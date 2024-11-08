import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateAnel from './pages/CreateAnel';
import UpdateAnel from './pages/UpdateAnel';
import DetailsAnel from './pages/DetailsAnel';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <div className="container-xl">
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anel/create" element={<CreateAnel />} />
          <Route path="/anel/update/:id" element={<UpdateAnel />} />
          <Route path="/anel/details/:id" element={<DetailsAnel />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
