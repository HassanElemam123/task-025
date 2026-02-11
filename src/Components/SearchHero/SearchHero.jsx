import styles from "./SearchHero.module.css";
import { useSearch } from "../../context/SearchContext.jsx";

const popularTags = ["Nature", "Ocean", "City", "Mountains", "Sky"];

export default function SearchHero() {
  const { query, setQuery, loading, searchPhotos, resetAll } = useSearch();

  const onSubmit = (e) => {
    e.preventDefault();
    searchPhotos(query); // submit يدوي (حتى لو debounce شغال)
  };

  return (
    <section className={styles.searchContainer}>
      <div className={styles.inner}>
        <form className={styles.searchBar} onSubmit={onSubmit}>
          <span className={styles.icon} aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M10.5 19a8.5 8.5 0 1 1 0-17 8.5 8.5 0 0 1 0 17Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M16.8 16.8 21 21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>

          <input
            className={styles.input}
            type="search"
            placeholder="Search for beautiful photos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button className={styles.button} type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>

          <button
            className={styles.resetButton}
            type="button"
            onClick={resetAll}
            disabled={!query && !loading}
            aria-label="Reset search"
          >
            Reset
          </button>
        </form>

        <div className={styles.popularRow}>
          <span className={styles.popularLabel}>Popular:</span>

          <div className={styles.pills}>
            {popularTags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={styles.pill}
                onClick={() => setQuery(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
