"use client";

import { SlidersHorizontal, X } from "lucide-react";

type FilterBarProps = {
  label: string;
  active: string;
  items: string[];
  onChange: (item: string) => void;
  resultCount: number;
  totalCount: number;
  noun: string;
};

function toTestId(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function FilterBar({
  label,
  active,
  items,
  onChange,
  resultCount,
  totalCount,
  noun,
}: FilterBarProps) {
  const hasFilter = active !== "All";

  return (
    <div className="filter-toolbar">
      <div className="filter-summary">
        <span className="filter-summary-icon" aria-hidden="true">
          <SlidersHorizontal size={16} />
        </span>
        <div>
          <p>{label}</p>
          <strong aria-live="polite">
            {resultCount} / {totalCount} {noun}
          </strong>
        </div>
      </div>

      <div className="filter-bar" aria-label={label}>
        {items.map((item) => (
          <button
            key={item}
            type="button"
            data-testid={`filter-${toTestId(label)}-${toTestId(item)}`}
            className={active === item ? "active" : ""}
            aria-pressed={active === item}
            onClick={() => onChange(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="filter-reset"
        data-testid={`filter-${toTestId(label)}-clear`}
        disabled={!hasFilter}
        aria-label={hasFilter ? `Clear ${active} filter` : "No active filter"}
        title={hasFilter ? `Clear ${active} filter` : "No active filter"}
        onClick={() => onChange("All")}
      >
        <X size={14} />
        Clear
      </button>
    </div>
  );
}
