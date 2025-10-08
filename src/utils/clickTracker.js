import { logClickEvent } from "./supabaseApi.js";

const EVENT_STORAGE_KEY = "foodie_map_click_events_v1";

function readEvents() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(EVENT_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

export function recordClickEvent(event) {
  if (typeof window === "undefined") return;
  const { category, id, name } = event || {};
  if (!category || !id || !name) return;

  const events = readEvents();
  const timestamp = Date.now();
  events.push({ category, id, name, timestamp });
  const maxEvents = 2000;
  const trimmed = events.length > maxEvents ? events.slice(events.length - maxEvents) : events;
  try {
    window.localStorage.setItem(EVENT_STORAGE_KEY, JSON.stringify(trimmed));
  } catch (error) {
    // ignore write errors
  }

  logClickEvent({ category, spotId: id }).then(({ error }) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.warn("Failed to log click event:", error.message);
    }
  });
}

export function getClickEvents() {
  return readEvents();
}

export function aggregateEventCounts(events) {
  if (!Array.isArray(events)) return {};
  return events.reduce((accumulator, entry) => {
    const targetId = entry?.target_id || entry?.id;
    if (!targetId) return accumulator;
    const current = accumulator[targetId] || 0;
    accumulator[targetId] = current + 1;
    return accumulator;
  }, {});
}
