import { useState } from "react";
import { CriarEdicao } from "./components/CriarEdicao";
import CriarForm from "./components/CriarForm";

function App() {
  const [formType, setFormType] = useState<"create" | "edit" | null>(null);

  return (
    <div className="w-full min-h-screen bg-gray-800 flex justify-center px-4">
      <main className="my-10 w-full md: max-w-2xl">
        <h1 className="text-4xl font-medium text-white text-center pb-5">
          Aneis do Poder
        </h1>
        <div
          className="inputs"
          style={{ display: "flex", flexDirection: "row", gap: "10px" }}
        >
          <input
            type="submit"
            value={"Criar!"}
            className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium"
            onClick={() => setFormType("create")}
          />
          <input
            type="submit"
            value={"Editar!"}
            className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium"
            onClick={() => setFormType("edit")}
          />
        </div>

        <div>
          {formType === "create" && <CriarForm />}
          {formType === "edit" && <CriarEdicao />}
        </div>
      </main>
    </div>

    // <div className="w-full min-h-screen bg-gray-800 flex justify-center px-4">
    //   <CriarForm />

    // </div>
  );
}

export default App;
