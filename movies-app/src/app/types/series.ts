export interface Series {
  id: number;
  name: string; // AQUI NÃO TITLE, PORQUE A API RETORNA NOME
  overview: string;
  poster_path: string;
  backdrop_path?: string;
  first_air_date: string;
  vote_average: number;
  genres?: { id: number; name: string }[];
  episode_run_time?: number[];
}
