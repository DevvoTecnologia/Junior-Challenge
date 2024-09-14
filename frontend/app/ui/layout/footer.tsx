import styles from '@/app/ui/layout/footer.module.css';
import { Atom, Palette } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={styles.list}>
        <li>
          <small>
            Desenvolvido por{' '}
            <Link href="https://github.com/p1padev" target="_blank" rel="noopener noreferrer">
              p1pa
            </Link>
          </small>
        </li>
        <li>
          <small>
            Tecnologias utilizadas:{' '}
            <span data-tooltip="Next.js + Server Components">
              <Atom size={16} />
            </span>{' '}
            <span data-tooltip="PicoCSS">
              <Palette size={16} />
            </span>
          </small>
        </li>
      </ul>
    </footer>
  );
}
