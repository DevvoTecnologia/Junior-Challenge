import * as motion from "framer-motion/client";
import Link from "next/link";

import RingsCreateForm from "@/components/form/RingsCreate";
import getSessionServer from "@/lib/getSessionServer";

export default async function RingNewPage() {
  const { token } = await getSessionServer();

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

      <RingsCreateForm token={token} />

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
