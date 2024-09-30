import Image from "next/image";
import Link from "next/link";
import { IoMdArrowDroprightCircle } from "react-icons/io";

import RingsCarousel from "@/components/RingsCarousel";
import fetchServer from "@/lib/fetchServer";
import type { Users } from "@/types/User";

export default async function UsersProfilePage() {
  const response = await fetchServer.get<Users>("/user");

  // Sort users by whether they have rings or not
  const sortedUsers = response.data.sort((a, b) => {
    if (a.rings && a.rings.length > 0) return -1;
    if (b.rings && b.rings.length > 0) return 1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="mb-8 mt-8 text-center text-4xl font-bold text-gray-800">
        Users
      </h1>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
        {sortedUsers.map((user) => (
          <div key={user.id} className="rounded bg-gray-50">
            <div className="min-h-64 rounded-lg bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl md:min-h-[50rem]">
              <h2 className="mb-4 text-2xl font-semibold text-gray-900"></h2>

              <div className="flex justify-between">
                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                  User:{" "}
                  {user.username.charAt(0).toUpperCase() +
                    user.username.slice(1)}
                </h2>
                <Link href={`/users/${user.id}`}>
                  <IoMdArrowDroprightCircle className="cursor-pointer text-2xl text-blue-500" />
                </Link>
              </div>
              <div className="space-y-4">
                {user.rings && user.rings.length > 0 ? (
                  <RingsCarousel UserRings={user.rings} />
                ) : (
                  <div className="">
                    <p className="text-gray-500">No rings available</p>
                    <Image
                      className="m-auto mt-28 h-auto w-auto self-center"
                      src="/no-content.png"
                      alt="No ring"
                      width={200}
                      height={200}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
