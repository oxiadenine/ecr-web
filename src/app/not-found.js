import Link from "next/link";
import styles from "@/app/not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles["not-found"]}>
      <h1>Vaya...</h1>
      <p>No se ha encontrado aquello que anhelas saber</p>
      <Link href="/">
        <img src="/images/ecr-logo.png" alt="logo" />
      </Link>
      <span>Haz click en la imágen para volver a la página de inicio</span>
    </div>
  );
}
