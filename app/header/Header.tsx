'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  useRouter,
  usePathname,
} from 'next/navigation';

import { supabase } from '@/lib/supabaseClient';

import type { User } from '@supabase/supabase-js';

const PUBLIC_ROUTES = [
  '/login',
  '/register',
];

export default function Header() {
  const [user, setUser] =
    useState<User | null>(null);

  const [isAdmin, setIsAdmin] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const router = useRouter();

  const pathname =
    usePathname();

  useEffect(() => {
    checkSession();

    const {
      data: { subscription },
    } =
      supabase.auth.onAuthStateChange(
        () => {
          checkSession();
        }
      );

    return () =>
      subscription.unsubscribe();
  }, []);

  const checkSession =
    async () => {
      const {
        data: { session },
      } =
        await supabase.auth.getSession();

      const currentUser =
        session?.user ?? null;

      setUser(currentUser);

      if (currentUser) {
        const {
          data: profile,
        } = await supabase
          .from('profiles')
          .select('role')
          .eq(
            'id',
            currentUser.id
          )
          .single();

        setIsAdmin(
          profile?.role ===
            'admin'
        );
      } else {
        setIsAdmin(false);
      }

      setLoading(false);
    };

  useEffect(() => {
    if (
      !loading &&
      !user &&
      !PUBLIC_ROUTES.includes(
        pathname
      )
    ) {
      router.push('/login');
    }
  }, [
    user,
    loading,
    pathname,
    router,
  ]);

  const handleLogout =
    async () => {
      await supabase.auth.signOut();

      window.location.href =
        '/login';
    };

  if (
    PUBLIC_ROUTES.includes(
      pathname
    )
  ) {
    return null;
  }

  if (loading) {
    return null;
  }

  if (!user) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur border-b border-zinc-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        <Link
          href="/dashboard"
          className="text-red-600 text-4xl font-bold"
        >
          NETFLIX
        </Link>

        <nav className="flex gap-6 items-center text-sm">

          <Link href="/dashboard">
            Inicio
          </Link>

          <Link href="/search">
            Buscar
          </Link>

          <Link href="/favorites">
            Favoritos
          </Link>

          <Link href="/profile">
            Perfil
          </Link>

          {isAdmin && (
            <Link
              href="/admin"
              className="text-red-500"
            >
              Admin
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="text-zinc-400 hover:text-red-500"
          >
            Cerrar sesión
          </button>
        </nav>
      </div>
    </header>
  );
}