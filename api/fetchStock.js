export default async function handler(req, res) {
  const { ticker, startDate, endDate } = req.query;

  const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${startDate}/${endDate}?apiKey=${process.env.POLYGON_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("Polygon API error:", err);
    res.status(500).json({ error: "Error fetching stock data" });
  }
}
