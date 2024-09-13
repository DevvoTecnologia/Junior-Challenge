// Hooks
import { useEffect, useState } from "react";
import { toast, Bounce, ToastContainer } from "react-toastify";
// Services
import { api } from "./services/api";
// Components
import "react-toastify/dist/ReactToastify.css";
import RingForm from "./components/RingForm/RingForm";
import ListRings from "./components/ListRings/ListRings";
// Types
import { RingData } from "./types/RingData";

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [ringsData, setRingsData] = useState<RingData[]>([]);
  const [selectedRing, setSelectedRing] = useState<RingData | null>(null);

  const fetchRingsData = async () => {
    try {
      const response = await api.get("/rings");
      setRingsData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCreateOrUpdate = async (data: RingData) => {
    try {
      if (data._id) {
        await api.put(`/rings/${data._id}`, data).then(() =>
          toast.success(`Anel atualizado com sucesso!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          })
        );
      } else {
        await api.post("/rings", data).then(() =>
          toast.success(`Anel criado com sucesso!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          })
        );
      }
      handleCloseForm();
    } catch (error) {
      toast.error(`Limite de anéis para ${data.forjadoPor} excedido.`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      console.log(error);
    } finally {
      await fetchRingsData();
    }
  };

  const handleUpdateRing = (ring: RingData) => {
    setSelectedRing(ring);
    setIsFormOpen(true);
  };

  const handleCreateRing = () => {
    setSelectedRing(null);
    setIsFormOpen(true);
  };
  const handleDeleteRing = async (id: string) => {
    try {
      await api.delete(`/rings/${id}`).then(() => {
        toast.success(`Anel deletado com sucesso!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      });
    } catch (error) {
      toast.error("Erro ao deletar o anel", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      console.log(error);
    } finally {
      await fetchRingsData();
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedRing(null);
  };

  useEffect(() => {
    fetchRingsData();
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <div className="w-full min-h-screen bg-[#1C1C1C] flex justify-center px-4">
        <main className="mt-8 w-full md:max-w-2xl flex flex-col items-center gap-8">
          <h1 className="text-4xl text-center font-semibold text-[#EEF0F2]">
            Os Anéis do poder
          </h1>
          <h5 className="italic mt-5 font-serif text-[#EEF0F2]">
            One Challenge to rule them all, One Challenge to find them, One
            Challenge to bring them all, and in the darkness bind them.
          </h5>

          {isFormOpen ? (
            <RingForm
              initialData={
                selectedRing
                  ? {
                      nome: selectedRing.nome,
                      poder: selectedRing.poder,
                      portador: selectedRing.portador,
                      forjadoPor: selectedRing.forjadoPor,
                      imagem: selectedRing.imagem,
                      _id: selectedRing._id,
                    }
                  : undefined
              }
              onSubmit={handleCreateOrUpdate}
              onClose={handleCloseForm}
            />
          ) : (
            <>
              <button
                className="bg-[#FAFAFF] cursor-pointer w-2/5 p-2 rounded font-medium"
                type="button"
                onClick={handleCreateRing}
              >
                Criar anel
              </button>
              <ListRings
                ringsData={ringsData}
                onUpdateRing={handleUpdateRing}
                onDeleteRing={handleDeleteRing}
              />
            </>
          )}
        </main>
      </div>
    </>
  );
}

export default App;
