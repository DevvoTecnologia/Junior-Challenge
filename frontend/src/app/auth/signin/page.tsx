"use client";
import { SetStateAction, useState} from "react";
import TextInput from "@/app/components/TextInput";
import Image from "next/image";
import logo from "@/../public/logo.svg";
import Button from "@/app/components/Button";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";
import {SIGNIN_MESSAGES} from "@/utils/signin.msg";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "@/app/components/Loading";

export default function SignIn() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);

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
        return newErrors;
    };

    const handleSignIn = async () => {
        if (validateInputs().length) {
            validateInputs().forEach(
                message => {
                    toast(message, { type: "warning" });
                }
            )
            return;
        }
        setLoading(true);
        const result = await signIn("credentials", {
            email: email,
            senha: senha,
            redirect: false,
        });
        if (result?.error) {
            console.log(result)
            toast(result.error, { type: "error" })
            return;
        }
        router.push("/dashboard");
    };

    return (
        <div className="relative w-full h-full min-h-screen flex items-center justify-center">
            <div
                className="relative bg-[#14263A] flex p-10 shadow rounded-lg max-w-[450px] w-full justify-center items-center gap-4 flex-col z-10"
            >
                <Image src={logo} alt="logo" width={320} className={"mb-4"}/>
                <div className="w-full">
                    <TextInput
                        state={{current: email, setValue: setEmail}}
                        placeholder={"Digite seu e-mail"}
                        type="email"
                        label="E-mail:"
                        regex={/\S+@\S+\.\S+/}
                        onChange={(e: { target: { value: SetStateAction<string>; }; }) => setEmail(e.target.value)}
                    />
                    <TextInput
                        state={{current: senha, setValue: setSenha}}
                        placeholder={"Digite sua senha"}
                        type="password"
                        label="Senha:"
                        onChange={(e: { target: { value: SetStateAction<string>; }; }) => setSenha(e.target.value)}
                    />
                </div>
                <div className="w-full flex flex-col">
                    <p className="self-end text-white text-sm">
                        Não possui uma conta?
                        <Link href="/auth/signup" className="text-[#4A9EFF]"> Cadastre-se</Link>
                    </p>
                </div>
                <div className="flex flex-col w-full items-end mt-4">
                    <Button
                        color="green"
                        label={
                        loading ?
                            <div className={"w-full flex justify-center"}>
                                <Loading size={20}/>
                            </div> :
                            "Entrar"
                    }
                        onClick={handleSignIn}
                        disabled={loading}
                    />
                </div>
            </div>
        </div>
    );
}
