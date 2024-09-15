import { Logout } from "@/src/actions/action";
import Link from "next/link";

import { GoldenButton } from "../buttons/golden-button";
import { pages } from "./data";
import { HamburguerMenu } from "./hamburguer-menu";

export const Navbar = () => {
  return (
    <header
      className={`fixed h-[80px] w-screen bg-background border-b-2 border-border flex justify-center `}
    >
      <nav className={`flex justify-between items-center h-full w-10/12 `}>
        <Link
          href={"/create-rings"}
          className={`gold-text text-2xl font-ring flex flex-col cursor-pointer`}
        >
          <span>ring</span>
          <span className={`-mt-2`}>creator</span>
        </Link>
        <div className={`hidden md:flex gap-5`}>
          {pages.map((page, index) => (
            <Link
              href={page.path}
              key={index}
              className={`hover:underline cursor-pointer sofadi-font`}
            >
              <span>{page.name}</span>
            </Link>
          ))}
        </div>
        <GoldenButton className={`!hidden md:!block`} onClick={() => Logout()}>
          Sair da conta
        </GoldenButton>
        <div className={`md:hidden flex items-center`}>
          <HamburguerMenu />
        </div>
      </nav>
    </header>
  );
};
