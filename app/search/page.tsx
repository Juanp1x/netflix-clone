'use client';

import { useState } from 'react';

export default function SearchPage() {
  const [search, setSearch] = useState('');

  const movies = [
    'Interstellar',
    'Batman',
    'Joker',
    'Avengers',
    'Breaking Bad',
    'Dark',
  ];

  const filteredMovies = movies.filter((movie) =>
    movie.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white px-8 py-10">
      <h1 className="text-4xl font-bold mb-8">
        Buscador
      </h1>

      <input
        type="text"
        placeholder="Buscar películas o series..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-zinc-900 border border-zinc-700 rounded p-4 outline-none mb-8"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredMovies.map((movie) => (
          <div
            key={movie}
            className="bg-zinc-900 p-6 rounded-lg hover:bg-zinc-800 transition"
          >
            <h2 className="text-xl font-bold">
              {movie}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}