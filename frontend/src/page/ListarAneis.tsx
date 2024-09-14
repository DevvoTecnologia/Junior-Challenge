// src/components/ListaAneis.tsx
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { FiTrash } from "react-icons/fi";
import { api } from "../services/api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface AneisProps {
  id: string;
  nome: string;
  poder: string;
  portador: string;
  forjadoPor: string;
  imagem: string;
}

const ListaAneis = () => {
  const [aneis, setAneis] = useState<AneisProps[]>([]);

  useEffect(() => {
    carregarAneis();
  }, []);

  async function carregarAneis() {
    const response = await api.get("/listaAneis");
    setAneis(response.data);
  }

  async function handleDelete(id: string) {
    try {
      await api.delete("/aneis", { params: { id } });
      setAneis((todosAneis) => todosAneis.filter((anel) => anel.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    appendDots: (dots: React.ReactNode) => (
      <div
        style={{
          backgroundColor: "#ddd",
          borderRadius: "10px",
          padding: "5px",
        }}
      >
        {dots}
      </div>
    ),
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center items-center px-4 py-8">
      <main className="w-full md:max-w-3xl bg-gray-800 rounded-xl shadow-xl p-6">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Aqui Estão Os Anéis do Poder!
        </h1>
        <Slider {...settings} className="relative">
          {aneis.map((anel) => (
            <div
              key={anel.id}
              className="w-full p-4 bg-gray-100 rounded-lg shadow-md relative transition-transform duration-300 ease-in-out transform hover:scale-105"
              style={{ borderRadius: "12px" }}
            >
              <div className="flex flex-col items-center">
                <img
                  src={anel.imagem}
                  alt={anel.nome}
                  className="w-2/3 h-auto rounded-lg mb-4 shadow-sm"
                  style={{ borderRadius: "10px" }}
                />
                <div className="text-center">
                  <p className="text-xl font-semibold mb-1 text-gray-800">
                    <span className="font-medium text-gray-600">Nome:</span>{" "}
                    {anel.nome}
                  </p>
                  <p className="text-lg mb-1 text-gray-700">
                    <span className="font-medium text-gray-500">Poder:</span>{" "}
                    {anel.poder}
                  </p>
                  <p className="text-lg mb-1 text-gray-700">
                    <span className="font-medium text-gray-500">
                      Forjado Por:
                    </span>{" "}
                    {anel.forjadoPor}
                  </p>
                  <p className="text-lg mb-1 text-gray-700">
                    <span className="font-medium text-gray-500">Portador:</span>{" "}
                    {anel.portador}
                  </p>
                </div>
                <button
                  className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full shadow-md hover:bg-red-700 transition duration-300"
                  onClick={() => handleDelete(anel.id)}
                >
                  <FiTrash size={18} />
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </main>
    </div>
  );
};

export default ListaAneis;

// import { useEffect, useState } from "react";
// import { api } from "../services/api";
// import { FiTrash } from "react-icons/fi";

// interface AneisProps {
//   id: string;
//   nome: string;
//   poder: string;
//   portador: string;
//   forjadoPor: string;
//   imagem: string;
// }

// const ListarAneis = () => {
//   const [aneis, setAneis] = useState<AneisProps[]>([]);

//   useEffect(() => {
//     async function carregarAneis() {
//       try {
//         const response = await api.get("/listaAneis");
//         console.log("Dados carregados:", response.data);
//         setAneis(response.data);
//       } catch (error) {
//         console.error("Erro ao carregar anéis:", error);
//       }
//     }

//     carregarAneis();
//   }, []);

//   async function handleDelete(id: string) {
//     try {
//       await api.delete("/aneis", {
//         params: { id },
//       });

//       setAneis((prevAneis) => prevAneis.filter((anel) => anel.id !== id));
//     } catch (error) {
//       console.error("Erro ao deletar anel:", error);
//     }
//   }

//   return (
//     <div className="w-full min-h-screen bg-gray-800 flex justify-center px-4">
//       <main className="my-10 w-full md:max-w-2xl">
//         <h1 className="text-4xl font-medium text-white">Aneis do Poder</h1>
//         <section className="flex flex-col gap-4">
//           {aneis.map((anel) => (
//             <article
//               className="w-full bg-white rounded p-2 relative hover:scale-105 duration-200"
//               key={anel.id}
//             >
//               <p>
//                 <span className="font-medium"> Nome: </span> {anel.nome}
//               </p>
//               <p>
//                 <span className="font-medium"> Poder: </span> {anel.poder}
//               </p>
//               <p>
//                 <span className="font-medium"> Forjado Por: </span>
//                 {anel.forjadoPor}
//               </p>
//               <p>
//                 <span className="font-medium"> Portador: </span> {anel.portador}
//               </p>
//               <p>
//                 <span className="font-medium">
//                   <img src={anel.imagem} />
//                 </span>
//               </p>
//               <button
//                 className="bg-red-600 w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 -top-2"
//                 onClick={() => handleDelete(anel.id)}
//               >
//                 <FiTrash size={18} color="#FFF" />
//               </button>
//             </article>
//           ))}
//         </section>
//       </main>
//     </div>
//   );
// };

// export default ListarAneis;
