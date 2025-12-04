import { useMemo } from "react";
import { MovieSlider } from "./MovieSlider";

export const MoviesGallery = ({ movies, isLoading }) => {
  const moviesByType = useMemo(() => {
    const categorized = { movie: [], tv: [], person: [] };
    movies.forEach((movie) => {
      const mediaType = movie.media_type;
      if (categorized[mediaType] && movie.adult !== true) {
        categorized[mediaType].push({
          ...movie,
          title: movie.title || movie.name,
          rating: movie.vote_average ? movie.vote_average.toFixed(1) : "N/A",
          color: "#888888",
        });
      }
    });
    return categorized;
  }, [movies]);

  return (
    <div className="min-h-screen bg-[#15141b] text-white">
      <main className="pt-24 px-8 pb-16">
        <MovieSlider
          title="Movies"
          movies={moviesByType.movie}
          indicator="bg-yellow-400"
          isLoading={isLoading}
        />
        <MovieSlider
          title="Tv Shows"
          movies={moviesByType.tv}
          indicator="bg-red-500"
          isLoading={isLoading}
        />
        <MovieSlider
          title="Person"
          movies={moviesByType.person}
          indicator="bg-red-500"
          isLoading={isLoading}
        />
      </main>
    </div>
  );
};
