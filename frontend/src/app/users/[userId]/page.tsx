import type { AxiosResponse } from "axios";
import * as motion from "framer-motion/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CiSettings } from "react-icons/ci";
import { GiBigDiamondRing } from "react-icons/gi";
import { IoMdArrowDropleftCircle } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";

import { auth } from "@/auth";
import BtnLogout from "@/components/BtnLogout";
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
  const token = session?.user.accessToken;

  try {
    response = await fetchServer.get("/user/" + userId);
  } catch {
    return notFound();
  }

  // Check if the user is viewing their own profile
  const isMyProfile = session?.user.userId === response.data.id;

  return (
    <div className="min-h-screen bg-gray-50 p-2 md:flex md:flex-col md:justify-center 2xl:items-center">
      <div className="container mx-auto my-8 rounded-lg bg-white p-2 shadow-md sm:p-4">
        <h1 className="text-start text-2xl font-bold tracking-tight text-gray-900">
          {isMyProfile ? "My Profile" : "User Profile"}
        </h1>

        {isMyProfile && (
          <div className="mt-4 flex items-center justify-between gap-1 sm:justify-end sm:gap-4">
            <Link href={`/rings`}>
              <motion.button
                whileHover={{ scale: 1.05, translateY: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center rounded-lg bg-blue-600 p-2 py-2 text-white shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg sm:px-4"
              >
                My Rings
                <GiBigDiamondRing className="ml-1 inline-block sm:ml-2" />
              </motion.button>
            </Link>

            <Link href="/users/settings">
              <motion.button
                whileHover={{ scale: 1.05, translateY: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center rounded-lg bg-blue-600 p-2 py-2 text-white shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg sm:px-4"
              >
                Settings
                <CiSettings className="ml-1 inline-block sm:ml-2" />
              </motion.button>
            </Link>

            <BtnLogout className="flex items-center justify-center rounded-lg bg-blue-600 p-2 py-2 text-white shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg sm:px-4">
              Logout
              <IoLogOut className="ml-1 inline-block sm:ml-2" />
            </BtnLogout>
          </div>
        )}
      </div>
      {response.data.rings && response.data.rings.length > 0 ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="container mx-auto my-8 rounded-lg bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl"
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
              token={token}
            />
          </div>
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <h2 className="mb-4 text-center text-2xl font-semibold text-gray-900">
            User:{" "}
            {response.data.username.charAt(0).toUpperCase() +
              response.data.username.slice(1)}
          </h2>
          <Image
            src="/no-content.png"
            alt="no-content"
            width={200}
            height={200}
            className="h-auto w-auto"
            priority
          />
          <p className="text-gray-500">No rings available</p>
          <Link
            className="text-2xl text-gray-700 hover:text-blue-400 active:text-blue-600"
            href={`/users`}
          >
            Back
          </Link>
        </div>
      )}
    </div>
  );
}
