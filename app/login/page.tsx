'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const router = useRouter();

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      setMessage(
        'Error al iniciar sesión: ' + error.message
      );
      return;
    }

    if (data.user) {
      setMessage(
        'Bienvenido, sesión iniciada correctamente.'
      );

      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      
      <div className="w-96 bg-zinc-900 p-10 rounded-lg flex flex-col gap-4">
        
        <h1 className="text-white text-3xl font-bold mb-2">
          Iniciar sesión
        </h1>

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4"
        >
          
          <input
            className="bg-zinc-700 text-white rounded p-3 text-sm outline-none"
            placeholder="Correo electrónico"
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            className="bg-zinc-700 text-white rounded p-3 text-sm outline-none"
            placeholder="Contraseña"
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button
            type="submit"
            className="bg-red-600 text-white rounded py-3 font-bold hover:bg-red-700"
          >
            Iniciar sesión
          </button>
        </form>

        <p className="text-zinc-400 text-sm text-center">
          ¿No tienes cuenta?{' '}

          <button
            onClick={() =>
              router.push('/register')
            }
            className="text-white underline"
          >
            Regístrate aquí
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