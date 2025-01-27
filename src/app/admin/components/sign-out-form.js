"use client";

import signOut from "@/app/admin/components/sign-out-action";
import styles from "@/app/admin/components/sign-out-form.module.css";

export default function SignOutForm() {
  return (
    <form className={styles["sign-out-form"]} action={signOut}>
      <button type="submit">
        <span>Cerrar sesión</span>
        <i className="fa-solid fa-arrow-right-from-bracket" />
      </button>
    </form>
  );
}
