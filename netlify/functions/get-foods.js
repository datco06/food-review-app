import foodData from "../../src/data/fooData.json";

export async function handler() {
  try {
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300",
      },
      body: JSON.stringify({ items: foodData }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to load foods", error: error.message }),
    };
  }
}
