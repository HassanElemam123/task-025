import { useSearch } from "../context/SearchContext.jsx";

export default function SearchDebug() {
  const { query, loading, photos } = useSearch();

  return (
    <div
      style={{
        position: "fixed",
        bottom: 16,
        right: 16,
        padding: 12,
        background: "rgba(0,0,0,.7)",
        color: "#fff",
        borderRadius: 12,
        zIndex: 9999,
      }}
    >
      <div><b>Query:</b> {query || "(empty)"}</div>
      <div><b>Loading:</b> {String(loading)}</div>
      <div><b>Photos:</b> {photos?.length ?? 0}</div>
    </div>
  );
}
