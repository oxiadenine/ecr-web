import Script from "next/script";
import { orbitron } from "@/app/fonts";
import "@/app/globals.css";

export const metadata = { title: "El Chanchito Rey" };

export default function Layout({ children }) {
  return (
    <html lang="es" className={orbitron.variable}>
      <body>
        <div style={{ 
          display: "flex", 
          minHeight: "100%", 
          background: "var(--color-secondary)"
        }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            {children}
          </div>
        </div>
      </body>
      <Script src="/js/fa-icons.min.js" />
      <Script src="/js/fa-icons-solid.min.js" />
      <Script src="/js/fa-icons-brands.min.js" />
    </html>
  );
}
