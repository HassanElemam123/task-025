import "./App.css";
import Header from "./Components/Header/Header.jsx";
import SearchHero from "./Components/SearchHero/SearchHero.jsx";
import SearchResults from "./Components/SearchReults/SearchResults.jsx"; // لاحظ اسم فولدرك
import { useState } from "react";

function App() {
  const [photos, setPhotos] = useState([]);

  return (
    <>
      <Header />
      <SearchHero onResults={setPhotos} />

      <main className="container">
        <SearchResults photos={photos} />
      </main>
    </>
  );
}

export default App;
