import { ThemeToggle } from "./theme/theme-toggle";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Link to="/" className="text-2xl font-light tracking-tight">
          Os Anéis de Poder
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};
