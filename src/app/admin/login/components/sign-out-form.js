"use client";

import Button from "@/lib/components/button";
import Icon from "@/lib/components/icon";
import signOut from "@/app/admin/login/components/sign-out-action";
import styles from "@/app/admin/login/components/sign-out-form.module.css";

export default function SignOutForm() {
  return (
    <form className={styles["sign-out-form"]} action={signOut}>
      <Button
        type="submit"
        endIcon={<Icon type="solid" name="arrow-right-from-bracket" />}
      >
        Cerrar sesión
      </Button>
    </form>
  );
}
