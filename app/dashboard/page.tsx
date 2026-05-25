export default function DashboardPage() {
  const movies = [
    {
      id: 1,
      title: 'Interstellar',
      image:
        'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 2,
      title: 'Batman',
      image:
        'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 3,
      title: 'Joker',
      image:
        'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 4,
      title: 'Avengers',
      image:
        'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1200&auto=format&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white px-8 py-10">
      <h1 className="text-4xl font-bold mb-8">
        Dashboard principal
      </h1>

      <section className="mb-10">
        <div
          className="h-[500px] rounded-xl bg-cover bg-center relative overflow-hidden"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=2070&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-10">
            <h2 className="text-6xl font-bold mb-4">
              Interstellar
            </h2>

            <p className="text-zinc-300 text-lg max-w-xl mb-6">
              Una aventura épica a través del espacio y el tiempo.
            </p>

            <button className="bg-white text-black px-6 py-3 rounded font-bold w-fit hover:bg-zinc-300 transition">
              Ver ahora
            </button>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-2xl font-bold mb-6">
          Tendencias
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="group relative overflow-hidden rounded-lg cursor-pointer"
            >
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-72 object-cover group-hover:scale-110 transition duration-300"
              />

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                <h4 className="font-bold text-lg">
                  {movie.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}