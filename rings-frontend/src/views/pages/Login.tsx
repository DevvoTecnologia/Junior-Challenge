import { useAuth } from '@/app/hooks/useAuth';
import { Button } from '@/views/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/views/components/ui/card';
import { Input } from '@/views/components/ui/input';
import { Label } from '@/views/components/ui/label';
import { FormEvent, useState } from 'react';
import { useDocumentTitle } from 'usehooks-ts';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const auth = useAuth();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      auth.handleLogin(username, password);
    } catch (exception) {
      setTimeout(() => {
        console.log('credentials wrong', exception);
      }, 5000);
    }
  };

  useDocumentTitle('Rings App - Login');

  return (
    <section className='w-full min-h-screen flex items-center justify-center'>
      <form className='grid gap-2' onSubmit={handleLogin}>
        <Card className='w-full max-w-sm'>
          <CardHeader>
            <CardTitle className='text-2xl'>Login</CardTitle>
            <CardDescription>
              Insira seu nome de usuário abaixo para acessar sua conta.
            </CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4'>
            <Label htmlFor='username'>username</Label>
            <Input
              id='username'
              type='text'
              placeholder='johndoe'
              required
              onChange={({ target }) => setUsername(target.value)}
            />
            <div className='grid gap-2'>
              <Label htmlFor='password'>Senha</Label>
              <Input
                id='password'
                type='password'
                required
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className='w-full' type='submit'>
              Login
            </Button>
          </CardFooter>
        </Card>
      </form>
    </section>
  );
};

export default Login;
