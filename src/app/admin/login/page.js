import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySession } from "@/app/admin/session";
import SignInForm from "@/app/admin/components/sign-in-form";
import styles from "@/app/admin/login/page.module.css";

async function verifyAuth() {
  const cookiesStore = await cookies();

  if (cookiesStore.has("sessionId")) {
    const sessionId = cookiesStore.get("sessionId").value;
    
    const isValid = verifySession(sessionId, Bun.env.SESSION_KEY);
        
    if (isValid) redirect("/admin");
  }
}

export default async function Page() {
  await verifyAuth();

  return (
    <div className={styles["page"]}>
      <h1>Acceso de administrador</h1>
      <SignInForm />
    </div>
  );
}
