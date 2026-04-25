// ═══════════════════════════════════════════════════════════════════════════
// STREAMORA — TrendChart Component (Recharts)
// ═══════════════════════════════════════════════════════════════════════════

import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function TrendChart({ trending = [] }) {
  const data = useMemo(() => {
    return trending.slice(0, 10).map((item) => ({
      name: (item.title || item.name || '').slice(0, 12) + (((item.title || item.name || '').length > 12) ? '…' : ''),
      popularity: Math.round(item.popularity),
    }));
  }, [trending]);

  return (
    <div className="analytics-card" style={{ gridColumn: 'span 2' }}>
      <h3>Trending This Week — Popularity Scores</h3>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
          <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
          <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13 }} labelStyle={{ color: 'var(--text-primary)' }} />
          <Area type="monotone" dataKey="popularity" stroke="#e63946" fill="#e63946" fillOpacity={0.12} strokeWidth={2} dot={{ fill: '#e63946', r: 4 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
