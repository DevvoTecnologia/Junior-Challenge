"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/app/components/Button";
import logo from "../../../public/logo.svg";
import Api from "@/services/api";
import { useSession, signOut } from "next-auth/react";
import RingModal from "../components/RingModal";
import SliderRing from "@/app/components/SliderRing";
import { useRouter } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa";

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
    <div className={"flex flex-col items-center justify-center w-full h-screen text-white font-poppins"}>
      <Image className={"my-10"} src={logo} alt="logo" width={300} />

      <div
        className={
          "w-[90%] flex flex-col items-center justify-center bg-[#2C4375] py-8 sm:px-0 md:px-4 gap-10 rounded-lg"
        }
      >
        <div
          className={
            "w-[95%] flex sm:flex-col-reverse md:flex-row gap-4 items-center justify-between p-6 bg-[#081728] rounded-lg shadow-md"
          }
        >
          <div className={"flex items-center sm:w-full md:w-auto"}>
            <Button
              style={"w-full text-md font-light"}
              color={"#2C7C2E"}
              label={"+ Forjar Anel"}
              onClick={() => setModalOpen(true)}
            />
          </div>
          <div className={"flex items-center"}>
            <p className={"text-white mr-4"}>
              Bem vindo, <span className={"font-bold"}>{user?.email}</span>
            </p>
            <button
              className={"bg-red-500 text-white p-3 rounded-lg aspect-square"}
              onClick={handleLogout}
            >
              <FaSignOutAlt color="white" />
            </button>
          </div>
        </div>
        
        <SliderRing rings={rings} setRings={setRings} />
      </div>

      <RingModal
        setRings={setRings}
        mode="create"
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </div>
  );
}
