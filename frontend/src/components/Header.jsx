import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-body-tertiary mt-3 mb-5  w-100">
      <nav className="navbar navbar-expand-lg ">
        <div className="container-xl align-items-center">
          <h1 className="mb-0 fs-4 fw-bold me-3">Anéis do poder App</h1>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li
                className=" nav-link"
                onClick={() => navigate('/')}
                style={{ cursor: 'pointer' }}
              >
                Home
              </li>
              <li
                className="nav-link"
                onClick={() => navigate('/anel/create')}
                style={{ cursor: 'pointer' }}
              >
                Criar anél
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
