"use client";

import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import type { TransitionStartFunction } from "react";
import { useCallback, useEffect } from "react";
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
  const searchParams = useSearchParams();
  const payload = searchParams.get("payload");

  const handleLoginGithub = useCallback(
    async (payload: string) => {
      try {
        const response = await handleLoginOAuthServer(payload);

        if (response) {
          toast.success("Logged in successfully");

          router.replace("/users");
          router.refresh();
        }
      } catch {
        // eslint-disable-next-line no-console
        console.error("Failed to login");
      }
    },
    [router],
  );

  useEffect(() => {
    if (payload) {
      startTransition(async () => {
        await handleLoginGithub(payload);
      });
    }
  }, [handleLoginGithub, payload, startTransition]);

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
