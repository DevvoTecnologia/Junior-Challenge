"use client";

import { useQuery } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

import BtnLogout from "@/components/BtnLogout";
import Loading from "@/components/Loading";
import { getAllRings } from "@/service/queries";

export default function ClientPage() {
  const { data: session } = useSession();

  const {
    data: rings,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getAllRings(session?.user.accessToken),
    queryKey: ["rings"],
  });

  useEffect(() => {
    const handleSignOut = async () => {
      if (error) {
        signOut({
          redirectTo: "/login",
        });
      }
    };

    handleSignOut();
  }, [error]);

  if (isLoading) {
    return <Loading />;
  }

  if (!rings) {
    return null;
  }

  return (
    <div>
      <h1>Client Page</h1>
      <p>
        This page is only rendered on the client. It will not be included in the
        prerendered static HTML.
      </p>
      {rings.map((ring) => (
        <div key={ring.id}>
          <h2>{ring.name}</h2>
          <p>{ring.owner}</p>
          <p>{ring.power}</p>
          <p>{ring.forgedBy}</p>
        </div>
      ))}
      <div>
        <BtnLogout className="rounded bg-blue-500 p-4 text-white" />
      </div>
    </div>
  );
}
