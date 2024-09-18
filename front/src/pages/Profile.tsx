import Container from '@/components/Container.tsx';
import Header from '@/components/Header.tsx';
import { useUser } from '@/hooks/use-user.ts';
import React, { useEffect } from 'react';

export default function Profile() {
  const { user, getUser } = useUser();

  useEffect(() => {
    if (user?.user.id) {
      getUser(user.user.id);
    }
  }, [user, getUser]);

  if (!user) {
    return <div>Carregando perfil...</div>;
  }

  return (
    <div className="">
      <Header />
      <Container className=" justify-center flex items-center">
        <div className="bg-gray p-3 rounded-md flex justify-center flex-col">
          <h2 className="text-2xl font-bold">Perfil do Usuário</h2>
          <div className="mt-4">
            <p>
              <strong>Nome de Usuário:</strong> {user.user.username}
            </p>
            <p>
              <strong>E-mail:</strong> {user.user.email}
            </p>
            <p>
              <strong>Classe:</strong> {user.user.class}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
