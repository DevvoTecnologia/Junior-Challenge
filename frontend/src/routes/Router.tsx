import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import CreateRingPage from '../pages/CreateRingPage';
import EditRingPage from '../pages/EditRingPage';
import Header from '../components/Header';

const AppRouter = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateRingPage />} />
        <Route path="/edit/:id" element={<EditRingPage />} />
      </Routes>
    </main>
  </BrowserRouter>
);

export default AppRouter;
