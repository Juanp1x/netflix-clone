'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function ProfilePage() {
  const [userId, setUserId] =
    useState('');

  const [username, setUsername] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [avatar, setAvatar] =
    useState(
      'https://i.pravatar.cc/300'
    );

  const [message, setMessage] =
    useState('');

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const {
      data: { user },
    } =
      await supabase.auth.getUser();

    if (!user) return;

    setUserId(user.id);

    const { data: profile } =
      await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    if (profile) {
      setUsername(
        profile.username || ''
      );

      setEmail(
        profile.correo || ''
      );

      setAvatar(
        profile.avatar ||
          'https://i.pravatar.cc/300'
      );
    }

    setLoading(false);
  };

  const saveProfile =
    async () => {
      const { error } =
        await supabase
          .from('profiles')
          .update({
            username,
            avatar,
          })
          .eq('id', userId);

      if (error) {
        setMessage(
          'Error al guardar perfil'
        );
        return;
      }

      setMessage(
        'Perfil actualizado correctamente'
      );
    };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Cargando perfil...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white flex items-center justify-center px-6 py-10">

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 w-full max-w-md shadow-2xl">

        <div className="flex flex-col items-center">

          <div className="relative group mb-6">

            <img
              src={avatar}
              alt="avatar"
              className="w-36 h-36 rounded-full border-4 border-red-600 object-cover shadow-xl"
            />

            <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-sm font-bold">
              Cambiar foto
            </div>
          </div>

          <h1 className="text-4xl font-black mb-1">
            Mi Perfil
          </h1>

          <p className="text-zinc-400 mb-8">
            Personaliza tu cuenta
          </p>

          <div className="w-full flex flex-col gap-5">

            <div>
              <label className="text-sm text-zinc-400 block mb-2">
                Nombre de usuario
              </label>

              <input
                type="text"
                value={username}
                onChange={(e) =>
                  setUsername(
                    e.target.value
                  )
                }
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 outline-none focus:border-red-600 transition"
              />
            </div>

            <div>
              <label className="text-sm text-zinc-400 block mb-2">
                Correo electrónico
              </label>

              <input
                type="email"
                value={email}
                disabled
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 opacity-70 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="text-sm text-zinc-400 block mb-2">
                URL de imagen
              </label>

              <input
                type="text"
                value={avatar}
                onChange={(e) =>
                  setAvatar(
                    e.target.value
                  )
                }
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 outline-none focus:border-red-600 transition"
              />
            </div>

            <button
              onClick={saveProfile}
              className="mt-4 bg-red-600 hover:bg-red-700 transition py-4 rounded-xl font-bold text-lg shadow-lg"
            >
              Guardar cambios
            </button>

            {message && (
              <p className="text-center text-sm text-zinc-300 mt-2">
                {message}
              </p>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}