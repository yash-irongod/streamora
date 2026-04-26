<p align="center">
  <a href="https://streamora-pied.vercel.app/">
    <img src="docs/hero-banner.png" alt="Streamora hero banner" width="100%" />
  </a>
</p>

<h1 align="center">Streamora</h1>

<p align="center">
  <strong>Premium movie and series discovery, watchlist, and analytics platform</strong>
</p>

<p align="center">
  <a href="https://github.com/yash-irongod/streamora">
    <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Repository" />
  </a>
  <a href="https://streamora-pied.vercel.app/">
    <img src="https://img.shields.io/badge/Live%20Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
</p>

<p align="center">
  Dark-first. TMDb-powered. Built to feel like a real product.
</p>

---

## Preview

<p align="center">
  <a href="https://streamora-pied.vercel.app/">
    <img src="docs/screenshots/home.png" alt="Streamora preview" width="100%" />
  </a>
</p>

<p align="center">
  <img src="docs/screenshots/search.png" alt="Search preview" width="31%" />
  <img src="docs/screenshots/detail.png" alt="Detail preview" width="31%" />
  <img src="docs/screenshots/analytics.png" alt="Analytics preview" width="31%" />
</p>

---

## Overview

Streamora is a polished entertainment platform for browsing movies, TV series, and people from TMDb. It combines search, filters, detail pages, a persistent watchlist, and a clean analytics dashboard in one responsive React app.

---

## Highlights

- Cinematic home page with featured content rows
- Multi-type search for movies, series, and people
- Rich detail pages with cast, providers, and recommendations
- Watchlist with add/remove and watched status
- Analytics for genre and collection insights
- Dark/light mode
- Responsive mobile and desktop layouts
- Lazy loading, code splitting, and error boundaries

---

## Tech Stack

<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-764ABC?style=flat-square&logo=redux&logoColor=white" alt="Redux Toolkit" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white" alt="React Router" />
  <img src="https://img.shields.io/badge/TMDb_API-01D277?style=flat-square&logo=themoviedatabase&logoColor=white" alt="TMDb API" />
  <img src="https://img.shields.io/badge/Recharts-22B5BF?style=flat-square" alt="Recharts" />
</p>

---

## Project Structure

~~~text
src/
├── components/
├── constants/
├── hooks/
├── pages/
├── routes/
├── services/
├── store/
└── styles/
~~~

---

## Routes

- `/` — Home
- `/movies` — Movies
- `/series` — TV series
- `/trending` — Trending titles
- `/movie/:id` — Movie details
- `/tv/:id` — TV details
- `/person/:id` — Person profile
- `/search` — Search
- `/watchlist` — Saved titles
- `/analytics` — Watchlist insights

---

## Getting Started

~~~bash
git clone https://github.com/yash-irongod/streamora.git
cd streamora
npm install
npm run dev
~~~

Create a `.env` file:

~~~env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
~~~

---

## Deployment

Live demo: https://streamora-pied.vercel.app/

Streamora is deployed on Vercel as a static frontend app with route rewrites configured through `vercel.json`.

---

## Built With

<p align="center">
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Vite-Build%20Tool-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Redux-State%20Management-764ABC?style=flat-square&logo=redux&logoColor=white" alt="Redux" />
  <img src="https://img.shields.io/badge/TMDb-Content%20API-01D277?style=flat-square&logo=themoviedatabase&logoColor=white" alt="TMDb" />
  <img src="https://img.shields.io/badge/Vercel-Deployment-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" />
</p>

---

## Notes

This project is for academic and portfolio use.  
Not affiliated with TMDb.

<p align="center">
  <sub>Streamora — built for discovery, designed to feel premium.</sub>
</p>