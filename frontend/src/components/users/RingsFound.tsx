import * as motion from "framer-motion/client";
import Link from "next/link";
import { IoMdArrowDropleftCircle } from "react-icons/io";

import type { UserRings } from "@/types/User";

import RingsCarousel from "../RingsCarousel";

interface RingsFoundProps {
  UserRings: UserRings[];
  isMyProfile: boolean;
  token: string | undefined;
  username: string;
}

export default function RingsFound({
  UserRings,
  isMyProfile,
  token,
  username,
}: Readonly<RingsFoundProps>) {
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
        <Link
          datatype="user-link-back-to-users"
          href={`/users`}
          className="text-blue-600 hover:text-blue-800"
        >
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
