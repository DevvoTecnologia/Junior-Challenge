"use client";

import useUser from "@/hooks/auth/useUser";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Menu } from "lucide-react";

export default function UserDropdown() {
  const { userEmail } = useUser();

  return (
    <>
      <div className="ml-auto flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                {/* <AvatarImage src="/placeholder-avatar.jpg" alt="@username" /> */}
                <AvatarFallback className="text-muted-foreground hover:text-primary transition-colors">
                  {userEmail.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  Seja bem vindo,{" "}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {userEmail}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={"/auth"}>Dar adeus às terras médias</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>DevvoRings</SheetTitle>
              <SheetDescription>Menu</SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col space-y-4 mt-4">
              <Link
                href="/home/forgeRing"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Forja
              </Link>
              <Link
                href="/home"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Anéis
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
