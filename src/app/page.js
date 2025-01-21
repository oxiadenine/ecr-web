import { monoton } from "@/app/fonts";

export default function Page() {
  return (
    <>
      <header style={{ 
        position: "sticky", 
        top: 0, 
        zIndex: 1, 
        background: "var(--color-primary)" 
      }}>
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          gap: "16px", 
          padding: "24px" 
        }}>
          <h3 className={monoton.variable} style={{ 
            fontFamily: "var(--font-monoton)", 
            color: "var(--color-text-accent)", 
            textTransform: "uppercase"
          }}>
            El Chanchito Rey
          </h3>
        </div>
      </header>
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <main style={{ flex: 1, margin: "32px" }}>
          <div>
            <p>El Chanchito Rey y sus conocimientos sobre diversas materias.</p>
          </div>
        </main>
        <footer style={{ background: "var(--color-primary)" }}>
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            justifyContent: "center", 
            alignItems: "center", 
            gap: "16px", 
            padding: "24px" 
          }}>
            <span style={{ fontSize: "0.75rem" }}>Copyright © 2025 oxiadenine</span>
          </div>
        </footer>
      </div>
    </>
  );
}
