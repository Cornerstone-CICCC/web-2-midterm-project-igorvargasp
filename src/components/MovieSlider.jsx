import { useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { MovieCard } from "./MovieCard";

import "swiper/css";

export const MovieSlider = ({ title, movies, indicator, isLoading }) => {
  const swiperRef = useRef(null);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  if (isLoading) {
    return (
      <section className="mb-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative aspect-2/3 rounded-lg overflow-hidden bg-gray-700 animate-pulse mb-3">
                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                  <span className="w-8 h-3 bg-gray-600 rounded animate-pulse" />
                </div>
              </div>
              <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto animate-pulse"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (movies.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${indicator}`}></div>
          <h2 className="text-xl font-semibold text-white">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all border border-white/20"
          >
            <ChevronLeft size={20} className="text-white" />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all border border-white/20"
          >
            <ChevronRight size={20} className="text-white" />
          </button>
        </div>
      </div>
      <Swiper
        spaceBetween={24}
        slidesPerView={2}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 24,
          },
          1280: {
            slidesPerView: 6,
            spaceBetween: 24,
          },
          1536: {
            slidesPerView: 7,
            spaceBetween: 24,
          },
        }}
      >
        {movies.length > 0 &&
          movies?.map((movie, index) => (
            <SwiperSlide key={index}>
              <MovieCard
                title={movie.title}
                rating={movie.rating}
                color={movie.color}
                url={
                  movie.poster_path ||
                  movie.backdrop_path ||
                  (Array.isArray(movie.known_for) &&
                    movie.known_for[0]?.poster_path) ||
                  (Array.isArray(movie.known_for) &&
                    movie.known_for[0]?.backdrop_path) ||
                  ""
                }
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};
