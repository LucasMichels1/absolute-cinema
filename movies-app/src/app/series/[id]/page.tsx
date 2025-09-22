import { tmdb, getImageUrl } from "@/app/api/tmdb";

interface SeriesDetail {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path?: string;
  first_air_date: string;
  vote_average: number;
  genres?: { id: number; name: string }[];
  number_of_seasons?: number;
  number_of_episodes?: number;
}

export default async function SeriesDetailsPage({params,}: {params: { id: string };}) {
  const seriesId = Number(params.id);
  const series: SeriesDetail = await tmdb.getSeriesDetails(seriesId);
  const videos = await tmdb.getSeriesVideos(seriesId);

  // Pega trailer do YouTube, se existir
  const trailer = videos.find(
    (v: any) => v.type === "Trailer" && v.site === "YouTube"
  );

  if (!series) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <h2 className="text-2xl font-bold mb-4">Série não encontrada</h2>
        <a
          href="/"
          className="px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Voltar para Home
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="relative">
        <div className="absolute inset-0">
          <img
            src={getImageUrl(series.backdrop_path || series.poster_path)}
            alt={series.name}
            className="w-full h-[600px] object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        </div>

        <div className="relative container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8 pt-[200px]">
            <div className="flex-shrink-0">
              <img
                src={getImageUrl(series.poster_path)}
                alt={series.name}
                className="w-64 rounded-xl shadow-2xl"
              />
            </div>

            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {series.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <span className="bg-blue-500 px-3 py-1 rounded-full text-sm">
                  {new Date(series.first_air_date).getFullYear()}
                </span>
                {series.number_of_seasons && (
                  <span className="text-gray-300">
                    {series.number_of_seasons} temporada(s)
                  </span>
                )}
                {series.number_of_episodes && (
                  <span className="text-gray-300">
                    {series.number_of_episodes} episódios
                  </span>
                )}
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span>{series.vote_average.toFixed(1)}</span>
                </div>
              </div>

              {series.genres && (
                <div className="flex gap-2 mb-6">
                  {series.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-gray-800 px-3 py-1 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {series.overview}
              </p>

              <a
                href="/"
                className="px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Voltar para Home
              </a>
            </div>
          </div>

          
          {trailer && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-white mb-4">Trailer</h2>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="Trailer"
                  allowFullScreen
                  className="w-full h-[500px] rounded-xl"
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
