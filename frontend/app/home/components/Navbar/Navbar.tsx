import * as React from "react";
import Link from "next/link";
import { User } from "lucide-react";
import UserDropdown from "./UserDropdown";

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
          <UserDropdown />
        </div>
      </div>
    </nav>
  );
}
