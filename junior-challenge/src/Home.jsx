import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import anelSilmaril from './assets/anelSilmaril.png';

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:3000/anel')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    const confirm = window.confirm('Tem certeza que deseja excluir?');
    if (confirm) {
      axios.delete('http://localhost:3000/anel/' + id)
        .then(() => {
          setData(data.filter(anel => anel.id !== id));
        })
        .catch(err => console.log(err));
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className='d-flex w-100 vh-100 d-flex flex-column justify-content-center align-items-center fundo' style={{ backgroundColor: "#11001C", color: "#FBE300" }}>
      <div className='d-flex justify-content-center align-items-center'>
        <h1 className="fade-in">Os Anéis de Poder</h1>
      </div>
      <div className='d-flex justify-content-end'>
        <Link to="/create" className='btn-criar-inicio'>Criar Novo Anel</Link>
      </div>
      <div className="carrossel-container container p-3" style={{ backgroundColor: "#02010A" }}>
        <Slider {...settings}>
          {data.map((anel, index) => (
            <div key={index} className="card-container slide-in" style={{ backgroundColor: "#DEAAFF" }}>
              <div className="card-item">
                <div>
                  <Link to={`/update/${anel.id}`} className='me-2 edit-btn'>Editar</Link>
                  <button onClick={() => handleDelete(anel.id)} className='btn btn-sm btn-danger'>Deletar</button>
                </div>
                <img src={anelSilmaril} alt={anel.nome} className="anel-img" />
                <p>Poder: {anel.poder}</p>
                <p>Portador: {anel.portador}</p>
                <p>Forjado por: {anel.forjadoPor}</p>
                <div className="description-container">
                  <h3>Anel {anel.nome}</h3>
                </div>
              </div>
            </div>
          ))}
          <div className="card-coringa slide-in">
            <p>Um desafio para</p>
            <p className="strong-300">governar todos eles,</p>
            <p>Um desafio para</p>
            <p className="strong-300">encontrá-los,</p>
            <p>Um desafio</p>
            <p>para trazê-los</p>
            <p>todos,</p>
            <p className="strong-400">e na escuridão</p>
            <p className="strong-500">prendê-los.</p>
          </div>
        </Slider>
      </div>
      <footer>
        Que a Luz de Eärendil guie você neste desafio!
      </footer>
    </div>
  );
}

export default Home;
