import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from '../pages/login/Login';
import Rings from '../pages/rings/Rings';
import AddRing from '../pages/add-ring/AddRing';
import EditRing from '../pages/edit-ring/EditRing';
import Register from '../pages/register/Register';

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/aneis" element={<Rings />} />
                <Route path="/aneis/add" element={<AddRing />} />
                <Route path="/aneis/editar/:ringId" element={<EditRing />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
