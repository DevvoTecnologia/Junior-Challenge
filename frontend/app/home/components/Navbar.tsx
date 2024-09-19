import * as React from "react";
import Link from "next/link";
import { Menu, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <User className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">DevvoRings</span>
        </Link>
        <div className="flex items-center space-x-4 md:space-x-6">
          <div className="hidden md:flex md:items-center md:space-x-4">
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
          </div>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="@username" />
                  <AvatarFallback>JO</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Jorge</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    placeholder@example.com
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
      </div>
    </nav>
  );
}
