import { monoton } from "@/app/fonts";
import Footer from "@/app/components/footer";

export default function Page() {
  return (
    <>
      <header>
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
      <div>
        <main>
          <div>
            <p>El Chanchito Rey y sus conocimientos sobre diversas materias.</p>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
