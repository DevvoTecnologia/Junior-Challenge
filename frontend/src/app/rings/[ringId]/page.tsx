import type { AxiosResponse } from "axios";
import * as motion from "framer-motion/client";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { RingsDeleteBtnText } from "@/components/form/RingsDelete";
import RingsUpdateForm from "@/components/form/RingsUpdate";
import fetchServer from "@/lib/fetchServer";
import type { Ring } from "@/types/Ring";

interface RingIdPageProps {
  params: {
    ringId: string;
  };
}

export default async function RingIdPage({
  params: { ringId },
}: RingIdPageProps) {
  let response: AxiosResponse<Ring> | null;

  const session = await auth();
  const token = session?.user.accessToken;

  try {
    response = await fetchServer.get(`/ring/${ringId}`, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
  } catch {
    response = null;
    redirect("/rings");
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white"
    >
      <h1 className="mb-8 text-center text-5xl font-bold tracking-wide">
        Ring Details
      </h1>

      {response?.data && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-8 flex flex-col items-center gap-4 rounded-lg border bg-white p-6 text-black shadow-lg"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-blue-500 shadow-xl"
          >
            <Image
              src={response.data.url}
              alt={response.data.name}
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </motion.div>
          <p className="mt-4 text-center text-xl font-semibold">
            {response.data.name}
          </p>
        </motion.div>
      )}

      <RingsUpdateForm
        token={token}
        ringId={ringId}
        responseName={response.data?.name}
        responsePower={response.data?.power}
        responseOwner={response.data?.owner}
        responseForgedBy={response.data?.forgedBy}
      />

      <motion.div className="mt-6 flex space-x-4">
        <RingsDeleteBtnText
          ringId={ringId}
          ringName={response.data?.name}
          token={token}
        />

        <Link href="/rings">
          <motion.button
            className="rounded-md bg-gray-500 p-3 text-white hover:bg-gray-600"
            whileHover={{ scale: 1.05 }}
          >
            Back
          </motion.button>
        </Link>
      </motion.div>

      <motion.div className="mt-8 flex flex-col items-center">
        <h3 className="mb-4 text-lg">Want to create a new ring?</h3>
        <Link href="/rings/new">
          <motion.button
            className="rounded-md bg-green-500 p-3 text-white hover:bg-green-600"
            whileHover={{ scale: 1.05 }}
          >
            Create
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  );
}
