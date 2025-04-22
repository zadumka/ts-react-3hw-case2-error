import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { fetchMovies } from '../../services/movieService';
import MovieModal from '../MovieModal/MovieModal';
import { Movie } from '../../types/movie';
import css from './App.module.css';

export default function App() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie>(null);
    const handleSelectMovie = (movie: Movie | null) => {
        setSelectedMovie(movie);
    };

    const handleSearch = async (query: string) => {
        try {
            setIsError(false);
            setIsLoading(true);
            setMovies([]);
            const fetchedMovies = await fetchMovies(query);
            if (fetchedMovies.length === 0) {
                toast.error('No movies found for your request.');
                return;
            }
            setMovies(fetchedMovies);
        } catch {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={css.app}>
            <SearchBar onSubmit={handleSearch} />
            {isLoading && <Loader />}
            {isError && <ErrorMessage />}
            {movies.length > 0 && (
                <MovieGrid movies={movies} onSelect={handleSelectMovie} />
            )}
            {selectedMovie && (
                <MovieModal
                    movie={selectedMovie}
                    onClose={() => handleSelectMovie(null)}
                />
            )}
            <Toaster position="top-center" />
        </div>
    );
}
