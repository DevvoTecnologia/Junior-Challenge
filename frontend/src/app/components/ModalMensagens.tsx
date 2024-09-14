'use-client'
import React from "react";

export default function ModalMensagens({ mensagens, modalOpen, setModalOpen }: any) {
    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center ${
                modalOpen ? "visible" : "invisible"
            }`}
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-xl font-semibold mb-4">Mensagem</h2>
                <div className="overflow-y-auto max-h-60">
                    {mensagens.length === 0 ? (
                        <p>Nenhuma mensagem recebida ainda.</p>
                    ) : (
                        mensagens.map((mensagem: string, index: number) => (
                            <div key={index} className="mb-2 p-2 bg-gray-100 rounded">
                                {mensagem}
                            </div>
                        ))
                    )}
                </div>
                <button
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                    onClick={closeModal}
                >
                    Fechar
                </button>
            </div>
        </div>
    );
}
