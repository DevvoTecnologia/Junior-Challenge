import type { AxiosResponse } from "axios";
import * as motion from "framer-motion/client";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
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
      <h1 className="mb-8 text-5xl font-bold tracking-wide">Ring Details</h1>

      {response?.data && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-8 flex flex-col items-center gap-4 rounded-lg bg-white p-6 text-black shadow-lg"
        >
          <p className="text-lg font-semibold">{response.data.name}</p>
          <Image
            src={response.data.url}
            alt={response.data.name}
            width={120}
            height={120}
            className="rounded-full border shadow-md"
          />
        </motion.div>
      )}

      <motion.form
        method="POST"
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 50 }}
        className="w-full max-w-lg space-y-4 rounded-lg bg-white p-6 text-black shadow-md"
      >
        <div className="flex flex-col space-y-2">
          <motion.label htmlFor="name" className="font-semibold">
            Name
          </motion.label>
          <motion.input
            id="name"
            name="name"
            type="text"
            placeholder={response?.data?.name}
            className="rounded-md border border-gray-300 p-2 text-gray-900"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <motion.label htmlFor="power" className="font-semibold">
            Power
          </motion.label>
          <motion.input
            id="power"
            name="power"
            type="text"
            placeholder={response?.data?.power}
            className="rounded-md border border-gray-300 p-2 text-gray-900"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <motion.label htmlFor="owner" className="font-semibold">
            Owner
          </motion.label>
          <motion.input
            id="owner"
            name="owner"
            type="text"
            placeholder={response?.data?.owner}
            className="rounded-md border border-gray-300 p-2 text-gray-900"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <motion.label htmlFor="forgedBy" className="font-semibold">
            Forged By
          </motion.label>
          <motion.input
            id="forgedBy"
            name="forgedBy"
            type="text"
            placeholder={response?.data?.forgedBy}
            className="rounded-md border border-gray-300 p-2 text-gray-900"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <motion.label htmlFor="image" className="font-semibold">
            Image
          </motion.label>
          <motion.input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            className="cursor-pointer file:rounded-md file:border file:border-gray-300 file:p-2 file:text-sm file:text-gray-600"
          />
        </div>

        <motion.button
          type="submit"
          className="w-full rounded-md bg-blue-500 p-3 text-white hover:bg-blue-600"
          whileHover={{ scale: 1.05 }}
        >
          Save
        </motion.button>
      </motion.form>

      <motion.div className="mt-6 flex space-x-4">
        <motion.button
          className="rounded-md bg-red-500 p-3 text-white hover:bg-red-600"
          whileHover={{ scale: 1.05 }}
        >
          Delete
        </motion.button>

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
