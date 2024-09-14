import getRings from '@/app/api/getRings';
import styles from '@/app/page.module.css';
import RingsCarousel from '@/app/ui/slick/rings-carousel';

export default async function Home() {
  const rings = await getRings();
  return (
    <>
      <div className={styles.container + ' container-fluid'}>
        <h1 className={styles.title}>Anéis no mundo</h1>
        <hr />
        {rings && <RingsCarousel rings={rings} />}
        {!rings && <p className="text-center">Nenhum anel encontrado :(</p>}
      </div>
    </>
  );
}
