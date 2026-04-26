<p align="center">
  <a href="https://streamora-pied.vercel.app/">
    <img src="docs/screenshots/home.png" alt="Streamora — Movie & Series Discovery Platform" width="100%" style="border-radius:12px;" />
  </a>
</p>

<br/>

<p align="center">
  <img src="https://img.shields.io/badge/◈-Streamora-e63946?style=for-the-badge&labelColor=0a0a0f&color=e63946" alt="Streamora" />
</p>

<p align="center">
  <strong>Discover. Save. Understand what to watch next.</strong>
</p>

<p align="center">
  <a href="https://streamora-pied.vercel.app/">
    <img src="https://img.shields.io/badge/Live%20Demo-streamora--pied.vercel.app-000000?style=flat-square&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
  &nbsp;
  <a href="https://github.com/yash-irongod/streamora">
    <img src="https://img.shields.io/badge/GitHub-yash--irongod%2Fstreamora-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub" />
  </a>
  &nbsp;
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite 8" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-2-764ABC?style=flat-square&logo=redux&logoColor=white" alt="Redux Toolkit" />
  <img src="https://img.shields.io/badge/TMDb-API-01D277?style=flat-square&logo=themoviedatabase&logoColor=white" alt="TMDb" />
</p>

<br/>

Streamora is a full-featured entertainment discovery platform powered by the TMDb API. Browse trending movies and TV series, explore rich detail pages with cast and streaming providers, build a personal watchlist with watched/to-watch tracking, and get genre and analytics insights — all in a dark-first, cinematic React app.

<br/>

---

## Screenshots

<p align="center">
  <a href="https://streamora-pied.vercel.app/">
    <img src="docs/screenshots/home.png" alt="Home" width="100%" />
  </a>
</p>

<p align="center">
  <img src="docs/screenshots/detail.png" alt="Detail page" width="49%" />
  <img src="docs/screenshots/search.png" alt="Search" width="49%" />
</p>

<p align="center">
  <img src="docs/screenshots/watchlist.png" alt="Watchlist" width="49%" />
  <img src="docs/screenshots/analytics.png" alt="Analytics" width="49%" />
</p>

---

## What's inside

**Home** — Auto-rotating cinematic hero with pause-on-hover. Curated rows for Trending, Top Rated, Popular Series, and Coming Soon. Scroll-row fade gradient signals more content.

**Search** — Debounced real-time search with tabbed results across Movies, TV Series, and People. URL-synced query state. Popular search suggestions when idle.

**Browse** — Genre filter chips, year range selector, sort controls, and a "This Year" quick filter. Sticky filter bar. Paginated discover results.

**Detail pages** — Full-width backdrop, genre pills, rating badge, runtime, streaming providers, cast grid, film collection awareness, and a "You Might Also Like" row.

**Person profiles** — Biography, filmography, crew credits, age calculation. Every cast card navigates here.

**Watchlist** — Persistent via `localStorage`. Add, remove, mark as watched, filter by type and status, sort, and export as JSON.

**Analytics** — Personal genre breakdown and collection progress from your watchlist. Global platform charts: genre distribution, rating buckets, trending popularity, Movies vs TV comparison, and a clickable top-rated leaderboard.

**Dark / Light mode** — Dark-first design with a smooth toggle, persisted to `localStorage`, consistent across every surface.

**Keyboard shortcut** — Press `/` from anywhere to jump directly to search.

---

## Tech

| | |
|---|---|
| **Framework** | React 19 + Vite 8 |
| **State** | Redux Toolkit — watchlist, theme, toast |
| **Routing** | React Router v7 — lazy-loaded routes, scroll reset |
| **Data** | Axios + `AbortController` — unified TMDb service layer |
| **Charts** | Recharts — bar, donut, area, grouped bar |
| **Styling** | CSS custom properties + Tailwind base — dark/light tokens, component styles |
| **API** | TMDb v3 — free, non-commercial |
| **Performance** | `React.lazy` + `Suspense` + `memo` — code splitting, targeted selectors |

---

## Routes

```
/                  Home
/movies            Browse movies — search, filter, sort, paginate
/series            Browse TV series
/trending          Trending by type and time window
/search            Full search — movies, series, people
/movie/:id         Movie detail
/tv/:id            TV series detail
/person/:id        Person profile + filmography
/watchlist         Personal watchlist
/analytics         Watchlist insights + platform charts
```

---

## Getting started

**Requirements:** Node 18+ · A free [TMDb API key](https://www.themoviedb.org/settings/api)

```bash
git clone https://github.com/yash-irongod/streamora.git
cd streamora
npm install
```

Create `.env` in the project root:

```env
VITE_TMDB_API_KEY=your_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

```bash
npm run dev        # → localhost:5173
npm run build      # → dist/
```

---

## Deployment

Live at **[streamora-pied.vercel.app](https://streamora-pied.vercel.app/)** — deployed on Vercel with SPA route rewrites via `vercel.json`.

To deploy your own:

```bash
npx vercel --prod
```

All client-side routes (`/movie/:id`, `/person/:id`, etc.) resolve correctly in production.

---

<p align="center">
  <img src="https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Vite_8-646CFF?style=flat-square&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-764ABC?style=flat-square&logo=redux&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Router_v7-CA4245?style=flat-square&logo=reactrouter&logoColor=white" />
  <img src="https://img.shields.io/badge/Recharts-22B5BF?style=flat-square" />
  <img src="https://img.shields.io/badge/TMDb_API-01D277?style=flat-square&logo=themoviedatabase&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white" />
</p>

<p align="center">
  <sub>Content provided by <a href="https://www.themoviedb.org/">TMDb</a>. Not affiliated with or endorsed by TMDb.<br/>Built for portfolio and educational use.</sub>
</p>