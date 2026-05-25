'use client';

import { useEffect, useState } from 'react';
import {
  getTrendingMovies,
  getImageUrl,
} from '@/lib/tmdb';

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
}

export default function DashboardPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    loadMovies();

    const savedFavorites = localStorage.getItem(
      'favorites'
    );

    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const loadMovies = async () => {
    const data = await getTrendingMovies();
    setMovies(data);
  };

  const toggleFavorite = (movie: Movie) => {
    const exists = favorites.find(
      (fav) => fav.id === movie.id
    );

    let updatedFavorites;

    if (exists) {
      updatedFavorites = favorites.filter(
        (fav) => fav.id !== movie.id
      );
    } else {
      updatedFavorites = [...favorites, movie];
    }

    setFavorites(updatedFavorites);

    localStorage.setItem(
      'favorites',
      JSON.stringify(updatedFavorites)
    );
  };

  const isFavorite = (id: number) => {
    return favorites.some((fav) => fav.id === id);
  };

  const featuredMovie = movies[0];

  return (
    <div className="min-h-screen bg-black text-white">
      {featuredMovie && (
        <section
          className="h-screen bg-cover bg-center relative"
          style={{
            backgroundImage: `url(${getImageUrl(
              featuredMovie.backdrop_path
            )})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent flex items-center px-10">
            <div className="max-w-2xl">
              <h1 className="text-7xl font-black mb-6">
                {featuredMovie.title}
              </h1>

              <button className="bg-white text-black px-8 py-4 rounded font-bold hover:bg-zinc-300 transition">
                Ver ahora
              </button>
            </div>
          </div>
        </section>
      )}

      <section className="px-8 py-10">
        <h2 className="text-3xl font-bold mb-8">
          Tendencias
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative group overflow-hidden rounded-lg"
            >
              <img
                src={getImageUrl(movie.poster_path)}
                alt={movie.title}
                className="w-full h-80 object-cover group-hover:scale-105 transition"
              />

              <button
                onClick={() =>
                  toggleFavorite(movie)
                }
                className="absolute top-3 right-3 z-20 bg-black/70 w-10 h-10 rounded-full flex items-center justify-center text-2xl hover:scale-110 transition"
              >
                {isFavorite(movie.id)
                  ? '❤️'
                  : '🤍'}
              </button>

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-end p-4 pointer-events-none">
                <h3 className="font-bold text-lg">
                  {movie.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}