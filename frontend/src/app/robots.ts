import type { MetadataRoute } from "next";

const baseUrl =
  process.env.AUTH_TRUST_HOST ?? "https://gl-junior-challenge.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/_next", "/api"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
