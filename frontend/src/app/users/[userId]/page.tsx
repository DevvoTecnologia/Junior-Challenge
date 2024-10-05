import type { AxiosResponse } from "axios";
import { notFound } from "next/navigation";

import NoRingsFound from "@/components/users/NoRingsFound";
import RingsFound from "@/components/users/RingsFound";
import fetchServer from "@/lib/fetchServer";
import getSessionServer from "@/lib/getSessionServer";
import type { User } from "@/types/User";

interface UserProfilePageProps {
  params: {
    userId: string;
  };
}

export default async function UserProfilePage({
  params: { userId },
}: Readonly<UserProfilePageProps>) {
  let response: AxiosResponse<User> | undefined;

  const { token, userId: userIdFromSession } = await getSessionServer();

  try {
    response = await fetchServer.get("/user/" + userId);
  } catch {
    return notFound();
  }

  // Check if the user is viewing their own profile
  const isMyProfile = userIdFromSession === response?.data.id;

  return (
    <div className="min-h-screen bg-gray-50">
      {response?.data.rings && response.data.rings.length > 0 ? (
        <RingsFound
          UserRings={response.data.rings}
          isMyProfile={isMyProfile}
          token={token}
          username={response.data.username}
        />
      ) : (
        <NoRingsFound
          username={response?.data.username}
          isMyProfile={isMyProfile}
        />
      )}
    </div>
  );
}
