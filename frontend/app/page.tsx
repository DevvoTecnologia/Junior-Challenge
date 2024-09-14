import type { Ring } from '@/app/lib/definitions';
import styles from '@/app/page.module.css';
import RingsCarousel from '@/app/ui/slick/rings-carousel';

async function getRings() {
  try {
    const res = await fetch('http://localhost:3000/rings', {
      next: {
        tags: ['rings'],
      },
    });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}

export default async function Home() {
  const rings: Ring[] = await getRings();
  return (
    <div className={styles.container + ' container-fluid'}>
      <h1 className={styles.title}>Anéis no mundo</h1>
      <hr />
      {rings && <RingsCarousel rings={rings} />}
      {!rings && <p className="text-center">Nenhum anel encontrado :(</p>}
    </div>
  );
}
