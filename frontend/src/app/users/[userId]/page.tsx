import type { AxiosResponse } from "axios";
import * as motion from "framer-motion/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IoMdArrowDropleftCircle } from "react-icons/io";

import { auth } from "@/auth";
import RingsCarousel from "@/components/RingsCarousel";
import fetchServer from "@/lib/fetchServer";
import type { User, UserRings } from "@/types/User";

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
    <div className="min-h-screen bg-gray-50">
      {response.data.rings && response.data.rings.length > 0 ? (
        <RingsFound
          UserRings={response.data.rings}
          isMyProfile={isMyProfile}
          token={token}
          username={response.data.username}
        />
      ) : (
        <NoRingsFound
          username={response.data.username}
          isMyProfile={isMyProfile}
        />
      )}
    </div>
  );
}

interface RingsFoundProps {
  UserRings: UserRings[];
  isMyProfile: boolean;
  token: string | undefined;
  username: string;
}

function RingsFound({
  UserRings,
  isMyProfile,
  token,
  username,
}: RingsFoundProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 to-indigo-100"
    >
      <div className="flex items-center justify-between bg-white p-6 shadow-md">
        <h2 className="text-4xl font-bold text-gray-800">
          {username.charAt(0).toUpperCase() + username.slice(1)}&apos;s Rings
        </h2>
        <Link href={`/users`} className="text-blue-600 hover:text-blue-800">
          <IoMdArrowDropleftCircle className="text-5xl" />
        </Link>
      </div>

      <div className="mt-10 flex flex-grow justify-center sm:mt-0 sm:items-center">
        <div className="w-full max-w-7xl p-8 sm:p-6">
          <RingsCarousel
            UserRings={UserRings}
            isMyProfile={isMyProfile}
            token={token}
          />
        </div>
      </div>
    </motion.div>
  );
}

interface NoRingsFoundProps {
  username: string;
  isMyProfile: boolean;
}

function NoRingsFound({ username, isMyProfile }: NoRingsFoundProps) {
  return (
    <motion.div
      className="flex h-screen flex-col items-center justify-center gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="mb-1 text-center text-2xl font-semibold text-gray-900"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Username: {username.charAt(0).toUpperCase() + username.slice(1)}
      </motion.h2>
      <motion.p
        className="text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        No rings available
      </motion.p>

      {isMyProfile && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Link
            className="flex items-center text-2xl text-blue-600 hover:text-blue-800 active:text-blue-900"
            href={`/rings/new`}
          >
            <svg
              className="mr-2 h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create a new ring, click here!
          </Link>
        </motion.div>
      )}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Image
          src="/no-content.png"
          alt="no-content"
          width={200}
          height={200}
          className="h-auto w-auto"
          priority
        />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Link
          className="text-2xl text-gray-700 hover:text-blue-400 active:text-blue-600"
          href={`/users`}
        >
          Back
        </Link>
      </motion.div>
    </motion.div>
  );
}
