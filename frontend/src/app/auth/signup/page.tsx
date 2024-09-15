"use client";

import React, { useState } from "react";
import TextInput from "@/app/components/TextInput";
import Image from "next/image";
import logo from "@/../public/logo.svg";
import Button from "@/app/components/Button";
import Link from "next/link";
import Api from "@/services/api";
import { useRouter } from "next/navigation";
import { MESSAGES } from "@/utils/signup.msg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "@/app/components/Loading";

export default function SignUp() {
    const api = new Api();
    const router = useRouter();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmSenha, setConfirmSenha] = useState("");
    const [loading, setLoading] = useState(false);

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
            toast(`${newMensagens}`, { type: "warning" });
            return;
        }
        setLoading(true);
        const res = await api.createUser({
            nome,
            email,
            senha,
        });
        setLoading(false);

        if (!res.data) {
            toast(MESSAGES.erroCriarUsuario, { type: "error" });
            return;
        }

        toast(res.data.message, { type: "success" });
        router.push("/auth/signin");
    };

    return (
        <div className="relative w-full h-full min-h-screen flex items-center justify-center">
            <div
                className="relative bg-[#14263A] flex p-10 shadow rounded-lg max-w-[450px] w-full justify-center items-center gap-4 flex-col z-10"
            >
                <Image src={logo} alt="logo" width={320} className={"mb-4"}/>
                <div className="w-full">
                    <TextInput
                        state={{ current: nome, setValue: setNome }}
                        type="text"
                        placeholder={"Digite seu nome"}
                        label="Seu nome completo:"
                    />
                    <TextInput
                        state={{ current: email, setValue: setEmail }}
                        placeholder={"Digite seu e-mail"}
                        type="email"
                        label="E-mail:"
                        regex={emailRegex}
                    />
                    <TextInput
                        state={{ current: senha, setValue: setSenha }}
                        placeholder={"Digite sua senha"}
                        type="password"
                        label="Senha:"
                        regex={senhaRegex}
                    />
                    <TextInput
                        state={{ current: confirmSenha, setValue: setConfirmSenha }}
                        placeholder={"Digite sua senha novamente"}
                        type="password"
                        label="Confirme sua senha:"
                        regex={senhaRegex}
                    />
                </div>
                <div className="w-full flex flex-col">
                    <p className="self-end text-white text-sm">
                        Já possui uma conta?
                        <Link href="/auth/signin" className="text-[#4A9EFF]"> Fazer o login</Link>
                    </p>
                </div>
                <div className="flex flex-col w-full items-end mt-4">
                    <Button
                        onClick={handleSignUp}
                        color="green"
                        label={
                            loading ?
                                <div className={"w-full flex justify-center"}>
                                    <Loading size={20}/>
                                </div> : "Criar Conta"}
                        disabled={loading}
                    />
                </div>
            </div>
        </div>
    );
}
