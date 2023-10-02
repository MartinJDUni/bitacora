import Link from "next/link";
import styles from "@/styles/Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.row}>
        <div className={styles.logo}>
          <Link href="/">
            <img src="./image/bcr.png" alt="Logo" className={styles.companyLogo} />
          </Link>
        </div>
        <h1 className={styles.title}>Bitácora de Referidos</h1>
        <div className={styles.button}>
          <button className={styles.headerButton}>Cerrar Sesión</button>
        </div>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <Link href="/Team/gra" legacyBehavior>
              <a className={styles.navLink}>Inicio</a>
            </Link>
          </li>
          <li>
            <Link href="/Admin/workers" legacyBehavior>
              <a className={styles.navLink}>Trabajadores</a>
            </Link>
          </li>
          <li>
            <Link href="/Admin/task" legacyBehavior>
              <a className={styles.navLink}>Tarea</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
