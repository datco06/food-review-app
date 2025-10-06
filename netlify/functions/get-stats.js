const buildEmptyStats = () => ({
  totalClicks: 0,
  topItems: [],
  lastUpdated: new Date().toISOString(),
});

export async function handler() {
  try {
    const stats = buildEmptyStats();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
      body: JSON.stringify(stats),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to load stats", error: error.message }),
    };
  }
}
