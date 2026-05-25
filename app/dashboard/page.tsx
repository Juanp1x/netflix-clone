'use client';

import { useEffect, useState } from 'react';
import {
  getTrendingMovies,
  getImageUrl,
} from '@/lib/tmdb';

import { supabase } from '@/lib/supabaseClient';

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
}

export default function DashboardPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [userId, setUserId] =
    useState<string>('');

  useEffect(() => {
    getUser();
    loadMovies();
  }, []);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setUserId(user.id);
      loadFavorites(user.id);
    }
  };

  const loadMovies = async () => {
    const data =
      await getTrendingMovies();

    setMovies(data);
  };

  const loadFavorites = async (
    userId: string
  ) => {
    const { data } = await supabase
      .from('favorites')
      .select('movie_id')
      .eq('user_id', userId);

    if (data) {
      setFavorites(
        data.map(
          (movie) => movie.movie_id
        )
      );
    }
  };

  const toggleFavorite = async (
    movie: Movie
  ) => {
    const exists =
      favorites.includes(movie.id);

    // ELIMINAR
    if (exists) {
      const { error } =
        await supabase
          .from('favorites')
          .delete()
          .eq('user_id', userId)
          .eq('movie_id', movie.id);

      if (!error) {
        setFavorites((prev) =>
          prev.filter(
            (id) => id !== movie.id
          )
        );
      }

      return;
    }

    // VERIFICAR DUPLICADO
    const {
      data: existingMovie,
    } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('movie_id', movie.id)
      .maybeSingle();

    if (existingMovie) {
      return;
    }

    // INSERTAR
    const { error } =
      await supabase
        .from('favorites')
        .insert([
          {
            user_id: userId,
            movie_id: movie.id,
            movie_title:
              movie.title,
            movie_poster:
              getImageUrl(
                movie.poster_path
              ),
          },
        ]);

    if (!error) {
      setFavorites((prev) => [
        ...prev,
        movie.id,
      ]);
    } else {
      console.log(error);
    }
  };

  const isFavorite = (
    id: number
  ) => {
    return favorites.includes(id);
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
                src={getImageUrl(
                  movie.poster_path
                )}
                alt={movie.title}
                className="w-full h-80 object-cover group-hover:scale-105 transition"
              />

              <button
                onClick={() =>
                  toggleFavorite(
                    movie
                  )
                }
                className="absolute top-3 right-3 z-20 bg-black/70 w-10 h-10 rounded-full flex items-center justify-center text-2xl hover:scale-110 transition"
              >
                {isFavorite(
                  movie.id
                )
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