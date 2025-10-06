import { assertSupabaseClient } from "./supabaseClient.js";

export async function logClickEvent({ category, spotId, page, targetId }) {
  const client = assertSupabaseClient();
  const payload = {
    page: page || category || null,
    target_id: targetId || spotId || null,
  };

  const cleanedPayload = Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== null && value !== undefined && value !== ""),
  );

  if (!cleanedPayload.page || !cleanedPayload.target_id) {
    return { error: new Error("Missing page or target_id for click event") };
  }

  const { error } = await client.from("click_events").insert(cleanedPayload);
  return { error: error ? new Error(error.message) : null };
}

export async function fetchReviews({ foodId }) {
  const client = assertSupabaseClient();
  if (!foodId) {
    return { data: [], error: new Error("foodId is required to fetch reviews") };
  }

  const { data, error } = await client
    .from("reviews")
    .select("id, created_at, food_id, user_name, rating, comment")
    .eq("food_id", foodId)
    .order("created_at", { ascending: false });

  return {
    data: Array.isArray(data) ? data : [],
    error: error ? new Error(error.message) : null,
  };
}

export async function addReview({ foodId, name, rating, comment }) {
  const client = assertSupabaseClient();
  if (!foodId || !name || !rating) {
    return { error: new Error("foodId, name và rating là bắt buộc") };
  }

  const { error } = await client.from("reviews").insert({
    food_id: foodId,
    user_name: name,
    rating,
    comment: comment || null,
  });

  return { error: error ? new Error(error.message) : null };
}

export async function fetchClickEvents({ category, since, limit = 500 } = {}) {
  const client = assertSupabaseClient();
  let query = client
    .from("click_events")
    .select("id, created_at, page, target_id")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (category) {
    query = query.eq("page", category);
  }

  if (since instanceof Date) {
    query = query.gte("created_at", since.toISOString());
  }

  const { data, error } = await query;

  return {
    data: Array.isArray(data) ? data : [],
    error: error ? new Error(error.message) : null,
  };
}
