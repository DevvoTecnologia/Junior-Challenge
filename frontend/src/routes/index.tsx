import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import PrivateRoute from './PrivateRoute'
import Login from '../pages/Login'
import Register from '../pages/Register'
import CreateRing from '../pages/CreateRing'

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/cadastro' element={<Register />} />
        <Route path='/' element={<PrivateRoute element={<Home />} />} />
        <Route path='/aneis/cadastro' element={<PrivateRoute element={<CreateRing />} />} />
        <Route path='/aneis/atualizar' element={<PrivateRoute element={<CreateRing />} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoute
