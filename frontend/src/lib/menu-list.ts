import {
  Settings,
  SquarePen,
  LayoutGrid,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: React.ElementType;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Administrar anéis",
      menus: [
        {
          href: "",
          label: "Crie seu anel",
          active: pathname.includes("/aneis"),
          icon: SquarePen,
          submenus: [
            {
              href: "/aneis/create",
              label: "Criar / Editar aneis",
              active: pathname === "/aneis",
            },
            {
              href: "/aneis/show",
              label: "Visualizar Aneis",
              active: pathname === "/alunosEmProgressao",
            },
 
          ],
        },        
      ],
      
    },
    {
      groupLabel: "Configurações",
      menus: [
        {
          href: "/account",
          label: "Conta",
          active: pathname.includes("/account"),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}
