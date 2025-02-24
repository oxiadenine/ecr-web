"use client";

import { useEffect } from "react";
import Link from "next/link";
import styles from "@/app/error.module.css";
import logError from "@/data/log-error-action";
 
export default function Error({ error }) {
  useEffect(() => {
    const reportError = async () => await logError({
      digest: error.digest,
      name: error.name,
      message: error.message,
      stack: error.stack
    });

    reportError();
  }, [error]);

  return (
    <div className={styles["error"]}>
      <h1>Oh no...</h1>
      <p>Algo extraño ha ocurrido tras querer saber mas de la cuenta</p>
      <Link href="/">
        <img src="/images/ecr-logo.png" alt="logo" />
      </Link>
      <span>Haz click en la imágen para volver a la página de inicio</span>
    </div>
  );
}
