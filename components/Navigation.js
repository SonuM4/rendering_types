import Link from 'next/link';
import styles from './Navigation.module.css';

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Link href="/">Next.js Rendering Demo</Link>
      </div>
      <ul className={styles.links}>
        <li><Link href="/csr">CSR</Link></li>
        <li><Link href="/ssr">SSR</Link></li>
        <li><Link href="/hydration">Hydration</Link></li>
        <li><Link href="/hydration-issues">Hydration Issues</Link></li>
        <li><Link href="/streaming">Streaming</Link></li>
        <li><Link href="/rsc">RSC</Link></li>
      </ul>
    </nav>
  );
}
