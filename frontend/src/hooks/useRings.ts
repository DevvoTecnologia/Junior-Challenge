import { useEffect, useState } from "react";
import { Ring } from "../App";

export const useRings = () => {
  const [data, setData] = useState<Ring[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/rings");
      if (!response.ok) throw new Error("Failed to fetch data");

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
      if (!response.ok) throw new Error(result.message);

      setData((prevData) => [...prevData, result]);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
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
      if (!response.ok) throw new Error("Failed to update data");

      setData((prevData) =>
        prevData.map((r) => (r._id === updatedRing._id ? updatedRing : r))
      );
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
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
      if (!response.ok) throw new Error("Failed to delete data");

      setData((prevData) =>
        prevData.filter((ring) => ring._id !== deletedRing._id)
      );
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    createRing,
    updateRing,
    deleteRing,
  };
};
