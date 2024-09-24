"use client";
import React, { useEffect, useState } from "react";
import TextInput from "@/app/components/TextInput";
import Button from "@/app/components/Button";
import Api from "@/services/api";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ForgedBy } from "@/utils/forgedByEnum";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IRingModal {
  mode: "create" | "edit";
  initiaData?: {
    id: string;
    nome: string;
    poder: string;
    portador: string;
    forjadoPor: string;
    imagem: string;
  };
  modalOpen: boolean;
  setModalOpen: any;
  setRings?: any;
}

export default function RingModal({
  mode,
  initiaData,
  modalOpen,
  setModalOpen,
  setRings,
}: IRingModal) {
  const router = useRouter();
  const session = useSession();
  const user: any = session.data;

  const [name, setName] = useState(initiaData?.nome || "");
  const [power, setPower] = useState(initiaData?.poder || "");
  const [carrier, setCarrier] = useState(initiaData?.portador || "");
  const [forgedBy, setForgedBy] = useState(
    initiaData?.forjadoPor || ForgedBy[0]
  );
  const [image, setImage] = useState(initiaData?.imagem || "");
  const [history, setHistory] = useState<any[]>([]);

  const ringHistory = async (id: string) => {
    if (!user) return;
    const api = new Api(user.token);
    try {
      const response = await api.getRing();
      if (response.data.error) {
        console.error("Erro ao recuperar os anéis:", response.data.error);
        return;
      }
      const rings = response.data.data;
      const selectedRingWithHistory = rings.find(
        (ring: any) => ring.id === initiaData?.id
      );
      if (selectedRingWithHistory) {
        setHistory(selectedRingWithHistory.HistoricoPortador || []);
      }
    } catch (error) {
      console.error("Erro ao buscar anéis:", error);
    }
  };

  const handleCreateRing = async () => {
    if (!name || !power || !carrier || !forgedBy || !image) {
      console.error("Todos os campos são obrigatórios");
      toast("Todos os campos são obrigatórios", { type: "warning" });
      return;
    }
    try {
      const api = new Api(user.token);
      if (mode === "create") {
        await api
          .createRing({
            nome: name,
            poder: power,
            portador: carrier,
            forjadoPor: forgedBy,
            imagem: image,
          })
          .then((response) => {
            setRings((prevState: any) =>
              prevState
                ? [...prevState, response.data.data]
                : [response.data.data]
            );
            toast(response.data.message, { type: "success" });
          });
      } else if (initiaData) {
        await api
          .updateRing({
            id: initiaData?.id,
            nome: name,
            poder: power,
            portador: carrier,
            forjadoPor: forgedBy,
            imagem: image,
          })
          .then((response) => {
            setRings((prevState: any) =>
              prevState
                ? [...prevState, response.data.data]
                : [response.data.data]
            );
            toast(response.data.message, { type: "success" });
          });
      }
    } catch (error: any) {
      console.log(error.response.data.message);
      toast(error.response.data.message, { type: "error" });
    }
    router.refresh();
    setModalOpen(false);
  };

  useEffect(() => {
    if (initiaData) {
      setName(initiaData.nome || "");
      setPower(initiaData.poder || "");
      setCarrier(initiaData.portador || "");
      setForgedBy(initiaData.forjadoPor || "");
      setImage(initiaData.imagem || "");
    }
  }, [initiaData]);

  useEffect(() => {
    if (modalOpen && initiaData?.id) {
      ringHistory(initiaData.id).then();
    }
  }, [modalOpen, initiaData?.id]);

  useEffect(() => {
    if (mode === "create") {
      setName("");
      setPower("");
      setCarrier("");
      setForgedBy(ForgedBy[0]);
      setImage("");
    }
  }, [modalOpen]);

  return (
    <div
      className={
        "w-screen h-screen absolute top-0 left-0 z-10 flex backdrop-blur-sm bg-black bg-opacity-50 justify-center items-center"
      }
      style={{ display: modalOpen ? "flex" : "none" }}
    >
      <div
        className={
          "bg-[#2C4375] text-white shadow-lg relative rounded-lg max-w-[450px] w-full p-10 flex justify-center items-center gap-3 flex-col"
        }
      >
        <button
          onClick={() => setModalOpen(false)}
          className={"absolute top-5 right-8 text-3xl text-white"}
        >
          {"×"}
        </button>
        <h2 className={"text-3xl font-semibold"}>
          {mode == "create" ? "Novo Anel" : "Editar Anel"}
        </h2>
        <div className={"w-full"}>
          <TextInput
            state={{ current: name, setValue: setName }}
            type={"text"}
            label={`Nome: `}
            placeholder="Digite o nome do anel"
          />
          <TextInput
            state={{ current: power, setValue: setPower }}
            type={"text"}
            label={"Poder: "}
            placeholder="Digite o poder do anel"
          />
          <TextInput
            state={{ current: carrier, setValue: setCarrier }}
            type={"text"}
            label={"Portador: "}
            placeholder="Digite o portador do anel"
          />
          <label className="block text-white text-sm">
            Forjado Por: <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full flex flex-col text-black text-sm gap-2 my-2 border-2 p-2 rounded-lg"
            onChange={(value) => {
              setForgedBy(value.currentTarget.value);
            }}
            value={forgedBy}
            name="forgedBy"
          >
            {ForgedBy.map((forged, index) => (
              <option key={index} value={forged}>
                {forged}
              </option>
            ))}
          </select>
          <TextInput
            state={{ current: image, setValue: setImage }}
            type={"text"}
            label={"Imagem:"}
            placeholder="Digite a url da imagem"
          />
        </div>
        <div className="w-full mt-4">
          <p className="text-lg text-gray-200 font-medium">
            Histórico de Portadores:
          </p>
          {Array.isArray(history) && history.length > 0 ? (
            <ul className="list-disc ml-4">
              {history.map((historyItem) => (
                <li key={historyItem.id}>
                  Portador: {historyItem.portador}, Data:{" "}
                  {new Date(historyItem.data).toLocaleDateString()}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm">Sem histórico de portadores.</p>
          )}
        </div>
        <div className={"w-full flex flex-row justify-between gap-2 mt-4"}>
          <Button
            color={"#ef4444"}
            label={"Cancelar"}
            textColor={"white"}
            onClick={() => setModalOpen(false)}
          />
          <Button
            color={"#2C7C2E"}
            label={"Salvar"}
            textColor={"white"}
            onClick={handleCreateRing}
          />
        </div>
      </div>
    </div>
  );
}
