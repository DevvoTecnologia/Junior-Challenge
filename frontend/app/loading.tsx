import styles from '@/app/loading.module.css';

export default function Loading() {
  return (
    <article className={styles.loading}>
      <span aria-busy="true">Carregando os anéis...</span>
    </article>
  );
}
