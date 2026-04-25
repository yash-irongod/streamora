import { useMemo } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['var(--accent2)', 'var(--accent)', 'var(--gold)', 'var(--green)'];

export default function RatingChart({ movies = [], tvShows = [] }) {
  const data = useMemo(() => {
    const buckets = { '6-7': 0, '7-8': 0, '8-9': 0, '9-10': 0 };

    [...movies, ...tvShows].forEach((item) => {
      const rating = item.vote_average;
      if (rating >= 6 && rating < 7) buckets['6-7'] += 1;
      else if (rating >= 7 && rating < 8) buckets['7-8'] += 1;
      else if (rating >= 8 && rating < 9) buckets['8-9'] += 1;
      else if (rating >= 9) buckets['9-10'] += 1;
    });

    return Object.entries(buckets).map(([name, value]) => ({ name, value }));
  }, [movies, tvShows]);

  return (
    <div className="analytics-card">
      <h3>Rating Buckets</h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                fillOpacity={0.6}
                stroke={COLORS[index % COLORS.length]}
                strokeWidth={1.5}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              fontSize: 13,
            }}
          />
          <Legend wrapperStyle={{ fontSize: 11, color: 'var(--text-muted)' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
