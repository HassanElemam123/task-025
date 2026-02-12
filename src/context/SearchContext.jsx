import { createContext, useContext, useEffect, useRef, useState } from "react";

const SearchContext = createContext(null);

export function SearchProvider({ children }) {
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

  const abortRef = useRef(null);
  const debounceRef = useRef(null);

  const searchPhotos = async (q) => {
    const trimmed = (q ?? "").trim();
    if (!trimmed || !API_KEY) return;

    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    setLoading(true);
    try {
      const res = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(trimmed)}&per_page=12`,
        {
          headers: { Authorization: API_KEY },
          signal: abortRef.current.signal,
        }
      );

      const data = await res.json();
      setPhotos(data.photos || []);
    } catch (err) {
      if (err?.name !== "AbortError") console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetAll = () => {
    setQuery("");
    if (abortRef.current) abortRef.current.abort();
    setPhotos([]);
    setLoading(false);
  };

  useEffect(() => {
    if (!API_KEY) return;

    const q = query.trim();

    if (!q) {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (abortRef.current) abortRef.current.abort();
      setPhotos([]);
      setLoading(false);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      searchPhotos(q);
    }, 350);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  // eslint-disable-next-line 
  }, [query, API_KEY]);

  const value = {
    query,
    setQuery,
    photos,
    loading,
    searchPhotos,
    resetAll,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}

// eslint-disable-next-line
export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used within SearchProvider");
  return ctx;
}
