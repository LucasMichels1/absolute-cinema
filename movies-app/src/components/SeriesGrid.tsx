"use client";

import { useState, useEffect } from "react";
import { Series } from "../app/types/series";
import { SeriesCard } from "./SeriesCard";
import { tmdb } from "../app/api/tmdb";

interface SeriesGridProps {
  searchTerm: string;
}

export const SeriesGrid = ({ searchTerm }: SeriesGridProps) => {
  const [series, setSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSeries = async () => {
      try {
        setLoading(true);
        let data;
        if (searchTerm) {
          data = await tmdb.searchSeries(searchTerm);
        } else {
          data = await tmdb.getPopularSeries();
        }
        setSeries(data);
        setError(null);
      } catch (error) {
        console.error("Error:", error);
        setError("Falha ao carregar as séries. Por favor, tente novamente.");
      } finally {
        setLoading(false);
      }
    };
    loadSeries();
  }, [searchTerm]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-purple-500 animate-spin"></div>
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
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  if (series.length === 0) {
    return (
      <div className="text-center text-gray-400 py-12">
        {searchTerm
          ? "Nenhuma série encontrada para sua busca."
          : "Nenhuma série disponível."}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {series.map((serie) => (
        <SeriesCard key={serie.id} series={serie} />
      ))}
    </div>
  );
};
