import "@/app/globals.css";

export const metadata = { title: "El Chanchito Rey" };

export default function Layout({ children }) {
  return (
    <html lang="es">
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
}
