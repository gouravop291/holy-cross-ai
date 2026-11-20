import React, { useState, useEffect, useRef } from "react";

// ============================================================================
// SECTION 1: ENTERPRISE METADATA & EXTERNAL LINKS
// ============================================================================
const APP_CONFIG = {
  name: "HOLY CROSS AI",
  subtitle: "JARVIS Enterprise Desktop Portal",
  school: "Holy Cross School, Khandwa Road, Indore",
  motto: "Live and Let Live",
  principal: "Sister Liza Joseph",
  mentor: "Priyanka Ma'am (Computer Science & IT)",
  architect: "Gaurav Lalwani (Class IX B)",
  defaultSchoolBg: "/school-bg.jpg",
  defaultModel: "gemini-3.8-flash",
  availableModels: [
    "gemini-3.8-flash",
    "gemini-2.5-flash",
    "gemini-2.0-flash",
  ],
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

// ============================================================================
// SECTION 2: COMPLETE SCHOOL FACULTY & STAFF DATABASE
// ============================================================================
const FACULTY_DATA = [
  { id: "sister_liza", name: "Sister Liza Joseph", role: "Principal & Spiritual Guide", category: "Leadership" },
  { id: "priyanka_mam", name: "Priyanka Ma'am", role: "Computer Science & IT Mentor", category: "IT & Computer" },
  { id: "kamini_mam", name: "Kamini Ma'am", role: "Hindi, Sanskrit & Moral Values", category: "Languages" },
  { id: "prachi_mam", name: "Prachi Trivedi Ma'am", role: "Chemistry & Practical Lab Expert", category: "Science" },
  { id: "divya_mam", name: "Divya Ma'am", role: "Physics", category: "Science" },
  { id: "satyapal_sir", name: "Satyapal Sir", role: "Mathematics", category: "Mathematics" },
  { id: "sarika_mam", name: "Sarika Ma'am", role: "Biology & English", category: "Science" },
  { id: "savita_mam", name: "Savita Ma'am", role: "Social Science & English", category: "Social Science" },
  { id: "lalita_mam", name: "Lalita Ma'am", role: "Mathematics (Primary)", category: "Primary" },
  { id: "deepa_mam", name: "Deepa Ma'am", role: "Hindi & Sanskrit", category: "Languages" },
  { id: "sandhya_mam", name: "Sandhya Ma'am", role: "Mathematics & Computer", category: "IT & Computer" },
  { id: "alka_mam", name: "Alka Ma'am", role: "Social Science", category: "Social Science" },
  { id: "archana_mam", name: "Archana Ma'am", role: "Social Science", category: "Social Science" },
  { id: "sumit_sir", name: "Sumit Sir", role: "English & Social Studies", category: "Social Science" },
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
  { id: "ruby_mam", name: "Ruby Ma'am", role: "Primary Wing Teacher", category: "Primary" },
  { id: "vineeta_mam", name: "Vineeta Ma'am", role: "Chemistry & Science", category: "Science" },
  { id: "barkha_mam", name: "Barkha Ma'am", role: "Primary Wing Teacher", category: "Primary" },
  { id: "sheetal_mam", name: "Sheetal Ma'am", role: "Hindi & Sanskrit", category: "Languages" },
  { id: "bhawana_mam", name: "Bhawana Ma'am", role: "Computer & Mathematics", category: "IT & Computer" },
  { id: "veena_mam", name: "Veena Ma'am", role: "Fine Arts", category: "Activities" },
  { id: "pinky_mam", name: "Pinky Ma'am", role: "School Librarian", category: "Activities" },
  { id: "jay_sir", name: "Jay Sir", role: "Dance Instructor", category: "Activities" },
  { id: "deepak_sir", name: "Deepak Sir", role: "Sports & Physical Education", category: "Sports" },
  { id: "simran_mam", name: "Simran Ma'am", role: "General Knowledge & SST", category: "Social Science" },
  { id: "jenny_mam", name: "Jenny Ma'am", role: "Primary Wing Teacher", category: "Primary" },
  { id: "bharti_mam", name: "Bharti Ma'am", role: "Primary Wing Teacher", category: "Primary" },
  { id: "ravi_sir", name: "Ravi Sir", role: "School Faculty", category: "Faculty" },
  { id: "deepshika_mam", name: "Deepshika Ma'am", role: "School Faculty", category: "Faculty" },
  { id: "subash_sir", name: "Subash Sir", role: "Lead Technician (Office Staff)", category: "Office Staff" },
  { id: "gloria_mam", name: "Gloria Ma'am", role: "Office Administration", category: "Office Staff" },
  { id: "rosemary_mam", name: "Rosemary Ma'am", role: "Office Administration", category: "Office Staff" },
  { id: "sasmith_mam", name: "Sasmith Ma'am & Jasmeet", role: "Office Administration", category: "Office Staff" },
];

const RECOMMENDED_PROMPTS = {
  School: [
    "Give me an overview of Holy Cross School, Indore",
    "What subject does Ruby Ma'am teach?",
    "Who is Subash Sir and what is his role?",
    "Tell me about Sister Liza Joseph and Priyanka Ma'am",
  ],
  Academics: [
    "Explain Newton's Three Laws of Motion with examples",
    "Compare Direct Tax and Indirect Tax clearly",
    "Solve 3x + 7 = 28 step-by-step",
    "Design a high-efficiency 95%+ exam study schedule",
  ],
  Cricket: [
    "List the top ICC records of Virat Kohli and Rohit Sharma",
    "Explain the physics of reverse swing in fast bowling",
    "What is the best T20 powerplay batting strategy?",
    "Analyze MS Dhoni's greatest captaincy decisions",
  ],
  Technology: [
    "How do Large Language Models like Gemini work?",
    "Give me a complete coding roadmap for students",
    "How to deploy a React Vite project on Vercel?",
  ],
};

const FACULTY_SUMMARY = FACULTY_DATA.map((f) => `${f.name} (${f.role})`).join("; ");

function buildSystemInstruction(userProfile) {
  const userInfo = userProfile
    ? `Active User: ${userProfile.name} (${userProfile.role}, ${userProfile.email}).`
    : "Active User: Guest.";
  return `You are ${APP_CONFIG.name} (${APP_CONFIG.subtitle}), the official intelligent assistant for ${APP_CONFIG.school}.
School Motto: "${APP_CONFIG.motto}". Principal: ${APP_CONFIG.principal}.
Architected by: ${APP_CONFIG.architect}, mentored by ${APP_CONFIG.mentor}.
${userInfo}
Verified School Faculty & Office Staff: ${FACULTY_SUMMARY}.
Response Rules:
- Always respond in clean, professional English.
- Answer any question accurately: School info, NCERT academics, Science, Mathematics, Economics, Cricket, and Technology.
- Structure longer answers with clear bullet points and concise paragraphs.`;
}

// ============================================================================
// SECTION 3: DESKTOP & FLOATING DOCK SUPPLEMENTARY STYLES
// ============================================================================
const EXTRA_STYLES = `
  .hc-desktop-shell {
    min-height: 100vh;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    display: flex;
    flex-direction: column;
    padding-bottom: 96px;
  }
  .hc-glass-panel {
    background: rgba(10, 18, 36, 0.78);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border: 1px solid rgba(56, 189, 248, 0.22);
    box-shadow: 0 14px 40px rgba(0, 0, 0, 0.45);
  }
  .hc-hover-card {
    background: rgba(15, 23, 42, 0.82);
    border: 1px solid rgba(148, 163, 184, 0.2);
    transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  }
  .hc-hover-card:hover {
    transform: translateY(-2px);
    border-color: rgba(251, 191, 36, 0.55);
    box-shadow: 0 10px 26px rgba(251, 191, 36, 0.14);
  }
  .hc-action-btn {
    transition: transform 0.16s ease, filter 0.16s ease, background 0.2s ease;
    cursor: pointer;
    user-select: none;
  }
  .hc-action-btn:hover { filter: brightness(1.12); }
  .hc-action-btn:active { transform: scale(0.96); }

  .hc-floating-dock {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 40;
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 10px 18px;
    border-radius: 999px;
    background: rgba(8, 15, 32, 0.88);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(251, 191, 36, 0.35);
    box-shadow: 0 16px 45px rgba(0, 0, 0, 0.65), 0 0 24px rgba(56, 189, 248, 0.2);
    max-width: calc(100vw - 24px);
    overflow-x: auto;
  }
  .hc-fab-quick {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 41;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: 1px solid rgba(251, 191, 36, 0.6);
    background: linear-gradient(135deg, #fbbf24, #d97706);
    color: #020617;
    font-weight: 900;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 12px 30px rgba(251, 191, 36, 0.4);
    cursor: pointer;
    transition: transform 0.2s ease;
  }
  .hc-fab-quick:hover { transform: scale(1.08); }

  .hc-desktop-grid {
    display: grid;
    grid-template-columns: 320px 1fr;
    gap: 24px;
    align-items: start;
  }
  @media (max-width: 960px) {
    .hc-desktop-grid {
      grid-template-columns: 1fr;
    }
    .hc-fab-quick {
      bottom: 86px;
      right: 16px;
      width: 48px;
      height: 48px;
    }
  }
`;

// ============================================================================
// SECTION 4: HOLY CROSS CREST LOGO
// ============================================================================
function HolyCrossCrestLogo({ size = 46 }) {
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
        padding: "2px",
        boxShadow: "0 0 22px rgba(251, 191, 36, 0.45)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
      title="Holy Cross School Crest"
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
          <path d="M32 11V39M22 21H42" stroke="#fbbf24" strokeWidth="4.2" strokeLinecap="round" />
          <path d="M23 45C23 48.5 27 51 32 51C37 51 41 48.5 41 45H23Z" fill="#38bdf8" stroke="#fbbf24" strokeWidth="1.5" />
          <path d="M32 36C32 36 28.5 40 30 43C31 44.5 33 44.5 34 43C35.5 40 32 36 32 36Z" fill="#f59e0b" />
        </svg>
      </div>
    </div>
  );
}

// ============================================================================
// SECTION 5: 60FPS MORPHING PARTICLE ORB STAGE (USES YOUR EXACT CSS)
// ============================================================================
function MorphOrbStage({ onAsk, externalPrompt, onClearExternal }) {
  const [phase, setPhase] = useState("idle"); // idle | think | resolve | answered
  const [inputValue, setInputValue] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [questionAsked, setQuestionAsked] = useState("");
  const [shake, setShake] = useState(false);

  const runQuery = async (text) => {
    const clean = text.trim();
    if (!clean) {
      setShake(true);
      setTimeout(() => setShake(false), 300);
      return;
    }

    setQuestionAsked(clean);
    setInputValue("");
    setPhase("think");

    const reply = await onAsk(clean);

    setPhase("resolve");
    setTimeout(() => {
      setAnswerText(reply);
      setPhase("answered");
    }, 450);
  };

  useEffect(() => {
    if (externalPrompt) {
      runQuery(externalPrompt);
      onClearExternal();
    }
  }, [externalPrompt]);

  // Dynamic CSS variables driving your .mo-root template
  const phaseVars = {
    idle: {
      "--w": "640px",
      "--h": "62px",
      "--r": "999px",
      "--oGlow": 1,
      "--oHalo": 0.25,
      "--oPill": 1,
      "--oBall": 0,
      "--oGreen": 0,
      "--oCard": 0,
      "--oRing": 1,
      "--oInput": 1,
      "--inScale": 1,
      "--oAur": 1,
      "--gs": 0.55,
      "--cs": 0.92,
      "--hOp": 0,
      "--dotS": 0,
      "--bloom": 1,
      "--sOp": 0,
      "--sTy": 6,
      "--oCenter": 0.2,
    },
    think: {
      "--w": "86px",
      "--h": "86px",
      "--r": "999px",
      "--oGlow": 1,
      "--oHalo": 1,
      "--oPill": 0,
      "--oBall": 1,
      "--oGreen": 0,
      "--oCard": 0,
      "--oRing": 0.6,
      "--oInput": 0,
      "--inScale": 0.7,
      "--oAur": 1,
      "--gs": 0.6,
      "--cs": 0.85,
      "--hOp": 0,
      "--dotS": 0,
      "--bloom": 1.6,
      "--sOp": 1,
      "--sTy": 0,
      "--oCenter": 1,
    },
    resolve: {
      "--w": "92px",
      "--h": "92px",
      "--r": "999px",
      "--oGlow": 0.6,
      "--oHalo": 0.8,
      "--oPill": 0,
      "--oBall": 0,
      "--oGreen": 1,
      "--oCard": 0,
      "--oRing": 0,
      "--oInput": 0,
      "--inScale": 0.7,
      "--oAur": 0.4,
      "--gs": 1,
      "--cs": 0.9,
      "--hOp": 0,
      "--dotS": 1,
      "--bloom": 1.2,
      "--sOp": 1,
      "--sTy": 0,
      "--oCenter": 0.8,
    },
    answered: {
      "--w": "740px",
      "--h": "310px",
      "--r": "24px",
      "--oGlow": 0.45,
      "--oHalo": 0.3,
      "--oPill": 0,
      "--oBall": 0,
      "--oGreen": 0,
      "--oCard": 1,
      "--oRing": 0,
      "--oInput": 0,
      "--inScale": 0.8,
      "--oAur": 0.2,
      "--gs": 0.55,
      "--cs": 1,
      "--hOp": 1,
      "--dotS": 1,
      "--bloom": 0.7,
      "--sOp": 0,
      "--sTy": 6,
      "--oCenter": 0.15,
    },
  };

  const activeVars = phaseVars[phase] || phaseVars.idle;

  return (
    <div
      className="mo-root"
      data-phase={phase}
      style={{
        ...activeVars,
        border: "1px solid rgba(56, 189, 248, 0.25)",
        boxShadow: "0 20px 55px rgba(0, 0, 0, 0.55)",
      }}
    >
      <div className="mo-bg" />
      <div className="mo-halo" />

      <div className="mo-mover">
        <div
          className="mo-actor"
          data-shake={shake ? "true" : undefined}
          style={{
            transition:
              "width 0.55s cubic-bezier(0.22, 1, 0.36, 1), height 0.55s cubic-bezier(0.22, 1, 0.36, 1), border-radius 0.55s ease",
          }}
        >
          <div className="mo-underglow" />
          <div className="mo-halo-green" />
          <div className="mo-surface">
            <div className="mo-aurora">
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="mo-ball" style={{ transition: "opacity 0.35s ease" }} />
          <div className="mo-green" style={{ transition: "opacity 0.3s ease, transform 0.3s ease" }} />
          <div className="mo-card" style={{ transition: "opacity 0.4s ease, transform 0.4s ease" }} />
          <div className="mo-ring" />

          {/* PILL INPUT */}
          <form
            className="mo-input"
            onSubmit={(e) => {
              e.preventDefault();
              runQuery(inputValue);
            }}
            style={{ transition: "opacity 0.25s ease, transform 0.25s ease" }}
          >
            <svg className="mo-spark" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
            </svg>
            <input
              type="text"
              className="mo-field"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask JARVIS anything (Academics, School, Cricket, Coding)..."
            />
            <button type="submit" className="mo-send" title="Ask JARVIS">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>

          {/* ANSWER CARD */}
          <div className="mo-answer">
            <div className="mo-a-head">
              <span className="mo-a-dot" />
              <span>JARVIS RESPONSE • {questionAsked.slice(0, 48)}</span>
            </div>
            <p className="mo-a-body" style={{ fontSize: "14.5px", lineHeight: 1.65 }}>
              {answerText}
            </p>
          </div>
        </div>
      </div>

      {/* STATUS INDICATOR */}
      <div className="mo-status" style={{ transition: "opacity 0.25s ease, transform 0.25s ease" }}>
        {phase === "think" && (
          <div className="mo-lab">
            <span>ANALYZING WITH GEMINI</span>
            <span className="mo-dots">
              <i />
              <i />
              <i />
            </span>
          </div>
        )}
        {phase === "resolve" && (
          <div className="mo-lab mo-lab-done">
            <span>RESPONSE READY</span>
          </div>
        )}
      </div>

      {/* RESET BUTTON */}
      <button
        type="button"
        className="mo-reset hc-action-btn"
        onClick={() => {
          setPhase("idle");
          setAnswerText("");
        }}
      >
        Ask Another Question
      </button>
    </div>
  );
}

// ============================================================================
// SECTION 6: STORAGE HELPER
// ============================================================================
function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

// ============================================================================
// SECTION 7: MAIN APPLICATION
// ============================================================================
export default function App() {
  // User Authentication State
  const [user, setUser] = useState(() => loadJSON("hc_user_profile", null));
  const [loginName, setLoginName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginRole, setLoginRole] = useState("Student");
  const [loginError, setLoginError] = useState("");

  // Gemini API Key & Model State
  const envKey = import.meta.env.VITE_GEMINI_API_KEY || "";
  const [apiKey, setApiKey] = useState(() => envKey || localStorage.getItem("hc_gemini_key") || "");
  const [selectedModel, setSelectedModel] = useState(
    () => localStorage.getItem("hc_gemini_model") || APP_CONFIG.defaultModel
  );
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey);
  const [tempModel, setTempModel] = useState(selectedModel);

  // Navigation & UI States
  const [activeTab, setActiveTab] = useState("workspace");
  const [topicCategory, setTopicCategory] = useState("School");
  const [externalPrompt, setExternalPrompt] = useState("");
  const [dirSearch, setDirSearch] = useState("");
  const [dirCategory, setDirCategory] = useState("All");
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  // School Background Photo State
  const [schoolBg, setSchoolBg] = useState(
    () => localStorage.getItem("hc_school_bg") || APP_CONFIG.defaultSchoolBg
  );

  // Recent Chat History State
  const [history, setHistory] = useState(() => loadJSON("hc_orb_history", []));

  // Live Cricket Scoreboard State
  const [matchState, setMatchState] = useState(() =>
    loadJSON("hc_cricket_board", {
      teamA: "IND",
      teamB: "AUS",
      runs: 148,
      wickets: 2,
      balls: 88,
    })
  );

  useEffect(() => {
    try {
      localStorage.setItem("hc_cricket_board", JSON.stringify(matchState));
    } catch {
      // Ignore quota errors
    }
  }, [matchState]);

  const speakText = (text) => {
    if (!voiceEnabled || typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const clean = text.replace(/[*#_`]/g, "");
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.rate = 1.02;
    window.speechSynthesis.speak(utterance);
  };

  const saveToHistory = (question, answer) => {
    const entry = {
      id: String(Date.now()),
      question,
      answer,
      timestamp: new Date().toLocaleString([], {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setHistory((prev) => {
      const next = [entry, ...prev].slice(0, 30);
      try {
        localStorage.setItem("hc_orb_history", JSON.stringify(next));
      } catch {
        // Ignore quota errors
      }
      return next;
    });
  };

  // Gemini API Request Handler (Uses selectedModel, default gemini-3.8-flash)
  const handleAskAI = async (questionText) => {
    if (!apiKey) {
      const q = questionText.toLowerCase();
      const match = FACULTY_DATA.find(
        (f) => f.name.toLowerCase().includes(q) || f.role.toLowerCase().includes(q)
      );
      const fallback = match
        ? `${match.name} — ${match.role} (${match.category}).\n\nTip: Click "API Settings" in the top bar and save your free Gemini API key to unlock full AI answers for every topic.`
        : `Please click "API Settings" in the top bar and add your free Gemini API key (from aistudio.google.com/apikey) to activate full AI responses.`;
      saveToHistory(questionText, fallback);
      speakText(fallback);
      return fallback;
    }

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: buildSystemInstruction(user) }] },
          contents: [{ role: "user", parts: [{ text: questionText }] }],
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || "Gemini API request failed");
      }

      const reply =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response was generated. Please try rephrasing your question.";
      saveToHistory(questionText, reply);
      speakText(reply);
      return reply;
    } catch (err) {
      return `API Error (${selectedModel}): ${err.message}\n\nHow to fix: Click "API Settings" in the top bar, verify your API key, or switch the model name.`;
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const cleanName = loginName.trim();
    const cleanEmail = loginEmail.trim();
    if (!cleanName) {
      setLoginError("Please enter your full name.");
      return;
    }
    if (!cleanEmail || !cleanEmail.includes("@") || !cleanEmail.includes(".")) {
      setLoginError("Please enter a valid email address (e.g., student@gmail.com).");
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
      name: "Guest User",
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

  const handleBgUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      setSchoolBg(result);
      try {
        localStorage.setItem("hc_school_bg", result);
      } catch {
        // Applies in current session if image is very large
      }
    };
    reader.readAsDataURL(file);
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
  const runRate =
    matchState.balls > 0 ? ((matchState.runs / matchState.balls) * 6).toFixed(2) : "0.00";

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

  const bgImageStyle = {
    backgroundImage: `linear-gradient(180deg, rgba(2, 6, 23, 0.78) 0%, rgba(2, 6, 23, 0.92) 100%), url(${schoolBg})`,
  };

  // ==========================================================================
  // LOGIN PORTAL SCREEN
  // ==========================================================================
  if (!user) {
    return (
      <div
        className="hc-desktop-shell"
        style={{ ...bgImageStyle, alignItems: "center", justifyContent: "center", padding: "24px" }}
      >
        <style>{EXTRA_STYLES}</style>
        <div
          className="hc-glass-panel"
          style={{ width: "100%", maxWidth: "460px", borderRadius: "28px", padding: "36px 30px" }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <HolyCrossCrestLogo size={72} />
            <h1
              style={{
                margin: "18px 0 6px",
                fontSize: "26px",
                fontWeight: 900,
                background: "linear-gradient(135deg, #fde68a, #fbbf24, #38bdf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {APP_CONFIG.name}
            </h1>
            <p style={{ margin: "0 0 24px", fontSize: "13px", color: "#94a3b8" }}>
              {APP_CONFIG.school} • {APP_CONFIG.motto}
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: 700, color: "#cbd5e1", display: "block", marginBottom: "8px" }}>
                Full Name
              </label>
              <input
                type="text"
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
                placeholder="Enter your full name"
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  borderRadius: "14px",
                  border: "1px solid rgba(56, 189, 248, 0.35)",
                  background: "rgba(2, 6, 23, 0.8)",
                  color: "#f8fafc",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: "12px", fontWeight: 700, color: "#cbd5e1", display: "block", marginBottom: "8px" }}>
                Email Address
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="student@gmail.com"
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  borderRadius: "14px",
                  border: "1px solid rgba(56, 189, 248, 0.35)",
                  background: "rgba(2, 6, 23, 0.8)",
                  color: "#f8fafc",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: "12px", fontWeight: 700, color: "#cbd5e1", display: "block", marginBottom: "8px" }}>
                Account Role
              </label>
              <select
                value={loginRole}
                onChange={(e) => setLoginRole(e.target.value)}
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  borderRadius: "14px",
                  border: "1px solid rgba(56, 189, 248, 0.35)",
                  background: "#020617",
                  color: "#f8fafc",
                  fontSize: "14px",
                  outline: "none",
                }}
              >
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
                <option value="Parent">Parent</option>
                <option value="Visitor">Visitor / Alumni</option>
              </select>
            </div>

            {loginError && (
              <div style={{ fontSize: "12.5px", color: "#f87171", textAlign: "center" }}>{loginError}</div>
            )}

            <button
              type="submit"
              className="hc-action-btn"
              style={{
                marginTop: "6px",
                padding: "14px",
                borderRadius: "14px",
                border: "none",
                background: "linear-gradient(135deg, #38bdf8, #2563eb)",
                color: "#fff",
                fontWeight: 800,
                fontSize: "15px",
                boxShadow: "0 10px 24px rgba(37, 99, 235, 0.4)",
              }}
            >
              Sign In to Desktop Portal
            </button>

            <button
              type="button"
              onClick={handleGuestLogin}
              className="hc-action-btn"
              style={{
                padding: "12px",
                borderRadius: "14px",
                border: "1px solid rgba(148, 163, 184, 0.35)",
                background: "rgba(15, 23, 42, 0.6)",
                color: "#cbd5e1",
                fontWeight: 600,
                fontSize: "13px",
              }}
            >
              Continue as Guest
            </button>
          </form>

          <p style={{ marginTop: "22px", textAlign: "center", fontSize: "11px", color: "#64748b" }}>
            Architected by {APP_CONFIG.architect}
          </p>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // MAIN DESKTOP PORTAL
  // ==========================================================================
  return (
    <div className="hc-desktop-shell" style={bgImageStyle}>
      <style>{EXTRA_STYLES}</style>

      {/* TOP DESKTOP HEADER */}
      <header
        className="hc-glass-panel"
        style={{
          padding: "16px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "18px",
          position: "sticky",
          top: 0,
          zIndex: 30,
          borderLeft: "none",
          borderRight: "none",
          borderTop: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <HolyCrossCrestLogo size={46} />
          <div>
            <div
              style={{
                fontSize: "19px",
                fontWeight: 900,
                letterSpacing: "0.8px",
                background: "linear-gradient(135deg, #fde68a, #fbbf24, #38bdf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {APP_CONFIG.name}
            </div>
            <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "2px" }}>
              {user.name} ({user.role}) • {APP_CONFIG.school}
            </div>
          </div>
        </div>

        {/* GENEROUSLY SPACED ACTION BUTTONS */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
          <label
            className="hc-action-btn"
            style={{
              background: "rgba(148, 163, 184, 0.16)",
              color: "#e2e8f0",
              border: "1px solid rgba(148, 163, 184, 0.35)",
              borderRadius: "999px",
              padding: "9px 16px",
              fontSize: "12.5px",
              fontWeight: 700,
            }}
          >
            Set School BG
            <input type="file" accept="image/*" onChange={handleBgUpload} style={{ display: "none" }} />
          </label>

          <button
            className="hc-action-btn"
            onClick={() => {
              setTempKey(apiKey);
              setTempModel(selectedModel);
              setShowKeyModal(true);
            }}
            style={{
              background: apiKey ? "rgba(34, 197, 94, 0.18)" : "rgba(251, 191, 36, 0.22)",
              color: apiKey ? "#4ade80" : "#fbbf24",
              border: `1px solid ${apiKey ? "rgba(34, 197, 94, 0.45)" : "rgba(251, 191, 36, 0.55)"}`,
              borderRadius: "999px",
              padding: "9px 16px",
              fontSize: "12.5px",
              fontWeight: 700,
            }}
          >
            {apiKey ? `API Active (${selectedModel})` : "API Settings"}
          </button>

          <button
            className="hc-action-btn"
            onClick={() => {
              setVoiceEnabled(!voiceEnabled);
              if (window.speechSynthesis) window.speechSynthesis.cancel();
            }}
            style={{
              background: voiceEnabled ? "rgba(56, 189, 248, 0.22)" : "rgba(148, 163, 184, 0.15)",
              color: voiceEnabled ? "#38bdf8" : "#94a3b8",
              border: "1px solid rgba(56, 189, 248, 0.35)",
              borderRadius: "999px",
              padding: "9px 16px",
              fontSize: "12.5px",
              fontWeight: 700,
            }}
          >
            {voiceEnabled ? "Voice: ON" : "Voice: OFF"}
          </button>

          <button
            className="hc-action-btn"
            onClick={handleLogout}
            style={{
              background: "rgba(239, 68, 68, 0.18)",
              color: "#f87171",
              border: "1px solid rgba(239, 68, 68, 0.38)",
              borderRadius: "999px",
              padding: "9px 16px",
              fontSize: "12.5px",
              fontWeight: 700,
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* API SETTINGS MODAL */}
      {showKeyModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 60,
            padding: "20px",
          }}
        >
          <div className="hc-glass-panel" style={{ borderRadius: "24px", padding: "28px", width: "100%", maxWidth: "460px" }}>
            <h3 style={{ margin: "0 0 8px", color: "#fbbf24", fontSize: "19px" }}>Gemini API Configuration</h3>
            <p style={{ margin: "0 0 18px", fontSize: "13px", color: "#94a3b8", lineHeight: 1.5 }}>
              Paste your free API key from Google AI Studio (aistudio.google.com/apikey) and choose your Gemini model.
            </p>

            <label style={{ fontSize: "12px", fontWeight: 700, color: "#cbd5e1", display: "block", marginBottom: "6px" }}>
              Gemini API Key
            </label>
            <input
              type="password"
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
              placeholder="AIzaSy..."
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "12px",
                border: "1px solid #334155",
                background: "#020617",
                color: "#f8fafc",
                fontSize: "14px",
                marginBottom: "16px",
                outline: "none",
              }}
            />

            <label style={{ fontSize: "12px", fontWeight: 700, color: "#cbd5e1", display: "block", marginBottom: "6px" }}>
              Gemini Model
            </label>
            <select
              value={tempModel}
              onChange={(e) => setTempModel(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "12px",
                border: "1px solid #334155",
                background: "#020617",
                color: "#f8fafc",
                fontSize: "14px",
                marginBottom: "22px",
                outline: "none",
              }}
            >
              {APP_CONFIG.availableModels.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "14px" }}>
              <button
                className="hc-action-btn"
                onClick={() => setShowKeyModal(false)}
                style={{
                  background: "#1e293b",
                  color: "#cbd5e1",
                  border: "none",
                  borderRadius: "12px",
                  padding: "10px 20px",
                  fontWeight: 700,
                }}
              >
                Cancel
              </button>
              <button
                className="hc-action-btn"
                onClick={() => {
                  const trimmed = tempKey.trim();
                  setApiKey(trimmed);
                  setSelectedModel(tempModel);
                  localStorage.setItem("hc_gemini_key", trimmed);
                  localStorage.setItem("hc_gemini_model", tempModel);
                  setShowKeyModal(false);
                }}
                style={{
                  background: "linear-gradient(135deg, #38bdf8, #2563eb)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "12px",
                  padding: "10px 22px",
                  fontWeight: 800,
                }}
              >
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN DESKTOP CONTAINER */}
      <div style={{ maxWidth: "1260px", width: "100%", margin: "0 auto", padding: "26px 22px", flex: 1 }}>
        {/* ================================================================== */}
        {/* TAB 1: DESKTOP AI WORKSPACE (SIDEBAR + 60FPS MORPH ORB)            */}
        {/* ================================================================== */}
        {activeTab === "workspace" && (
          <div className="hc-desktop-grid">
            {/* LEFT SIDEBAR: RECOMMENDED PROMPTS & QUICK LINKS */}
            <aside style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div className="hc-glass-panel" style={{ borderRadius: "22px", padding: "20px" }}>
                <div style={{ fontSize: "14px", fontWeight: 800, color: "#fbbf24", marginBottom: "14px" }}>
                  Recommended Questions
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "14px" }}>
                  {Object.keys(RECOMMENDED_PROMPTS).map((cat) => (
                    <button
                      key={cat}
                      className="hc-action-btn"
                      onClick={() => setTopicCategory(cat)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "999px",
                        border: "none",
                        fontSize: "11.5px",
                        fontWeight: 700,
                        background: topicCategory === cat ? "#fbbf24" : "#1e293b",
                        color: topicCategory === cat ? "#020617" : "#cbd5e1",
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {RECOMMENDED_PROMPTS[topicCategory].map((prompt) => (
                    <button
                      key={prompt}
                      className="hc-action-btn"
                      onClick={() => setExternalPrompt(prompt)}
                      style={{
                        textAlign: "left",
                        background: "rgba(15, 23, 42, 0.85)",
                        color: "#e2e8f0",
                        border: "1px solid rgba(56, 189, 248, 0.28)",
                        borderRadius: "12px",
                        padding: "10px 14px",
                        fontSize: "12.5px",
                        lineHeight: 1.4,
                      }}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="hc-glass-panel" style={{ borderRadius: "22px", padding: "20px" }}>
                <div style={{ fontSize: "14px", fontWeight: 800, color: "#38bdf8", marginBottom: "12px" }}>
                  Official Portal Links
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  {[
                    { label: "Instagram", url: APP_CONFIG.links.instagram, bg: "linear-gradient(135deg, #ec4899, #f59e0b)" },
                    { label: "YouTube", url: APP_CONFIG.links.youtube, bg: "#dc2626" },
                    { label: "School Web", url: APP_CONFIG.links.schoolWebsite, bg: "#2563eb" },
                    { label: "Maps", url: APP_CONFIG.links.googleMaps, bg: "#059669" },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="hc-action-btn"
                      style={{
                        textDecoration: "none",
                        textAlign: "center",
                        color: "#fff",
                        background: item.bg,
                        padding: "10px 12px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        fontWeight: 700,
                      }}
                    >
                      {item.label} ↗
                    </a>
                  ))}
                </div>
              </div>
            </aside>

            {/* RIGHT MAIN STAGE: YOUR 60FPS MORPHING PARTICLE ORB */}
            <section style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <MorphOrbStage
                onAsk={handleAskAI}
                externalPrompt={externalPrompt}
                onClearExternal={() => setExternalPrompt("")}
              />

              {/* RECENT ANSWERS PREVIEW */}
              {history.length > 0 && (
                <div className="hc-glass-panel" style={{ borderRadius: "22px", padding: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <span style={{ fontSize: "14px", fontWeight: 800, color: "#fbbf24" }}>Latest Interaction</span>
                    <button
                      className="hc-action-btn"
                      onClick={() => setActiveTab("history")}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#38bdf8",
                        fontSize: "12px",
                        fontWeight: 700,
                      }}
                    >
                      View All History →
                    </button>
                  </div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#f8fafc", marginBottom: "6px" }}>
                    Q: {history[0].question}
                  </div>
                  <div style={{ fontSize: "13px", color: "#cbd5e1", lineHeight: 1.55, whiteSpace: "pre-line" }}>
                    {history[0].answer.slice(0, 260)}
                    {history[0].answer.length > 260 ? "..." : ""}
                  </div>
                </div>
              )}
            </section>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 2: SCHOOL & FACULTY DIRECTORY                                  */}
        {/* ================================================================== */}
        {activeTab === "faculty" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
            <div className="hc-glass-panel" style={{ borderRadius: "24px", padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "18px" }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: "22px", color: "#fbbf24" }}>
                    Faculty & Staff Directory ({filteredFaculty.length})
                  </h2>
                  <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#94a3b8" }}>
                    Click any teacher card to ask JARVIS about them instantly.
                  </p>
                </div>

                <input
                  type="text"
                  value={dirSearch}
                  onChange={(e) => setDirSearch(e.target.value)}
                  placeholder="Search teacher name or subject..."
                  style={{
                    width: "300px",
                    maxWidth: "100%",
                    padding: "12px 16px",
                    borderRadius: "14px",
                    border: "1px solid rgba(251, 191, 36, 0.4)",
                    background: "rgba(2, 6, 23, 0.85)",
                    color: "#f8fafc",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "14px" }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className="hc-action-btn"
                    onClick={() => setDirCategory(cat)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "999px",
                      border: "none",
                      whiteSpace: "nowrap",
                      fontSize: "12px",
                      fontWeight: 700,
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
                  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                  gap: "16px",
                  marginTop: "10px",
                }}
              >
                {filteredFaculty.map((f) => (
                  <div
                    key={f.id}
                    onClick={() => {
                      setActiveTab("workspace");
                      setExternalPrompt(`Tell me about ${f.name}`);
                    }}
                    className="hc-hover-card hc-action-btn"
                    style={{ borderRadius: "16px", padding: "18px" }}
                  >
                    <div style={{ fontSize: "10.5px", color: "#38bdf8", fontWeight: 800, textTransform: "uppercase" }}>
                      {f.category}
                    </div>
                    <div style={{ fontSize: "16px", fontWeight: 800, color: "#fbbf24", marginTop: "6px" }}>
                      {f.name}
                    </div>
                    <div style={{ fontSize: "13px", color: "#cbd5e1", marginTop: "4px" }}>{f.role}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 3: CRICKET LIVE HUB                                            */}
        {/* ================================================================== */}
        {activeTab === "cricket" && (
          <div className="hc-desktop-grid">
            <div className="hc-glass-panel" style={{ borderRadius: "24px", padding: "24px" }}>
              <h2 style={{ margin: "0 0 10px", fontSize: "19px", color: "#fbbf24" }}>Live Match Portals</h2>
              <p style={{ margin: "0 0 18px", fontSize: "13px", color: "#94a3b8", lineHeight: 1.5 }}>
                Follow live international, domestic, and IPL ball-by-ball scores directly:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <a
                  href={APP_CONFIG.links.cricbuzz}
                  target="_blank"
                  rel="noreferrer"
                  className="hc-action-btn"
                  style={{ textDecoration: "none", textAlign: "center", background: "#059669", color: "#fff", padding: "12px", borderRadius: "12px", fontWeight: 700, fontSize: "13px" }}
                >
                  Cricbuzz Live Scores ↗
                </a>
                <a
                  href={APP_CONFIG.links.espncricinfo}
                  target="_blank"
                  rel="noreferrer"
                  className="hc-action-btn"
                  style={{ textDecoration: "none", textAlign: "center", background: "#0284c7", color: "#fff", padding: "12px", borderRadius: "12px", fontWeight: 700, fontSize: "13px" }}
                >
                  ESPNcricinfo Live ↗
                </a>
                <a
                  href={APP_CONFIG.links.icc}
                  target="_blank"
                  rel="noreferrer"
                  className="hc-action-btn"
                  style={{ textDecoration: "none", textAlign: "center", background: "#4f46e5", color: "#fff", padding: "12px", borderRadius: "12px", fontWeight: 700, fontSize: "13px" }}
                >
                  ICC Official Match Center ↗
                </a>
              </div>
            </div>

            <div className="hc-glass-panel" style={{ borderRadius: "24px", padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h2 style={{ margin: 0, fontSize: "19px", color: "#38bdf8" }}>Interactive Match Scoreboard</h2>
                <button
                  className="hc-action-btn"
                  onClick={() => setMatchState({ ...matchState, runs: 0, wickets: 0, balls: 0 })}
                  style={{
                    background: "rgba(239, 68, 68, 0.2)",
                    color: "#f87171",
                    border: "none",
                    borderRadius: "10px",
                    padding: "8px 16px",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  Reset Match
                </button>
              </div>

              <div
                style={{
                  background: "rgba(2, 6, 23, 0.85)",
                  borderRadius: "18px",
                  padding: "22px 26px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <div style={{ fontSize: "14px", color: "#94a3b8", fontWeight: 700 }}>
                    {matchState.teamA} vs {matchState.teamB}
                  </div>
                  <div style={{ fontSize: "40px", fontWeight: 900, color: "#fbbf24" }}>
                    {matchState.runs}/{matchState.wickets}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "18px", fontWeight: 800, color: "#38bdf8" }}>Overs: {oversFormatted}</div>
                  <div style={{ fontSize: "14px", color: "#cbd5e1", marginTop: "4px" }}>Run Rate: {runRate}</div>
                </div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                {[
                  { label: "Dot Ball", r: 0, w: 0, b: 1, bg: "#334155" },
                  { label: "+1 Run", r: 1, w: 0, b: 1, bg: "#1d4ed8" },
                  { label: "+2 Runs", r: 2, w: 0, b: 1, bg: "#1d4ed8" },
                  { label: "FOUR (4)", r: 4, w: 0, b: 1, bg: "#059669" },
                  { label: "SIX (6)", r: 6, w: 0, b: 1, bg: "#d97706" },
                  { label: "Wide (+1)", r: 1, w: 0, b: 0, bg: "#475569" },
                  { label: "WICKET!", r: 0, w: 1, b: 1, bg: "#dc2626" },
                ].map((btn) => (
                  <button
                    key={btn.label}
                    className="hc-action-btn"
                    onClick={() => updateCricketScore(btn.r, btn.w, btn.b)}
                    style={{
                      flex: "1 1 100px",
                      background: btn.bg,
                      color: "#fff",
                      border: "none",
                      borderRadius: "12px",
                      padding: "12px",
                      fontSize: "13px",
                      fontWeight: 700,
                    }}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 4: RECENT HISTORY                                              */}
        {/* ================================================================== */}
        {activeTab === "history" && (
          <div className="hc-glass-panel" style={{ borderRadius: "24px", padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
              <h2 style={{ margin: 0, fontSize: "20px", color: "#fbbf24" }}>
                Recent Conversation History ({history.length})
              </h2>
              {history.length > 0 && (
                <button
                  className="hc-action-btn"
                  onClick={() => {
                    setHistory([]);
                    localStorage.removeItem("hc_orb_history");
                  }}
                  style={{
                    background: "rgba(239, 68, 68, 0.2)",
                    color: "#f87171",
                    border: "none",
                    borderRadius: "10px",
                    padding: "9px 16px",
                    fontSize: "12.5px",
                    fontWeight: 700,
                  }}
                >
                  Clear All History
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <div style={{ padding: "32px", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>
                No conversations saved yet. Ask JARVIS a question in the AI Workspace to build your history.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {history.map((item) => (
                  <div key={item.id} className="hc-hover-card" style={{ borderRadius: "16px", padding: "18px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <span style={{ fontSize: "14.5px", fontWeight: 800, color: "#38bdf8" }}>{item.question}</span>
                      <span style={{ fontSize: "11px", color: "#64748b" }}>{item.timestamp}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: "13.5px", color: "#e2e8f0", lineHeight: 1.6, whiteSpace: "pre-line" }}>
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* FLOATING GLASS NAVIGATION DOCK */}
      <nav className="hc-floating-dock scroll-hide">
        {[
          { id: "workspace", label: "AI Workspace" },
          { id: "faculty", label: "School & Faculty" },
          { id: "cricket", label: "Cricket Live" },
          { id: "history", label: `History (${history.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            className="hc-action-btn"
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "10px 20px",
              borderRadius: "999px",
              border: "none",
              whiteSpace: "nowrap",
              fontSize: "13px",
              fontWeight: 800,
              background:
                activeTab === tab.id
                  ? "linear-gradient(135deg, #fbbf24, #f59e0b)"
                  : "rgba(30, 41, 59, 0.75)",
              color: activeTab === tab.id ? "#020617" : "#e2e8f0",
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* FLOATING QUICK-ASK ACTION BUTTON */}
      <button
        type="button"
        className="hc-fab-quick"
        title="Jump to AI Orb"
        onClick={() => {
          setActiveTab("workspace");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        ✦
      </button>
    </div>
  );
}
