import React, { useEffect, useState } from 'react';
import Header from '../components/Header.tsx';
import Container from '../components/Container.tsx';
import { useUser } from '../hooks/use-user.ts';
import { useRings } from '../hooks/use-rings.ts';
import { RingCard } from '@/components/RingCard.tsx'; // Descomentado
import { Ring } from '@/types/Ring.ts';
import Footer from '@/components/Footer.tsx';
import image from '../assets/image.png';
import CreateRing from '@/components/CreateRing.tsx';

export default function Home() {
  const { rings, loading, error, fetchRings } = useRings();
  const user = useUser((state) => state.user);

  useEffect(() => {
    fetchRings();
  }, [fetchRings]);

  function Loading() {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error);
  }

  return (
    <div>
      <Header />
      {loading && <Loading />}
      {user ? (
        <Container>
          <div className="h-full">
            <CreateRing />
            <div>
              <h1>Anéis</h1>
              {rings.length > 0 ? (
                rings.map((ring: Ring) => <RingCard key={ring.id} ring={ring} />)
              ) : (
                <p>Nenhum anel encontrado.</p>
              )}
            </div>
          </div>
        </Container>
      ) : (
        <Container>Faça o login</Container>
      )}
      <Footer />
    </div>
  );
}
