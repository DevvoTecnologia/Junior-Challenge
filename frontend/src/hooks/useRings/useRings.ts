import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Ring } from "../../App";

export const useRings = () => {
  const [data, setData] = useState<Ring[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/rings");

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message);
        return;
      }

      setData(result);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const createRing = async (ring: Ring) => {
    try {
      const response = await fetch("http://localhost:5000/api/rings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ring),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message);
        return;
      }

      setData((prevData) => [...prevData, result]);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const updateRing = async (ring: Ring) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/rings/${ring._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ring),
        }
      );

      const updatedRing = await response.json();

      if (!response.ok) {
        toast.error(updatedRing.message);
        return;
      }

      setData((prevData) =>
        prevData.map((r) => (r._id === updatedRing._id ? updatedRing : r))
      );
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const deleteRing = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/rings/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const deletedRing = await response.json();

      if (!response.ok) {
        toast.error(deletedRing.message);
        return;
      }

      setData((prevData) =>
        prevData.filter((ring) => ring._id !== deletedRing._id)
      );
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    createRing,
    updateRing,
    deleteRing,
  };
};
