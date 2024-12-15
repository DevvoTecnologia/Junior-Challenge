import React from 'react';


const Header: React.FC = () => {
    return (
        <header className="p-3 bg-dark text-white">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                    <a href="/" className="d-flex align-items-center text-white text-decoration-none">
                    <img src="/ringtitle.png" className="img-fluid" alt="anel"   style={{ width: '10%' }} />
                        <span className="ms-2 fs-3">Anéis do Poder</span>
                    </a>

                    <div className="text-end">
                        
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;