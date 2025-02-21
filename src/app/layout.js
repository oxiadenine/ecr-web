import { orbitron } from "@/app/fonts";
import Analytics from "@/app/components/analytics";
import "@/app/globals.css";
import styles from "@/app/layout.module.css";

export const metadata = { title: "El Chanchito Rey" };

export default function Layout({ children }) {
  const isAnalyticsEnabled = !!+Bun.env.ANALYTICS_ENABLE ?? false;

  return (
    <html lang="es" className={orbitron.variable}>
      <body>
        {isAnalyticsEnabled && <Analytics />}
        <div className={styles["layout"]}>
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
