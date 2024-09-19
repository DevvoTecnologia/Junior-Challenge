import { Ring } from "@/domain/Rings"

const ringsMock = [
  {
    "id": "ring1",
    "nome": "Anel da Luz",
    "poder": "Iluminar os caminhos",
    "portador": "Gandalf",
    "forjadoPor": "Elfos",
    "imagem": "https://example.com/images/ring1.png"
  },
  {
    "id": "ring2",
    "nome": "Anel do Fogo",
    "poder": "Controlar chamas",
    "portador": "Smaug",
    "forjadoPor": "Anões",
    "imagem": "https://example.com/images/ring2.png"
  },
  {
    "id": "ring3",
    "nome": "Anel do Tempo",
    "poder": "Manipular o tempo",
    "portador": "Elrond",
    "forjadoPor": "Elfos",
    "imagem": ""
  },
  {
    "id": "ring4",
    "nome": "Anel da Terra",
    "poder": "Controlar a natureza",
    "portador": "Ents",
    "forjadoPor": "Anões",
    "imagem": "https://example.com/images/ring4.png"
  },
  {
    "id": "ring5",
    "nome": "Anel da Mente",
    "poder": "Leitura de pensamentos",
    "portador": "Saruman",
    "forjadoPor": "Anões",
    "imagem": "https://example.com/images/ring5.png"
  },
  {
    "id": "ring6",
    "nome": "Anel da Água",
    "poder": "Controlar as águas",
    "portador": "Legolas",
    "forjadoPor": "Humanos",
    "imagem": "https://example.com/images/ring6.png"
  },
  {
    "id": "ring7",
    "nome": "Anel do Vento",
    "poder": "Dominar os ventos",
    "portador": "",
    "forjadoPor": "",
    "imagem": ""
  },
  {
    "id": "ring8",
    "nome": "",
    "poder": "",
    "portador": "",
    "forjadoPor": "",
    "imagem": ""
  },
  {
    "id": "ring9",
    "nome": "Anel da Noite",
    "poder": "Tornar-se invisível",
    "portador": "Frodo",
    "forjadoPor": "Sauron",
    "imagem": "https://example.com/images/ring9.png"
  },
  {
    "id": "ring10",
    "nome": "Anel do Destino",
    "poder": "Controlar o destino",
    "portador": "Aragorn",
    "forjadoPor": "Humanos",
    "imagem": "https://example.com/images/ring10.png"
  },
  {
    "id": "ring11",
    "nome": "Anel do Eco",
    "poder": "Ouvir ecos do passado",
    "portador": "Gimli",
    "forjadoPor": "Anões",
    "imagem": "https://example.com/images/ring11.png"
  },
  {
    "id": "ring12",
    "nome": "Anel da Sabedoria",
    "poder": "Aumentar a inteligência",
    "portador": "Bilbo",
    "forjadoPor": "Elfos",
    "imagem": "https://example.com/images/ring12.png"
  },
  {
    "id": "ring13",
    "nome": "Anel do Sombras",
    "poder": "Criar ilusões",
    "portador": "Gollum",
    "forjadoPor": "Anões",
    "imagem": "https://example.com/images/ring13.png"
  },
  {
    "id": "ring14",
    "nome": "Anel da Força",
    "poder": "Aumentar a força física",
    "portador": "Boromir",
    "forjadoPor": "Humanos",
    "imagem": "https://example.com/images/ring14.png"
  },
  {
    "id": "ring16",
    "nome": "Anel da Vida",
    "poder": "Conceder longevidade",
    "portador": "Théoden",
    "forjadoPor": "Humanos",
    "imagem": "https://example.com/images/ring16.png"
  },
  {
    "id": "ring17",
    "nome": "Anel do Coração",
    "poder": "Aumentar a empatia",
    "portador": "Éowyn",
    "forjadoPor": "Humanos",
    "imagem": "https://example.com/images/ring17.png"
  },
  {
    "id": "ring18",
    "nome": "Anel da Esperança",
    "poder": "Inspirar coragem em outros",
    "portador": "Samwise",
    "forjadoPor": "Humanos",
    "imagem": "https://example.com/images/ring18.png"
  },
]

export async function getRings(): Promise<Ring[]> {
  return ringsMock
}