import React from "react";

export default function StatsChart({ rows = [] }) {
  if (!rows.length) return null;
  const max = Math.max(...rows.map((item) => item.count));

  return (
    <div className="stats-chart">
      {rows.map((row, index) => {
        const width = max > 0 ? Math.max((row.count / max) * 100, 6) : 0;
        return (
          <div key={row.id} className="stats-chart__row">
            <span className="stats-chart__rank">#{index + 1}</span>
            <span className="stats-chart__label">{row.name}</span>
            <div className="stats-chart__bar" style={{ width: `${width}%` }}>
              <span className="stats-chart__value">{row.count}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
