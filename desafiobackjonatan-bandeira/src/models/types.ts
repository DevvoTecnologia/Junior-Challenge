export type TForjador = "Anão" | "Elfo" | "Humano" | "Sauron";
export type TForm = {
  nome: string;
  poder: string;
  portador: string;
  forjadoPor: TForjador;
  imagem: string;
}