// ═══════════════════════════════════════════════════════════════════════════
// STREAMORA — TMDb API Service
// ═══════════════════════════════════════════════════════════════════════════

import axios from 'axios';
import { API_KEY, BASE_URL } from '../constants';

// Configured Axios instance
const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// ─── Trending ────────────────────────────────────────────────────────────
export const getTrending = (mediaType = 'all', timeWindow = 'day') =>
  tmdb.get(`/trending/${mediaType}/${timeWindow}`).then((res) => res.data);

// ─── Movies ──────────────────────────────────────────────────────────────
export const getTopRatedMovies = (page = 1) =>
  tmdb.get('/movie/top_rated', { params: { page } }).then((res) => res.data);

export const getPopularMovies = (page = 1) =>
  tmdb.get('/movie/popular', { params: { page } }).then((res) => res.data);

export const getUpcomingMovies = (page = 1) =>
  tmdb.get('/movie/upcoming', { params: { page } }).then((res) => res.data);

// ─── TV Series ───────────────────────────────────────────────────────────
export const getTopRatedTV = (page = 1) =>
  tmdb.get('/tv/top_rated', { params: { page } }).then((res) => res.data);

export const getPopularTV = (page = 1) =>
  tmdb.get('/tv/popular', { params: { page } }).then((res) => res.data);

// ─── Discovery ───────────────────────────────────────────────────────────
export const discoverMedia = (type = 'movie', params = {}) =>
  tmdb.get(`/discover/${type}`, { params }).then((res) => res.data);

// ─── Search ──────────────────────────────────────────────────────────────
export const searchMulti = (query, page = 1) =>
  tmdb.get('/search/multi', { params: { query, page } }).then((res) => res.data);

// ─── Details ─────────────────────────────────────────────────────────────
export const getMediaDetails = (type, id, options = {}) =>
  tmdb.get(`/${type}/${id}`, {
    params: { append_to_response: 'credits,similar,recommendations,watch/providers' },
    ...options,
  }).then((res) => res.data);

// ─── Watch Providers ─────────────────────────────────────────────────────
export const getWatchProviders = (type, id) =>
  tmdb.get(`/${type}/${id}/watch/providers`).then((res) => res.data);

export default tmdb;
