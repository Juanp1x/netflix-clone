'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  username: string;
  correo: string;
  role: string;
}

interface Favorite {
  id: string;
  user_id: string;
  movie_id: number;
  movie_title: string;
  movie_poster: string;
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push('/login');
      return;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile || profile.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    loadData();
  };

  const loadData = async () => {
    setLoading(true);

    const { data: usersData } = await supabase
      .from('profiles')
      .select('*');

    const { data: favoritesData } = await supabase
      .from('favorites')
      .select('*');

    setUsers(usersData || []);
    setFavorites(favoritesData || []);

    setLoading(false);
  };

  const deleteFavorite = async (id: string) => {
    await supabase
      .from('favorites')
      .delete()
      .eq('id', id);

    loadData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        Cargando panel admin...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold text-red-600 mb-10">
        Panel Administrativo
      </h1>

      {/* Usuarios */}
      <section className="mb-14">
        <h2 className="text-3xl font-bold mb-5">
          Usuarios Registrados
        </h2>

        <div className="overflow-hidden rounded-xl border border-zinc-800">
          <table className="w-full bg-zinc-900">
            <thead className="bg-red-700">
              <tr>
                <th className="p-4 text-left">
                  Usuario
                </th>

                <th className="p-4 text-left">
                  Correo
                </th>

                <th className="p-4 text-left">
                  Rol
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-zinc-800"
                >
                  <td className="p-4">
                    {user.username}
                  </td>

                  <td className="p-4">
                    {user.correo}
                  </td>

                  <td className="p-4 capitalize">
                    {user.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Favoritos */}
      <section>
        <h2 className="text-3xl font-bold mb-5">
          Favoritos de Usuarios
        </h2>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((movie) => (
            <div
              key={movie.id}
              className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg"
            >
              <img
                src={movie.movie_poster}
                alt={movie.movie_title}
                className="w-full h-80 object-cover"
              />

              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">
                  {movie.movie_title}
                </h3>

                <p className="text-zinc-400 text-sm mb-4 break-all">
                  Usuario: {movie.user_id}
                </p>

                <button
                  onClick={() =>
                    deleteFavorite(movie.id)
                  }
                  className="bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-lg w-full"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}