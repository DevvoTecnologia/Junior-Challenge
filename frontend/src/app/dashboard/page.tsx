"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/app/components/Button";
import logo from "../../../public/logo.svg";
import Api from "@/services/api";
import { useSession, signOut } from "next-auth/react";
import RingModal from "../components/RingModal";
import SliderRing from "@/app/components/SliderRing";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const session = useSession();
    const user: any = session.data;
    const [modalOpen, setModalOpen] = useState(false);
    const [rings, setRings] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (!user) return;
        const api = new Api(user.token);
        api.getRing().then((response) => {
            if (response.data.error) {
                return;
            }
            setRings(response.data.data);
        });
    }, [user]);

    const handleLogout = async () => {
        await signOut({
            redirect: false,
        });
        router.replace("/auth/signin");
    };

    return (
        <div className={"flex flex-col items-center h-full w-full"}>
            <Image className={"my-10"} src={logo} alt="logo" width={300} />

            <div className={"w-[92%] h-[70%] flex flex-col items-end bg-[#2C4375] rounded-xl mx-3"}>
                <div className={"my-5 flex md:flex-row sm:flex-col-reverse gap-4 justify-between w-[90%] px-8 bg-[#081728] rounded-lg shadow-md py-2 m-12"}>
                    <div className={"flex items-center sm:w-full md:w-auto"}>
                        <Button
                            style={"text-[15px] font-light"}
                            color={"#2C7C2E"}
                            label={"+ Forjar Anel"}
                            onClick={() => setModalOpen(true)}
                        />
                    </div>
                    <div className={"flex items-center"}>
                        <p className={"text-white mr-4"}>Bem vindo, <span className={'font-bold'}>{user?.email}</span></p>
                        <button
                            className={"bg-red-500 text-white py-2 px-4 rounded"}
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </div>

                <div className={"w-full flex justify-center flex-row items-center"}>
                <SliderRing rings={rings} setRings={setRings} />
                </div>
            </div>

            <RingModal setRings={setRings} mode="create" modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </div>
    );
}
