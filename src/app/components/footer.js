import Link from "next/link";
import styles from "@/app/components/footer.module.css";

export default function Footer() {
  return (
    <footer>
      <div className={styles["footer"]}>
        <span>Copyright © 2025 oxiadenine</span>
        <div>
          <Link href="https://github.com/oxiadenine" target="_blank">
            <i className="fa-brands fa-github" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
