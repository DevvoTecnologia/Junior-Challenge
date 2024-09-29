import type { AxiosResponse } from "axios";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IoMdArrowDropleftCircle } from "react-icons/io";

import { fetchServer } from "@/lib/fetchServer";
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

  try {
    response = await fetchServer("/user/" + userId);
  } catch {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="mb-8 text-center text-4xl font-bold text-gray-800">
        Users Profiles
      </h1>
      <div
        key={response.data.id}
        className="rounded-lg bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl"
      >
        <h2 className="mb-4 text-2xl font-semibold text-gray-900"></h2>

        <div className="flex justify-between">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">
            {response.data.username}
          </h2>
          <Link href={`/users`}>
            <IoMdArrowDropleftCircle className="cursor-pointer text-2xl text-blue-500" />
          </Link>
        </div>
        <div className="space-y-4">
          {response.data.rings && response.data.rings.length > 0 ? (
            response.data.rings.map((ring) => (
              <div
                key={ring.id}
                className="rounded-lg border border-gray-200 p-4 transition-colors duration-300 hover:bg-gray-100"
              >
                <h3 className="text-lg font-medium text-gray-700">
                  {ring.name}
                </h3>
                <p className="text-gray-600">
                  <span className="font-semibold">Owner:</span> {ring.owner}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Power:</span> {ring.power}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Forged By:</span>{" "}
                  {ring.forgedBy}
                </p>
                <div className="mt-4">
                  <Image
                    src={ring.url}
                    alt={ring.name}
                    className="h-auto w-auto rounded-full object-cover"
                    width={100}
                    height={100}
                    priority
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No rings available</p>
          )}
        </div>
      </div>
    </div>
  );
}
