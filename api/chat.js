const FACULTY_SUMMARY =
  "Sister Liza Joseph (Principal), Priyanka Ma'am (Computer Science & IT Mentor), Kamini Ma'am (Hindi, Sanskrit & Moral Values), Prachi Trivedi Ma'am (Chemistry & Lab), Divya Ma'am (Physics), Satyapal Sir (Mathematics), Sarika Ma'am (Biology & English), Savita Ma'am (Social Science & English), Lalita Ma'am (Primary Maths), Deepa Ma'am (Hindi & Sanskrit), Sandhya Ma'am (Maths & Computer), Alka Ma'am (Social Science), Archana Ma'am (Social Science), Sumit Sir (English & SST), Venus Ma'am (English), Rama Ma'am (Hindi & Sanskrit), Preeti Ma'am (Hindi & Sanskrit), Jyoti Ma'am (English), Anjana Ma'am (Biology & Science), Sr. Lisa T. (English & Value Education), Ekta Ma'am (Mathematics), Shweta Verma Ma'am (Science, Value & Computer), Shweta Vyas Ma'am (Mathematics), Nisha Sharma Ma'am (Mathematics), Neha Yadav Ma'am (English), Neha Shukla Ma'am (Science), Ashwini Ma'am (English), Ruby Ma'am (Primary Teacher), Vineeta Ma'am (Chemistry & Science), Barkha Ma'am (Primary Teacher), Sheetal Ma'am (Hindi & Sanskrit), Bhawana Ma'am (Computer & Maths), Veena Ma'am (Arts), Pinky Ma'am (Library), Jay Sir (Dance), Deepak Sir (Sports), Simran Ma'am (GK & SST), Jenny Ma'am (Primary), Bharti Ma'am (Primary), Ravi Sir (Faculty), Deepshika Ma'am (Faculty), Subash Sir (Lead Technician - Office Staff), Gloria Ma'am (Office Staff), Rosemary Ma'am (Office Staff), Sasmith Ma'am & Jasmeet (Office Staff).";

const MODELS = ["openai/gpt-oss-120b", "openai/gpt-oss-20b"];

function buildSystemPrompt(user, language) {
  const langRule =
    language === "hi"
      ? "Respond in clear, natural Hindi using Devanagari script."
      : "Respond in clear, polished English unless the user explicitly asks for Hindi.";

  const userLine = user?.name
    ? `Visitor/User: ${user.name} (${user.role || "Guest"}).`
    : "Visitor/User: Guest.";

  return `You are HOLY CROSS AI (Holy Cross School AI), the official intelligent assistant for Holy Cross School, Khandwa Road, Indore.
Motto: "Live and Let Live". Principal: Sister Liza Joseph.
Architected by: Gaurav Lalwani, mentored by Priyanka Ma'am.
${userLine}
School Faculty & Staff: ${FACULTY_SUMMARY}
Instructions:
- ${langRule}
- Answer personal/conversational questions ("How are you?", "Who are you?", "Who built you?") warmly, politely, and naturally.
- Provide thorough, helpful descriptions when asked about teachers or staff.
- Answer academics, science, maths, economics, general knowledge, and cricket clearly without raw markdown clutter.`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GROQ_API_KEY is missing in Vercel Environment Variables." });
  }

  try {
    const { message, user, language = "en" } = req.body || {};
    if (!message || !String(message).trim()) {
      return res.status(400).json({ error: "Please enter a question." });
    }

    const systemPrompt = buildSystemPrompt(user, language);
    let lastError = "Unable to generate a response right now.";

    for (const model of MODELS) {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: String(message).trim() },
          ],
          temperature: 0.7,
          max_tokens: 650,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const reply = data?.choices?.[0]?.message?.content?.trim();
        if (reply) {
          return res.status(200).json({ reply, model });
        }
      } else {
        lastError = data?.error?.message || `Groq model ${model} failed.`;
      }
    }

    return res.status(502).json({ error: lastError });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Server error." });
  }
}
