import { MoviesGallery } from "./components/MoviesGallery";
import { Navbar } from "./components/Navbar";
import { useFetchMovies } from "./hooks/useFetchMovies";
import About from "./components/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const { setSearch, movies, isLoading } = useFetchMovies();

  return (
    <Router>
      <main className="w-full h-full">
        <Navbar setSearch={setSearch} />
        <Routes>
          <Route
            path="/"
            element={<MoviesGallery movies={movies} isLoading={isLoading} />}
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
