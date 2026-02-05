import { useState } from "react";
import styles from "./SearchHero.module.css";

const popularTags = ["Nature", "Ocean", "City", "Mountains", "Sky"];

export default function SearchHero({ onResults }) {
  const [query, setQuery] = useState("");
  const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

  const searchPhotos = async (q) => {
    console.log("API_KEY exists?", !!API_KEY, "Query:", q);

    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(q)}&per_page=12`,
      { headers: { Authorization: API_KEY } }
    );

    console.log("Status:", res.status);
    const data = await res.json();
    console.log("Photos:", data?.photos?.length);

    onResults?.(data.photos || []);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    searchPhotos(q);
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

          <button className={styles.button} type="submit">
            Search
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
                onClick={() => {
                  setQuery(tag);
                  searchPhotos(tag);
                }}
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
