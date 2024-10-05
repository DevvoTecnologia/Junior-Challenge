import * as motion from "framer-motion/client";
import Image from "next/image";
import Link from "next/link";
import { IoMdArrowDroprightCircle } from "react-icons/io";

import { auth } from "@/auth";
import RingsCarousel from "@/components/RingsCarousel";
import fetchServer from "@/lib/fetchServer";
import type { Users } from "@/types/User";

export default async function UsersProfilePage() {
  const response = await fetchServer.get<Users>("/user");
  const session = await auth();
  const token = session?.user.accessToken;

  const myUserId = session?.user.userId;

  // Filter out the current user
  const filteredUsers = response.data.filter((user) => user.id !== myUserId);

  // Sort users by whether they have rings or not
  const sortedUsers = filteredUsers.toSorted((a, b) => {
    if (a.rings && a.rings.length > 0) return -1;
    if (b.rings && b.rings.length > 0) return 1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {sortedUsers && sortedUsers.length > 0 ? (
        <UsersFound sortedUsers={sortedUsers} token={token} />
      ) : (
        <NoUsersFound />
      )}
    </div>
  );
}

interface UsersFoundProps {
  sortedUsers: Users;
  token: string | undefined;
}

function UsersFound({ sortedUsers, token }: Readonly<UsersFoundProps>) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mt-6 grid gap-6 p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      datatype="users-list"
    >
      {sortedUsers.map((user) => (
        <motion.div
          key={user.id}
          datatype="user-list-id"
          data-user-id={user.id}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col overflow-hidden rounded-lg bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl"
        >
          <div className="mb-4 flex items-center justify-between">
            <motion.h2
              className="text-xl font-bold text-gray-900"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
            </motion.h2>

            <Link datatype="user-link-profile" href={`/users/${user.id}`}>
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer"
              >
                <IoMdArrowDroprightCircle className="text-3xl text-blue-600 transition-colors duration-200 hover:text-blue-800" />
              </motion.div>
            </Link>
          </div>

          <div className="max-h-[25rem] min-h-[24rem] space-y-4">
            {user.rings && user.rings.length > 0 ? (
              <RingsCarousel UserRings={user.rings} token={token} />
            ) : (
              <motion.div
                className="flex h-full flex-col items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-gray-500">No rings available</p>
                <Image
                  className="mt-6"
                  src="/no-content.png"
                  alt="No ring"
                  width={150}
                  height={150}
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function NoUsersFound() {
  return (
    <motion.div
      className="flex min-h-screen flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <p className="mb-6 text-2xl text-gray-500">No users available</p>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image src="/no-content.png" alt="No users" width={300} height={300} />
      </motion.div>
    </motion.div>
  );
}
