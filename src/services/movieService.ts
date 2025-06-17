import { Movie } from "../types/movie";
import axios from "axios";

interface GetMoviesRes {
  results: Movie[];
}

const params = {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    accept: "application / json",
  },
};

export const getMovies = async (query: string) => {
  const res = await axios.get<GetMoviesRes>(
    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    params
  );
  return res.data.results;
};
