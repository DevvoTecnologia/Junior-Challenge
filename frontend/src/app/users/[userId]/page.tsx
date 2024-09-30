import type { AxiosResponse } from "axios";
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

  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <h1 className="mb-8 mt-8 text-center text-4xl font-bold text-gray-800">
        {session?.user.username === response.data.username
          ? "My Profile"
          : "User Profile"}
      </h1>
      {response.data.rings && response.data.rings.length > 0 ? (
        <div className="mx-auto max-w-5xl rounded-lg bg-white p-4 shadow-lg transition-shadow duration-300 hover:shadow-xl md:h-176">
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
            <RingsCarousel UserRings={response.data.rings} />
          </div>
        </div>
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
