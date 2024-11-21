import React, { useState } from "react";
import axios from "axios";

const RingForm = ({ ring, onSubmit }: any) => {
  const [formData, setFormData] = useState({
    nome: ring?.nome || "",
    poder: ring?.poder || "",
    portador: ring?.portador || "",
    forjadoPor: ring?.forjadoPor || "Elfos",
    imagem: ring?.imagem || "https://image.shutterstock.com/image-vector/ring-icon-vector-260nw-1937701919.jpg",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (ring) {
      await axios.put(`http://localhost:5000/api/rings/${ring._id}`, formData);
    } else {
      await axios.post("http://localhost:5000/api/rings", formData);
    }
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campos para nome, poder, portador, forjadoPor, imagem */}
      <button type="submit">{ring ? "Atualizar" : "Criar"}</button>
    </form>
  );
};

export default RingForm;
