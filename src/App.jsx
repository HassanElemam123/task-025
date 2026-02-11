import "./App.css";
import Header from "./Components/Header/Header.jsx";
import SearchHero from "./Components/SearchHero/SearchHero.jsx";
import SearchResults from "./Components/SearchReults/SearchResults.jsx";
import SearchDebug from "./Components/SearchDebug.jsx";

function App() {
  return (
    <>
      <Header />
      <SearchHero />
      <main className="container">
        <SearchResults />
        <SearchDebug />
      </main>
    </>
  );
}

export default App;
