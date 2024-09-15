import { RingType } from "@/src/@types";
import { HttpResponse } from "@/src/@types/http-types";
import { ModalRings } from "@/src/components/modal-rings";
import { HttpClientAdapter } from "@/src/infra/adapters/axios-adapter";
import { apiURL, endpoints } from "@/src/utils/constants";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function SeeRings() {
  const httpClient = new HttpClientAdapter();
  const token = cookies().get("token");

  const fetchingRings = await httpClient.request({
    method: "get",
    url: `${apiURL}${endpoints.seeRings}`,
    headers: {
      Authorization: `Bearer ${token?.value}`,
      "Cache-Control": "no-store",
    },
  });

  const rings: HttpResponse<RingType[]> | undefined = fetchingRings;

  return (
    <main
      className={`min-h-screen py-32 w-full py-6 flex flex-col items-center bg-battle justify-start gap-8`}
    >
      <h1 className={`text-center gold-text font-ring text-5xl `}>
        galeria de aneis
      </h1>

      {!rings || rings?.body?.length === 0 ? (
        <span className={`sofadi-font text-xl`}>
          Nenhum anel foi criado ainda, Crie o seu{" "}
          <Link href={"/create-rings"} className={`hover:underline gold-text`}>
            aqui.
          </Link>
        </span>
      ) : (
        <section className={`w-10/12 flex flex-wrap justify-center gap-6`}>
          {rings?.body?.map(ring => {
            return <ModalRings key={ring.id} ring={ring} />;
          })}
        </section>
      )}
    </main>
  );
}
