<p align="center">
  <span style="font-size: 2.5rem;">◈</span>
</p>

<h1 align="center">Streamora</h1>

<p align="center">
  <strong>Movie & Series Discovery, Watchlist, and Trend Analytics Platform</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#routes">Routes</a> •
  <a href="#license">License</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite 8" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-2-764ABC?style=flat-square&logo=redux&logoColor=white" alt="Redux Toolkit" />
  <img src="https://img.shields.io/badge/TMDb-API-01D277?style=flat-square&logo=themoviedatabase&logoColor=white" alt="TMDb API" />
  <img src="https://img.shields.io/badge/Recharts-2-22B5BF?style=flat-square" alt="Recharts" />
</p>

---

Streamora is a premium, Netflix-inspired entertainment platform built with React. It connects to The Movie Database (TMDb) API to let users discover, search, filter, and save movies and TV shows — complete with cast information, streaming providers, genre-based browsing, and data-driven analytics dashboards.

> Built as a capstone project, designed to look and feel like a real commercial product.

---

## Features

### 🏠 Home
- Auto-rotating hero banner with trending backdrops
- Curated content rows: Trending, Top Rated, Popular Series, Coming Soon
- Horizontal scroll with poster cards, type badges, and star ratings

### 🔍 Search & Discovery
- Real-time debounced search across movies and TV shows
- Genre filter chips with toggle behavior
- Sort by popularity, rating, release date, or revenue
- Paginated results with windowed page navigation

### 🎬 Rich Detail Pages
- Full-width cinematic backdrop with gradient overlay
- Movie poster, genre pills, rating badge, runtime/season metadata
- Complete synopsis and "Add to Watchlist" action
- Streaming provider logos (where available)
- Cast grid with circular avatars and character names
- "You Might Also Like" recommendations row

### 📌 Watchlist
- Add/remove with instant toast feedback
- Persistent storage via `localStorage`
- Filter by Movies / Series
- Sort by recently added, rating, title, or year
- Polished empty state with CTA

### 📊 Analytics Dashboard
- **Stat Cards** — Watchlist size, movies vs series count, average rating
- **Genre Distribution** — Bar chart of top genres across top-rated titles
- **Rating Buckets** — Donut chart breaking down 6-7 / 7-8 / 8-9 / 9-10 ranges
- **Trending Popularity** — Area chart of this week's most popular titles
- **Movies vs Series** — Grouped bar chart comparing avg rating, top score, title count
- **Leaderboard** — Top 5 highest-rated titles across movies and TV

### 🌗 Dark & Light Mode
- Dark-first premium design with CSS custom properties
- Smooth theme toggle synced to `localStorage`
- Consistent theming across all pages and components

### 📱 Responsive Design
- Desktop navbar with active route highlighting
- Mobile bottom navigation bar with icon + label
- Fluid card grids, adaptive hero, responsive detail layout

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | React 19 + Vite 8 | Component architecture + fast HMR |
| **State** | Redux Toolkit | Theme, watchlist, toast management |
| **Routing** | React Router v7 | Client-side routing with lazy loading |
| **HTTP** | Native Fetch API | Data fetching with AbortController |
| **Charts** | Recharts | Declarative SVG-based data viz |
| **Styling** | CSS Custom Properties + Tailwind base | Dark/light theming, responsive layouts |
| **API** | TMDb (free, non-commercial) | Movies, TV, trending, cast, providers |
| **Performance** | React.lazy + Suspense + memo | Code splitting and render optimization |

---

## Architecture

```
streamora/
├── public/
├── src/
│   ├── main.jsx                    # App entry — Provider + BrowserRouter
│   ├── App.jsx                     # Theme sync + route mount
│   │
│   ├── constants/
│   │   └── index.js                # API config, genres, nav items, sort options
│   │
│   ├── services/
│   │   └── tmdb.js                 # Axios instance + named API functions
│   │
│   ├── store/
│   │   ├── index.js                # configureStore
│   │   ├── themeSlice.js           # Dark/light + localStorage
│   │   ├── watchlistSlice.js       # Add/remove + persist
│   │   └── toastSlice.js           # Transient notifications
│   │
│   ├── hooks/
│   │   ├── useApi.js               # Generic data fetching hook
│   │   ├── useDebounce.js          # Search input debounce
│   │   └── useLocalStorage.js      # localStorage sync
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx          # Desktop nav + theme toggle
│   │   │   ├── MobileNav.jsx       # Bottom tab bar
│   │   │   └── Layout.jsx          # Shell with Outlet
│   │   │
│   │   ├── ui/
│   │   │   ├── Icons.jsx           # SVG icon components
│   │   │   ├── HeroSection.jsx     # Auto-rotating hero banner
│   │   │   ├── ContentRow.jsx      # Horizontal scroll section
│   │   │   ├── MediaCard.jsx       # Poster card with actions
│   │   │   ├── SkeletonCard.jsx    # Shimmer loading placeholder
│   │   │   ├── SearchInput.jsx     # Search with icon overlay
│   │   │   ├── FilterChips.jsx     # Toggleable filter pills
│   │   │   ├── Pagination.jsx      # Windowed page navigation
│   │   │   ├── PageHeader.jsx      # Title + subtitle + gradient bar
│   │   │   ├── EmptyState.jsx      # Friendly empty views
│   │   │   ├── Toast.jsx           # Auto-dismiss notifications
│   │   │   └── ErrorBoundary.jsx   # Graceful error fallback
│   │   │
│   │   └── analytics/
│   │       ├── StatCard.jsx        # KPI display card + grid
│   │       ├── GenreChart.jsx      # Genre distribution bar chart
│   │       ├── RatingChart.jsx     # Rating buckets donut chart
│   │       ├── TrendChart.jsx      # Popularity area chart
│   │       └── CompareChart.jsx    # Movies vs Series comparison
│   │
│   ├── pages/
│   │   ├── HomePage.jsx            # Hero + content rows
│   │   ├── BrowsePage.jsx          # Search + filter + sort + grid
│   │   ├── TrendingPage.jsx        # Type + time window filters
│   │   ├── DetailPage.jsx          # Full title info + cast + similar
│   │   ├── WatchlistPage.jsx       # Saved titles management
│   │   ├── AnalyticsPage.jsx       # Charts + stats dashboard
│   │   └── NotFoundPage.jsx        # 404 fallback
│   │
│   ├── routes/
│   │   └── index.jsx               # Lazy-loaded route definitions
│   │
│   └── styles/
│       ├── index.css               # Design system + CSS vars + reset
│       ├── animations.css          # Keyframe animations
│       ├── components.css          # Component-level styles
│       └── layouts.css             # Layout + responsive styles
│
├── .env                            # TMDb API key (git-ignored)
├── index.html                      # Vite entry HTML
├── package.json
├── vite.config.js
└── tailwind.config.js
```

---

## Routes

| Path | Page | Description |
|---|---|---|
| `/` | Home | Hero banner + curated content rows |
| `/movies` | Movies | Browse with search, genre filters, sort, pagination |
| `/series` | Series | Same architecture with TV-specific genres |
| `/trending` | Trending | Filter by All/Movies/Series + Today/This Week |
| `/movie/:id` | Movie Detail | Backdrop, poster, cast, providers, recommendations |
| `/tv/:id` | TV Detail | Same layout with seasons and episode count |
| `/watchlist` | Watchlist | Saved titles with filter, sort, and remove |
| `/analytics` | Analytics | 4 charts, stat grid, top-rated leaderboard |
| `*` | 404 | Friendly not-found with "Go Home" CTA |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- A free [TMDb API key](https://www.themoviedb.org/settings/api)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/streamora.git
cd streamora

# Install dependencies
npm install
```

### Environment Setup

Create a `.env` file in the project root:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

### Development

```bash
npm run dev
# → http://localhost:5173
```

### Production Build

```bash
npm run build
# → Output in dist/
```

### Deployment

Deploy the `dist/` directory to any static hosting provider:

```bash
# Vercel
npx vercel --prod

# Netlify
npx netlify deploy --prod --dir=dist
```

---

## Design Philosophy

Streamora draws visual inspiration from leading entertainment and SaaS products:

- **Netflix / Disney+ / Apple TV+** — Dark-first cinematic UI, hero banners, horizontal content rows
- **Spotify** — Smooth transitions, card-based browsing, genre exploration
- **Stripe / Linear / Vercel** — Clean typography, restrained color palette, premium feel
- **Notion / Airtable** — Thoughtful empty states, functional filter systems

### Design Tokens

| Token | Dark | Light |
|---|---|---|
| Background | `#0a0a0f` | `#f5f5fa` |
| Cards | `#16161f` | `#ffffff` |
| Accent | `#e63946` | `#e63946` |
| Accent 2 | `#3a86ff` | `#3a86ff` |
| Gold | `#f4a261` | `#f4a261` |
| Display Font | Sora | Sora |
| Body Font | DM Sans | DM Sans |

---

## API Reference

This project uses the [TMDb API v3](https://developer.themoviedb.org/docs) (free for non-commercial use).

| Endpoint | Usage |
|---|---|
| `/trending/{type}/{window}` | Home hero + trending page |
| `/movie/top_rated` | Top rated films row + analytics |
| `/movie/popular` | Popular movies |
| `/movie/upcoming` | Coming soon row |
| `/tv/top_rated` | Top rated TV + analytics |
| `/tv/popular` | Popular series row |
| `/discover/{type}` | Browse with genre/sort filters |
| `/search/multi` | Cross-type search |
| `/{type}/{id}` | Detail page (with `append_to_response`) |
| `/{type}/{id}/watch/providers` | Streaming provider logos |

---

## License

This project is for **educational and personal use**. It is not affiliated with or endorsed by TMDb. All movie and TV data is provided by [The Movie Database](https://www.themoviedb.org/).

<p align="center">
  <sub>Built with ❤️ using React, Vite, and TMDb</sub>
</p>