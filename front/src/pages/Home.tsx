import React, { useEffect } from 'react';
import Slider from 'react-slick';
import Header from '../components/Header.tsx';
import Container from '../components/Container.tsx';
import { useUser } from '../hooks/use-user.ts';
import { useRings } from '../hooks/use-rings.ts';
import { RingCard } from '@/components/RingCard.tsx';
import CreateRing from '@/components/CreateRing.tsx';
import { Bounce, toast } from 'react-toastify';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
  const { rings, loading, error, fetchRings } = useRings();
  const user = useUser((state) => state.user);

  useEffect(() => {
    fetchRings();
  }, [fetchRings]);

  const Loading = () => <div>Loading...</div>;

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
        },
      },
    ],
  };

  return (
    <div>
      <Header />
      {loading && <Loading />}
      {!user && <Container>Faça o login</Container>}
      {
        <Container>
          <div className="h-full space-y-3">
            <CreateRing />
            <div>
              <h1 className="font-bold text-xl">Anéis</h1>
              <div className="w-full flex items-center justify-center ">
                <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-md  items-center w-full sm:w-[40%]">
                  {rings.length > 0 ? (
                    <Slider {...settings}>
                      {rings.map((ring) => (
                        <RingCard key={ring.id} ring={ring} />
                      ))}
                    </Slider>
                  ) : (
                    <p>Nenhum anel encontrado.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      }
      {error &&
        toast.error(error || 'Erro ao fazer login.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          transition: Bounce,
        })}
    </div>
  );
};

export default Home;
