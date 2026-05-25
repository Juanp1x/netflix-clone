'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface Favorite {
  id: string;
  movie_id: number;
  movie_title: string;
  movie_poster: string;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] =
    useState<Favorite[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } =
      await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id);

    if (!error && data) {
      setFavorites(data);
    }

    setLoading(false);
  };

  const removeFavorite = async (
    movieId: number
  ) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } =
      await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('movie_id', movieId);

    if (!error) {
      setFavorites((prev) =>
        prev.filter(
          (movie) =>
            movie.movie_id !== movieId
        )
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        Cargando favoritos...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-8 py-10">
      <h1 className="text-4xl font-bold mb-8">
        Mis Favoritos
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
              className="relative overflow-hidden rounded-xl bg-zinc-900 hover:scale-105 transition"
            >
              <img
                src={
                  movie.movie_poster
                }
                alt={
                  movie.movie_title
                }
                className="w-full h-80 object-cover"
              />

              <button
                onClick={() =>
                  removeFavorite(
                    movie.movie_id
                  )
                }
                className="absolute top-3 right-3 bg-black/70 w-10 h-10 rounded-full flex items-center justify-center text-2xl"
              >
                ❤️
              </button>

              <div className="p-4">
                <h2 className="font-bold text-lg">
                  {
                    movie.movie_title
                  }
                </h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}