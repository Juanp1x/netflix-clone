'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { getImageUrl } from '@/lib/tmdb';

const API_KEY = 'TU_API_KEY_TMDB';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    if (query.length > 2) {
      searchMovies();
    }
  }, [query]);

  const searchMovies = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=es-ES&query=${query}`
    );

    setMovies(response.data.results);
  };

  return (
    <div className="min-h-screen bg-black text-white px-8 py-10">
      <h1 className="text-4xl font-bold mb-8">
        Buscador
      </h1>

      <input
        type="text"
        placeholder="Buscar películas..."
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
        className="w-full bg-zinc-900 border border-zinc-700 rounded p-4 outline-none mb-8"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="overflow-hidden rounded-lg"
          >
            <img
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              className="w-full h-80 object-cover"
            />

            <div className="bg-zinc-900 p-4">
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