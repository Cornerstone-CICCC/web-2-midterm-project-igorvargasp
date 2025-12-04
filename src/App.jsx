import { MoviesGallery } from "./components/MoviesGallery";
import { Navbar } from "./components/Navbar";
import { useFetchMovies } from "./hooks/useFetchMovies";

function App() {
  const { setSearch, movies, isLoading } = useFetchMovies();

  return (
    <main className="w-full h-full">
      <Navbar setSearch={setSearch} />
      <MoviesGallery movies={movies} isLoading={isLoading} />
    </main>
  );
}

export default App;
