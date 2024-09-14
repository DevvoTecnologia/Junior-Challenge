"use client";
import { SetStateAction, useState} from "react";
import TextInput from "@/app/components/TextInput";
import Image from "next/image";
import logo from "@/../public/logo.svg";
import background from "@/../public/background.png";
import Button from "@/app/components/Button";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";
import {SIGNIN_MESSAGES} from "@/utils/signin.msg";
import ModalMensagens from "@/app/components/ModalMensagens"; // Importe o componente de ModalMensagens

export default function SignIn() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const validateInputs = () => {
        const newErrors: string[] = [];

        if (!email) {
            newErrors.push(SIGNIN_MESSAGES.EMAIL_REQUIRED);
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.push(SIGNIN_MESSAGES.EMAIL_INVALID);
        }

        if (!senha) {
            newErrors.push(SIGNIN_MESSAGES.PASSWORD_REQUIRED);
        } else if (senha.length < 4) {
            newErrors.push(SIGNIN_MESSAGES.PASSWORD_TOO_SHORT);
        } else if (senha.length > 20) {
            newErrors.push(SIGNIN_MESSAGES.PASSWORD_TOO_LONG);
        }

        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const handleSignIn = async () => {
        if (!validateInputs()) {
            setIsModalOpen(true); // Abre o modal se houver erros
            return;
        }

        setLoading(true);

        const result = await signIn("credentials", {
            email: email,
            senha: senha,
            redirect: false,
        });

        setLoading(false);

        if (result?.error) {
            // Verifica a mensagem de erro retornada
            if (result.error.includes("Usuario não encontrado")) {
                setErrors([SIGNIN_MESSAGES.USER_NOT_EXIST]);
            } else {
                setErrors([SIGNIN_MESSAGES.LOGIN_ERROR]);
            }
            setIsModalOpen(true);
            return;
        }
        router.push("/dashboard");
    };

    return (
        <div className="relative w-full h-full min-h-screen flex items-center justify-center">
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `url(${background.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            ></div>
            <div
                className="relative bg-[#14263A] flex p-10 shadow border rounded-lg max-w-[450px] w-full justify-center items-center gap-3 flex-col z-10"
            >
                <Image src={logo} alt="logo" width={400}/>
                <div className="w-full">
                    <TextInput
                        state={{current: email, setValue: setEmail}}
                        type="email"
                        label="E-mail:"
                        regex={/\S+@\S+\.\S+/} // Regex para validação de e-mail
                        onChange={(e: { target: { value: SetStateAction<string>; }; }) => setEmail(e.target.value)}
                    />
                    <TextInput
                        state={{current: senha, setValue: setSenha}}
                        type="password"
                        label="Senha:"
                        onChange={(e: { target: { value: SetStateAction<string>; }; }) => setSenha(e.target.value)}
                    />
                </div>
                <div className="w-full flex flex-col">
                    <p className="self-end text-amber-500 text-sm">
                        Não possui uma conta?
                        <Link href="/auth/signup" className="text-red-500"> Cadastre-se</Link>
                    </p>
                </div>
                <div className="flex flex-col w-full items-center mt-4">
                    <Button
                        color="green"
                        label={loading ? "Entrando..." : "Entrar"}
                        onClick={handleSignIn}
                        disabled={loading}
                    />
                    {loading && <p className="mt-2 text-cyan-900 text-sm">Aguarde, estamos processando seu login...</p>}
                </div>
            </div>

            <ModalMensagens
                mensagens={errors}
                modalOpen={isModalOpen}
                setModalOpen={setIsModalOpen}
            />
        </div>
    );
}
