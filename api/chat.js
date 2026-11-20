const FACULTY_LIST =
  "Sister Liza Joseph (Principal), Priyanka Ma'am (Computer Science & IT Mentor), Kamini Ma'am (Hindi, Sanskrit & Moral Values), Prachi Trivedi Ma'am (Chemistry), Divya Ma'am (Physics), Satyapal Sir (Mathematics), Sarika Ma'am (Biology & English), Savita Ma'am (Social Science & English), Lalita Ma'am (Primary Maths), Deepa Ma'am (Hindi & Sanskrit), Sandhya Ma'am (Maths & Computer), Alka Ma'am (Social Science), Archana Ma'am (Social Science), Sumit Sir (English & SST), Venus Ma'am (English), Rama Ma'am (Hindi & Sanskrit), Preeti Ma'am (Hindi & Sanskrit), Jyoti Ma'am (English), Anjana Ma'am (Biology & Science), Sr. Lisa T. (English & Value Education), Ekta Ma'am (Mathematics), Shweta Verma Ma'am (Science, Value & Computer), Shweta Vyas Ma'am (Mathematics), Nisha Sharma Ma'am (Mathematics), Neha Yadav Ma'am (English), Neha Shukla Ma'am (Science), Ashwini Ma'am (English), Ruby Ma'am (Primary Teacher), Vineeta Ma'am (Chemistry & Science), Barkha Ma'am (Primary Teacher), Sheetal Ma'am (Hindi & Sanskrit), Bhawana Ma'am (Computer & Maths), Veena Ma'am (Arts), Pinky Ma'am (Library), Jay Sir (Dance), Deepak Sir (Sports), Simran Ma'am (GK & SST), Jenny Ma'am (Primary), Bharti Ma'am (Primary), Ravi Sir (Faculty), Deepshika Ma'am (Faculty), Subash Sir (Lead Technician - Office Staff), Gloria Ma'am (Office Staff), Rosemary Ma'am (Office Staff), Sasmith Ma'am & Jasmeet (Office Staff).";

const SYSTEM_PROMPT = `You are HOLY CROSS AI (JARVIS Enterprise Pro), the official intelligent assistant for Holy Cross School, Khandwa Road, Indore.
Motto: "Live and Let Live". Principal: Sister Liza Joseph.
Architected by: Gaurav Lalwani (Class IX B), mentored by Priyanka Ma'am.
School Faculty & Staff: ${FACULTY_LIST}
Rules:
- Reply in clear, polished English by default (unless the user writes in another language).
- Answer any question accurately: school info, NCERT academics, Science, Maths, Economics, Cricket, and Coding.
- Keep answers clean, helpful, and easy to read.`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GROQ_API_KEY is not configured in Vercel." });
  }

  try {
    const { message, user } = req.body || {};
    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message is required." });
    }

    const userContext = user?.name
      ? `\nCurrent User: ${user.name} (${user.role || "Student"}).`
      : "";

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: [
          { role: "system", content: SYSTEM_PROMPT + userContext },
          { role: "user", content: message.trim() },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.error?.message || "Groq API request failed.",
      });
    }

    const reply =
      data?.choices?.[0]?.message?.content || "I couldn't generate a response. Please try again.";

    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Internal server error." });
  }
}
