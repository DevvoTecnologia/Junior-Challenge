import {
  Users,
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
      groupLabel: "Contents",
      menus: [
        {
          href: "",
          label: "Alunos",
          active: pathname.includes("/cursos"),
          icon: SquarePen,
          submenus: [
            {
              href: "/alunos/alunos",
              label: "Todos os alunos",
              active: pathname === "/alunos",
            },
            {
              href: "/alunos/alunosEmProgressao",
              label: "Alunos em progressão",
              active: pathname === "/alunosEmProgressao",
            },
            {
              href: "/alunos/concluidos",
              label: "Alunos concluídos",
              active: pathname === "/concluidos",
            },
            {
              href: "/alunos/desistentes",
              label: "Alunos desistentes",
              active: pathname === "/desistentes",
            },
            {
              href: "/alunos/cadastroDeAlunos",
              label: "Cadastrar Alunos",
              active: pathname === "/cadastroDeAlunos",
            }
          ],
        },
        {
          href: "",
          label: "Cursos",
          active: pathname.includes("/cursos"),
          icon: SquarePen,
          submenus: [
            {
              href: "/cursos/todosOsCursos",
              label: "Todos os cursos",
              active: pathname === "/todosOsCursos",
            },
            
          ],
        },
        
      ],
      
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/users",
          label: "Usuários",
          active: pathname.includes("/users"),
          icon: Users,
          submenus: [],
        },
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
