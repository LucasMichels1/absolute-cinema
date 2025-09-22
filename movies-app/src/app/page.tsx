"use client";

import { useState } from "react";
import { MovieGrid } from "@/components/MovieGrid";
import { SeriesGrid } from "@/components/SeriesGrid";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchTerm(searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Header */}
      <header className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-center text-white mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Catálogo de Filmes e Séries
          </span>
        </h1>
        <p className="text-gray-400 text-center text-lg mb-8">
          Descubra os filmes e séries mais populares do momento
        </p>

        {/* Search */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar filmes ou séries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors"
              >
                Buscar
              </button>
            </div>
          </form>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="container mx-auto px-4 pb-12 space-y-16">
        {/* Filmes */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Filmes Populares</h2>
          <MovieGrid searchTerm={searchTerm} />
        </section>

        {/* Séries */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Séries Populares</h2>
          <SeriesGrid searchTerm={searchTerm} />
        </section>
      </main>
    </div>
  );
}
