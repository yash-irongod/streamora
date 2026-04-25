export function StatCard({ label, value, sub }) {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  );
}

export function StatGrid({ stats }) {
  return (
    <div className="stat-grid stat-grid-auto">
      {stats.map((stat) => (
        <StatCard key={stat.label} label={stat.label} value={stat.value} sub={stat.sub} />
      ))}
    </div>
  );
}
