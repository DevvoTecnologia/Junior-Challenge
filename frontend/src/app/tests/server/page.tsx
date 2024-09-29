import type { AxiosResponse } from "axios";
import { redirect } from "next/navigation";

import BtnLogout from "@/components/BtnLogout";
import fetchServer from "@/lib/fetchServer";
import type { Rings } from "@/types/Ring";

export default async function ServerPage() {
  let response: AxiosResponse<Rings>;

  try {
    response = await fetchServer.get("/ring");
  } catch {
    return redirect("/login");
  }

  return (
    <div>
      <h1>Server Page</h1>
      <p>
        This page is only rendered on the server. It will be included in the
        prerendered static HTML.
      </p>
      {response.data.map((ring) => (
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
