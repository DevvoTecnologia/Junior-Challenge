import { Logout } from "@/src/actions/action";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/src/components/ui/sheet";
import Link from "next/link";

import { GoldenButton } from "../buttons/golden-button";
import { pages } from "./data";

export const HamburguerMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="scale-75 lg:hidden">
          <label id="togglerLable" htmlFor="toggleChecker">
            <div className="checkboxtoggler">
              <div className="line-1"></div>
              <div className="line-2"></div>
              <div className="line-3"></div>
            </div>
          </label>
        </button>
      </SheetTrigger>
      <SheetContent className={`pt-20`}>
        <div className={`flex flex-col gap-5`}>
          {pages.map((page, index) => (
            <SheetClose key={index} asChild>
              <Link
                href={page.path}
                key={index}
                className={`hover:underline cursor-pointer sofadi-font`}
              >
                <span>{page.name}</span>
              </Link>
            </SheetClose>
          ))}
        </div>

        <SheetFooter className={`pt-10`}>
          <SheetClose asChild>
            <GoldenButton onClick={() => Logout()}>Sair da conta</GoldenButton>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
