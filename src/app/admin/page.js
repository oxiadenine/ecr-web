import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Session from "@/app/admin/session";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import styles from "@/app/admin/page.module.css";

async function verifyAuth() {
  const cookiesStore = await cookies();

  if (!cookiesStore.has("sessionId")) {
    Session.revoke(null);
  
    redirect("/admin/login");
  }
  
  const sessionId = cookiesStore.get("sessionId").value;
  
  const isValid = Session.verify(sessionId, Bun.env.SESSION_KEY);
  
  if (!isValid) redirect("/admin/login");
}

export default async function Page() {
  await verifyAuth();

  return (
    <>
      <Header />
      <div>
        <main>
          <div className={styles["page"]}>
            <h1>Administración</h1>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
