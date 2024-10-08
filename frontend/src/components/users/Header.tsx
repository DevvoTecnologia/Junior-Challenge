import * as motion from "framer-motion/client";
import Image from "next/image";
import Link from "next/link";
import { CiSettings } from "react-icons/ci";
import { GiBigDiamondRing } from "react-icons/gi";
import { IoLogIn, IoLogOut } from "react-icons/io5";

import getSessionServer from "@/lib/getSessionServer";

import BtnLogout from "../BtnLogout";
import ProfileOrUsers from "./ProfileOrUsers";

export default async function Header() {
  const { session, userId } = await getSessionServer();

  return (
    <header className="flex h-28 flex-col items-center justify-evenly bg-gradient-to-r from-gray-900 to-gray-800 px-2 shadow-lg sm:px-6 md:h-[4.5rem] md:flex-row md:justify-between">
      {/* Logo and Title */}
      <div className="flex items-center gap-2">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex h-12 w-12 items-center justify-center"
        >
          <Image
            src={"/logo.png"}
            alt="Logo"
            width={120}
            height={120}
            className="h-auto w-auto"
            priority
          />
        </motion.div>
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-xl font-semibold text-white"
        >
          The Rings of Power
        </motion.h1>
      </div>

      {/* Buttons Section */}
      <div
        className={`flex w-full items-center ${session ? "justify-evenly" : "mr-6 justify-end sm:mr-0"} sm:gap-4 md:w-auto md:justify-normal`}
      >
        {session ? (
          <>
            <ProfileOrUsers userId={userId} />

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href={`/rings`}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-1 rounded-lg text-sm font-medium text-gray-300 transition hover:bg-gray-700 hover:text-white sm:gap-2 sm:px-1 sm:py-2 md:px-4 md:py-2"
                >
                  My Rings
                  <GiBigDiamondRing />
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link href="/users/settings">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-1 rounded-lg text-sm font-medium text-gray-300 transition hover:bg-gray-700 hover:text-white sm:gap-2 sm:px-1 sm:py-2 md:px-4 md:py-2"
                >
                  Settings
                  <CiSettings />
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <BtnLogout className="flex items-center gap-1 rounded-lg text-sm font-medium text-gray-300 transition hover:bg-gray-700 hover:text-white sm:gap-2 sm:px-1 sm:py-2 md:px-4 md:py-2">
                Logout
                <IoLogOut />
              </BtnLogout>
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 rounded-lg text-lg font-medium text-gray-300 transition hover:bg-gray-700 hover:text-white sm:px-1 sm:py-2 md:px-4 md:py-2"
              >
                Login
                <IoLogIn />
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </header>
  );
}
