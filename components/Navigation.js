// Navigation Component
// This is a Server Component that provides site-wide navigation
// It persists across route changes without re-rendering (part of the layout)

import Link from "next/link";
import styles from "./Navigation.module.css";

// Main navigation bar with links to all demo sections
// Uses Next.js Link component for client-side navigation transitions
export default function Navigation() {
  return (
    <nav className={styles.nav}>
      {/* Logo/brand that links to home page */}
      <div className={styles.logo}>
        <Link href="/">Next.js Rendering Demo</Link>
      </div>
      {/* Navigation links to different rendering technique demos */}
      <ul className={styles.links}>
        <li>
          <Link href="/">Overview</Link>
        </li>
        <li>
          <Link href="/csr">CSR</Link>
        </li>
        <li>
          <Link href="/ssr">SSR</Link>
        </li>
        <li>
          <Link href="/hydration">Hydration</Link>
        </li>
        <li>
          <Link href="/hydration-issues">Issues</Link>
        </li>
        <li>
          <Link href="/streaming">Streaming</Link>
        </li>
        <li>
          <Link href="/selective-hydration">Selective</Link>
        </li>
        <li>
          <Link href="/rsc">RSC</Link>
        </li>
      </ul>
    </nav>
  );
}
