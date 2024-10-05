import { type AxiosResponse } from "axios";
import * as motion from "framer-motion/client";
import Image from "next/image";
import Link from "next/link";
import { FaEdit, FaUserCircle } from "react-icons/fa";

import RingsDeleteBtnIconRed from "@/components/form/RingsDelete/RingsDeleteBtnIconRed";
import fetchServer from "@/lib/fetchServer";
import getSessionServer from "@/lib/getSessionServer";
import type { Rings } from "@/types/Ring";

export default async function RingsPage() {
  let response: AxiosResponse<Rings> | undefined;

  const { token, userId } = await getSessionServer();

  try {
    response = await fetchServer.get("/ring", {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
  } catch {
    response = undefined;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white"
    >
      <div className="absolute right-2 top-2">
        <Link href={`/users/${userId}`}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-3 text-sm font-medium text-white shadow-lg transition duration-300 hover:from-blue-700 hover:to-blue-600"
          >
            My Profile
            <FaUserCircle className="ml-2 inline-block text-xl" />
          </motion.button>
        </Link>
      </div>

      <h1 className="mb-6 text-4xl font-bold">Rings</h1>
      <p>
        {response?.data?.length ? response?.data?.length : "No"} ring
        {response?.data?.length !== 1 && "s"} found
      </p>
      <motion.div className="mt-2 flex flex-col items-center">
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
      <ul className="mt-4 w-full max-w-2xl">
        {response?.data?.map((ring) => (
          <motion.li
            key={ring.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="relative mb-4 flex transform flex-col items-start gap-4 rounded-lg bg-white bg-opacity-10 p-4 shadow-lg backdrop-blur-sm transition-transform hover:scale-105 sm:flex-row sm:items-center"
          >
            <div className="absolute right-2 top-2 flex space-x-2">
              <Link href={`/rings/${ring.id}`}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600"
                >
                  <FaEdit />
                </motion.button>
              </Link>

              <RingsDeleteBtnIconRed ring={ring} token={token} />
            </div>
            <Image
              src={ring.url}
              alt={ring.name}
              className="h-16 w-16 rounded-lg"
              width={64}
              height={64}
            />
            <div className="ml-4 flex flex-col items-start">
              <h2 className="text-lg font-bold">{ring.name}</h2>
              <p className="text-sm">{ring.power}</p>
              <p className="text-sm">{ring.owner}</p>
              <p className="text-sm">{ring.forgedBy}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
