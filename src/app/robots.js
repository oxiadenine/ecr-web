export default function robots() {
  return {
    rules: { 
      userAgent: "*", 
      allow: "/", 
      disallow: "/admin/" 
    },
    sitemap: `${process.env.URL}/sitemap.xml`
  };
}
