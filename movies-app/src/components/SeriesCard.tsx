import Link from "next/link";
import { Series } from "@/app/types/series";
import { getImageUrl } from "@/app/api/tmdb";

interface SeriesCardProps {
  series: Series;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    year: "numeric",
  });
};

export const SeriesCard = ({ series }: SeriesCardProps) => (
  <Link
    href={`/series/${series.id}`}
    className="bg-gray-800 rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 group relative block"
  >
    <div className="relative overflow-hidden">
      <img
        src={getImageUrl(series.poster_path)}
        alt={series.name}
        className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1">
        <span className="text-yellow-400">★</span>
        <span className="text-white font-medium">
          {series.vote_average.toFixed(1)}
        </span>
      </div>

      <div className="absolute top-3 left-3 bg-purple-500/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
        <span className="text-white text-sm font-medium">
          {formatDate(series.first_air_date)}
        </span>
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-5 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">
          {series.name}
        </h3>
        <p className="text-gray-200 text-sm line-clamp-2">
          {series.overview}
        </p>
        <button className="mt-4 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full transition-colors w-full">
          Ver Detalhes
        </button>
      </div>
    </div>
  </Link>
);
