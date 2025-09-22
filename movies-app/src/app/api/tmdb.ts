// AQUI TEM AS CONFIGURAÇÕES DA API, ASSIM NÃO PRECISA FICAR PASSANDO TODA HORA QUE FOR CHAMAR A API A URL E A API KEY
// DESSA MANEIRA, O CÓDIGO FICA MAIS LIMPO, ESCALAVEL, MANUTENÇÃO FACIL E TUDO DA API FICA NUM SÓ LUGAR

import axios from "axios";
import { Movie } from "../types/movie";
import { Series } from "../types/series";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    // PARA NÃO PRECISAR COLCOAR TODOS OS PARAMÊTROS NA URL COMO API KEY, LINGUAGEM, O AXIOS TEM ESSA PROPRIEDADE
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
    language: "pt-BR",
  },
});

export const getImageUrl = (path: string) =>
  `https://image.tmdb.org/t/p/w500${path}`;

export const tmdb = {
  getPopularMovies: async (page = 1): Promise<Movie[]> => {
    const response = await api.get("/movie/popular", { params: { page } });
    return response.data.results;
  },

  searchMovies: async (query: string, page = 1): Promise<Movie[]> => {
    const response = await api.get("/search/movie", {
      params: { query, page },
    });
    return response.data.results;
  },

  getMovieDetails: async (id: number): Promise<Movie> => {
    const response = await api.get(`/movie/${id}`);
    return response.data;
  },

  // ADICIONA NOVAS FUNÇÕES SÓ QUE PARA SERIES

  getPopularSeries: async (page = 1): Promise<Series[]> => {
    const response = await api.get("/tv/popular", { params: { page } });
    return response.data.results;
  },

  searchSeries: async (query: string, page = 1): Promise<Series[]> => {
    const response = await api.get("/search/tv", { params: { query, page } });
    return response.data.results;
  },

  getSeriesDetails: async (id: number): Promise<Series> => {
    const response = await api.get(`/tv/${id}`);
    return response.data;
  },

  // METODOS PARA BUSCAR VÍDEOS/TRAILERS DE FILMES E SERIES

  getMovieVideos: async (id: number) => {
    const response = await api.get(`/movie/${id}/videos`);
    return response.data.results;
  },

  getSeriesVideos: async (id: number) => {
    const response = await api.get(`/tv/${id}/videos`);
    return response.data.results;
  },
};
