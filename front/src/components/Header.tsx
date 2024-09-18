import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { Button } from './ui/button.tsx';
import { FaGear } from 'react-icons/fa6';
import { useUser } from '@/hooks/use-user.ts';
import { Bounce, toast } from 'react-toastify';

export default function Header() {
  const user = useUser((state) => state.user);
  const { clearUser } = useUser();
  return (
    <div className="min-w-[50%] flex justify-between px-16 items-center h-28 border-b-2 border-gray bg-mainColor p-5 text-left text-mainTextColor">
      <button className="font-saira-stencil text-4xl">
        <Link to="/">
          Anéis de <span className="text-white">Poder</span>
        </Link>
      </button>
      {user && (
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-white hover:bg-gray text-black flex items-center">
                <User />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white">
              <DropdownMenuLabel>Opções</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link to={`/${user?.user.id}`} className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Ver meu perfil</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <button disabled className="flex items-center">
                    <FaGear className="mr-2 h-4 w-4" />
                    <span>Configurações</span>
                  </button>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <button
                  onClick={() => {
                    clearUser();
                    toast.warning('Saiu da conta. ', {
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
                    setTimeout(() => {
                      window.location.href = '/login';
                    }, 1000);
                  }}
                  className="flex items-center"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair da conta</span>
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}
