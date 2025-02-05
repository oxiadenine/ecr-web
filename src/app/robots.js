export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin/"
    },
    sitemap: `${Bun.env.URL}/sitemap.xml`
  };
}
