'use client';

import { useEffect, useState } from 'react';
import { getImageUrl } from '@/lib/tmdb';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem(
      'favorites'
    );

    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const removeFavorite = (id: number) => {
    const updatedFavorites = favorites.filter(
      (movie) => movie.id !== id
    );

    setFavorites(updatedFavorites);

    localStorage.setItem(
      'favorites',
      JSON.stringify(updatedFavorites)
    );
  };

  return (
    <div className="min-h-screen bg-black text-white px-8 py-10">
      <h1 className="text-4xl font-bold mb-8">
        Favoritos
      </h1>

      {favorites.length === 0 ? (
        <p className="text-zinc-400">
          No tienes favoritos aún.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {favorites.map((movie) => (
            <div
              key={movie.id}
              className="relative overflow-hidden rounded-lg"
            >
              <img
                src={getImageUrl(movie.poster_path)}
                alt={movie.title}
                className="w-full h-80 object-cover"
              />

              <button
                onClick={() =>
                  removeFavorite(movie.id)
                }
                className="absolute top-3 right-3 bg-black/70 w-10 h-10 rounded-full flex items-center justify-center text-2xl"
              >
                ❤️
              </button>

              <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                <h2 className="font-bold text-lg">
                  {movie.title}
                </h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}