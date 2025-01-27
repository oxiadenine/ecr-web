"use client";

import { useActionState } from "react";
import signIn from "@/app/admin/components/sign-in-action";
import styles from "@/app/admin/components/sign-in-form.module.css";

export default function SignInForm() {
  const [state, action, isPending] = useActionState(signIn, { password: "" });

  return (
    <form className={styles["sign-in-form"]} action={action}>
      <div>
        <label htmlFor="password">Contraseña:</label>
        <input id="password" name="password" type="password" defaultValue={state.password} />
        {state.errors && <span>{state.errors.password}</span>}
      </div>
      <button disabled={isPending} type="submit">
        <span>Iniciar sesión</span>
        <i className="fa-solid fa-arrow-right-to-bracket" />
      </button>
    </form>
  );
}