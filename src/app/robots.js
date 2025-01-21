export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `${process.env.URL}/sitemap.xml`
  };
}
