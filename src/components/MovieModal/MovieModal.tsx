import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './MovieModal.module.css';
import { Movie } from '../../types/movie';

interface MovieModalProps {
    selectedMovie: Movie;
    closeModal: () => void;
}

export default function MovieModal({ selectedMovie, closeModal }: MovieModalProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeModal();
        };
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [closeModal]);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return createPortal(
        <div
            className={css.backdrop}
            onClick={handleBackdropClick}
            role=""dialog""
            aria-modal=""true""
        >
            <div className={css.modal}>
                <button
                    className={css.closeButton}
                    onClick={closeModal}
                    aria-label=""Close modal""
                >
                    &times;
                </button>
                <img
                    src={`https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}`}
                    alt={selectedMovie.title}
                    className={css.image}
                />
                <div className={css.content}>
                    <h2>{selectedMovie.title}</h2>
                    <p>{selectedMovie.overview}</p>
                    <p>
                        <strong>Release Date:</strong> {selectedMovie.release_date}
                    </p>
                    <p>
                        <strong>Rating:</strong> {selectedMovie.vote_average}/10
                    </p>
                </div>
            </div>
        </div>,
        document.body,
    );
}
