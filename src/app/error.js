"use client";

import { useEffect } from "react";
import Link from "next/link";
import styles from "@/app/error.module.css";
 
export default function Error({ error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles["error"]}>
      <h1>Oh no...</h1>
      <p>Algo extraño ha ocurrido tras querer saber mas de la cuenta</p>
      <Link href="/">
        <img src="/ecr-logo.png" alt="logo" />
      </Link>
      <span>Haz click en la imágen para volver a la página de inicio</span>
    </div>
  );
}
