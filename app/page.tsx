import Link from 'next/link';

export default function Home() {
  return (
    <section className="relative h-screen overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop"
        alt="banner"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

      <div className="relative z-10 flex items-center h-full px-10">
        <div className="max-w-2xl">
          <h1 className="text-7xl font-black leading-tight mb-6">
            Películas y series ilimitadas
          </h1>

          <p className="text-xl text-zinc-300 mb-8">
            Disfruta donde quieras.
          </p>

          <div className="flex gap-4">
            <Link
              href="/dashboard"
              className="bg-red-600 hover:bg-red-700 transition px-8 py-4 rounded text-lg font-bold"
            >
              Explorar
            </Link>

            <Link
              href="/login"
              className="bg-zinc-700/70 hover:bg-zinc-600 transition px-8 py-4 rounded text-lg font-bold"
            >
              Iniciar sesión
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}