import { Link } from "react-router-dom";

export const GalleryEmpty = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="mb-2 text-4xl font-bold">
        {"Você não tem nenhum anel cadastrado :("}
      </h1>
      <p className="text-accent-foreground">
        Você ainda não adicionou nenhum anel à sua coleção.{" "}
        <Link to="/creation" className="text-sky-600 dark:text-sky-400">
          Adicione um novo anel
        </Link>
      </p>
    </div>
  );
};
