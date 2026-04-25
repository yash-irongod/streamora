// ═══════════════════════════════════════════════════════════════════════════
// STREAMORA — Watchlist Progress Chart (Personal Analytics)
// ═══════════════════════════════════════════════════════════════════════════

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['var(--accent)', 'var(--accent2)'];

export default function WatchlistProgressChart({ toWatch = 0, watched = 0 }) {
  const total = toWatch + watched;

  if (total === 0) {
    return (
      <div className="analytics-card">
        <h3>Collection Progress</h3>
        <div className="analytics-empty">
          <div className="analytics-empty-icon">🎯</div>
          <p>Start marking titles as watched to track your progress.</p>
        </div>
      </div>
    );
  }

  const percentage = Math.round((watched / total) * 100);
  const data = [
    { name: 'Watched', value: watched },
    { name: 'To Watch', value: toWatch },
  ];

  return (
    <div className="analytics-card">
      <h3>Collection Progress</h3>
      <div style={{ position: 'relative' }}>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              stroke="none"
            >
              {data.map((_, idx) => (
                <Cell key={idx} fill={COLORS[idx]} fillOpacity={0.8} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13 }}
              labelStyle={{ color: 'var(--text-primary)' }}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div className="progress-center-label">
          <span className="progress-pct">{percentage}%</span>
          <span className="progress-sub">watched</span>
        </div>
      </div>
      <div className="progress-legend">
        <span className="progress-legend-item">
          <span className="progress-dot" style={{ background: COLORS[0] }} />
          Watched ({watched})
        </span>
        <span className="progress-legend-item">
          <span className="progress-dot" style={{ background: COLORS[1] }} />
          To Watch ({toWatch})
        </span>
      </div>
    </div>
  );
}
