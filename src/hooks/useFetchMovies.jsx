import { useEffect, useState, useRef } from "react";

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4Yjg1YzNlY2MwZjFhYTc0ZTdlMDVhZGU4ODgxMTIyNyIsIm5iZiI6MTc2NDgwNjk2OC4xMzUsInN1YiI6IjY5MzBkMTM4YzljOTEyNWRhMmU2Nzk4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lT5TUDNBMeuhJOx1wkf8UpYrbOhLSgmcbbTPyqzrcFU";

const methodHeader = () => {
  return {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };
};

export const useFetchMovies = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("popular");
  const debounceRef = useRef();

  useEffect(() => {
    debounceRef.current = debounce((searchTerm) => {
      setIsLoading(true);
      const url =
        searchTerm.trim() === ""
          ? "https://api.themoviedb.org/3/search/multi?include_adult=false&language=en-US&page=1"
          : `https://api.themoviedb.org/3/search/multi?query=${searchTerm}&include_adult=false&language=en-US&page=1`;

      fetch(url, methodHeader())
        .then((response) => response.json())
        .then((data) => {
          setIsLoading(false);
          setMovies(data.results);
        })
        .catch((error) => {
          console.error("Error fetching movies:", error);
          setIsLoading(false);
        });
    }, 500);
  }, []);

  useEffect(() => {
    if (debounceRef.current) {
      debounceRef.current(search);
    }
  }, [search]);
  return { isLoading, movies, setSearch, search };
};
