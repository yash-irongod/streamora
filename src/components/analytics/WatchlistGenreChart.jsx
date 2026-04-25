// ═══════════════════════════════════════════════════════════════════════════
// STREAMORA — Watchlist Genre Chart (Personal Analytics)
// ═══════════════════════════════════════════════════════════════════════════

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function WatchlistGenreChart({ data = [] }) {
  if (data.length === 0) {
    return (
      <div className="analytics-card">
        <h3>Your Watchlist by Genre</h3>
        <div className="analytics-empty">
          <div className="analytics-empty-icon">📊</div>
          <p>Add titles to your watchlist to see your genre preferences.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-card" style={{ gridColumn: 'span 2' }}>
      <h3>Your Watchlist by Genre</h3>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
          <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} allowDecimals={false} />
          <Tooltip
            contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13 }}
            labelStyle={{ color: 'var(--text-primary)' }}
          />
          <Bar dataKey="count" name="Titles" fill="var(--accent2)" fillOpacity={0.6} stroke="var(--accent2)" strokeWidth={1.5} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}