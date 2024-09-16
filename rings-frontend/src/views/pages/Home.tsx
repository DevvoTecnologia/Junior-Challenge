import { env } from '@/app/config/env';
import { useToast } from '@/app/hooks/use-toast';
import { IRing } from '@/app/interfaces/IRing';
import { routes } from '@/app/Router/routes';
import { getAllRings, removeRing } from '@/app/services/rings';
import Loading from '@/views/components/Loading';
import { Button } from '@/views/components/ui/button';
import { Card, CardContent } from '@/views/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/views/components/ui/carousel';
import { PencilIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from 'usehooks-ts';
import { AlertDialogPopup } from '../components/AlertDialog';

const Home = () => {
  const [rings, setRings] = useState<IRing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { toast } = useToast();

  useDocumentTitle('Rings App - Home');

  const handleDeleteRing = async (ringId: string) => {
    try {
      await removeRing(ringId);
      setRings(prevRings => prevRings.filter(ring => ring._id !== ringId));

      toast({
        title: 'Anel excluido com sucesso.',
        description: 'Continue a usar o app',
      });
    } catch (error) {
      if (error instanceof Error) console.log(error);

      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível remover o anel agora, tente novamente',
      });
    }
  };

  const fetchData = async () => {
    try {
      const response = await getAllRings();
      setRings(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Loading />;

  if (rings.length === 0)
    return (
      <div className='w-full min-h-screen flex justify-center items-center'>
        <h1>Nenhum produto para ser exibido</h1>
        <p>Adicione um produto</p>
      </div>
    );

  return (
    <section className='w-full min-h-screen flex flex-col items-center justify-center'>
      <div className='w-4/5 sm:w-3/5 md:w-9/12 lg:w-2/5'>
        <Carousel className='w-full max-w-xl'>
          <CarouselContent>
            {rings.map(item => (
              <CarouselItem key={item._id}>
                <Card className='relative overflow-hidden'>
                  <CardContent className='p-0'>
                    <div className='w-full lg:max-w-full max-h-full lg:flex'>
                      <div
                        className='h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden'
                        style={{
                          backgroundImage: `url('${env.apiUrl}/uploads/${item.imagem}')`,
                          backgroundPosition: 'center',
                        }}
                        title={`Imagem de ${item.nome}`}
                      ></div>
                      <div className='w-full border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal'>
                        <div className='mb-8'>
                          <div className='text-gray-900 font-bold te{xt-xl mb-2'>
                            {item.nome}
                          </div>
                          <p className='text-gray-700 text-base'>
                            {item.poder}
                          </p>
                        </div>
                        <div className='flex items-center'>
                          <div className='text-sm'>
                            <p className='text-gray-900 leading-none mb-2'>
                              Portador:{' '}
                              {typeof item.portador !== 'string' &&
                                item.portador.nome}
                            </p>
                            <p className='text-gray-600 mb-4'>
                              Forjado por: {item.forjadoPor}
                            </p>
                          </div>
                        </div>
                        <div className='flex justify-start z-10'>
                          <Link
                            className='mr-2'
                            to={`${routes.editRing}/${item._id}`}
                          >
                            <Button
                              variant='secondary'
                              size='sm'
                              className='flex items-center'
                            >
                              <PencilIcon className='w-4 h-4 mr-2' />
                              Editar
                            </Button>
                          </Link>
                          <AlertDialogPopup
                            dialog={{
                              id: item._id!,
                              btnString: 'Excluir',
                              title: 'Deseja excluir esse Anel?',
                              description:
                                'A ação não poderá ser desfeita, todas as informações serão perdidas',
                              onClick: handleDeleteRing,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default Home;
