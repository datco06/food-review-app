export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { Allow: "POST" },
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  try {
    const payload = event.body ? JSON.parse(event.body) : {};
    const { name, rating, comment } = payload;

    if (!name || !rating) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing name or rating" }),
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Feedback received",
        feedback: {
          name,
          rating,
          comment: comment || "",
          submittedAt: new Date().toISOString(),
        },
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to submit feedback", error: error.message }),
    };
  }
}
