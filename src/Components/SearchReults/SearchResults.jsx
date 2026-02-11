import styles from "./SearchResults.module.css";
import { useSearch } from "../../context/SearchContext.jsx";

export default function SearchResults() {
  const { photos } = useSearch();

  if (!photos?.length) {
    return <div className={styles.empty}></div>;
  }

  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {photos.map((p) => (
          <a
            key={p.id}
            className={styles.card}
            href={p.url}
            target="_blank"
            rel="noreferrer"
            title={`By ${p.photographer}`}
          >
            <img
              className={styles.img}
              src={p.src.large}
              alt={p.alt || "Pexels photo"}
              loading="lazy"
            />

            <div className={styles.meta}>
              <span className={styles.name}>{p.photographer}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
