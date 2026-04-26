<p align="center">
  <a href="https://streamora-pied.vercel.app/">
    <img src="docs/screenshots/home.png" alt="Streamora" width="100%" />
  </a>
</p>

<h1 align="center">◈ Streamora</h1>

<p align="center">
  <strong>Movie and series discovery, watchlist, and analytics — built to feel like a real product.</strong>
</p>

<p align="center">
  <a href="https://streamora-pied.vercel.app/">
    <img src="https://img.shields.io/badge/Live%20Demo-streamora--pied.vercel.app-000000?style=flat-square&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
  &nbsp;
  <a href="https://github.com/yash-irongod/streamora">
    <img src="https://img.shields.io/badge/GitHub-yash--irongod/streamora-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite 8" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-2-764ABC?style=flat-square&logo=redux&logoColor=white" alt="Redux Toolkit" />
  <img src="https://img.shields.io/badge/React_Router-7-CA4245?style=flat-square&logo=reactrouter&logoColor=white" alt="React Router 7" />
  <img src="https://img.shields.io/badge/TMDb-API-01D277?style=flat-square&logo=themoviedatabase&logoColor=white" alt="TMDb API" />
  <img src="https://img.shields.io/badge/Recharts-2-22B5BF?style=flat-square" alt="Recharts" />
</p>

---

Streamora is a full-featured entertainment discovery platform powered by the [TMDb API](https://www.themoviedb.org/). Browse trending content, explore rich title pages with cast and streaming providers, build a tracked watchlist, and get personal analytics — all in a dark-first, cinematic React app.

---

## Screenshots

<p align="center">
  <img src="docs/screenshots/detail.png" alt="Detail page" width="49%" />
  <img src="docs/screenshots/search.png" alt="Search" width="49%" />
</p>

<p align="center">
  <img src="docs/screenshots/watchlist.png" alt="Watchlist" width="49%" />
  <img src="docs/screenshots/analytics.png" alt="Analytics" width="49%" />
</p>

---

## Features

**Home** — Auto-rotating cinematic hero (pause-on-hover) with curated rows for Trending, Top Rated, Popular Series, and Coming Soon.

**Search** — Debounced real-time search with tabbed results across Movies, TV Series, and People. URL-synced state. Popular suggestions when idle. Press `/` from anywhere to open instantly.

**Browse** — Genre filter chips, year range selector, sort controls, a sticky filter bar, and `vote_count`-filtered discover results.

**Detail pages** — Full-width backdrop, genre pills, rating + vote count, runtime, streaming providers, film collection awareness, cast grid, and similar title recommendations.

**Person profiles** — Photo, biography, age, filmography, and crew credits. Every cast card navigates here.

**Watchlist** — Persistent via `localStorage`. Add, remove, mark as watched, filter by type and status, sort by rating or year, and export as JSON.

**Analytics** — Personal charts driven by your watchlist: genre breakdown and collection progress. Platform charts: genre distribution, rating buckets, trending popularity, Movies vs TV comparison, and a clickable leaderboard.

**Dark / Light mode** — Dark-first design with a polished toggle, synced to `localStorage` across every surface.

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | React 19 + Vite 8 | Component architecture + instant HMR |
| **State** | Redux Toolkit | Watchlist, theme, toast — all slices |
| **Routing** | React Router v7 | Lazy routes + scroll reset on navigation |
| **HTTP** | Axios + AbortController | Unified TMDb service layer, cancel-safe |
| **Charts** | Recharts | Bar, donut, area, grouped bar charts |
| **Styling** | CSS custom properties + Tailwind base | Dark/light tokens, component styles |
| **API** | TMDb v3 (free, non-commercial) | Movies, TV, trending, cast, providers |
| **Performance** | `React.lazy` + `Suspense` + `memo` | Code splitting + targeted selectors |

---

## Routes

| Path | Page |
|---|---|
| `/` | Home — hero + curated content rows |
| `/movies` | Browse movies — search, genre, year, sort, paginate |
| `/series` | Browse TV series — same architecture |
| `/trending` | Trending — by type and time window |
| `/search` | Search — movies, series, and people |
| `/movie/:id` | Movie detail — backdrop, cast, providers, recommendations |
| `/tv/:id` | TV detail — seasons, episodes, cast, providers |
| `/person/:id` | Person profile — bio, filmography, crew |
| `/watchlist` | Watchlist — filter, sort, track, export |
| `/analytics` | Analytics — personal insights + platform charts |
| `*` | 404 |

---

## Project Structure

```
src/
├── components/
│   ├── analytics/      # GenreChart, RatingChart, TrendChart, CompareChart
│   ├── layout/         # Navbar, MobileNav, Layout
│   └── ui/             # MediaCard, HeroSection, ContentRow, Skeleton, Toast...
├── constants/          # API config, genre maps, sort options
├── hooks/              # useApi, useDebounce, useMediaDetails
├── pages/              # HomePage, BrowsePage, DetailPage, PersonPage...
├── routes/             # Lazy-loaded route definitions
├── services/           # tmdb.js — Axios instance + named API functions
├── store/              # themeSlice, watchlistSlice, recentlyViewedSlice
└── styles/             # index.css, components.css, layouts.css, animations.css
```

---

## Getting Started

**Requirements:** Node 18+ · A free [TMDb API key](https://www.themoviedb.org/settings/api)

```bash
git clone https://github.com/yash-irongod/streamora.git
cd streamora
npm install
npm run dev
# → http://localhost:5173
```

Create `.env` in the root:

```env
VITE_TMDB_API_KEY=your_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

```bash
npm run build   # → dist/
```

---

## Deployment

Live at **[streamora-pied.vercel.app](https://streamora-pied.vercel.app/)** — deployed on Vercel with SPA route rewrites via `vercel.json`.

```bash
npx vercel --prod
```

---

<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-764ABC?style=flat-square&logo=redux&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white" />
  <img src="https://img.shields.io/badge/Recharts-22B5BF?style=flat-square" />
  <img src="https://img.shields.io/badge/TMDb_API-01D277?style=flat-square&logo=themoviedatabase&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white" />
</p>

<p align="center">
  <sub>Content provided by <a href="https://www.themoviedb.org/">The Movie Database</a>. Not affiliated with or endorsed by TMDb. For educational and portfolio use.</sub>
</p>