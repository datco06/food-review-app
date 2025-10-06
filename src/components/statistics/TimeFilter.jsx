import React from "react";

const DEFAULT_OPTIONS = [
  { value: "7", label: "7 ngày" },
  { value: "30", label: "30 ngày" },
  { value: "90", label: "90 ngày" },
  { value: "all", label: "Tất cả" },
];

export default function TimeFilter({ value, onChange, options = DEFAULT_OPTIONS }) {
  return (
    <div className="stats-time-filter">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={
            option.value === value
              ? "stats-time-filter__button stats-time-filter__button--active"
              : "stats-time-filter__button"
          }
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
