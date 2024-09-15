export interface CreateRingDTO {
  nome: string,
  poder: string,
  portador: string,
  forjadoPor: "Sauron" | "Elfos" | "Anões" | "Humanos";
  imagem: string,
}