"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSession } from "@/app/admin/session";
import { verifySessionKey } from "@/lib/admin/session-key";

export default async function signIn(_, formData) {
  const password = formData.get("password");

  if (password.length == 0) {
    return { 
      password, 
      errors: { password: "La contraseña no puede estar vacía" } 
    };
  }

  const isValid = await verifySessionKey(password, Bun.env.SESSION_KEY);

  if (!isValid) {
    return { 
      password, 
      errors: { password: "La contraseña no es válida" } 
    };
  }

  const session = createSession(Bun.env.SESSION_KEY);

  const cookiesStore = await cookies();
   
  cookiesStore.set("sessionId", session.id, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + parseInt(Bun.env.SESSION_TIME)),
    sameSite: "strict",
    path: "/admin"
  });

  redirect("/admin");
}
