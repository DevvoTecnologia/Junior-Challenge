import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Junior-Challenge - Gabriel Logan",
    short_name: "Junior-Challenge",
    description: "Desafio Fullstack: Os Anéis de Poder",
    start_url: "/",
    display: "standalone",
    background_color: "#121a28",
    theme_color: "#121a28",
    lang: "en",
    dir: "ltr",
    categories: ["games", "entertainment", "adventure", "social"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
