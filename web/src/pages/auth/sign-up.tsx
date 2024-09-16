import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { SignUp as UserSignUp, SignUpRequest } from '@/api/sign-up' // Atualize o import
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader } from '@/components/ui/loader'
import { toast } from '@/hooks/use-toast'
import { useAuth } from '@/hooks/useAuth'

const schema = z.object({
  username: z.string().min(1, { message: 'Username is required.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long.' }),
})

type SignUpFormValues = z.infer<typeof schema>

export function SignUp() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const { mutate, isPending } = useMutation({
    mutationFn: (data: SignUpRequest) => UserSignUp(data),
    onSuccess: () => {
      toast({
        title: 'Sucesso!',
        description: 'Conta criada com sucesso.',
        variant: 'default',
      })
    },
    onError: () => {
      toast({
        title: 'Erro',
        description: 'Falha ao criar conta, tente novamente',
        variant: 'destructive',
      })
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: SignUpFormValues) => {
    mutate(data)
  }

  return (
    <div className="flex items-center justify-center my-36">
      <Card className="max-w-sm w-full p-6 rounded-lg">
        <CardContent>
          <CardTitle className="text-2xl font-bold">Cadastre-se</CardTitle>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 my-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Digite seu username"
                {...register('username')}
                className="mt-1"
              />
              {errors.username && (
                <span className="text-red-500">{errors.username.message}</span>
              )}
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                {...register('password')}
                className="mt-1"
              />
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? <Loader /> : 'Cadastrar'}
            </Button>
          </form>
          <span className="mt-6 font-xs">
            Já possui uma conta?{' '}
            <Button variant="link" className="p-0" asChild>
              <Link to="/sign-in">Entrar</Link>
            </Button>
          </span>
        </CardContent>
      </Card>
    </div>
  )
}
