import { useEffect, useState, useRef, FormEvent } from "react";
import { FiTrash } from "react-icons/fi";
import { api } from "../services/api";

interface AneisProps {
  id: string;
  nome: string;
  poder: string;
  portador: string;
  forjadoPor: string;
  imagem: string;
}

const CriarForm = () => {
  const [aneis, setAneis] = useState<AneisProps[]>([]);

  const nomeRef = useRef<HTMLInputElement | null>(null);
  const poderRef = useRef<HTMLInputElement | null>(null);
  const portadorRef = useRef<HTMLInputElement | null>(null);
  const forjadorRef = useRef<HTMLInputElement | null>(null);
  const imagemRef = useRef<HTMLInputElement | null>(null);

  const [forjadoPor, setForjadoPor] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setForjadoPor(event.target.value);
  };

  useEffect(() => {
    carregarAneis();
  }, []);

  async function carregarAneis() {
    const response = await api.get("/listaAneis");
    setAneis(response.data);
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

    const response = await api.post("/aneis", {
      nome: nomeRef.current?.value,
      poder: poderRef.current?.value,
      portador: portadorRef.current?.value,
      forjadoPor: forjadorRef.current?.value,
      imagem: imagemRef.current?.value,
    });

    setAneis((todosAneis) => [...todosAneis, response.data]);

    nomeRef.current.value = "";
    poderRef.current.value = "";
    portadorRef.current.value = "";
    forjadorRef.current.value = "";
    imagemRef.current.value = "";
  }

  async function handleDelete(id: string) {
    try {
      await api.delete("/aneis", {
        params: {
          id: id,
        },
      });

      const todosAneis = aneis.filter((anel) => anel.id !== id);

      setAneis(todosAneis);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="w-full min-h-screen bg-gray-800 flex justify-center px-4">
      <main className="my-10 w-full md: max-w-2xl">
        <h1 className="text-4xl font-medium text-white">Aneis do Poder</h1>
        <form className="flex flex-col my-6" onSubmit={handleSubmit}>
          <label className="font-medium text-white">Nome do Anel</label>
          <input
            type="text"
            placeholder="Digite aqui o Nome do Anel"
            className="w-full mb-5 p-2 rounded"
            ref={nomeRef}
          />
          <label className="font-medium text-white">Poder Dele: </label>
          <input
            type="text"
            placeholder="Digite aqui o Poder do Anel"
            className="w-full mb-5 p-2 rounded"
            ref={poderRef}
          />

          <label className="font-medium text-white">Portador do Anel</label>
          <input
            type="text"
            placeholder="Digite aqui o Portador do Anel"
            className="w-full mb-5 p-2 rounded"
            ref={portadorRef}
          />

          <label className="font-medium text-white">Forjado Por:</label>
          <select
            id="forjadoPor"
            value={forjadoPor}
            onChange={handleChange}
            className="w-full mb-5 p-2 rounded"
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
            className="w-full mb-5 p-2 rounded bg-white"
            ref={forjadorRef}
            value={forjadoPor}
            style={{ textTransform: "capitalize" }}
            disabled
          />

          <label className="font-medium text-white">Foto do Anel</label>
          <input
            type="text"
            placeholder="Digite aqui o Nome de quem forjou o Anel"
            className="w-full mb-5 p-2 rounded"
            ref={imagemRef}
          />
          <input
            type="submit"
            value={"Criar Anel!"}
            className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium"
          />
        </form>

        <section className="flex flex-col gap-4">
          {aneis.map((anel) => (
            <article
              className="w-full bg-white rounded p-2 relative hover:scale-105 duration-200"
              key={anel.id}
            >
              <p>
                <span className="font-medium"> Nome: </span> {anel.nome}
              </p>
              <p>
                <span className="font-medium"> Poder: </span> {anel.poder}
              </p>
              <p>
                <span className="font-medium"> Forjado Por: </span>
                {anel.forjadoPor}
              </p>
              <p>
                <span className="font-medium"> Portador: </span> {anel.portador}
              </p>
              <p>
                <span className="font-medium">
                  <img src={anel.imagem} />
                </span>
              </p>
              <button
                className="bg-red-600 w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 -top-2"
                onClick={() => handleDelete(anel.id)}
              >
                <FiTrash size={18} color="#FFF" />
              </button>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};

export default CriarForm;
