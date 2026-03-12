export default async function handler(req, res) {

  const API_URL = "https://www.biohackingcompanies.com/api/v2/users_reviews/search";

  try {

    const params = new URLSearchParams();
    params.append("review_status", "2");
    params.append("results_per_page", "12");
    params.append("page", "1");

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.VERCEL_API_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params
    });

    const text = await response.text();

    console.log("UPSTREAM STATUS:", response.status);
    console.log("UPSTREAM BODY:", text);

    if (!response.ok) {
      return res.status(502).json({
        error: "Upstream API failed",
        status: response.status,
        body: text
      });
    }

    const data = JSON.parse(text);

    res.setHeader("Access-Control-Allow-Origin", "*");

    return res.status(200).json({
      results: data.data || []
    });

  } catch (err) {

    console.error("SERVER ERROR:", err);

    return res.status(500).json({
      error: "Proxy failed"
    });

  }

}
