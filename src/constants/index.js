// ═══════════════════════════════════════════════════════════════════════════
// STREAMORA — Constants & Configuration
// ═══════════════════════════════════════════════════════════════════════════

// TMDb API configuration from environment variables
export const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
export const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';

// Image size presets
export const IMG_SIZES = {
  poster: {
    small: `${IMAGE_BASE_URL}/w185`,
    medium: `${IMAGE_BASE_URL}/w342`,
    large: `${IMAGE_BASE_URL}/w500`,
  },
  backdrop: {
    small: `${IMAGE_BASE_URL}/w780`,
    original: `${IMAGE_BASE_URL}/original`,
  },
  profile: {
    small: `${IMAGE_BASE_URL}/w185`,
  },
  logo: {
    small: `${IMAGE_BASE_URL}/w45`,
  },
};

// Movie genre map
export const GENRES_MOVIE = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Sci-Fi' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

// TV genre map
export const GENRES_TV = [
  { id: 10759, name: 'Action' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 10762, name: 'Kids' },
  { id: 9648, name: 'Mystery' },
  { id: 10763, name: 'News' },
  { id: 10764, name: 'Reality' },
  { id: 10765, name: 'Sci-Fi' },
  { id: 10766, name: 'Soap' },
  { id: 10767, name: 'Talk' },
  { id: 10768, name: 'War' },
  { id: 37, name: 'Western' },
];

// Combined genre lookup (for analytics)
export const ALL_GENRES = [...GENRES_MOVIE, ...GENRES_TV];

// Flat genre ID → name map (single source of truth for MediaCard + Analytics)
export const GENRE_IDS_MAP = ALL_GENRES.reduce((map, g) => {
  if (!map[g.id]) map[g.id] = g.name;
  return map;
}, {});

// Navigation routes
export const NAV_ITEMS = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'movies', label: 'Movies', path: '/movies' },
  { id: 'series', label: 'Series', path: '/series' },
  { id: 'trending', label: 'Trending', path: '/trending' },
  { id: 'analytics', label: 'Analytics', path: '/analytics' },
];

// Sort options for browse pages
export const SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Most Popular' },
  { value: 'vote_average.desc', label: 'Top Rated' },
  { value: 'primary_release_date.desc', label: 'Newest' },
  { value: 'revenue.desc', label: 'Highest Grossing' },
];

// Sort options for watchlist
export const WATCHLIST_SORT_OPTIONS = [
  { value: 'added', label: 'Recently Added' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'title', label: 'A–Z' },
  { value: 'year', label: 'Newest First' },
];

// Local storage keys
export const STORAGE_KEYS = {
  WATCHLIST: 'streamora_wl',
  THEME: 'streamora_theme',
};
