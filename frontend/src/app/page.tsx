"use client";

import { useQuery } from "@tanstack/react-query";

import Loading from "@/components/Loading";
import { getAllUsers } from "@/service/queries";

export default function Home() {
  const { data: users, isLoading } = useQuery({
    queryFn: getAllUsers,
    queryKey: ["users"],
  });

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <h1>Hello, world!</h1>
      {users?.map((user) => (
        <div key={user.id}>
          <h2>{user.username}</h2>
          <div>
            {user.rings.map((ring) => (
              <div key={ring.id}>
                <h3>{ring.name}</h3>
                <p>{ring.power}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
