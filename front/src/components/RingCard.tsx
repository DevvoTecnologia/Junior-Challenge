import { Ring } from '@/types/Ring.ts';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button.tsx';
import { useUser } from '@/hooks/use-user.ts';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog.tsx';
import { useRings } from '@/hooks/use-rings.ts';
import { Bounce, toast } from 'react-toastify';
import { z } from 'zod';
import { ringSchema } from '@/schemas/createRing-schema.ts';

export const RingCard: React.FC<{
  ring: Ring;
}> = ({ ring }) => {
  const { getUser } = useUser();
  const user = useUser((state) => state.user);
  const { deleteRing, updateRing } = useRings();

  const [bearer, setBearer] = useState<string | null>(null);
  const [forgedBy, setForgedBy] = useState<string | null>(null);
  const [loadingBearer, setLoadingBearer] = useState<boolean>(true);
  const [loadingForgedBy, setLoadingForgedBy] = useState<boolean>(true);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editedRing, setEditedRing] = useState<Ring>(ring);
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    const fetchBearer = async () => {
      try {
        const result = await getUser(ring.bearer);
        setBearer(result ? result.username : 'Usuário não encontrado');
      } catch (error) {
        console.error('Erro ao buscar portador:', error);
        setBearer('Erro ao buscar portador');
      } finally {
        setLoadingBearer(false);
      }
    };

    const fetchForgedBy = async () => {
      try {
        const result = await getUser(ring.forgedBy);
        setForgedBy(result ? result.username : 'Usuário não encontrado');
      } catch (error) {
        console.error('Erro ao buscar forjador:', error);
        setForgedBy('Erro ao buscar forjador');
      } finally {
        setLoadingForgedBy(false);
      }
    };

    fetchBearer();
    fetchForgedBy();
  }, [getUser, ring.bearer, ring.forgedBy]);

  const handleDelete = async (id: number) => {
    try {
      const result = await deleteRing(id);
      if (result) {
        toast.warning('Anel excluído com sucesso!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          transition: Bounce,
        });
      }
    } catch (error) {
      toast.error('Erro ao excluir o anel.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce,
      });
    }
  };

  const handleEdit = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      ringSchema.parse(editedRing);
      const result = await updateRing(ring.id, editedRing);
      if (result) {
        toast.success('Anel atualizado com sucesso!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          transition: Bounce,
        });
        setIsEditOpen(false);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.flatten().fieldErrors);
      } else {
        toast.error('Erro ao atualizar o anel.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          transition: Bounce,
        });
      }
    }
  };

  const getErrorMessage = (field: string) => {
    return errors[field]?.[0];
  };

  return (
    <div className="border p-4 max-w-xs w-full h-[488px] flex flex-col justify-between rounded-xl bg-gray">
      <div className="space-y-4">
        <div className="flex items-center justify-center">
          {ring.image ? (
            <div className="w-full h-[240px] border rounded-lg">
              <img
                src={ring.image}
                alt={`Imagem do anel: ${ring.name}`}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = 'link-para-imagem-padrão.jpg';
                  e.currentTarget.alt = '';
                }}
              />
            </div>
          ) : (
            <p>Imagem não disponível</p>
          )}
        </div>
        <div className="flex flex-col">
          <div className="text-xl md:text-2xl font-semibold">{ring.name}</div>
          <span>Poder:</span>
          <p className="rounded-lg font-medium text-white text-sm bg-mainColor /5 p-2">
            {ring.power}
          </p>
        </div>
      </div>

      <div className="flex gap-3 justify-between text-sm md:text-base">
        <p className="flex gap-2">
          Portador:
          <span className="font-medium text-black">
            {loadingBearer ? 'Carregando...' : bearer || 'Indefinido'}
          </span>
        </p>
        <p className="flex gap-2">
          Forjado por:
          <span className="font-medium text-black">
            {loadingForgedBy ? 'Carregando...' : forgedBy || 'Indefinido'}
          </span>
        </p>
      </div>

      {user?.user.id === ring.bearer && (
        <div className="flex justify-between mt-4">
          <AlertDialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <AlertDialogTrigger asChild>
              <Button className="bg-blue-500 h-9 px-4 py-2 text-white">Editar</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Editar Anel</AlertDialogTitle>
                <AlertDialogDescription>
                  Atualize as informações do anel.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="flex flex-col">
                <label className="mt-2">Nome:</label>
                <input
                  type="text"
                  name="name"
                  value={editedRing.name}
                  onChange={(e) => setEditedRing({ ...editedRing, name: e.target.value })}
                  className="border rounded-md p-2"
                />
                {getErrorMessage('name') && (
                  <p className="text-red h-5">{getErrorMessage('name')}</p>
                )}
                <label className="mt-2">Poder:</label>
                <input
                  type="text"
                  value={editedRing.power}
                  onChange={(e) =>
                    setEditedRing({ ...editedRing, power: e.target.value })
                  }
                  className="border rounded-md p-2"
                />
                {getErrorMessage('power') && (
                  <p className="text-red h-5">{getErrorMessage('power')}</p>
                )}
                <label className="mt-2">Imagem:</label>
                <input
                  type="text"
                  value={editedRing.image}
                  onChange={(e) =>
                    setEditedRing({ ...editedRing, image: e.target.value })
                  }
                  className="border rounded-md p-2"
                />
                {getErrorMessage('image') && (
                  <p className="text-red h-5">{getErrorMessage('image')}</p>
                )}
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setIsEditOpen(false)}>
                  Cancelar
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-blue-500 text-white"
                  onClick={handleEdit}
                >
                  Salvar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger className="bg-red h-9 px-4 py-2 text-white inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
              Excluir
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Tem certeza que deseja excluir o anel?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Essa ação não poderá ser revertida.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red"
                  onClick={() => handleDelete(ring.id)}
                >
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  );
};
