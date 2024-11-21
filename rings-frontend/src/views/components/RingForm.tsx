import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useDocumentTitle } from 'usehooks-ts';
import { z } from 'zod';

import { useToast } from '@/app/hooks/use-toast';
import { useNavigation } from '@/app/lib/navigate';
import { createRing, getRingById, updateRing } from '@/app/services/rings';

import { IBearer } from '@/app/interfaces/IBearer';
import { IRing } from '@/app/interfaces/IRing';
import { getAllBearers } from '@/app/services/bearers';
import { RingType } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/views/components/ui/select';
import { Button } from './ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Toaster } from './ui/toaster';

const formSchema = z.object({
  nome: z
    .string()
    .min(2, {
      message: 'O nome deve ter pelo menos 2 caracteres.',
    })
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, {
      message: 'O nome não pode conter números.',
    }),
  poder: z.string().min(5, {
    message: 'O poder deve ter pelo menos 5 caracteres.',
  }),
  portador: z.string().min(2, {
    message: 'O portador deve ter pelo menos 2 caracteres.',
  }),
  forjadoPor: z.string().min(2, {
    message: 'O forjador deve ter pelo menos 2 caracteres.',
  }),
  imagem: z.union([
    z.string().url({
      message: 'A imagem deve ser uma URL válida.',
    }),
    z.instanceof(File, { message: 'A imagem deve ser um arquivo válido.' }),
  ]),
  tipo: z.string().min(3, {
    message: 'O tipo deve ter pelo menos 3 caracteres.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

export const RingForm = () => {
  const navigate = useNavigation();
  const routeParams = useParams();
  const { ringId } = routeParams;
  const { toast } = useToast();

  const [ring, setRing] = useState<IRing | null>(null);
  const [bearers, setBearers] = useState<IBearer[] | null>(null);
  const [isSafeToReset, setIsSafeToReset] = useState(false);

  useDocumentTitle(ringId ? 'Atualização de Anel' : 'Cadastro de Anel');

  const defaultValues = useMemo(
    () => ({
      nome: ring?.nome || '',
      poder: ring?.poder || '',
      portador:
        typeof ring?.portador === 'string'
          ? ring?.portador
          : ring?.portador?._id || '',
      forjadoPor: ring?.forjadoPor || '',
      imagem: ring?.imagem || '',
      tipo: ring?.tipo || '',
    }),
    [ring],
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const formData = new FormData();

      formData.append('nome', data.nome);
      formData.append('poder', data.poder);
      formData.append('portador', data.portador);
      formData.append('forjadoPor', data.forjadoPor);

      if (data.imagem instanceof File) {
        formData.append('imagem', data.imagem);
      } else {
        formData.append('imagem', '');
      }

      formData.append('tipo', data.tipo);

      if (ringId) {
        await updateRing(ringId, formData);
        toast({
          title: 'Anel atualizado com sucesso.',
          description: 'Você será redirecionado para a página inicial',
        });
      } else {
        await createRing(formData);
        setIsSafeToReset(true);
        toast({
          title: 'Anel cadastrado com sucesso.',
          description: 'Você será redirecionado para a página inicial',
        });
      }

      setTimeout(() => navigate('/'), 3500);
    } catch (error) {
      if (error instanceof Error) console.log(error);
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível adicionar o anel agora, tente novamente',
      });
    }
  };

  useEffect(() => {
    async function fetchBearers() {
      try {
        const bearers = await getAllBearers();
        setBearers(bearers);
      } catch (error) {
        if (error instanceof Error) console.log(error);
      }
    }

    async function fetchRing() {
      if (ringId) {
        try {
          const ringById = await getRingById(ringId);
          setRing(ringById);
          form.reset(ringById);
        } catch (error) {
          if (error instanceof Error) console.log(error);
          toast({
            variant: 'destructive',
            title: 'Erro',
            description: 'Não foi possível carregar o anel.',
          });
        }
      }
    }
    fetchRing();
    fetchBearers();
  }, [ringId]);

  useEffect(() => {
    if (!isSafeToReset) return;

    form.reset(defaultValues);
  }, [defaultValues, form, isSafeToReset]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 w-4/5 sm:w-3/5 md:w-9/12 lg:w-2/5'
      >
        <FormField
          control={form.control}
          name='nome'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder='Ex: Anel de Poder' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='poder'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Poder</FormLabel>
              <FormControl>
                <Textarea placeholder='Ex: Invisibilidade' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='portador'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Portador</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Selecione um portador' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {bearers &&
                    bearers.map(bearer => (
                      <SelectItem key={bearer._id} value={bearer._id}>
                        {bearer.nome}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />{' '}
        <FormField
          control={form.control}
          name='forjadoPor'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Forjado Por</FormLabel>
              <FormControl>
                <Input placeholder='Ex: Celebrimbor' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='imagem'
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Imagem</FormLabel>
              <FormControl>
                <Input
                  type='file'
                  accept='image/*'
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) onChange(file);
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='tipo'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Selecione um tipo' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(RingType).map(([key, value]) => (
                    <SelectItem key={key} value={value.toString()}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>
          {ringId ? 'Atualizar Anel' : 'Cadastrar Anel'}
        </Button>
      </form>
      <Toaster />
    </Form>
  );
};

export default RingForm;
