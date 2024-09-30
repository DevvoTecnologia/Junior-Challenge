import type { AxiosResponse } from "axios";
import * as motion from "framer-motion/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IoMdArrowDropleftCircle } from "react-icons/io";

import { auth } from "@/auth";
import RingsCarousel from "@/components/RingsCarousel";
import fetchServer from "@/lib/fetchServer";
import type { User } from "@/types/User";

interface UserProfilePageProps {
  params: {
    userId: string;
  };
}

export default async function UserProfilePage({
  params: { userId },
}: UserProfilePageProps) {
  let response: AxiosResponse<User>;
  const session = await auth();

  try {
    response = await fetchServer.get("/user/" + userId);
  } catch {
    return notFound();
  }

  // Check if the user is viewing their own profile
  const isMyProfile = session?.user.userId === response.data.id;

  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <div className="mb-8 mt-8">
        <h1 className="text-center text-4xl font-bold text-gray-800">
          {isMyProfile ? "My Profile" : "User Profile"}
        </h1>

        {isMyProfile && (
          <div className="flex justify-end">
            <Link href={`/rings`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
              >
                My Rings
              </motion.button>
            </Link>

            <Link href="/users/settings">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
              >
                Settings
              </motion.button>
            </Link>
          </div>
        )}
      </div>
      {response.data.rings && response.data.rings.length > 0 ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mx-auto max-w-5xl rounded-lg bg-white p-4 shadow-lg transition-shadow duration-300 hover:shadow-xl md:h-176"
        >
          <div className="mt-2 flex justify-between">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
              User:{" "}
              {response.data.username.charAt(0).toUpperCase() +
                response.data.username.slice(1)}
            </h2>
            <Link href={`/users`}>
              <IoMdArrowDropleftCircle className="cursor-pointer text-3xl text-blue-500" />
            </Link>
          </div>

          <div className="space-y-2">
            <RingsCarousel
              UserRings={response.data.rings}
              isMyProfile={isMyProfile}
            />
          </div>
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">
            User:{" "}
            {response.data.username.charAt(0).toUpperCase() +
              response.data.username.slice(1)}
          </h2>
          <p className="text-gray-500">No rings available</p>
          <Link
            className="text-gray-500 hover:text-blue-400 active:text-blue-600"
            href={`/users`}
          >
            Back
          </Link>
        </div>
      )}
    </div>
  );
}
