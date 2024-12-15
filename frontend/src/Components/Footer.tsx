const Footer: React.FC = () => {
    return (
      <footer className="bg-dark text-white mt-auto py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <a href="/" className="d-flex align-items-center text-white text-decoration-none">
          <img src="/ringtitle.png" className="img-fluid" alt="anel"   style={{ width: '10%' }} />
            <span className="ms-2 fs-3">Anéis do Poder</span>
          </a>
          <div className="d-flex align-items-center">
            <span className="fs-4 me-3">Contato:</span>
            <a href="https://wa.me/5561982992727" className="text-success fs-1 me-3 text-white" target="_blank" rel="noopener noreferrer" aria-label="Whatsapp">
              <i className="bi bi-whatsapp"></i>
            </a>
            <a href="https://github.com/Alvarezpro87" className="text-white fs-1 me-3" target="_blank" rel="noopener noreferrer" aria-label='GitHub'>
              <i className="bi bi-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/alvarez87/" className="text-primary fs-1 text-white" target="_blank" rel="noopener noreferrer" aria-label='Linkedin'>
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;