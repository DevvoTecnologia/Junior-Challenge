import { useAuth } from '@/app/hooks/useAuth';
import { useTheme } from '@/app/hooks/useTheme';
import { useNavigation } from '@/app/lib/navigate';
import { Button } from '@/views/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/views/components/ui/dropdown-menu';
import { LucideLogOut, LucideUser } from 'lucide-react';

export function ThemeSwitcher() {
  const { setTheme } = useTheme();
  const navigate = useNavigation();

  const auth = useAuth();
  const { username } = useAuth();

  const handleLogout = () => {
    auth.handleLogout();

    navigate('/login');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={'outline'}>Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem disabled>
          <LucideUser className='mr-2' />
          {username}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => setTheme('light')}>
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Escuro
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout} className='flex items-center'>
          <LucideLogOut className='mr-2' />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
