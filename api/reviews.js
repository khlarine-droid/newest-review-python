export default async function handler(req, res) {

  const API_URL = "https://www.biohackingcompanies.com/api/v2/users_reviews/search";

  try {

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": process.env.API_KEY
      },
      body: JSON.stringify({
        limit: 50,
        page: 1,
        output_type: "array"
      })
    });

    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");

    return res.status(200).json(data);

  } catch (error) {

    console.error("Proxy error:", error);

    return res.status(500).json({
      error: "Proxy failed"
    });

  }

}
