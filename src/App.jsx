import React, { useState, useEffect, useRef } from "react";

// ==========================================
// SECTION 1: APP METADATA & LINKS
// (Yahan apne real Instagram / School links daal sakte ho)
// ==========================================
const APP_METADATA = {
  name: "HOLY CROSS AI",
  edition: "JARVIS Enterprise Pro",
  school: "Holy Cross School, Khandwa Road, Indore",
  motto: "Live and Let Live",
  principal: "Sister Liza Joseph",
  mentor: "Priyanka Ma'am (Computer Science & IT)",
  architect: "Gaurav Lalwani (Class IX B IT Topper)",
  city: "Indore, Madhya Pradesh",
  links: {
    instagram: "https://www.instagram.com/",
    youtube: "https://www.youtube.com/",
    schoolWebsite: "https://www.holycrossschoolindore.com/",
    googleMaps: "https://maps.google.com/?q=Holy+Cross+School+Khandwa+Road+Indore",
    cricbuzz: "https://www.cricbuzz.com/cricket-match/live-scores",
    espncricinfo: "https://www.espncricinfo.com/live-cricket-score",
    icc: "https://www.icc-cricket.com/",
  },
};

// ==========================================
// SECTION 2: CSS ANIMATIONS & MODERN STYLING
// ==========================================
const APP_STYLES = `
  * { box-sizing: border-box; }
  body { margin: 0; background: #020617; color: #f8fafc; font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; }

  @keyframes orbFloat {
    0%, 100% { transform: translateY(0px) scale(1); }
    50% { transform: translateY(-6px) scale(1.04); }
  }
  @keyframes orbPulse {
    0%, 100% { box-shadow: 0 0 22px rgba(56, 189, 248, 0.55), 0 0 44px rgba(37, 99, 235, 0.35); }
    50% { box-shadow: 0 0 38px rgba(56, 189, 248, 0.9), 0 0 65px rgba(251, 191, 36, 0.5); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes dotBounce {
    0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
    40% { transform: scale(1.1); opacity: 1; }
  }
  @keyframes liveBlink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.25; }
  }

  .hc-fade { animation: fadeUp 0.3s ease-out forwards; }
  .hc-orb { animation: orbFloat 3.5s ease-in-out infinite, orbPulse 2.8s ease-in-out infinite; }
  .hc-orb-active { animation: orbFloat 1.2s ease-in-out infinite, orbPulse 0.9s ease-in-out infinite; }
  .hc-live-dot { animation: liveBlink 1.2s infinite; }

  .hc-glass {
    background: rgba(15, 23, 42, 0.72);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(56, 189, 248, 0.22);
  }
  .hc-btn {
    transition: transform 0.15s ease, opacity 0.15s ease, background 0.2s ease;
    cursor: pointer;
  }
  .hc-btn:active { transform: scale(0.96); }
  .hc-title-grad {
    background: linear-gradient(90deg, #fbbf24, #38bdf8, #fde68a);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .hc-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #38bdf8;
    display: inline-block;
    animation: dotBounce 1.2s infinite ease-in-out;
  }
  .hc-dot:nth-child(2) { animation-delay: 0.2s; }
  .hc-dot:nth-child(3) { animation-delay: 0.4s; }
`;

// ==========================================
// SECTION 3: OFFICIAL HOLY CROSS CREST LOGO
// ==========================================
function HolyCrossCrestLogo({ size = 46, glow = true }) {
  const outerR = Math.round(size * 0.28);
  const innerR = Math.round(size * 0.24);
  const svgSize = Math.round(size * 0.78);

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: `${outerR}px`,
        background: "linear-gradient(135deg, #fbbf24 0%, #d97706 55%, #78350f 100%)",
        padding: "2.5px",
        boxShadow: glow ? "0 0 22px rgba(251, 191, 36, 0.5)" : "none",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
      title="Holy Cross School Monogram: Live and Let Live"
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: `${innerR}px`,
          background: "radial-gradient(circle at 50% 30%, #1e3a8a, #020617 85%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg viewBox="0 0 64 64" width={svgSize} height={svgSize} fill="none">
          <path
            d="M32 4L8 14V30C8 46.5 18.2 57.4 32 61C45.8 57.4 56 46.5 56 30V14L32 4Z"
            stroke="#fbbf24"
            strokeWidth="2.4"
            fill="rgba(30, 58, 138, 0.45)"
          />
          <path
            d="M32 11V39M22 21H42"
            stroke="#fbbf24"
            strokeWidth="4.2"
            strokeLinecap="round"
          />
          <path
            d="M23 45C23 48.5 27 51 32 51C37 51 41 48.5 41 45H23Z"
            fill="#38bdf8"
            stroke="#fbbf24"
            strokeWidth="1.5"
          />
          <path
            d="M32 36C32 36 28.5 40 30 43C31 44.5 33 44.5 34 43C35.5 40 32 36 32 36Z"
            fill="#f59e0b"
          />
        </svg>
      </div>
    </div>
  );
}

// ==========================================
// SECTION 4: COMPLETE FACULTY DATABASE
// ==========================================
const FACULTY_DATA = [
  { id: "sister_liza", name: "Sister Liza Joseph", role: "Principal & Spiritual Guide", category: "Leadership" },
  { id: "priyanka_mam", name: "Priyanka Ma'am", role: "Computer Science & IT Mentor", category: "IT & Computer" },
  { id: "kamini_mam", name: "Kamini Ma'am", role: "Hindi, Sanskrit & Moral Values", category: "Languages" },
  { id: "prachi_mam", name: "Prachi Trivedi Ma'am", role: "Chemistry & Practical Lab Expert", category: "Science" },
  { id: "divya_mam", name: "Divya Ma'am", role: "Physics", category: "Science" },
  { id: "satyapal_sir", name: "Satyapal Sir", role: "Mathematics", category: "Mathematics" },
  { id: "sarika_mam", name: "Sarika Ma'am", role: "Biology & English", category: "Science" },
  { id: "savita_mam", name: "Savita Ma'am", role: "Social Science & English", category: "Social Science" },
  { id: "lalita_mam", name: "Lalita Ma'am", role: "Maths (Primary)", category: "Primary" },
  { id: "deepa_mam", name: "Deepa Ma'am", role: "Hindi & Sanskrit", category: "Languages" },
  { id: "sandhya_mam", name: "Sandhya Ma'am", role: "Maths & Computer", category: "IT & Computer" },
  { id: "alka_mam", name: "Alka Ma'am", role: "Social Science", category: "Social Science" },
  { id: "archana_mam", name: "Archana Ma'am", role: "Social Science", category: "Social Science" },
  { id: "sumit_sir", name: "Sumit Sir", role: "English & SST", category: "Social Science" },
  { id: "venus_mam", name: "Venus Ma'am", role: "English", category: "Languages" },
  { id: "rama_mam", name: "Rama Ma'am", role: "Hindi & Sanskrit", category: "Languages" },
  { id: "preeti_mam", name: "Preeti Ma'am", role: "Hindi & Sanskrit", category: "Languages" },
  { id: "jyoti_mam", name: "Jyoti Ma'am", role: "English", category: "Languages" },
  { id: "anjana_mam", name: "Anjana Ma'am", role: "Biology & Science", category: "Science" },
  { id: "sr_lisa_t", name: "Sr. Lisa T.", role: "English & Value Education", category: "Languages" },
  { id: "ekta_mam", name: "Ekta Ma'am", role: "Mathematics", category: "Mathematics" },
  { id: "shweta_verma", name: "Shweta Verma Ma'am", role: "Science, Value Education & Computer", category: "IT & Computer" },
  { id: "shweta_vyas", name: "Shweta Vyas Ma'am", role: "Mathematics", category: "Mathematics" },
  { id: "nisha_sharma", name: "Nisha Sharma Ma'am", role: "Mathematics", category: "Mathematics" },
  { id: "neha_yadav", name: "Neha Yadav Ma'am", role: "English", category: "Languages" },
  { id: "neha_shukla", name: "Neha Shukla Ma'am", role: "Science", category: "Science" },
  { id: "ashwini_mam", name: "Ashwini Ma'am", role: "English", category: "Languages" },
  { id: "ruby_mam", name: "Ruby Ma'am", role: "Primary Teacher", category: "Primary" },
  { id: "vineeta_mam", name: "Vineeta Ma'am", role: "Chemistry & Science", category: "Science" },
  { id: "barkha_mam", name: "Barkha Ma'am", role: "Primary Teacher", category: "Primary" },
  { id: "sheetal_mam", name: "Sheetal Ma'am", role: "Hindi & Sanskrit", category: "Languages" },
  { id: "bhawana_mam", name: "Bhawana Ma'am", role: "Computer & Maths", category: "IT & Computer" },
  { id: "veena_mam", name: "Veena Ma'am", role: "Arts", category: "Activities" },
  { id: "pinky_mam", name: "Pinky Ma'am", role: "Library", category: "Activities" },
  { id: "jay_sir", name: "Jay Sir", role: "Dance", category: "Activities" },
  { id: "deepak_sir", name: "Deepak Sir", role: "Sports & Physical Education", category: "Sports" },
  { id: "simran_mam", name: "Simran Ma'am", role: "GK & SST", category: "Social Science" },
  { id: "jenny_mam", name: "Jenny Ma'am", role: "Primary Teacher", category: "Primary" },
  { id: "bharti_mam", name: "Bharti Ma'am", role: "Primary Teacher", category: "Primary" },
  { id: "ravi_sir", name: "Ravi Sir", role: "School Faculty", category: "Faculty" },
  { id: "deepshika_mam", name: "Deepshika Ma'am", role: "School Faculty", category: "Faculty" },
  { id: "subash_sir", name: "Subash Sir", role: "The Best Technician (Office Staff)", category: "Office Staff" },
  { id: "gloria_mam", name: "Gloria Ma'am", role: "Office Staff", category: "Office Staff" },
  { id: "rosemary_mam", name: "Rosemary Ma'am", role: "Office Staff", category: "Office Staff" },
  { id: "sasmith_mam", name: "Sasmith Ma'am & Jasmeet", role: "Office Staff", category: "Office Staff" },
];

const RECOMMENDED_TOPICS = {
  School: [
    "Holy Cross School Indore ke baare mein batao",
    "Ruby Ma'am kya padhati hain?",
    "Subash Sir kaun hain?",
    "Priyanka Ma'am aur Sister Liza ke baare mein batao",
  ],
  Study: [
    "Newton ke teeno niyam aasaan Hindi mein samjhao",
    "Direct Tax aur Indirect Tax mein kya antar hai?",
    "Solve: 3x + 7 = 28 step-by-step",
    "Exam mein 95%+ laane ka timetable banao",
  ],
  Cricket: [
    "Virat Kohli aur Rohit Sharma ke top ICC records batao",
    "Fast bowling mein inswing aur outswing kaise hoti hai?",
    "T20 cricket mein powerplay strategy kya hoti hai?",
    "MS Dhoni ki best captaincy qualities batao",
  ],
  Tech: [
    "AI aur Machine Learning kaise kaam karta hai?",
    "React website ko Vercel par free deploy kaise karein?",
    "Students ke liye best coding roadmap batao",
  ],
};

const FACULTY_CONTEXT = FACULTY_DATA.map((f) => `${f.name} (${f.role})`).join("; ");

const buildSystemPrompt = (userProfile) => {
  const userLine = userProfile
    ? `Current logged-in user: ${userProfile.name} (${userProfile.role}, Email: ${userProfile.email}).`
    : "Current user: Guest.";
  return `You are HOLY CROSS AI (JARVIS Enterprise Pro), the smart, friendly AI assistant for ${APP_METADATA.school}.
Motto: "${APP_METADATA.motto}". Principal: ${APP_METADATA.principal}.
Creator: ${APP_METADATA.architect}, mentored by ${APP_METADATA.mentor}.
${userLine}
School Faculty & Office Staff Database: ${FACULTY_CONTEXT}.
Rules:
- Answer ANY question (School, NCERT Studies, Science, Maths, Economics, Cricket, Coding, General Knowledge).
- Match the user's language (Hindi, Hinglish, or English).
- Keep responses clean, structured with bullet points and **bold** highlights when useful.
- For live cricket scores, explain that live ball-by-ball updates are in the Cricket Live tab links (Cricbuzz/ESPNcricinfo), while happily answering cricket rules, stats, history, and strategy questions.`;
};

// ==========================================
// SECTION 5: RICH TEXT FORMATTER HELPER
// ==========================================
function FormattedMessage({ text }) {
  const lines = String(text || "").split("\n");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      {lines.map((line, i) => {
        const parts = line.split(/(\*\*.*?\*\*)/g);
        const isBullet = line.trim().startsWith("* ") || line.trim().startsWith("- ");
        const cleanedParts = parts.map((part, j) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={j} style={{ color: "#fde68a", fontWeight: 700 }}>
                {part.slice(2, -2)}
              </strong>
            );
          }
          if (j === 0 && isBullet) {
            return part.replace(/^\s*[-*]\s+/, "• ");
          }
          return part;
        });

        return (
          <div
            key={i}
            style={{
              paddingLeft: isBullet ? "8px" : "0px",
              minHeight: line.trim() === "" ? "6px" : "auto",
            }}
          >
            {cleanedParts}
          </div>
        );
      })}
    </div>
  );
}

// ==========================================
// SECTION 6: SAFE LOCAL STORAGE HELPERS
// ==========================================
function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

// ==========================================
// SECTION 7: MAIN APPLICATION
// ==========================================
export default function App() {
  // User Login & Email State
  const [user, setUser] = useState(() => loadJSON("hc_user_profile", null));
  const [loginName, setLoginName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginRole, setLoginRole] = useState("Student");
  const [loginError, setLoginError] = useState("");

  // Gemini API Key State
  const envKey = import.meta.env.VITE_GEMINI_API_KEY || "";
  const [apiKey, setApiKey] = useState(() => envKey || localStorage.getItem("hc_gemini_key") || "");
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey);

  // Navigation & UI States
  const [activeTab, setActiveTab] = useState("chat");
  const [topicCategory, setTopicCategory] = useState("School");
  const [query, setQuery] = useState("");
  const [dirSearch, setDirSearch] = useState("");
  const [dirCategory, setDirCategory] = useState("All");
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Custom School Photo State (User can upload real photo from phone)
  const [schoolPhoto, setSchoolPhoto] = useState(() => localStorage.getItem("hc_school_photo") || "");

  // Chat Sessions & Recent History
  const defaultGreeting = {
    sender: "ai",
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    text: "**नमस्ते! HOLY CROSS AI में आपका स्वागत है।**\nआप मुझसे स्कूल, टीचर्स, पढ़ाई (Maths/Science/SST), क्रिकेट या कोडिंग—कुछ भी पूछ सकते हैं!",
  };

  const [sessions, setSessions] = useState(() => loadJSON("hc_chat_history", []));
  const [currentSessionId, setCurrentSessionId] = useState(() => String(Date.now()));
  const [messages, setMessages] = useState([defaultGreeting]);

  // Built-in Live Cricket Scoreboard Tracker
  const [matchState, setMatchState] = useState(() =>
    loadJSON("hc_cricket_board", {
      teamA: "IND",
      teamB: "AUS",
      runs: 142,
      wickets: 2,
      balls: 86,
      target: 185,
    })
  );

  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, activeTab]);

  useEffect(() => {
    try {
      localStorage.setItem("hc_cricket_board", JSON.stringify(matchState));
    } catch {
      // Ignore storage quota errors
    }
  }, [matchState]);

  // Save current chat into Recent History automatically
  const saveSessionToHistory = (updatedMessages, sessId) => {
    if (updatedMessages.length <= 1) return;
    const firstUserMsg = updatedMessages.find((m) => m.sender === "user");
    const title = firstUserMsg ? firstUserMsg.text.slice(0, 42) : "New Chat";
    const newEntry = {
      id: sessId,
      title,
      updatedAt: new Date().toLocaleString([], {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }),
      messages: updatedMessages,
    };

    setSessions((prev) => {
      const filtered = prev.filter((s) => s.id !== sessId);
      const next = [newEntry, ...filtered].slice(0, 20);
      try {
        localStorage.setItem("hc_chat_history", JSON.stringify(next));
      } catch {
        // Ignore quota errors
      }
      return next;
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const cleanName = loginName.trim();
    const cleanEmail = loginEmail.trim();
    if (!cleanName) {
      setLoginError("कृपया अपना नाम लिखें।");
      return;
    }
    if (!cleanEmail || !cleanEmail.includes("@") || !cleanEmail.includes(".")) {
      setLoginError("कृपया सही Email address डालें (जैसे name@gmail.com)।");
      return;
    }
    const profile = {
      name: cleanName,
      email: cleanEmail,
      role: loginRole,
      joinedAt: new Date().toLocaleDateString(),
    };
    setUser(profile);
    localStorage.setItem("hc_user_profile", JSON.stringify(profile));
    setLoginError("");
  };

  const handleGuestLogin = () => {
    const guest = {
      name: "Guest Student",
      email: "guest@holycross.edu",
      role: "Guest",
      joinedAt: new Date().toLocaleDateString(),
    };
    setUser(guest);
    localStorage.setItem("hc_user_profile", JSON.stringify(guest));
  };

  const handleLogout = () => {
    localStorage.removeItem("hc_user_profile");
    setUser(null);
    setLoginName("");
    setLoginEmail("");
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      setSchoolPhoto(result);
      try {
        localStorage.setItem("hc_school_photo", result);
      } catch {
        // Photo still previews in current session if too large for localStorage
      }
    };
    reader.readAsDataURL(file);
  };

  const speakText = (text) => {
    if (!voiceEnabled || typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const clean = text.replace(/[*#_`]/g, "");
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.rate = 1.02;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const askGemini = async (userText, history) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const recentContents = history.slice(-8).map((m) => ({
      role: m.sender === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));
    recentContents.push({ role: "user", parts: [{ text: userText }] });

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: buildSystemPrompt(user) }] },
        contents: recentContents,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || "Gemini API error");
    }
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "जवाब नहीं मिल सका।";
  };

  const localFallback = (inputText) => {
    const q = inputText.toLowerCase();
    const match = FACULTY_DATA.find(
      (f) => f.name.toLowerCase().includes(q) || f.role.toLowerCase().includes(q)
    );
    if (match) {
      return `**${match.name}**\n• Role: ${match.role}\n• Department: ${match.category}\n\n*(फुल AI चैटबॉट चालू करने के लिए ऊपर **API Key** बटन दबाकर अपनी फ्री Gemini Key जोड़ें।)*`;
    }
    if (q.includes("school") || q.includes("holy cross")) {
      return `**${APP_METADATA.school}**\n• Motto: **${APP_METADATA.motto}**\n• Principal: **${APP_METADATA.principal}**\n• Created by: ${APP_METADATA.architect}`;
    }
    if (q.includes("cricket") || q.includes("match") || q.includes("score")) {
      return "**Cricket Hub Active!**\nलाइव स्कोर के लिए ऊपर **Cricket Live** टैब खोलें। किसी भी क्रिकेट नियम, खिलाड़ी या रिकॉर्ड पर AI से बात करने के लिए ऊपर **API Key** जोड़ें।";
    }
    return "फुल AI जवाब पाने के लिए ऊपर **API Key** बटन पर क्लिक करके अपनी फ्री **Gemini API Key** सेव करें। तब तक आप **School & DB** और **Cricket Live** टैब भी इस्तेमाल कर सकते हैं!";
  };

  const handleSend = async (customQuery) => {
    const textToSend = (customQuery || query).trim();
    if (!textToSend || isLoading) return;

    const nowTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg = { sender: "user", text: textToSend, time: nowTime };
    const nextMsgs = [...messages, userMsg];

    setMessages(nextMsgs);
    setQuery("");
    setActiveTab("chat");

    if (!apiKey) {
      const replyText = localFallback(textToSend);
      const finalMsgs = [...nextMsgs, { sender: "ai", text: replyText, time: nowTime }];
      setMessages(finalMsgs);
      saveSessionToHistory(finalMsgs, currentSessionId);
      speakText(replyText);
      return;
    }

    setIsLoading(true);
    try {
      const replyText = await askGemini(textToSend, messages);
      const replyTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const finalMsgs = [...nextMsgs, { sender: "ai", text: replyText, time: replyTime }];
      setMessages(finalMsgs);
      saveSessionToHistory(finalMsgs, currentSessionId);
      speakText(replyText);
    } catch (err) {
      const errMsgs = [
        ...nextMsgs,
        {
          sender: "ai",
          text: `**API Error:** ${err.message}\nकृपया ऊपर **API Key** बटन से सही Gemini Key चेक करें।`,
          time: nowTime,
        },
      ];
      setMessages(errMsgs);
    } finally {
      setIsLoading(false);
    }
  };

  const startNewChat = () => {
    setCurrentSessionId(String(Date.now()));
    setMessages([defaultGreeting]);
    setActiveTab("chat");
  };

  const openHistorySession = (session) => {
    setCurrentSessionId(session.id);
    setMessages(session.messages);
    setActiveTab("chat");
  };

  const deleteHistorySession = (id) => {
    const next = sessions.filter((s) => s.id !== id);
    setSessions(next);
    localStorage.setItem("hc_chat_history", JSON.stringify(next));
  };

  const updateCricketScore = (addRuns, addWicket = 0, addBall = 1) => {
    setMatchState((prev) => ({
      ...prev,
      runs: Math.max(0, prev.runs + addRuns),
      wickets: Math.min(10, Math.max(0, prev.wickets + addWicket)),
      balls: Math.max(0, prev.balls + addBall),
    }));
  };

  const oversFormatted = `${Math.floor(matchState.balls / 6)}.${matchState.balls % 6}`;
  const runRate = matchState.balls > 0 ? ((matchState.runs / matchState.balls) * 6).toFixed(2) : "0.00";

  const categories = ["All", ...Array.from(new Set(FACULTY_DATA.map((f) => f.category)))];
  const filteredFaculty = FACULTY_DATA.filter((f) => {
    const s = dirSearch.toLowerCase();
    const matchText =
      f.name.toLowerCase().includes(s) ||
      f.role.toLowerCase().includes(s) ||
      f.category.toLowerCase().includes(s);
    const matchCat = dirCategory === "All" || f.category === dirCategory;
    return matchText && matchCat;
  });

  // ==========================================
  // LOGIN SCREEN (IF NOT LOGGED IN)
  // ==========================================
  if (!user) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "radial-gradient(circle at top, #172554 0%, #020617 70%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <style>{APP_STYLES}</style>
        <div
          className="hc-glass hc-fade"
          style={{
            width: "100%",
            maxWidth: "420px",
            borderRadius: "24px",
            padding: "28px 22px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <HolyCrossCrestLogo size={68} glow={true} />
            <h1 className="hc-title-grad" style={{ margin: "14px 0 4px", fontSize: "24px", fontWeight: 900 }}>
              {APP_METADATA.name}
            </h1>
            <p style={{ margin: "0 0 20px", fontSize: "12px", color: "#94a3b8" }}>
              {APP_METADATA.school} • {APP_METADATA.motto}
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div>
              <label style={{ fontSize: "12px", color: "#cbd5e1", display: "block", marginBottom: "5px" }}>
                Full Name
              </label>
              <input
                type="text"
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
                placeholder="Apna naam likhein..."
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  borderRadius: "12px",
                  border: "1px solid rgba(56,189,248,0.3)",
                  background: "rgba(2,6,23,0.8)",
                  color: "#f8fafc",
                  fontSize: "14px",
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: "12px", color: "#cbd5e1", display: "block", marginBottom: "5px" }}>
                Email Address
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="student@gmail.com"
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  borderRadius: "12px",
                  border: "1px solid rgba(56,189,248,0.3)",
                  background: "rgba(2,6,23,0.8)",
                  color: "#f8fafc",
                  fontSize: "14px",
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: "12px", color: "#cbd5e1", display: "block", marginBottom: "5px" }}>
                You are a
              </label>
              <select
                value={loginRole}
                onChange={(e) => setLoginRole(e.target.value)}
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  borderRadius: "12px",
                  border: "1px solid rgba(56,189,248,0.3)",
                  background: "#020617",
                  color: "#f8fafc",
                  fontSize: "14px",
                }}
              >
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
                <option value="Parent">Parent</option>
                <option value="Cricket Fan">Cricket Fan</option>
              </select>
            </div>

            {loginError && (
              <div style={{ fontSize: "12px", color: "#f87171", textAlign: "center" }}>{loginError}</div>
            )}

            <button
              type="submit"
              className="hc-btn"
              style={{
                marginTop: "6px",
                padding: "12px",
                borderRadius: "12px",
                border: "none",
                background: "linear-gradient(135deg, #38bdf8, #2563eb)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "15px",
              }}
            >
              Login & Enter AI Portal
            </button>

            <button
              type="button"
              onClick={handleGuestLogin}
              className="hc-btn"
              style={{
                padding: "10px",
                borderRadius: "12px",
                border: "1px solid rgba(148,163,184,0.3)",
                background: "transparent",
                color: "#cbd5e1",
                fontWeight: 600,
                fontSize: "13px",
              }}
            >
              Continue as Guest
            </button>
          </form>

          <p style={{ marginTop: "18px", textAlign: "center", fontSize: "11px", color: "#64748b" }}>
            Designed by {APP_METADATA.architect}
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // MAIN PORTAL UI
  // ==========================================
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #0f172a 0%, #020617 75%)",
        color: "#f8fafc",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style>{APP_STYLES}</style>

      {/* HEADER */}
      <header
        className="hc-glass"
        style={{
          padding: "12px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
          position: "sticky",
          top: 0,
          zIndex: 20,
          borderLeft: "none",
          borderRight: "none",
          borderTop: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <HolyCrossCrestLogo size={40} glow={true} />
          <div>
            <div className="hc-title-grad" style={{ fontSize: "16px", fontWeight: 900, letterSpacing: "0.5px" }}>
              {APP_METADATA.name}
            </div>
            <div style={{ fontSize: "10px", color: "#94a3b8" }}>
              {user.name} • {user.email}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <button
            className="hc-btn"
            onClick={() => {
              setTempKey(apiKey);
              setShowKeyModal(true);
            }}
            style={{
              background: apiKey ? "rgba(34,197,94,0.18)" : "rgba(251,191,36,0.2)",
              color: apiKey ? "#4ade80" : "#fbbf24",
              border: `1px solid ${apiKey ? "rgba(34,197,94,0.45)" : "rgba(251,191,36,0.5)"}`,
              borderRadius: "999px",
              padding: "6px 10px",
              fontSize: "11px",
              fontWeight: 700,
            }}
          >
            {apiKey ? "AI Ready" : "API Key"}
          </button>

          <button
            className="hc-btn"
            onClick={() => {
              setVoiceEnabled(!voiceEnabled);
              if (window.speechSynthesis) window.speechSynthesis.cancel();
            }}
            style={{
              background: voiceEnabled ? "rgba(56,189,248,0.2)" : "rgba(148,163,184,0.15)",
              color: voiceEnabled ? "#38bdf8" : "#94a3b8",
              border: "1px solid rgba(56,189,248,0.35)",
              borderRadius: "999px",
              padding: "6px 9px",
              fontSize: "11px",
              fontWeight: 600,
            }}
          >
            {voiceEnabled ? (isSpeaking ? "Speaking" : "Voice") : "Mute"}
          </button>

          <button
            className="hc-btn"
            onClick={handleLogout}
            title="Logout"
            style={{
              background: "rgba(239,68,68,0.16)",
              color: "#f87171",
              border: "1px solid rgba(239,68,68,0.35)",
              borderRadius: "999px",
              padding: "6px 9px",
              fontSize: "11px",
              fontWeight: 600,
            }}
          >
            Exit
          </button>
        </div>
      </header>

      {/* API KEY MODAL */}
      {showKeyModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.78)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
            padding: "16px",
          }}
        >
          <div
            className="hc-glass hc-fade"
            style={{ borderRadius: "20px", padding: "22px", width: "100%", maxWidth: "400px" }}
          >
            <h3 style={{ margin: "0 0 6px", color: "#fbbf24" }}>Gemini API Key</h3>
            <p style={{ margin: "0 0 12px", fontSize: "12px", color: "#94a3b8", lineHeight: 1.5 }}>
              Google AI Studio (aistudio.google.com/apikey) se apni free key paste karein. Ye sirf aapke device mein save hogi.
            </p>
            <input
              type="password"
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
              placeholder="AIzaSy..."
              style={{
                width: "100%",
                padding: "11px 12px",
                borderRadius: "10px",
                border: "1px solid #334155",
                background: "#020617",
                color: "#f8fafc",
                fontSize: "14px",
                marginBottom: "14px",
              }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
              <button
                className="hc-btn"
                onClick={() => setShowKeyModal(false)}
                style={{
                  background: "#1e293b",
                  color: "#cbd5e1",
                  border: "none",
                  borderRadius: "10px",
                  padding: "8px 14px",
                }}
              >
                Cancel
              </button>
              <button
                className="hc-btn"
                onClick={() => {
                  const trimmed = tempKey.trim();
                  setApiKey(trimmed);
                  localStorage.setItem("hc_gemini_key", trimmed);
                  setShowKeyModal(false);
                }}
                style={{
                  background: "linear-gradient(135deg, #38bdf8, #2563eb)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  padding: "8px 16px",
                  fontWeight: 700,
                }}
              >
                Save Key
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NAVIGATION BAR */}
      <nav
        style={{
          display: "flex",
          gap: "8px",
          padding: "10px 12px",
          overflowX: "auto",
          justifyContent: "center",
          background: "rgba(15, 23, 42, 0.55)",
          borderBottom: "1px solid rgba(148,163,184,0.12)",
        }}
      >
        {[
          { id: "chat", label: "AI Chat" },
          { id: "school", label: "School & DB" },
          { id: "cricket", label: "Cricket Live" },
          { id: "history", label: `History (${sessions.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            className="hc-btn"
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "8px 15px",
              borderRadius: "999px",
              border: "none",
              whiteSpace: "nowrap",
              fontSize: "12px",
              fontWeight: 700,
              background:
                activeTab === tab.id
                  ? "linear-gradient(135deg, #38bdf8, #2563eb)"
                  : "rgba(30, 41, 59, 0.85)",
              color: activeTab === tab.id ? "#fff" : "#cbd5e1",
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* ========================================== */}
      {/* TAB 1: FULL AI CHATBOT                     */}
      {/* ========================================== */}
      {activeTab === "chat" && (
        <main
          className="hc-fade"
          style={{
            flex: 1,
            maxWidth: "820px",
            width: "100%",
            margin: "0 auto",
            padding: "14px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {/* MORPH ORB & NEW CHAT */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 6px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                className={isLoading || isSpeaking ? "hc-orb-active" : "hc-orb"}
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 30% 30%, #7dd3fc, #2563eb 58%, #020617 100%)",
                  flexShrink: 0,
                }}
              />
              <div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#f8fafc" }}>
                  JARVIS Assistant Online
                </div>
                <div style={{ fontSize: "11px", color: "#94a3b8" }}>
                  Ask anything • Hindi, Hinglish & English
                </div>
              </div>
            </div>

            <button
              className="hc-btn"
              onClick={startNewChat}
              style={{
                background: "rgba(30,41,59,0.9)",
                color: "#38bdf8",
                border: "1px solid rgba(56,189,248,0.35)",
                borderRadius: "10px",
                padding: "7px 12px",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              + New Chat
            </button>
          </div>

          {/* RECOMMENDED QUESTION CATEGORIES */}
          <div className="hc-glass" style={{ borderRadius: "16px", padding: "10px 12px" }}>
            <div style={{ display: "flex", gap: "6px", marginBottom: "8px", overflowX: "auto" }}>
              {Object.keys(RECOMMENDED_TOPICS).map((cat) => (
                <button
                  key={cat}
                  className="hc-btn"
                  onClick={() => setTopicCategory(cat)}
                  style={{
                    padding: "4px 10px",
                    borderRadius: "999px",
                    border: "none",
                    fontSize: "11px",
                    fontWeight: 700,
                    background: topicCategory === cat ? "#fbbf24" : "rgba(30,41,59,0.9)",
                    color: topicCategory === cat ? "#020617" : "#94a3b8",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {RECOMMENDED_TOPICS[topicCategory].map((q) => (
                <button
                  key={q}
                  className="hc-btn"
                  onClick={() => handleSend(q)}
                  style={{
                    background: "rgba(15,23,42,0.9)",
                    color: "#e2e8f0",
                    border: "1px solid rgba(56,189,248,0.28)",
                    borderRadius: "12px",
                    padding: "6px 10px",
                    fontSize: "11px",
                    textAlign: "left",
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* MESSAGES LIST */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              overflowY: "auto",
              padding: "4px 2px",
              minHeight: "240px",
            }}
          >
            {messages.map((m, idx) => (
              <div
                key={idx}
                className="hc-fade"
                style={{
                  alignSelf: m.sender === "user" ? "flex-end" : "flex-start",
                  maxWidth: "88%",
                  background:
                    m.sender === "user"
                      ? "linear-gradient(135deg, #0284c7, #1d4ed8)"
                      : "rgba(30, 41, 59, 0.88)",
                  border: m.sender === "user" ? "none" : "1px solid rgba(56, 189, 248, 0.25)",
                  padding: "12px 15px",
                  borderRadius: m.sender === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  fontSize: "14px",
                  lineHeight: 1.55,
                  boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
                }}
              >
                <FormattedMessage text={m.text} />
                {m.time && (
                  <div
                    style={{
                      fontSize: "10px",
                      color: m.sender === "user" ? "rgba(255,255,255,0.7)" : "#64748b",
                      marginTop: "6px",
                      textAlign: "right",
                    }}
                  >
                    {m.time}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div
                className="hc-fade"
                style={{
                  alignSelf: "flex-start",
                  background: "rgba(30, 41, 59, 0.85)",
                  border: "1px solid rgba(56, 189, 248, 0.25)",
                  padding: "12px 16px",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span style={{ fontSize: "12px", color: "#38bdf8", marginRight: "4px" }}>JARVIS thinking</span>
                <span className="hc-dot" />
                <span className="hc-dot" />
                <span className="hc-dot" />
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* CHAT INPUT BAR */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="hc-glass"
            style={{
              display: "flex",
              gap: "8px",
              position: "sticky",
              bottom: "10px",
              padding: "8px",
              borderRadius: "16px",
            }}
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Kuch bhi puchein (School, Maths, Cricket, Coding)..."
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#f8fafc",
                fontSize: "14px",
                padding: "6px 10px",
              }}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="hc-btn"
              style={{
                background: isLoading ? "#475569" : "linear-gradient(135deg, #38bdf8, #2563eb)",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                padding: "9px 18px",
                fontWeight: 700,
                fontSize: "13px",
              }}
            >
              Send
            </button>
          </form>
        </main>
      )}

      {/* ========================================== */}
      {/* TAB 2: SCHOOL PHOTO, LINKS & DATABASE      */}
      {/* ========================================== */}
      {activeTab === "school" && (
        <main
          className="hc-fade"
          style={{
            flex: 1,
            maxWidth: "880px",
            width: "100%",
            margin: "0 auto",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {/* SCHOOL PHOTO BANNER CARD */}
          <div className="hc-glass" style={{ borderRadius: "20px", overflow: "hidden" }}>
            <div
              style={{
                position: "relative",
                height: "190px",
                background: schoolPhoto
                  ? `url(${schoolPhoto}) center/cover no-repeat`
                  : "linear-gradient(135deg, #1e3a8a 0%, #0f172a 55%, #78350f 100%)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "18px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(2,6,23,0.92), rgba(2,6,23,0.2))",
                }}
              />
              <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", gap: "14px" }}>
                <HolyCrossCrestLogo size={56} glow={true} />
                <div>
                  <h2 style={{ margin: 0, fontSize: "19px", color: "#fbbf24" }}>{APP_METADATA.school}</h2>
                  <p style={{ margin: "3px 0 0", fontSize: "12px", color: "#cbd5e1" }}>
                    Motto: "{APP_METADATA.motto}" • Principal: {APP_METADATA.principal}
                  </p>
                </div>
              </div>

              <label
                className="hc-btn"
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  zIndex: 3,
                  background: "rgba(2,6,23,0.78)",
                  color: "#38bdf8",
                  border: "1px solid rgba(56,189,248,0.45)",
                  borderRadius: "999px",
                  padding: "6px 12px",
                  fontSize: "11px",
                  fontWeight: 700,
                }}
              >
                + Change School Photo
                <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: "none" }} />
              </label>
            </div>

            {/* SOCIAL & OFFICIAL LINKS */}
            <div style={{ padding: "14px 16px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {[
                { label: "Instagram", url: APP_METADATA.links.instagram, bg: "linear-gradient(135deg, #ec4899, #f59e0b)" },
                { label: "YouTube", url: APP_METADATA.links.youtube, bg: "#dc2626" },
                { label: "School Website", url: APP_METADATA.links.schoolWebsite, bg: "#2563eb" },
                { label: "School Location Map", url: APP_METADATA.links.googleMaps, bg: "#059669" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hc-btn"
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                    background: link.bg,
                    padding: "8px 14px",
                    borderRadius: "10px",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          </div>

          {/* SEARCH & FILTER DATABASE */}
          <div className="hc-glass" style={{ borderRadius: "18px", padding: "14px" }}>
            <div style={{ fontSize: "15px", fontWeight: 700, color: "#fbbf24", marginBottom: "10px" }}>
              School Faculty & Office Staff Database ({filteredFaculty.length})
            </div>

            <input
              type="text"
              value={dirSearch}
              onChange={(e) => setDirSearch(e.target.value)}
              placeholder="Search teacher name or subject (e.g. Ruby, Maths, Physics)..."
              style={{
                width: "100%",
                padding: "11px 14px",
                borderRadius: "12px",
                border: "1px solid rgba(251,191,36,0.35)",
                background: "rgba(2,6,23,0.85)",
                color: "#f8fafc",
                fontSize: "14px",
                marginBottom: "10px",
              }}
            />

            <div style={{ display: "flex", gap: "6px", overflowX: "auto", paddingBottom: "8px" }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className="hc-btn"
                  onClick={() => setDirCategory(cat)}
                  style={{
                    padding: "5px 11px",
                    borderRadius: "999px",
                    border: "none",
                    whiteSpace: "nowrap",
                    fontSize: "11px",
                    fontWeight: 600,
                    background: dirCategory === cat ? "#38bdf8" : "#1e293b",
                    color: dirCategory === cat ? "#020617" : "#cbd5e1",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "10px",
                marginTop: "8px",
              }}
            >
              {filteredFaculty.map((f) => (
                <div
                  key={f.id}
                  onClick={() => handleSend(`${f.name} ke baare mein batao`)}
                  className="hc-btn"
                  style={{
                    background: "rgba(30,41,59,0.75)",
                    border: "1px solid rgba(148,163,184,0.2)",
                    borderRadius: "14px",
                    padding: "12px",
                  }}
                >
                  <div style={{ fontSize: "10px", color: "#38bdf8", fontWeight: 700, textTransform: "uppercase" }}>
                    {f.category}
                  </div>
                  <div style={{ fontSize: "15px", fontWeight: 700, color: "#fbbf24", marginTop: "3px" }}>
                    {f.name}
                  </div>
                  <div style={{ fontSize: "12px", color: "#cbd5e1", marginTop: "3px" }}>{f.role}</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* ========================================== */}
      {/* TAB 3: CRICKET HUB & LIVE MATCHES          */}
      {/* ========================================== */}
      {activeTab === "cricket" && (
        <main
          className="hc-fade"
          style={{
            flex: 1,
            maxWidth: "820px",
            width: "100%",
            margin: "0 auto",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {/* LIVE MATCH PORTALS */}
          <div className="hc-glass" style={{ borderRadius: "20px", padding: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span
                className="hc-live-dot"
                style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444" }}
              />
              <h2 style={{ margin: 0, fontSize: "17px", color: "#fbbf24" }}>Live International & IPL Matches</h2>
            </div>
            <p style={{ margin: "0 0 12px", fontSize: "12px", color: "#94a3b8" }}>
              Real-time ball-by-ball score aur schedule dekhne ke liye official live trackers kholein:
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              <a
                href={APP_METADATA.links.cricbuzz}
                target="_blank"
                rel="noreferrer"
                className="hc-btn"
                style={{
                  textDecoration: "none",
                  background: "#059669",
                  color: "#fff",
                  padding: "9px 14px",
                  borderRadius: "10px",
                  fontSize: "12px",
                  fontWeight: 700,
                }}
              >
                Cricbuzz Live Scores ↗
              </a>
              <a
                href={APP_METADATA.links.espncricinfo}
                target="_blank"
                rel="noreferrer"
                className="hc-btn"
                style={{
                  textDecoration: "none",
                  background: "#0284c7",
                  color: "#fff",
                  padding: "9px 14px",
                  borderRadius: "10px",
                  fontSize: "12px",
                  fontWeight: 700,
                }}
              >
                ESPNcricinfo Live ↗
              </a>
              <a
                href={APP_METADATA.links.icc}
                target="_blank"
                rel="noreferrer"
                className="hc-btn"
                style={{
                  textDecoration: "none",
                  background: "#4f46e5",
                  color: "#fff",
                  padding: "9px 14px",
                  borderRadius: "10px",
                  fontSize: "12px",
                  fontWeight: 700,
                }}
              >
                ICC Official Center ↗
              </a>
            </div>
          </div>

          {/* INTERACTIVE LIVE MATCH SCOREBOARD */}
          <div className="hc-glass" style={{ borderRadius: "20px", padding: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#38bdf8" }}>
                Quick Live Match Scoreboard
              </span>
              <button
                className="hc-btn"
                onClick={() => setMatchState({ ...matchState, runs: 0, wickets: 0, balls: 0 })}
                style={{
                  background: "rgba(239,68,68,0.18)",
                  color: "#f87171",
                  border: "none",
                  borderRadius: "8px",
                  padding: "5px 10px",
                  fontSize: "11px",
                  fontWeight: 700,
                }}
              >
                Reset Match
              </button>
            </div>

            <div
              style={{
                background: "rgba(2,6,23,0.8)",
                borderRadius: "14px",
                padding: "16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <div>
                <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                  {matchState.teamA} vs {matchState.teamB}
                </div>
                <div style={{ fontSize: "30px", fontWeight: 900, color: "#fbbf24" }}>
                  {matchState.runs}/{matchState.wickets}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#38bdf8" }}>
                  Overs: {oversFormatted}
                </div>
                <div style={{ fontSize: "12px", color: "#cbd5e1" }}>CRR: {runRate}</div>
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {[
                { label: "Dot", r: 0, w: 0, b: 1, bg: "#334155" },
                { label: "+1", r: 1, w: 0, b: 1, bg: "#1d4ed8" },
                { label: "+2", r: 2, w: 0, b: 1, bg: "#1d4ed8" },
                { label: "FOUR (4)", r: 4, w: 0, b: 1, bg: "#059669" },
                { label: "SIX (6)", r: 6, w: 0, b: 1, bg: "#d97706" },
                { label: "Wide (+1)", r: 1, w: 0, b: 0, bg: "#475569" },
                { label: "WICKET!", r: 0, w: 1, b: 1, bg: "#dc2626" },
              ].map((btn) => (
                <button
                  key={btn.label}
                  className="hc-btn"
                  onClick={() => updateCricketScore(btn.r, btn.w, btn.b)}
                  style={{
                    flex: "1 1 70px",
                    background: btn.bg,
                    color: "#fff",
                    border: "none",
                    borderRadius: "10px",
                    padding: "9px 8px",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* CRICKET AI QUESTIONS */}
          <div className="hc-glass" style={{ borderRadius: "20px", padding: "16px" }}>
            <div style={{ fontSize: "14px", fontWeight: 700, color: "#fbbf24", marginBottom: "10px" }}>
              Ask AI About Cricket
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {RECOMMENDED_TOPICS.Cricket.map((q) => (
                <button
                  key={q}
                  className="hc-btn"
                  onClick={() => handleSend(q)}
                  style={{
                    textAlign: "left",
                    background: "rgba(30,41,59,0.8)",
                    color: "#e2e8f0",
                    border: "1px solid rgba(56,189,248,0.25)",
                    borderRadius: "12px",
                    padding: "10px 14px",
                    fontSize: "13px",
                  }}
                >
                  🏏 {q}
                </button>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* ========================================== */}
      {/* TAB 4: RECENT CHAT HISTORY                 */}
      {/* ========================================== */}
      {activeTab === "history" && (
        <main
          className="hc-fade"
          style={{
            flex: 1,
            maxWidth: "820px",
            width: "100%",
            margin: "0 auto",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ margin: 0, fontSize: "17px", color: "#fbbf24" }}>Recent Chat History</h2>
            {sessions.length > 0 && (
              <button
                className="hc-btn"
                onClick={() => {
                  setSessions([]);
                  localStorage.removeItem("hc_chat_history");
                }}
                style={{
                  background: "rgba(239,68,68,0.2)",
                  color: "#f87171",
                  border: "none",
                  borderRadius: "10px",
                  padding: "6px 12px",
                  fontSize: "12px",
                  fontWeight: 700,
                }}
              >
                Clear All
              </button>
            )}
          </div>

          {sessions.length === 0 ? (
            <div className="hc-glass" style={{ borderRadius: "16px", padding: "24px", textAlign: "center", color: "#94a3b8" }}>
              Abhi koi saved chat nahi hai. AI Chat mein kuch puchne par history yahan dikhegi!
            </div>
          ) : (
            sessions.map((s) => (
              <div
                key={s.id}
                className="hc-glass"
                style={{
                  borderRadius: "14px",
                  padding: "12px 14px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div
                  onClick={() => openHistorySession(s)}
                  style={{ flex: 1, cursor: "pointer" }}
                >
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#f8fafc" }}>{s.title}</div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "3px" }}>
                    {s.updatedAt} • {s.messages.length} messages
                  </div>
                </div>
                <button
                  className="hc-btn"
                  onClick={() => deleteHistorySession(s.id)}
                  style={{
                    background: "rgba(239,68,68,0.16)",
                    color: "#f87171",
                    border: "none",
                    borderRadius: "8px",
                    padding: "6px 10px",
                    fontSize: "11px",
                    fontWeight: 700,
                  }}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </main>
      )}
    </div>
  );
}
