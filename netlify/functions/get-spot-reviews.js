const NETLIFY_API_BASE = "https://api.netlify.com/api/v1";

function jsonResponse(statusCode, payload) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
    body: JSON.stringify(payload),
  };
}

async function fetchJson(url, token, init = {}) {
  const response = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Netlify API error (${response.status}): ${errorText}`);
  }

  return response.json();
}

async function resolveFormId(token) {
  const cached = process.env.NETLIFY_SPOT_REVIEWS_FORM_ID;
  if (cached) return cached;

  const forms = await fetchJson(`${NETLIFY_API_BASE}/forms`, token);
  const target = forms.find((form) => form.name === "spot-reviews");
  if (!target) {
    throw new Error("Unable to locate form named 'spot-reviews'. Set NETLIFY_SPOT_REVIEWS_FORM_ID env var or ensure the form exists.");
  }
  return target.id;
}

function normaliseSubmission(submission) {
  const data = submission.data || {};
  const createdAt = submission.created_at ? new Date(submission.created_at).getTime() : Date.now();
  const submittedTimestamp = data.timestamp ? Date.parse(data.timestamp) : createdAt;

  return {
    id: submission.id,
    name: data.name || "Ẩn danh",
    content: data.content || "",
    rating: Number(data.rating) || 0,
    timestamp: Number.isNaN(submittedTimestamp) ? createdAt : submittedTimestamp,
    category: data.category || null,
    spotId: data.spotId || null,
    photoIncluded: data.photoIncluded === "yes",
    language: data.language || "vi",
  };
}

export async function handler(event) {
  try {
    const token = process.env.NETLIFY_AUTH_TOKEN;
    if (!token) {
      return jsonResponse(500, { message: "Missing NETLIFY_AUTH_TOKEN env variable." });
    }

    const params = event.queryStringParameters || {};
    const category = params.category;
    const spotId = params.spotId;

    if (!category || !spotId) {
      return jsonResponse(400, { message: "category and spotId query parameters are required." });
    }

    const formId = await resolveFormId(token);

    const submissions = await fetchJson(
      `${NETLIFY_API_BASE}/forms/${formId}/submissions?per_page=200`,
      token,
    );

    const matched = submissions
      .map(normaliseSubmission)
      .filter((entry) => entry.category === category && entry.spotId === spotId)
      .sort((a, b) => b.timestamp - a.timestamp);

    return jsonResponse(200, { reviews: matched });
  } catch (error) {
    return jsonResponse(500, { message: "Failed to load reviews", error: error.message });
  }
}
