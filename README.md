<p align="center">
  <a href="https://streamora-pied.vercel.app/">
    <img src="docs/screenshots/home.png" alt="Streamora Interface" width="100%" />
  </a>
</p>

<h1 align="center">Streamora</h1>

<p align="center">
  <strong>Cinematic discovery. Deep analytics. Your ultimate streaming companion.</strong>
</p>

<p align="center">
  <a href="https://streamora-pied.vercel.app/">
    <img src="https://img.shields.io/badge/Live_Demo-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
  <a href="https://github.com/yash-irongod/streamora">
    <img src="https://img.shields.io/badge/GitHub_Repo-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Repo" />
  </a>
</p>

<br>

Streamora is a high-performance entertainment discovery platform powered by the [TMDb API](https://www.themoviedb.org/). Designed with a cinematic, dark-first aesthetic, it offers a seamless native-app feel for exploring media, curating watchlists, and uncovering personal viewing analytics.

<br>

## Previews

<div align="center">
  <img src="docs/screenshots/detail.png" alt="Media Detail View" width="49%" />
  <img src="docs/screenshots/search.png" alt="Global Search" width="49%" />
  <br>
  <img src="docs/screenshots/watchlist.png" alt="Watchlist Manager" width="49%" />
  <img src="docs/screenshots/analytics.png" alt="Viewing Analytics" width="49%" />
</div>

<br>

## Features

- **Cinematic Interface** — Auto-rotating hero showcases, dynamic content rows, and immersive media detail pages.
- **Lightning Search** — Real-time debounced global search across movies, series, and cast. Press `/` anywhere to open.
- **Deep Analytics** — Personal viewing charts, genre distribution breakdowns, and platform trends powered by Recharts.
- **Smart Watchlist** — Persistent local tracking. Filter, sort, manage progress, and export data in one click.
- **Fluid Architecture** — Skeleton loading states, smooth routing transitions, and responsive design tailored for all devices.

<br>

## Architecture

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Core** | React 19 + Vite 8 | Component architecture with instant HMR |
| **State** | Redux Toolkit | Centralized watchlist, theme, and UI slices |
| **Routing** | React Router 7 | Lazy loading and intelligent scroll restoration |
| **Data** | TMDb API + Axios | Unified service layer with request cancellation |
| **Visuals** | Recharts + CSS | Custom properties, dark/light tokens, and data visualization |

<br>

## Quick Start

Requires Node.js 18+ and a free [TMDb API Key](https://www.themoviedb.org/settings/api).

```bash
git clone https://github.com/yash-irongod/streamora.git
cd streamora
npm install
```

Create a `.env` file in the project root:

```env
VITE_TMDB_API_KEY=your_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

```bash
npm run dev
# Running on http://localhost:5173
```

<br>

## Deployment

Streamora is optimized for seamless edge deployment. Live preview is hosted on [Vercel](https://streamora-pied.vercel.app/).

```bash
npm run build
npx vercel --prod
```

---

<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=redux&logoColor=white" alt="Redux Toolkit" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white" alt="React Router" />
  <img src="https://img.shields.io/badge/Recharts-22B5BF?style=flat-square&logo=databricks&logoColor=white" alt="Recharts" />
</p>

<p align="center">
  <small>Data provided by <a href="https://www.themoviedb.org/">The Movie Database</a>. Not affiliated with or endorsed by TMDb.</small>
</p>