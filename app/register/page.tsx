'use client';

import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
  const [username, setUsername] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [message, setMessage] =
    useState<string | null>(null);

  const router = useRouter();

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    // REGISTRO AUTH
    const {
      data: authData,
      error: authError,
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setMessage(
        'Error en registro: ' +
          authError.message
      );
      return;
    }

    const userId =
      authData.user?.id;

    if (!userId) {
      setMessage(
        'No se pudo obtener el ID del usuario.'
      );
      return;
    }

    // INSERTAR EN PROFILES
    const {
      error: insertError,
    } = await supabase
      .from('profiles')
      .insert([
        {
          id: userId,
          username,
          correo: email,
          role: 'user',
        },
      ]);

    if (insertError) {
      setMessage(
        'Usuario creado pero no guardado: ' +
          insertError.message
      );
      return;
    }

    setMessage(
      'Registro exitoso. Ya puedes iniciar sesión.'
    );

    setTimeout(() => {
      router.push('/login');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-96 bg-zinc-900 p-10 rounded-lg flex flex-col gap-4">
        
        <h1 className="text-white text-3xl font-bold mb-2">
          Crear cuenta
        </h1>

        <form
          onSubmit={handleRegister}
          className="flex flex-col gap-4"
        >
          <input
            className="bg-zinc-700 text-white rounded p-3 text-sm outline-none"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
            required
          />

          <input
            className="bg-zinc-700 text-white rounded p-3 text-sm outline-none"
            placeholder="Correo electrónico"
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            required
          />

          <input
            className="bg-zinc-700 text-white rounded p-3 text-sm outline-none"
            placeholder="Contraseña"
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            required
          />

          <button
            type="submit"
            className="bg-red-600 text-white rounded py-3 font-bold hover:bg-red-700 transition"
          >
            Registrarse
          </button>
        </form>

        <p className="text-zinc-400 text-sm text-center">
          ¿Ya tienes cuenta?{' '}
          
          <button
            onClick={() =>
              router.push('/login')
            }
            className="text-white underline"
          >
            Inicia sesión aquí
          </button>
        </p>

        {message && (
          <p className="text-center text-sm mt-2 text-zinc-300">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}