"use client";

import Link from "next/link";
import { monoton } from "@/app/fonts";
import Button from "@/lib/components/button";
import Icon from "@/lib/components/icon";
import SignOutForm from "@/app/admin/login/components/sign-out-form";
import styles from "@/app/admin/components/navbar.module.css";

export default function Navbar({ menuItem, onMenuItemClick }) {
  return (
    <nav>
      <div className={styles["navbar"]}>
        <Link href="/">
          <img src="/images/ecr-logo.png" alt="logo" />
          <h3 className={monoton.variable}>El Chanchito Rey</h3>
        </Link>
        <div>
          <h3>Analíticas</h3>
          <ul>
            <li style={menuItem == "page-views" ? { color: "var(--color-text-accent)" } : null}>
              <Button
                name="page-views"
                onClick={onMenuItemClick}
                startIcon={<Icon type="solid" name="chart-line" />}
              >
                Visitas
              </Button>
            </li>
            <li style={menuItem == "performance-metrics" ? { color: "var(--color-text-accent)" } : null}>
              <Button
                name="performance-metrics"
                onClick={onMenuItemClick}
                startIcon={<Icon type="solid" name="chart-pie" />}
              >
                Rendimiento
              </Button>
            </li>
          </ul>
        </div>
        <SignOutForm />
      </div>
    </nav>
  );
}
