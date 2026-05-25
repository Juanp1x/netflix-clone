import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Netflix Clone",
  description: "Netflix MVP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-black text-white">

        <header className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-sm border-b border-zinc-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

            <Link
              href="/"
              className="text-red-600 text-4xl font-bold tracking-wide"
            >
              NETFLIX
            </Link>

       <nav className="flex gap-6 text-sm font-medium">
  <Link href="/" className="hover:text-red-500">
    Inicio
  </Link>

  <Link
    href="/dashboard"
    className="hover:text-red-500"
  >
    Dashboard
  </Link>

  <Link
    href="/search"
    className="hover:text-red-500"
  >
    Buscar
  </Link>

  <Link
    href="/favorites"
    className="hover:text-red-500"
  >
    Favoritos
  </Link>

  <Link
    href="/profile"
    className="hover:text-red-500"
  >
    Perfil
  </Link>
</nav>

          </div>
        </header>

        <main className="pt-20">
          {children}
        </main>

      </body>
    </html>
  );
}