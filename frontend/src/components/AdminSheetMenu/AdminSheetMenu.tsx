import { Link } from 'react-router-dom'; // Substituir por React Router
import { MenuIcon } from 'lucide-react';
import logo from '/assets/images/favcon.png'; // Certifique-se de que o caminho está correto
import { Button } from '@/components/ui/button';
import { Menu } from '@/components/AdminMenu/AdminMenu';
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

export function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
        <SheetHeader>
          <Button
            className="flex justify-center items-center pb-2 pt-1"
            variant="link"
            asChild
          >
            <Link to="/dashboard" className="flex items-center gap-2">
              <img
                src={logo}
                width={30}
                height={30}
                alt="RC Planing"
                title="RC Planing"
                className="w-7 h-7 object-cover"
              />
              <h1 className="font-bold text-lg">planing</h1>
            </Link>
          </Button>
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  );
}