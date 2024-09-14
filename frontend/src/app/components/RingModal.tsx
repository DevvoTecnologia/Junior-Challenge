"use client";
import React, { useEffect, useState} from "react";
import TextInput from "@/app/components/TextInput";
import Button from "@/app/components/Button";
import Api from "@/services/api";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import {ForgedBy} from "@/utils/forgedByEnum";

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

export default function RingModal({mode, initiaData, modalOpen, setModalOpen, setRings}: IRingModal) {
    const router = useRouter();
    const session = useSession();
    const user: any = session.data;

    const [name, setName] = useState(initiaData?.nome || "");
    const [power, setPower] = useState(initiaData?.poder || "");
    const [carrier, setCarrier] = useState(initiaData?.portador || "");
    const [forgedBy, setForgedBy] = useState(initiaData?.forjadoPor || "");
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
            const selectedRingWithHistory = rings.find((ring: any) => ring.id === initiaData?.id);
            if (selectedRingWithHistory) {
                setHistory(selectedRingWithHistory.HistoricoPortador || []);
            }
        } catch (error) {
            console.error("Erro ao buscar anéis:", error);
        }
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
    }, [modalOpen, initiaData?.id])


    const handleCreateRing = async () => {
        if (!name || !power || !carrier || !forgedBy || !image) {
            console.error("Todos os campos são obrigatórios");
            return;
        }
        try {
            const api = new Api(user.token);
            let ring;
            if (mode === "create") {
                ring = await api.createRing({
                    nome: name,
                    poder: power,
                    portador: carrier,
                    forjadoPor: forgedBy,
                    imagem: image,
                });
            } else if (initiaData) {
                ring = await api.updateRing({
                    id: initiaData?.id,
                    nome: name,
                    poder: power,
                    portador: carrier,
                    forjadoPor: forgedBy,
                    imagem: image,
                });
            }
            if (ring) {
                setRings((prevState: any) => [...prevState, ring]);
            }
        } catch (error) {
            console.error("Erro ao criar o anel:", error);
        }
        router.refresh();
        setModalOpen(false);
    };

    return (
        <div
            className={
            "w-screen h-screen absolute top-0 z-10 flex backdrop-blur-sm bg-black bg-opacity-50 justify-center items-center"}
            style={{display: modalOpen ? "flex" : "none"}}>
            <div
                className={
                    "bg-gradient-to-r from-blue-900 to-indigo-800 text-white shadow-lg border border-blue-300 relative rounded-lg max-w-[450px] w-full p-10 flex justify-center items-center gap-3 flex-col"
                }>
                <button onClick={() => setModalOpen(false)} className={"absolute top-5 right-8 text-3xl text-white"}>
                    {"×"}
                </button>
                <h2 className={"text-3xl font-semibold"}>{mode == "create" ? "Novo Anel" : "Editar Anel"}</h2>
                <div className={"w-full"}>
                    <p className={"text-lg text-gray-200 font-medium"}>Dados do Anel</p>
                    <TextInput
                        state={{current: name, setValue: setName}}
                        type={"text"}
                        label={`Nome: `}
                    />
                    <TextInput
                        state={{current: power, setValue: setPower}}
                        type={"text"}
                        label={"Poder: "}
                    />
                    <TextInput
                        state={{current: carrier, setValue: setCarrier}}
                        type={"text"}
                        label={"Portador: "}
                    />
                    <label className="block text-gray-300">Forjado Por:</label>
                    <select
                        className="mt-2 p-2 bg-blue-800 text-white rounded-lg"
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
                        state={{current: image, setValue: setImage}}
                        type={"text"}
                        label={"Imagem:"}
                    />
                </div>
                <div className="w-full mt-4">
                    <p className="text-lg text-gray-200 font-medium">Histórico de Portadores:</p>
                    {Array.isArray(history) && history.length > 0 ? (
                        <ul className="list-disc ml-4">
                            {history.map((historyItem) => (
                                <li key={historyItem.id}>
                                    Portador: {historyItem.portador}, Data: {new Date(historyItem.data).toLocaleDateString() }
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm">Sem histórico de portadores.</p>
                    )}
                </div>

                <div className={"flex flex-row justify-end gap-4 mt-4"}>
                    <Button
                        color={"#2f3330"}
                        border
                        label={"Cancelar"}
                        textColor={"black"}
                        onClick={() => setModalOpen(false)}
                    />
                    <Button
                        color={"#28fc03"}
                        label={"Salvar"}
                        textColor={"black"}
                        onClick={handleCreateRing}
                    />
                </div>
            </div>
        </div>
    );

}
