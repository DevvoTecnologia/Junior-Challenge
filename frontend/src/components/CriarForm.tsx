import { useEffect, useState, useRef, FormEvent } from "react";
import { api } from "../services/api";

interface AneisProps {
  id: string;
  nome: string;
  poder: string;
  portador: string;
  forjadoPor: string;
  imagem: string;
}

type ForjadoPor = "elfos" | "anoes" | "homens" | "sauron";

const CriarForm = () => {
  const [, setAneis] = useState<AneisProps[]>([]);
  const [forjadoPor, setForjadoPor] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const nomeRef = useRef<HTMLInputElement | null>(null);
  const poderRef = useRef<HTMLInputElement | null>(null);
  const portadorRef = useRef<HTMLInputElement | null>(null);
  const forjadorRef = useRef<HTMLInputElement | null>(null);
  const imagemRef = useRef<HTMLInputElement | null>(null);
  const [MensagemDeSucesso, setMensagemDeSucesso] = useState<string | null>(
    null
  );

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as ForjadoPor;
    if (["elfos", "anoes", "homens", "sauron"].includes(value)) {
      setForjadoPor(value);
    } else {
      setError("Forjado Por inválido.");
    }
  };

  useEffect(() => {
    carregarAneis();
  }, []);

  async function carregarAneis() {
    try {
      const response = await api.get("/listaAneis");
      setAneis(response.data);
    } catch (error) {
      setError("Erro ao carregar anéis.");
    }
  }

  async function obterQuantidadeExistente(forjadoPor: ForjadoPor) {
    try {
      const response = await api.get(`/aneis/count`, {
        params: { forjadoPor },
      });
      return response.data.count;
    } catch (error) {
      setError("Erro ao verificar a quantidade de anéis.");
      return 0;
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (
      !nomeRef.current?.value ||
      !poderRef.current?.value ||
      !portadorRef.current?.value ||
      !forjadorRef.current?.value ||
      !imagemRef.current?.value
    ) {
      return;
    }

    const quantidadeExistente = await obterQuantidadeExistente(
      forjadoPor as ForjadoPor
    );

    const limites: Record<ForjadoPor, number> = {
      elfos: 3,
      anoes: 7,
      homens: 9,
      sauron: 1,
    };

    if (quantidadeExistente >= limites[forjadoPor as ForjadoPor]) {
      setError("Limite de anéis atingido para este forjador.");
      return;
    }

    try {
      const response = await api.post("/aneis", {
        nome: nomeRef.current?.value,
        poder: poderRef.current?.value,
        portador: portadorRef.current?.value,
        forjadoPor: forjadorRef.current?.value,
        imagem: imagemRef.current?.value,
      });

      console.log(response.data);

      setAneis((todosAneis) => [...todosAneis, response.data]);

      nomeRef.current.value = "";
      poderRef.current.value = "";
      portadorRef.current.value = "";
      forjadorRef.current.value = "";
      imagemRef.current.value = "";
      setForjadoPor("");
      setError(null);
      setMensagemDeSucesso("Anel registrado com sucesso!");
    } catch (error) {
      setError("Erro ao criar o anel.");
    }
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 flex justify-center items-center px-4 py-6">
      <main className="w-full max-w-lg bg-gray-900 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-white mb-6 text-center">
          Anéis do Poder
        </h1>
        {error && <div className="text-red-400 mb-4 text-center">{error}</div>}
        {MensagemDeSucesso && (
          <div className="text-green-400 mb-4 text-center">
            {MensagemDeSucesso}
          </div>
        )}
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label className="text-white font-medium mb-2">Nome do Anel</label>
          <input
            type="text"
            placeholder="Digite aqui o Nome do Anel"
            className="w-full mb-4 p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            ref={nomeRef}
          />
          <label className="text-white font-medium mb-2">Poder Dele:</label>
          <input
            type="text"
            placeholder="Digite aqui o Poder do Anel"
            className="w-full mb-4 p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            ref={poderRef}
          />
          <label className="text-white font-medium mb-2">
            Portador do Anel
          </label>
          <input
            type="text"
            placeholder="Digite aqui o Portador do Anel"
            className="w-full mb-4 p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            ref={portadorRef}
          />
          <label className="text-white font-medium mb-2">Forjado Por:</label>
          <select
            id="forjadoPor"
            value={forjadoPor}
            onChange={handleChange}
            className="w-full mb-4 p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Selecione uma opção</option>
            <option value="elfos">Elfos</option>
            <option value="anoes">Anões</option>
            <option value="sauron">Sauron</option>
            <option value="homens">Homens</option>
          </select>
          <input
            type="text"
            placeholder="Nome de quem forjou o Anel"
            className="w-full mb-4 p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 disabled:bg-gray-700"
            ref={forjadorRef}
            value={forjadoPor}
            style={{ textTransform: "capitalize" }}
            disabled
          />
          <label className="text-white font-medium mb-2">Foto do Anel</label>
          <input
            type="text"
            placeholder="Digite aqui o URL da Imagem do Anel"
            className="w-full mb-6 p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            ref={imagemRef}
          />
          <input
            type="submit"
            value={"Criar Anel!"}
            className="w-full p-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
          />
        </form>
      </main>
    </div>
  );
};

export default CriarForm;
