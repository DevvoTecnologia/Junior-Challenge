"use client";

import { useState } from "react";
import TextInput from "@/app/components/TextInput";
import Image from "next/image";
import logo from "@/../public/logo.svg";
import Button from "@/app/components/Button";
import Link from "next/link";
import Api from "@/services/api";
import { useRouter } from "next/navigation";
import background from "@/../public/background.png";
import ModalMensagens from "@/app/components/ModalMensagens";
import { MESSAGES } from "@/utils/signup.msg";

export default function SignUp() {
    const api = new Api();
    const router = useRouter();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmSenha, setConfirmSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [mensagens, setMensagens] = useState<string[]>([]);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const senhaRegex = /^.{6,10}$/;

    const handleSignUp = async () => {
        let newMensagens: string[] = [];

        if (!nome || !email || !senha || !confirmSenha) {
            newMensagens.push(MESSAGES.camposObrigatorios);
        }
        if (!emailRegex.test(email)) {
            newMensagens.push(MESSAGES.emailInvalido);
        }
        if (!senhaRegex.test(senha)) {
            newMensagens.push(MESSAGES.senhaInvalida);
        }
        if (senha !== confirmSenha) {
            newMensagens.push(MESSAGES.senhasNaoCoincidem);
        }

        if (newMensagens.length > 0) {
            setMensagens(newMensagens);
            setModalOpen(true);
            return;
        }

        setLoading(true);
        const res = await api.createUser({
            nome,
            email,
            senha,
        });
        setLoading(false);

        if (!res) {
            setMensagens([MESSAGES.erroCriarUsuario]);
            setModalOpen(true);
            return;
        }

        router.push("/auth/signin");
    };

    return (
        <div className="relative w-full h-full min-h-screen flex items-center justify-center">
            <div
                className="absolute inset-0"
                style={{ backgroundImage: `url(${background.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            ></div>
            <div
                className="relative bg-[#14263A] flex p-10 shadow border rounded-lg max-w-[450px] w-full justify-center items-center gap-3 flex-col z-10"
            >
                <Image src={logo} alt="logo" width={500} />
                <div className="w-full">
                    <TextInput
                        state={{ current: nome, setValue: setNome }}
                        type="text"
                        label="Seu nome completo:"
                    />
                    <TextInput
                        state={{ current: email, setValue: setEmail }}
                        type="email"
                        label="E-mail:"
                        regex={emailRegex}
                    />
                    <TextInput
                        state={{ current: senha, setValue: setSenha }}
                        type="password"
                        label="Senha:"
                        regex={senhaRegex}
                    />
                    <TextInput
                        state={{ current: confirmSenha, setValue: setConfirmSenha }}
                        type="password"
                        label="Confirme sua senha:"
                        regex={senhaRegex}
                    />
                </div>
                <div className="w-full flex flex-col">
                    <p className="self-end text-amber-500 text-sm">
                        Já possui uma conta?
                        <Link href="/auth/signin" className="text-red-500"> Fazer o login</Link>
                    </p>
                </div>
                <div className="flex flex-col w-full items-center mt-4">
                    <Button
                        onClick={handleSignUp}
                        color="green"
                        label={loading ? "Criando..." : "Criar Conta"}
                        disabled={loading}
                    />
                    {loading && <p className="mt-2 text-cyan-900 text-sm">Aguarde, estamos criando sua conta...</p>}
                </div>
            </div>

            <ModalMensagens
                mensagens={mensagens}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
            />
        </div>
    );
}
