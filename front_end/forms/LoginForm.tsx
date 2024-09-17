'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import { Button} from '@/components/ui/button';
import { Input} from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form" // Assuming ShadCN has form components
import { loginSchema } from '../schemas/loginSchema'; 
import { EyeClosedIcon, ReloadIcon } from "@radix-ui/react-icons"
import { z } from 'zod';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Dialog from '@/Factory/Dialog';

export function LoginForm() {


  const [loading,setLoading]= useState<boolean>(false)
  const [open,setOpen]= useState<boolean>(false)
  const [message,setMessage]= useState<string>('')
  const [isPasswordVisible,setIsPasswordVisible]= useState<boolean>(false)
  const router = useRouter()


  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password:""
    },
  })

  const onSubmit = async(data: z.infer<typeof loginSchema>) => {
    console.log(data);
    setLoading(true)
    try {
        const response:any = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email:data.email, senha:data.password }),
        });
        setLoading(false)
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }else{
          const result:any = await response.json();
          if(!result.success){
            setMessage(result.status)
            setOpen(true)
            return
          }
          localStorage.setItem('TOKEN', result.data.token);
          localStorage.setItem('USER_INFO', JSON.stringify(result.data.user));
          console.log(result); // Handle the result as needed
          router.push('/Forge')
        }

      } catch (error:any) {
        setLoading(false)
        setMessage(error.message=="Failed to fetch"?"Não foi possivél consulta a API":error.message)
        setOpen(true)
        console.error('There was a problem with the fetch operation:', error);
      }
  };

  return (
    <>
    <Dialog state={{op:open,setOp:(state:boolean)=>{setOpen(state)},message:message}}/>
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div>
      <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email de acesso</FormLabel>
              <FormControl>
                <Input placeholder="Exemplo@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>

              <FormControl>
                <Input className='pl-9' placeholder="Digite sua senha..." type={isPasswordVisible?'text':'password'} {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <Button type="submit" className='w-full mt-2'>
        {loading ?(
          <>
          <ReloadIcon className="mr-4  animate-spin" /> 
          <span>
            {" "}Carregando
            </span>
          </>
          
        )
        :(
          <>
          Entrar na Forja
          </>
        )}
        </Button>
    </form>
    </Form>
    </>

  );
}
