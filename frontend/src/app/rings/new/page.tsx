import * as motion from "framer-motion/client";
import Link from "next/link";

import { auth } from "@/auth";

export default async function RingNewPage() {
  const session = await auth();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const token = session?.user.accessToken;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white"
    >
      <h1 className="mb-8 text-center text-5xl font-bold tracking-wide">
        Ring Create Page
      </h1>

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
            placeholder="Ex. Ring of Power"
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
            placeholder="Ex. Invisibility"
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
            placeholder="Ex. Frodo Baggins"
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
            placeholder="Ex. Sauron"
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
          Create
        </motion.button>
      </motion.form>

      <motion.div className="mt-6 flex space-x-4">
        <Link href="/rings">
          <motion.button
            className="rounded-md bg-gray-500 p-3 text-white hover:bg-gray-600"
            whileHover={{ scale: 1.05 }}
          >
            Back
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  );
}
