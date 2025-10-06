import React from "react";

export default function StatsTable({ rows = [], labels, heading, emptyMessage }) {
  const safeEmptyMessage = emptyMessage || "No data available.";

  if (!rows.length) {
    return (
      <section className="stats-section">
        {heading ? <h2>{heading}</h2> : null}
        <div className="stats-table stats-table--empty">
          <p>{safeEmptyMessage}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="stats-section">
      {heading ? <h2>{heading}</h2> : null}
      <table className="stats-table">
        <thead>
          <tr>
            <th scope="col">{labels.rank}</th>
            <th scope="col">{labels.name}</th>
            <th scope="col">{labels.clicks}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id}>
              <td>{index + 1}</td>
              <td>{row.name}</td>
              <td>{row.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
