import { motion } from "framer-motion";
import { Button, Card, Form, Modal } from "./components";
import { useModal, useRings } from "./hooks";

export type Ring = {
  _id: string;
  name: string;
  power: string;
  holder: string;
  forgedBy: string;
  image: string;
};

function App() {
  const { data, loading, createRing, updateRing, deleteRing } = useRings();
  const {
    showModal,
    initialValues,
    currentValue,
    setCurrentValue,
    openModalForCreate,
    openModalForEdit,
    closeModal,
  } = useModal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (initialValues) {
      await updateRing(currentValue!);
    } else {
      await createRing(currentValue!);
    }

    closeModal();
  };

  if (loading) {
    return (
      <div className="text-3xl absolute inset-0 flex items-center justify-center">
        Loading
        <span className="ml-2 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></span>
      </div>
    );
  }

  return (
    <>
      <Modal
        title={initialValues ? "Editar Anel" : "Criar Anel"}
        showModal={showModal}
        setShowModal={closeModal}
      >
        <Form
          initialValues={initialValues}
          handleSubmit={handleSubmit}
          onDataChange={setCurrentValue}
          loading={loading}
        />
      </Modal>
      <div className="flex items-center justify-start md:justify-center relative max-w-7xl mx-auto">
        <h1 className="text-xl sm:text-4xl md:text-5xl px-4 py-8">
          Os Anéis do Poder
        </h1>
        <Button
          className="absolute right-4 max-md:text-xs"
          onClick={openModalForCreate}
        >
          Adicionar Anel
        </Button>
      </div>

      {data.length > 0 ? (
        <div className="w-full min-h-[75vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 px-4 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
            {data.map((ring) => (
              <motion.div
                key={ring._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card
                  {...ring}
                  onEdit={() => openModalForEdit(ring)}
                  onDelete={() => deleteRing(ring._id)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-3xl h-[75vh] flex items-center justify-center">
          Nenhum anel encontrado
        </div>
      )}
    </>
  );
}

export default App;
