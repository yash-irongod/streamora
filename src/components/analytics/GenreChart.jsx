// ═══════════════════════════════════════════════════════════════════════════
// STREAMORA — GenreChart Component (Recharts)
// ═══════════════════════════════════════════════════════════════════════════

import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ALL_GENRES } from '../../constants';

export default function GenreChart({ movies = [], tvShows = [] }) {
  const data = useMemo(() => {
    const genreCounts = {};
    [...movies, ...tvShows].forEach((item) => {
      (item.genre_ids || []).forEach((id) => {
        const genre = ALL_GENRES.find((g) => g.id === id);
        if (genre) genreCounts[genre.name] = (genreCounts[genre.name] || 0) + 1;
      });
    });
    return Object.entries(genreCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, count]) => ({ name, count }));
  }, [movies, tvShows]);

  return (
    <div className="analytics-card" style={{ gridColumn: 'span 2' }}>
      <h3>Genre Distribution — Top Rated Titles</h3>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
          <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
          <Tooltip
            contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13 }}
            labelStyle={{ color: 'var(--text-primary)' }}
          />
          <Bar dataKey="count" name="Titles" fill="#e63946" fillOpacity={0.5} stroke="#e63946" strokeWidth={1.5} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
