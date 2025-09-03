import OpenAI from "openai";

export default async function handler(req, res) {
  const { stockData } = req.body;

  const messages = [
    {
      role: "system",
      content:
        "You are a trading guru. Given data on share prices over the past 3 days, write a report of no more than 150 words describing the stocks performance and recommending whether to buy, hold or sell. Use the examples provided between ### to set the style your response.",
    },
    {
      role: "user",
      content: stockData,
    },
  ];

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
      temperature: 1.1,
    });

    res.status(200).json({ report: response.choices[0].message.content });
  } catch (err) {
    console.error("OpenAI API error:", err);
    res.status(500).json({ error: "Error generating report" });
  }
}
