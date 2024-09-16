import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { SignIn as UserSignIn } from '@/api/sign-in'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/hooks/use-toast'
import { useAuth } from '@/hooks/useAuth'

const formSchema = z.object({
  username: z.string().min(2, { message: 'Nome de usuário é obrigatório.' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' }),
})

type FormValues = z.infer<typeof formSchema>

export function SignIn() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const mutation = useMutation({
    mutationFn: (data: FormValues) => UserSignIn(data),
    onSuccess: () => {
      toast({
        title: 'Login bem-sucedido!',
        description: 'Você foi logado com sucesso.',
      })
    },
    onError: () => {
      toast({
        title: 'Falha no login',
        description: 'Nome de usuário ou senha inválidos.',
      })
    },
  })

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data)
  }

  return (
    <div className="flex items-center justify-center my-36">
      <Card className="max-w-sm w-full p-6 rounded-lg">
        <CardContent>
          <CardTitle className="text-2xl font-bold">Entrar</CardTitle>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 my-4">
            <div>
              <Label htmlFor="username">Nome de usuário</Label>
              <Input
                id="username"
                type="text"
                placeholder="Digite seu nome de usuário"
                className="mt-1"
                {...register('username')}
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                className="mt-1"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>
          <span className="mt-6 font-xs">
            Não possui uma conta?{' '}
            <Button variant="link" className="p-0" asChild>
              <Link to="/sign-up">Cadastre-se</Link>
            </Button>
          </span>
        </CardContent>
      </Card>
    </div>
  )
}
