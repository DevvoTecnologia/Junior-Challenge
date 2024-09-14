import { useEffect, useState } from "react";
import { Button, Card, Form, Modal } from "./components";

export type Ring = {
  _id: string;
  name: string;
  power: string;
  holder: string;
  forgedBy: string;
  image: string;
};

function App() {
  const [data, setData] = useState<Ring[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [initialValues, setInitialValues] = useState<Ring | null>(null);
  const [currentValue, setCurrentValue] = useState<Ring | null>(null);

  const handleOnEdit = (ring: Ring) => {
    setShowModal(true);
    setInitialValues(ring);
  };

  const handleOnDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/rings/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to Delete data");
      }

      const DeletedRing = await response.json();

      setData((prevData) =>
        prevData.filter((ring) => ring._id !== DeletedRing._id)
      );
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  const handleOnCreate = () => {
    setInitialValues(null);
    setShowModal(true);
  };

  const handleEditSubmit = async () => {
    if (!currentValue) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/rings/${currentValue?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentValue),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update data");
      }

      const updatedRing = await response.json();

      setData((prevData) =>
        prevData.map((ring) =>
          ring._id === updatedRing._id ? updatedRing : ring
        )
      );
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  const handleCreateSubmit = async () => {
    if (!currentValue) return;

    try {
      const response = await fetch("http://localhost:5000/api/rings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentValue),
      });

      const result = await response.json();

      if (!response.ok) {
        return setError(result.message);
      }

      setData((prevData) => [...prevData, result]);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (initialValues) {
      handleEditSubmit();
    }

    if (!initialValues) {
      handleCreateSubmit();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/rings");

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();

        setData(result);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-3xl absolute inset-0 flex items-center justify-center">
        Loading
        <span className="ml-2 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-3xl absolute inset-0 flex items-center justify-center">
        Error: {error}
      </div>
    );
  }

  return (
    <>
      <Modal
        title={initialValues ? "Editar Anel" : "Criar Anel"}
        showModal={showModal}
        setShowModal={setShowModal}
      >
        <Form
          initialValues={initialValues}
          handleSubmit={handleSubmit}
          onDataChange={setCurrentValue}
        />
      </Modal>
      <h1 className="text-5xl text-center px-4 py-8">Os Anéis de Poder</h1>

      {data.length > 0 ? (
        <div className="w-full min-h-[75vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 px-4 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
            {data.map((ring) => (
              <Card
                key={ring._id}
                {...ring}
                onEdit={() => handleOnEdit(ring)}
                onDelete={() => handleOnDelete(ring._id)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-3xl h-[75vh] flex items-center justify-center">
          Nenhum anel encontrado
        </div>
      )}

      <Button className="mx-auto my-8" onClick={handleOnCreate}>
        Adicionar Anel
      </Button>
    </>
  );
}

export default App;
