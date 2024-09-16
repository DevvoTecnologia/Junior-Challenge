import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function SignUp() {
  return (
    <div className="flex items-center justify-center my-36">
      <Card className="max-w-sm w-full p-6 rounded-lg">
        <CardContent>
          <CardTitle className="text-2xl font-bold">Cadastre-se</CardTitle>
          <form className="space-y-4 my-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Digite seu username"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                className="mt-1"
              />
            </div>
            <Button className="w-full ">Cadastrar</Button>
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
