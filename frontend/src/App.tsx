import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CriarEdicao from "./components/CriarEdicao";
import CriarForm from "./components/CriarForm";
import ListarAneis from "./page/ListarAneis";

function App() {
  return (
    <Router>
      <div className="w-full min-h-screen bg-gray-800 flex flex-col items-center px-4">
        <main className="my-10 w-full md:max-w-2xl">
          <h1 className="text-4xl font-medium text-white text-center pb-5">
            Anéis do Poder
          </h1>
          <div
            className="inputs"
            style={{ display: "flex", flexDirection: "row", gap: "10px" }}
          >
            <Link
              to="/criar"
              className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium"
            >
              Criar!
            </Link>
            <Link
              to="/editar"
              className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium"
            >
              Editar!
            </Link>
            <Link
              to="/listar"
              className="cursor-pointer w-full p-2 bg-blue-500 rounded font-medium"
            >
              Listar Anéis
            </Link>
          </div>

          <Routes>
            <Route path="/criar" element={<CriarForm />} />
            <Route path="/editar" element={<CriarEdicao />} />
            <Route path="/listar" element={<ListarAneis />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

// import { useState } from "react";
// import { CriarEdicao } from "./components/CriarEdicao";
// import CriarForm from "./components/CriarForm";

// function App() {
//   const [formType, setFormType] = useState<"create" | "edit" | null>(null);

//   return (
//     <div className="w-full min-h-screen bg-gray-800 flex justify-center px-4">
//       <main className="my-10 w-full md: max-w-2xl">
//         <h1 className="text-4xl font-medium text-white text-center pb-5">
//           Aneis do Poder
//         </h1>
//         <div
//           className="inputs"
//           style={{ display: "flex", flexDirection: "row", gap: "10px" }}
//         >
//           <input
//             type="submit"
//             value={"Criar!"}
//             className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium"
//             onClick={() => setFormType("create")}
//           />
//           <input
//             type="submit"
//             value={"Editar!"}
//             className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium"
//             onClick={() => setFormType("edit")}
//           />
//         </div>

//         <div>
//           {formType === "create" && <CriarForm />}
//           {formType === "edit" && <CriarEdicao />}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default App;
