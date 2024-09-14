'use client';

import styles from '@/app/ui/layout/header.module.css';
import { Shell } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const isNew = pathname.includes('new');
  const isHome = pathname === '/';
  const inactiveCls = '';
  const activeCls = 'contrast';

  return (
    <header className={styles.header + ' container-fluid'}>
      <nav>
        <ul>
          <li className={styles.logo}>
            <Shell className={styles.icon} size={32} />
            <strong className={styles.title}>Os Anéis</strong>
          </li>
        </ul>
        <ul className={styles.links}>
          <li>
            <Link className={isHome ? activeCls : inactiveCls} href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className={isNew ? activeCls : inactiveCls} href="/new">
              Criar Anel
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
