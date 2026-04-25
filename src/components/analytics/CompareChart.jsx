import { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function CompareChart({ movies = [], tvShows = [] }) {
  const data = useMemo(() => {
    const movieAvg = movies.length
      ? (movies.reduce((total, item) => total + item.vote_average, 0) / movies.length).toFixed(2)
      : 0;
    const tvAvg = tvShows.length
      ? (tvShows.reduce((total, item) => total + item.vote_average, 0) / tvShows.length).toFixed(2)
      : 0;
    const movieTop = movies.length
      ? movies.reduce((highest, item) => Math.max(highest, item.vote_average), 0).toFixed(2)
      : 0;
    const tvTop = tvShows.length
      ? tvShows.reduce((highest, item) => Math.max(highest, item.vote_average), 0).toFixed(2)
      : 0;

    return [
      { metric: 'Avg Rating', Movies: +movieAvg, 'TV Series': +tvAvg },
      { metric: 'Top Score', Movies: +movieTop, 'TV Series': +tvTop },
      { metric: 'Titles Tracked', Movies: movies.length, 'TV Series': tvShows.length },
    ];
  }, [movies, tvShows]);

  return (
    <div className="analytics-card">
      <h3>Movies vs Series</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="metric" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
          <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
          <Tooltip
            contentStyle={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              fontSize: 13,
            }}
          />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Bar
            dataKey="Movies"
            fill="var(--accent2)"
            fillOpacity={0.5}
            stroke="var(--accent2)"
            strokeWidth={1.5}
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="TV Series"
            fill="var(--accent)"
            fillOpacity={0.5}
            stroke="var(--accent)"
            strokeWidth={1.5}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
