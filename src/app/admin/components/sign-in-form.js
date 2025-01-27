"use client";

import { useActionState } from "react";
import Input from "@/lib/components/input";
import Button from "@/lib/components/button";
import Icon from "@/lib/components/icon";
import signIn from "@/app/admin/components/sign-in-action";
import styles from "@/app/admin/components/sign-in-form.module.css";

export default function SignInForm() {
  const [state, action, isPending] = useActionState(signIn, { password: "" });

  return (
    <form className={styles["sign-in-form"]} action={action}>
      <div>
        <label htmlFor="password">Contraseña:</label>
        <Input 
          id="password" 
          name="password" 
          type="password" 
          defaultValue={state.password} 
        />
        {state.errors && <span>{state.errors.password}</span>}
      </div>
      <Button 
        type="submit" 
        disabled={isPending} 
        endIcon={<Icon type="solid" name="arrow-right-to-bracket" />} 
      >Iniciar sesión</Button>
    </form>
  );
}
