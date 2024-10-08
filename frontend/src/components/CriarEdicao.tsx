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

const CriarEdicao = () => {
  const [aneis, setAneis] = useState<AneisProps[]>([]);
  const [forjadoPor, setForjadoPor] = useState<ForjadoPor | "">("");
  const [error, setError] = useState<string | null>(null);
  const [anelSelecionado, setAnelSelecionado] = useState<AneisProps | null>(
    null
  );
  const [showDropdown, setShowDropdown] = useState(false);

  const nomeRef = useRef<HTMLInputElement | null>(null);
  const poderRef = useRef<HTMLInputElement | null>(null);
  const portadorRef = useRef<HTMLInputElement | null>(null);
  const imagemRef = useRef<HTMLInputElement | null>(null);
  const [MensagemDeSucesso, setMensagemDeSucesso] = useState<string | null>(
    null
  );

  useEffect(() => {
    carregarAneis();
  }, []);

  useEffect(() => {
    if (anelSelecionado) {
      nomeRef.current!.value = anelSelecionado.nome;
      poderRef.current!.value = anelSelecionado.poder;
      portadorRef.current!.value = anelSelecionado.portador;
      setForjadoPor(anelSelecionado.forjadoPor as ForjadoPor);
      imagemRef.current!.value = anelSelecionado.imagem;
    }
  }, [anelSelecionado]);

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
      !forjadoPor ||
      !imagemRef.current?.value ||
      !anelSelecionado?.id
    ) {
      setError("Todos os campos são obrigatórios.");
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
      const response = await api.put(`/aneis/${anelSelecionado.id}`, {
        nome: nomeRef.current?.value,
        poder: poderRef.current?.value,
        portador: portadorRef.current?.value,
        forjadoPor: forjadoPor,
        imagem: imagemRef.current?.value,
      });

      setAneis((todosAneis) =>
        todosAneis.map((anel) =>
          anel.id === anelSelecionado.id ? response.data : anel
        )
      );

      setAnelSelecionado(null);
      nomeRef.current!.value = "";
      poderRef.current!.value = "";
      portadorRef.current!.value = "";
      imagemRef.current!.value = "";
      setForjadoPor("");
      setError(null);
      setMensagemDeSucesso("Anél Atuzalizado!");
    } catch (error) {
      setError("Erro ao atualizar o anel.");
    }
  }

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleAnelSelect = (anel: AneisProps) => {
    setAnelSelecionado(anel);
    setShowDropdown(false);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-gray-700 to-gray-900 flex justify-center items-center px-4 py-6">
      <main className="w-full max-w-lg bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-semibold text-white mb-6 text-center">
          Edição de Anéis
        </h1>
        {error && <div className="text-red-400 mb-4 text-center">{error}</div>}
        {MensagemDeSucesso && (
          <div className="text-green-400 mb-4 text-center">
            {MensagemDeSucesso}
          </div>
        )}
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="relative mb-5">
            <button
              type="button"
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white text-left flex items-center justify-between hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              onClick={handleDropdownToggle}
            >
              {anelSelecionado ? anelSelecionado.nome : "Selecione um anel"}
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            {showDropdown && (
              <ul className="absolute z-10 bg-gray-700 border border-gray-600 w-full mt-1 rounded-lg max-h-60 overflow-auto shadow-lg">
                {aneis.map((anel) => (
                  <li
                    key={anel.id}
                    onClick={() => handleAnelSelect(anel)}
                    className="flex items-center p-3 cursor-pointer hover:bg-gray-600"
                  >
                    <img
                      src={anel.imagem}
                      alt={anel.nome}
                      className="w-12 h-12 object-cover mr-3 rounded"
                    />
                    {anel.nome}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <label className="text-white font-medium mb-2">Nome do Anel</label>
          <input
            type="text"
            placeholder="Digite aqui o Nome do Anel"
            className="w-full mb-4 p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            ref={nomeRef}
          />
          <label className="text-white font-medium mb-2">Poder Dele:</label>
          <input
            type="text"
            placeholder="Digite aqui o Poder do Anel"
            className="w-full mb-4 p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            ref={poderRef}
          />
          <label className="text-white font-medium mb-2">
            Portador do Anel
          </label>
          <input
            type="text"
            placeholder="Digite aqui o Portador do Anel"
            className="w-full mb-4 p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            ref={portadorRef}
          />
          <label className="text-white font-medium mb-2">Forjado Por:</label>
          <select
            id="forjadoPor"
            value={forjadoPor}
            onChange={(e) => setForjadoPor(e.target.value as ForjadoPor)}
            className="w-full mb-4 p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Selecione uma opção</option>
            <option value="elfos">Elfos</option>
            <option value="anoes">Anões</option>
            <option value="sauron">Sauron</option>
            <option value="homens">Homens</option>
          </select>
          <input
            type="text"
            placeholder="Digite aqui o Nome de quem forjou o Anel"
            className="w-full mb-4 p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 disabled:bg-gray-600"
            value={forjadoPor}
            disabled
          />
          <label className="text-white font-medium mb-2">Foto do Anel</label>
          <input
            type="text"
            placeholder="Digite aqui o URL da Imagem do Anel"
            className="w-full mb-6 p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            ref={imagemRef}
          />
          <input
            type="submit"
            value={"Salvar Edição!"}
            className="w-full p-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
          />
        </form>
      </main>
    </div>
  );
};

export default CriarEdicao;

