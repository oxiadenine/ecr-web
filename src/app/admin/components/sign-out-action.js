"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revokeSession } from "@/app/admin/session";

export default async function signOut(_) {
  const cookiesStore = await cookies();

  const sessionId = cookiesStore.get("sessionId")?.value;

  revokeSession(sessionId);

  cookiesStore.set("sessionId", "", {
    expires: new Date(0),
    path: "/admin"
  });

  redirect("/admin/login");
}
