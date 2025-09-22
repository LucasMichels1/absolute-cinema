import { tmdb, getImageUrl } from "@/app/api/tmdb";

interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path?: string;
  release_date: string;
  vote_average: number;
  genres?: { id: number; name: string }[];
  runtime?: number;
}

export default async function MovieDetailsPage({ params,}: {params: { id: string } }) {
  const movieId = Number(params.id);
  const movie: MovieDetail = await tmdb.getMovieDetails(movieId);
  const videos = await tmdb.getMovieVideos(movieId);

  const trailer = videos.find(
    (v: any) => v.type === "Trailer" && v.site === "YouTube"
  );

  if (!movie) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <h2 className="text-2xl font-bold mb-4">Filme não encontrado</h2>
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
            src={getImageUrl(movie.backdrop_path || movie.poster_path)}
            alt={movie.title}
            className="w-full h-[600px] object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        </div>

        <div className="relative container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8 pt-[200px]">
            <div className="flex-shrink-0">
              <img
                src={getImageUrl(movie.poster_path)}
                alt={movie.title}
                className="w-64 rounded-xl shadow-2xl"
              />
            </div>

            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {movie.title}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <span className="bg-blue-500 px-3 py-1 rounded-full text-sm">
                  {new Date(movie.release_date).getFullYear()}
                </span>
                {movie.runtime && (
                  <span className="text-gray-300">
                    {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                  </span>
                )}
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span>{movie.vote_average.toFixed(1)}</span>
                </div>
              </div>

              {movie.genres && (
                <div className="flex gap-2 mb-6">
                  {movie.genres.map((genre) => (
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
                {movie.overview}
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


