'use client';

import { useEffect, useState } from 'react';

import axios from 'axios';

import {
  getImageUrl,
} from '@/lib/tmdb';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const API_KEY =
  'f70c90a6892c3d99e12c21a53ff2d79d';

export default function SearchPage() {
  const [query, setQuery] =
    useState('');

  const [movies, setMovies] =
    useState<Movie[]>([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (query.length > 2) {
      searchMovies();
    } else {
      setMovies([]);
    }
  }, [query]);

  const searchMovies = async () => {
    setLoading(true);

    try {
      const response =
        await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=es-ES&query=${query}`
        );

      setMovies(
        response.data.results
      );
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white px-8 py-10">
      <h1 className="text-5xl font-bold mb-8">
        Buscador
      </h1>

      <input
        type="text"
        placeholder="Buscar películas..."
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-4 outline-none mb-8"
      />

      {loading && (
        <p className="text-zinc-400 mb-6">
          Buscando...
        </p>
      )}

      {movies.length === 0 &&
        query.length > 2 &&
        !loading && (
          <p className="text-zinc-500">
            No se encontraron
            resultados
          </p>
        )}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="overflow-hidden rounded-xl bg-zinc-900 hover:scale-105 transition"
          >
            <img
              src={getImageUrl(
                movie.poster_path
              )}
              alt={movie.title}
              className="w-full h-80 object-cover"
            />

            <div className="p-4">
              <h2 className="font-bold">
                {movie.title}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}