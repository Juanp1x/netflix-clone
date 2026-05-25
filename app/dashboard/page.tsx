'use client';

import { useEffect, useState } from 'react';

interface Movie {
    id: number;
    title: string;
    image: string;
}

export default function DashboardPage() {
    const movies: Movie[] = [
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
        {
            id: 5,
            title: 'Inception',
            image:
                'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
        },
        {
            id: 6,
            title: 'The Matrix',
            image:
                'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=1200&auto=format&fit=crop',
        },
        {
            id: 7,
            title: 'Breaking Bad',
            image:
                'https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?q=80&w=1200&auto=format&fit=crop',
        },
        {
            id: 8,
            title: 'Dark',
            image:
                'https://images.unsplash.com/photo-1519996529931-28324d5a630e?q=80&w=1200&auto=format&fit=crop',
        },
        {
            id: 9,
            title: 'Peaky Blinders',
            image:
                'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop',
        },
        {
            id: 10,
            title: 'John Wick',
            image:
                'https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1200&auto=format&fit=crop',
        },
        {
            id: 11,
            title: 'The Witcher',
            image:
                'https://images.unsplash.com/photo-1499364615650-ec38552f4f34?q=80&w=1200&auto=format&fit=crop',
        },
        {
            id: 12,
            title: 'Narcos',
            image:
                'https://images.unsplash.com/photo-1517174637803-6929e01b5db4?q=80&w=1200&auto=format&fit=crop',
        },
        {
            id: 13,
            title: 'Loki',
            image:
                'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1200&auto=format&fit=crop',
        },
        {
            id: 14,
            title: 'Moon Knight',
            image:
                'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?q=80&w=1200&auto=format&fit=crop',
        },
        {
            id: 15,
            title: 'The Boys',
            image:
                'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
        },
        {
            id: 16,
            title: 'Arcane',
            image:
                'https://images.unsplash.com/photo-1517602302552-471fe67acf66?q=80&w=1200&auto=format&fit=crop',
        },
        {
            id: 17,
            title: 'Dune',
            image:
                'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop',
        },
        {
            id: 18,
            title: 'Shogun',
            image:
                'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=1200&auto=format&fit=crop',
        },
        {
            id: 19,
            title: 'The Last of Us',
            image:
                'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',
        },
        {
            id: 20,
            title: 'Deadpool',
            image:
                'https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=1200&auto=format&fit=crop',
        },
        {
            id: 21,
            title: 'Stranger Things',
            image:
                'https://images.unsplash.com/photo-1516280030429-27679b3dc9cf?q=80&w=1200&auto=format&fit=crop',
        },
        {
            id: 22,
            title: 'Gladiator',
            image:
                'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop',
        },
        {
            id: 23,
            title: 'The Flash',
            image:
                'https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=1200&auto=format&fit=crop',
        },
        {
            id: 24,
            title: 'Spider-Man',
            image:
                'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
        },
    ];

    const [favorites, setFavorites] = useState<Movie[]>([]);

    useEffect(() => {
        const savedFavorites = localStorage.getItem('favorites');

        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);

    const toggleFavorite = (movie: Movie) => {
        const exists = favorites.find(
            (fav) => fav.id === movie.id
        );

        let updatedFavorites: Movie[];

        if (exists) {
            updatedFavorites = favorites.filter(
                (fav) => fav.id !== movie.id
            );
        } else {
            updatedFavorites = [...favorites, movie];
        }

        setFavorites(updatedFavorites);

        localStorage.setItem(
            'favorites',
            JSON.stringify(updatedFavorites)
        );
    };

    const isFavorite = (id: number) => {
        return favorites.some((fav) => fav.id === id);
    };

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
                            className="group relative overflow-hidden rounded-lg"
                        >
                            <img
                                src={movie.image}
                                alt={movie.title}
                                className="w-full h-72 object-cover group-hover:scale-110 transition duration-300"
                            />

                            <button
                                onClick={() => toggleFavorite(movie)}
                                className="absolute top-3 right-3 z-20 bg-black/70 w-10 h-10 rounded-full flex items-center justify-center text-2xl hover:scale-110 transition"
                            >
                                {isFavorite(movie.id) ? '❤️' : '🤍'}
                            </button>

                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-end p-4 pointer-events-none">
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