"use client";

import { hasCookie } from "cookies-next";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import type { TransitionStartFunction } from "react";
import { useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { toast } from "react-toastify";

import { handleLoginOAuthServer } from "@/actions";

interface BtnLoginGithubProps {
  startTransition: TransitionStartFunction;
  isPending: boolean;
}

const serverUrl = process.env.NEXT_PUBLIC_API_BASE_HOST;

export default function BtnLoginGithub({
  startTransition,
  isPending,
}: Readonly<BtnLoginGithubProps>) {
  const router = useRouter();

  useEffect(() => {
    if (hasCookie("fromServer")) {
      startTransition(async () => {
        await handleLoginOAuthServer();

        toast.success("Logged in successfully");

        router.replace("/users");
        router.refresh();
      });
    }
  }, [router, startTransition]);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={isPending}
      type="button"
      className="flex w-full items-center justify-center gap-2 rounded-md border border-transparent bg-gray-800 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
      onClick={() => {
        router.push(`${serverUrl}/auth/github`);
      }}
    >
      <FaGithub />
      Sign in with GitHub
    </motion.button>
  );
}
