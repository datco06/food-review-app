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
    const { itemId } = payload;

    if (!itemId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing itemId" }),
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Click recorded", itemId }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to record click", error: error.message }),
    };
  }
}
