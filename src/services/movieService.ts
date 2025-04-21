import axios from 'axios';
import { Movie } from '../types/movie';

interface TMDBResponse {
    results: Movie[];
    page: number;
    total_pages: number;
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
    const response = await axios.get<Movie>(
        'https://api.themoviedb.org/3/search/movie',
        {
            params: {
                query,
            },
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
        },
    );
    return response.data.results;
};
