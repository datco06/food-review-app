const NETLIFY_ENDPOINT = "/";

function encodeFormData(formName, data) {
  const params = new URLSearchParams();
  params.append("form-name", formName);
  Object.entries(data || {}).forEach(([key, value]) => {
    if (typeof value === "undefined" || value === null) return;
    params.append(key, String(value));
  });
  return params.toString();
}

export async function submitNetlifyForm(formName, data) {
  if (typeof fetch !== "function" || !formName) return;
  try {
    await fetch(NETLIFY_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodeFormData(formName, {
        timestamp: new Date().toISOString(),
        ...data,
      }),
    });
  } catch (error) {
    // swallow network failures to avoid impacting UX
  }
}

export function sendClickStat(payload) {
  return submitNetlifyForm("spot-clicks", payload);
}

export function sendSpotReview(payload) {
  return submitNetlifyForm("spot-reviews", payload);
}
