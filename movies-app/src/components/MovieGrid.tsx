//



"use client";

import { useState, useEffect } from "react";
import { Movie } from "../app/types/movie";
import { MovieCard } from "./MovieCard";
import { tmdb } from "../app/api/tmdb";

interface MovieGridProps {
  searchTerm: string;
}

export const MovieGrid = ({ searchTerm }: MovieGridProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        let data;
        if (searchTerm) {
          data = await tmdb.searchMovies(searchTerm);
        } else {
          data = await tmdb.getPopularMovies();
        }
        setMovies(data);
        setError(null);
      } catch (error) {
        console.error("Error:", error);
        setError("Falha ao carregar os filmes. Por favor, tente novamente.");
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, [searchTerm]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin"></div>
          <p className="text-white mt-4 text-center">Carregando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-gray-800 p-8 rounded-xl text-center max-w-md">
          <p className="text-xl font-semibold text-white mb-2">Ops!</p>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center text-gray-400 py-12">
        {searchTerm
          ? "Nenhum filme encontrado para sua busca."
          : "Nenhum filme disponível."}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
