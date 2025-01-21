import Link from "next/link";
import { monoton } from "@/app/fonts";
import styles from "@/app/components/header.module.css";

export default function Header() {
  return (
    <header>
      <div className={styles["header"]}>
        <Link href="/">
          <img src="/ecr-logo.png" alt="logo" />
          <h3 className={monoton.variable}>El Chanchito Rey</h3>
        </Link>
      </div>
    </header>
  );
}
