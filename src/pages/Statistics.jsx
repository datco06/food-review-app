import React, { useCallback, useEffect, useMemo, useState } from "react";
import TimeFilter from "../components/statistics/TimeFilter.jsx";
import { TIME_WINDOWS } from "../components/statistics/timeWindows.js";
import StatsChart from "../components/statistics/StatsChart.jsx";
import StatsTable from "../components/statistics/StatsTable.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { getSpotName } from "../data/spotCatalog.js";
import { getClickEvents } from "../utils/clickTracker.js";
import { fetchClickEvents } from "../utils/supabaseApi.js";
import "../styles/charts.css";

const CATEGORY_OPTIONS = [
  { id: "foods", label: { vi: "Món ăn", en: "Foods" } },
  { id: "drinks", label: { vi: "Thức uống", en: "Drinks" } },
  { id: "snacks", label: { vi: "Ăn vặt", en: "Snacks" } },
];

const CATEGORY_STORAGE_KEYS = {
  foods: "foodie_map_food_clicks",
  drinks: "foodie_map_drink_clicks",
  snacks: "foodie_map_snack_clicks",
};

const TIME_FILTER_OPTIONS = {
  vi: [
    { value: "7", label: "7 ngày" },
    { value: "30", label: "30 ngày" },
    { value: "90", label: "90 ngày" },
    { value: "all", label: "Tất cả" },
  ],
  en: [
    { value: "7", label: "7 days" },
    { value: "30", label: "30 days" },
    { value: "90", label: "90 days" },
    { value: "all", label: "All time" },
  ],
};

const RANGE_LABELS = {
  vi: {
    "7": "7 ngày qua",
    "30": "30 ngày qua",
    "90": "90 ngày qua",
    all: "từ trước đến nay",
  },
  en: {
    "7": "last 7 days",
    "30": "last 30 days",
    "90": "last 90 days",
    all: "all time",
  },
};

const LABELS = {
  vi: {
    heading: "Thống kê lượt click",
    rank: "Top",
    name: "Địa điểm",
    clicks: "Lượt click",
    refresh: "Làm mới",
    empty: "Chưa có dữ liệu cho bộ lọc này.",
    chartTitle: "Top 5 địa điểm nổi bật",
    tableTitle: "Bảng thống kê chi tiết",
    summary: {
      total: "Tổng lượt click",
      unique: "Địa điểm ghi nhận",
      top: "Địa điểm dẫn đầu",
      noData: "Chưa có dữ liệu",
      lastActivity: "Lượt click gần nhất",
      noActivity: "Chưa ghi nhận",
    },
  },
  en: {
    heading: "Click statistics",
    rank: "Rank",
    name: "Location",
    clicks: "Clicks",
    refresh: "Refresh",
    empty: "No data for this filter yet.",
    chartTitle: "Top 5 highlights",
    tableTitle: "Detailed leaderboard",
    summary: {
      total: "Total clicks",
      unique: "Locations tracked",
      top: "Top location",
      noData: "No data yet",
      lastActivity: "Last click",
      noActivity: "No activity yet",
    },
  },
};

function formatRelativeTime(language, timestamp) {
  if (!timestamp) return null;
  const locale = language === "vi" ? "vi" : "en";
  const diffInSeconds = Math.round((timestamp - Date.now()) / 1000);
  const absSeconds = Math.abs(diffInSeconds);

  const ranges = [
    { limit: 60, divisor: 1, unit: "second" },
    { limit: 3600, divisor: 60, unit: "minute" },
    { limit: 86400, divisor: 3600, unit: "hour" },
    { limit: 604800, divisor: 86400, unit: "day" },
    { limit: 2629800, divisor: 604800, unit: "week" },
    { limit: 31557600, divisor: 2629800, unit: "month" },
    { limit: Infinity, divisor: 31557600, unit: "year" },
  ];

  const range = ranges.find((item) => absSeconds < item.limit);
  if (!range) return null;

  const value = Math.round(diffInSeconds / range.divisor);
  if (typeof Intl === "undefined" || typeof Intl.RelativeTimeFormat === "undefined") {
    const absoluteValue = Math.abs(value);
    const fallbackUnits =
      language === "vi"
        ? {
            second: ["giây", "giây"],
            minute: ["phút", "phút"],
            hour: ["giờ", "giờ"],
            day: ["ngày", "ngày"],
            week: ["tuần", "tuần"],
            month: ["tháng", "tháng"],
            year: ["năm", "năm"],
          }
        : {
            second: ["second", "seconds"],
            minute: ["minute", "minutes"],
            hour: ["hour", "hours"],
            day: ["day", "days"],
            week: ["week", "weeks"],
            month: ["month", "months"],
            year: ["year", "years"],
          };
    if (absoluteValue === 0) {
      return language === "vi" ? "vừa xong" : "just now";
    }
    const unitForms = fallbackUnits[range.unit] || fallbackUnits.second;
    const unitLabel = absoluteValue === 1 ? unitForms[0] : unitForms[1];
    const suffix = language === "vi" ? "trước" : "ago";
    return `${absoluteValue} ${unitLabel} ${suffix}`;
  }

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  return rtf.format(value, range.unit);
}

function filterEvents(events, category, rangeValue) {
  const windowMs = TIME_WINDOWS[rangeValue];
  const now = Date.now();
  return events.filter((event) => {
    if (event.category !== category) return false;
    if (!windowMs) return true;
    return now - event.timestamp <= windowMs;
  });
}

function aggregateEvents(events) {
  const map = new Map();
  events.forEach((event) => {
    const key = event.id;
    if (!map.has(key)) {
      map.set(key, { id: event.id, name: event.name, count: 0 });
    }
    map.get(key).count += 1;
  });
  return Array.from(map.values()).sort((a, b) => b.count - a.count);
}

function readStoredClickCounts(category) {
  if (typeof window === "undefined") return {};
  const storageKey = CATEGORY_STORAGE_KEYS[category];
  if (!storageKey) return {};
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    return {};
  }
}

function mergeWithStoredCounts(rows, category, language) {
  const storedCounts = readStoredClickCounts(category);
  const hasStoredCounts = Object.keys(storedCounts).length > 0;

  if (!rows.length && !hasStoredCounts) {
    return rows;
  }

  const dataset = new Map();

  rows.forEach((row) => {
    dataset.set(row.id, {
      id: row.id,
      count: row.count,
      name: getSpotName(category, row.id, language) || row.name || row.id,
    });
  });

  Object.entries(storedCounts).forEach(([id, value]) => {
    const numericValue = typeof value === "number" ? value : Number(value);
    if (!Number.isFinite(numericValue) || numericValue <= 0) return;

    const localizedName = getSpotName(category, id, language) || dataset.get(id)?.name || id;
    if (dataset.has(id)) {
      const existing = dataset.get(id);
      dataset.set(id, {
        ...existing,
        count: Math.max(existing.count, numericValue),
        name: localizedName,
      });
    } else {
      dataset.set(id, {
        id,
        count: numericValue,
        name: localizedName,
      });
    }
  });

  return Array.from(dataset.values()).sort((a, b) => b.count - a.count);
}

export default function Statistics() {
  const { language } = useLanguage();
  const labels = LABELS[language];
  const [range, setRange] = useState("30");
  const [category, setCategory] = useState("foods");
  const [localEvents, setLocalEvents] = useState(() => getClickEvents());
  const [remoteEvents, setRemoteEvents] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState(null);

  useEffect(() => {
    const updateEvents = () => {
      setLocalEvents(getClickEvents());
    };

    updateEvents();
    window.addEventListener("focus", updateEvents);
    return () => window.removeEventListener("focus", updateEvents);
  }, []);

  const loadRemoteEvents = useCallback(async () => {
    try {
      setIsSyncing(true);
      setSyncError(null);
      const windowMs = TIME_WINDOWS[range];
      const since = windowMs ? new Date(Date.now() - windowMs) : null;
      const { data, error } = await fetchClickEvents({ category, since });
      if (error) {
        throw error;
      }
      const mapped = (data || [])
        .map((entry) => ({
          category: entry.page,
          id: entry.target_id,
          name: null,
          timestamp: entry.created_at ? Date.parse(entry.created_at) : Date.now(),
        }))
        .filter((event) =>
          event.category && event.id && Number.isFinite(event.timestamp),
        );
      setRemoteEvents(mapped);
    } catch (error) {
      setRemoteEvents([]);
      setSyncError(error.message);
    } finally {
      setIsSyncing(false);
    }
  }, [category, range]);

  useEffect(() => {
    loadRemoteEvents();
  }, [loadRemoteEvents]);

  const combinedEvents = useMemo(() => {
    const deduped = new Map();
    [...remoteEvents, ...localEvents].forEach((event) => {
      if (!event || !event.category || !event.id) return;
      const timestampValue = typeof event.timestamp === "number" ? event.timestamp : Date.parse(event.timestamp);
      if (!Number.isFinite(timestampValue)) return;
      const key = `${event.category}|${event.id}|${timestampValue}`;
      if (!deduped.has(key)) {
        deduped.set(key, { ...event, timestamp: timestampValue });
      }
    });
    return Array.from(deduped.values());
  }, [remoteEvents, localEvents]);

  const { filteredRows, latestTimestamp } = useMemo(() => {
    const filteredEvents = filterEvents(combinedEvents, category, range);
    const latest = filteredEvents.reduce(
      (max, event) => (event.timestamp > max ? event.timestamp : max),
      0,
    );
    return {
      filteredRows: aggregateEvents(filteredEvents),
      latestTimestamp: latest,
    };
  }, [combinedEvents, category, range]);

  const mergedRows = mergeWithStoredCounts(filteredRows, category, language);
  const chartRows = mergedRows.slice(0, 5);
  const totalClicks = mergedRows.reduce((sum, row) => sum + row.count, 0);
  const rangeLabel = RANGE_LABELS[language][range];
  const topLocation = mergedRows[0];
  const lastActivity = formatRelativeTime(language, latestTimestamp);

  return (
    <section className="statistics-page container" data-reveal data-reveal-direction="up">
      <div className="stats-header">
        <div>
          <h1>{labels.heading}</h1>
          <p>
            {language === "vi"
              ? "Theo dõi những địa điểm được yêu thích nhất trong từng hạng mục."
              : "Track the most popular spots in each category."}
          </p>
        </div>
        <button
          type="button"
          className="stats-refresh"
          onClick={() => {
            setLocalEvents(getClickEvents());
            loadRemoteEvents();
          }}
          disabled={isSyncing}
        >
          {isSyncing
            ? language === "vi"
              ? "Đang đồng bộ..."
              : "Syncing..."
            : labels.refresh}
        </button>
      </div>

      {syncError ? (
        <div className="stats-error" role="alert">
          {language === "vi"
            ? `Không thể đồng bộ dữ liệu từ Supabase: ${syncError}`
            : `Unable to sync Supabase data: ${syncError}`}
        </div>
      ) : null}

      <div className="stats-summary">
        <article className="stats-summary__card">
          <span className="stats-summary__label">{labels.summary.total}</span>
          <strong className="stats-summary__value">{totalClicks}</strong>
          <span className="stats-summary__meta">{rangeLabel}</span>
        </article>
        <article className="stats-summary__card">
          <span className="stats-summary__label">{labels.summary.unique}</span>
          <strong className="stats-summary__value">{mergedRows.length}</strong>
          <span className="stats-summary__meta">{rangeLabel}</span>
        </article>
        <article className="stats-summary__card">
          <span className="stats-summary__label">{labels.summary.top}</span>
          <strong className="stats-summary__value">
            {topLocation ? topLocation.name : labels.summary.noData}
          </strong>
          <span className="stats-summary__meta">
            {lastActivity ? `${labels.summary.lastActivity}: ${lastActivity}` : labels.summary.noActivity}
          </span>
        </article>
      </div>

      <div className="stats-controls">
        <div className="stats-category-switch">
          {CATEGORY_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              className={
                option.id === category
                  ? "stats-category-switch__button stats-category-switch__button--active"
                  : "stats-category-switch__button"
              }
              onClick={() => setCategory(option.id)}
            >
              {option.label[language]}
            </button>
          ))}
        </div>

        <TimeFilter value={range} onChange={setRange} options={TIME_FILTER_OPTIONS[language]} />
      </div>

      <div className="stats-section">
        <h2>{labels.chartTitle}</h2>
        {chartRows.length ? (
          <StatsChart rows={chartRows} />
        ) : (
          <div className="stats-empty">
            <p>{labels.empty}</p>
          </div>
        )}
      </div>
      <StatsTable
        rows={mergedRows}
        labels={{ rank: labels.rank, name: labels.name, clicks: labels.clicks }}
        heading={labels.tableTitle}
        emptyMessage={labels.empty}
      />
    </section>
  );
}
