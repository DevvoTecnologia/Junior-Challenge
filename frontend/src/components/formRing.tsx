
import { createRing } from '@/api/create-ring';
import { getCarriers } from '@/api/get-carriers';
import { getForgers } from '@/api/get-forgers';
import { updateRing } from '@/api/update-ring';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CompleteRing } from '@/models/Ring';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { z } from 'zod';
import { Form } from './ui/form';

const FormSchema = z.object({
  ring_name: z.string({
    message: 'Ring name should be a string',
  }).min(2, { message: "Ring name must have 2 characters" }),
  ring_image: z.string({
    message: 'Ring image should be a url',
  }).url({message: "Ring image shoud be a valid url"}),
  ring_power: z.string({
    message: 'Ring power should be a string',
  }),
  forger_id: z.string({
    message: 'You should select a forger',
  }),
  carrier_id: z
    .string({ message: 'You can select a carrier' })
    .optional()
});

const FormRing = ({ring}: {ring?: CompleteRing}) => {
  const navigate = useNavigate();
  const {data: forgers} = useQuery({
    queryFn: getForgers,
    queryKey: ['forgers', 'list-forgers']
  })

  const {data: carriers} = useQuery({
    queryFn: getCarriers,
    queryKey: ['carriers', 'list-carriers']
  })

  const {...form} = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: ring ? {
      ring_name: ring.ring_name,
      ring_image: ring.ring_image,
      ring_power: ring.ring_power,
    } : {ring_image: "https://img.freepik.com/premium-vector/gold-wedding-ring-vector-illustration-flat-style_501907-1014.jpg?w=360"},
  })
  const {handleSubmit, register, reset, formState: { errors }} = form;

  useEffect(() => {
    if(ring){
      reset({
        ring_name: ring.ring_name,
        ring_image: ring.ring_image,
        ring_power: ring.ring_power,
        forger_id: String(ring.forger.forger_id),
        carrier_id: String(ring?.carrier?.carrier_id),
      })
    }
  },[ring, carriers, forgers])

  const { mutateAsync: updateRingFn} = useMutation({
    mutationFn: updateRing,
    async onSuccess() {
      toast.success("Anel atualizado com sucesso!")
      await navigate('/');
    }
  })

  const { mutateAsync: createRingFn} = useMutation({
    mutationFn: createRing,
    async onSuccess() {
      toast.success("Anel criado com sucesso!")
      await navigate('/');
    }
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if(ring){
      try{
        updateRingFn({
          id: ring.ring_id,
          data: {
            ...data,
            forger_id: Number(data.forger_id),
            carrier_id: data.carrier_id == "undefined" ? null : Number(data.carrier_id),
          }
        })
      } catch (error) {
        toast.error("Falha ao atualizar anel!")
      }
    } else {
      try{
        createRingFn({
          data: {
            ...data,
            forger_id: Number(data.forger_id),
            carrier_id: data.carrier_id == "undefined" ? null : Number(data.carrier_id),
          }
        })
      } catch (error) {
        toast.error("Falha ao criar anel!")
      }
    }
  }

  return (
    <Form {...form}>
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
      <div className="flex gap-10">
        <div className="flex-col flex gap-3">
          <FormItem>
            <Label htmlFor="ring_name">Nome</Label>
            <Input type="text" placeholder="Narya, o anel do fogo" id="ring_name" {...register("ring_name")} />
            <FormMessage className="text-gray-700">{errors.ring_name && errors.ring_name?.message}</FormMessage>
          </FormItem>
          <FormItem>
            <Label htmlFor="ring_image">Imagem</Label>
            <Input type="text" placeholder="https://some-image.url.com" id="ring_image" {...register("ring_image")} />
            <FormMessage className="text-gray-700">{errors.ring_image && errors.ring_image?.message}</FormMessage>
          </FormItem>
          <FormItem>
            <Label htmlFor="ring_power">Poder</Label>
            <Input type="text" placeholder="Seu portador ganha resistência ao fogo" id="ring_power" {...register("ring_power")} />
            <FormMessage className="text-gray-700">{errors.ring_power && errors.ring_power?.message}</FormMessage>
          </FormItem>
        </div>
        <div className="flex-col flex gap-3">
          <FormField
            control={form.control}
            name="forger_id"
            render={({ field }) => (
              <FormItem key={field.value}>
                <FormLabel>Forjador</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um forjador" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {forgers?.map(forger => {
                      return <SelectItem key={forger.forger_id} value={String(forger.forger_id)} className='bg-white'>{forger.forger_name}</SelectItem>
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="carrier_id"
            render={({ field }) => (
              <FormItem key={field.value}>
                <FormLabel>Portador</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selectione um portador" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                  {carriers?.map(carrier => {
                      return <SelectItem key={carrier.carrier_id} value={String(carrier?.carrier_id)} className='bg-white'>{carrier?.carrier_name}</SelectItem>
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
        <Button 
          type="submit" 
          className="px-16 py-5 rounded-xl bg-gray-700 text-white hover:bg-gray-900 transition-colors duration-300"
        >
          {ring ? 'SALVAR' : 'CRIAR'}
        </Button>
    </form>
  </Form>
  )
}

export default FormRing