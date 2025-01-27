"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { monoton } from "@/app/fonts";
import SearchInput from "@/app/components/search-input";
import SignOutForm from "@/app/admin/components/sign-out-form";
import styles from "@/app/components/header.module.css";

export default function Header() {
  const pathname = usePathname();

  return (
    <header>
      <div className={styles["header"]}>
        <Link href="/">
          <img src="/ecr-logo.png" alt="logo" />
          <h3 className={monoton.variable}>El Chanchito Rey</h3>
        </Link>
        {pathname == "/" && <SearchInput placeholder="Buscar.." />}
        {pathname == "/admin" && <SignOutForm />}
      </div>
    </header>
  );
}
