import React, { useState, useEffect } from "react";

// ============================================================================
// SECTION 1: APP CONFIGURATION & LINKS
// ============================================================================
const APP_CONFIG = {
  name: "HOLY CROSS AI",
  subtitle: "JARVIS Enterprise Portal",
  school: "Holy Cross School, Khandwa Road, Indore",
  motto: "Live and Let Live",
  principal: "Sister Liza Joseph",
  mentor: "Priyanka Ma'am (Computer Science & IT)",
  architect: "Gaurav Lalwani (Class IX B)",
  defaultSchoolBg: "/school-bg.jpg",
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
// SECTION 2: FACULTY & STAFF DIRECTORY
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
    "How do Large Language Models work?",
    "Give me a complete coding roadmap for students",
    "How does serverless hosting on Vercel work?",
  ],
};

// ============================================================================
// SECTION 3: MOVING ORB & DESKTOP PORTAL STYLES
// ============================================================================
const PORTAL_STYLES = `
  @keyframes orbFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-7px); }
  }
  @keyframes orbSpin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes orbSpinRev {
    from { transform: rotate(360deg); }
    to { transform: rotate(0deg); }
  }
  @keyframes orbPulseCore {
    0%, 100% { transform: scale(1); box-shadow: 0 0 28px rgba(251,191,36,0.55), 0 0 50px rgba(56,189,248,0.35); }
    50% { transform: scale(1.08); box-shadow: 0 0 46px rgba(251,191,36,0.9), 0 0 75px rgba(56,189,248,0.6); }
  }
  @keyframes auroraDrift {
    0%, 100% { transform: translateX(0px) translateY(0px); }
    50% { transform: translateX(18px) translateY(-8px); }
  }

  .hc-orb-float { animation: orbFloat 3.4s ease-in-out infinite; }
  .hc-orb-ring-1 { animation: orbSpin 6s linear infinite; }
  .hc-orb-ring-2 { animation: orbSpinRev 4s linear infinite; }
  .hc-orb-core { animation: orbPulseCore 1.8s ease-in-out infinite; }
  .mo-aurora i { animation: auroraDrift 5s ease-in-out infinite; }

  .hc-desktop-shell {
    min-height: 100vh;
    width: 100%;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    display: flex;
    flex-direction: column;
    padding-bottom: 96px;
  }
  .hc-glass-panel {
    background: rgba(10, 18, 36, 0.8);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border: 1px solid rgba(56, 189, 248, 0.24);
    box-shadow: 0 14px 40px rgba(0, 0, 0, 0.45);
  }
  .hc-hover-card {
    background: rgba(15, 23, 42, 0.85);
    border: 1px solid rgba(148, 163, 184, 0.22);
    transition: transform 0.2s ease, border-color 0.2s ease;
  }
  .hc-hover-card:hover {
    transform: translateY(-2px);
    border-color: rgba(251, 191, 36, 0.55);
  }
  .hc-action-btn {
    transition: transform 0.16s ease, filter 0.16s ease;
    cursor: pointer;
    user-select: none;
  }
  .hc-action-btn:hover { filter: brightness(1.12); }
  .hc-action-btn:active { transform: scale(0.96); }

  .hc-floating-dock {
    position: fixed;
    bottom: 18px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 40;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 16px;
    border-radius: 999px;
    background: rgba(8, 15, 32, 0.9);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(251, 191, 36, 0.38);
    box-shadow: 0 16px 45px rgba(0, 0, 0, 0.65);
    max-width: calc(100vw - 24px);
    overflow-x: auto;
  }
  .hc-fab-quick {
    position: fixed;
    bottom: 22px;
    right: 22px;
    z-index: 41;
    width: 54px;
    height: 54px;
    border-radius: 50%;
    border: 1px solid rgba(251, 191, 36, 0.65);
    background: linear-gradient(135deg, #fbbf24, #d97706);
    color: #020617;
    font-weight: 900;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 12px 30px rgba(251, 191, 36, 0.4);
    cursor: pointer;
  }
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
      bottom: 84px;
      right: 14px;
      width: 46px;
      height: 46px;
    }
  }
`;

// ============================================================================
// SECTION 4: HOLY CROSS CREST LOGO
// ============================================================================
function HolyCrossCrestLogo({ size = 44 }) {
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
        boxShadow: "0 0 20px rgba(251, 191, 36, 0.45)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
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
// SECTION 5: LIVING, MOVING MORPH ORB STAGE
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
    }, 400);
  };

  useEffect(() => {
    if (externalPrompt) {
      runQuery(externalPrompt);
      onClearExternal();
    }
  }, [externalPrompt]);

  const phaseVars = {
    idle: {
      "--w": "640px",
      "--h": "64px",
      "--r": "999px",
      "--oGlow": 1,
      "--oHalo": 0.35,
      "--oPill": 1,
      "--oBall": 0,
      "--oGreen": 0,
      "--oCard": 0,
      "--oRing": 1,
      "--oAur": 1,
      "--hOp": 0,
      "--dotS": 0,
      "--bloom": 1,
      "--sOp": 0,
      "--sTy": 6,
      "--oCenter": 0.25,
    },
    think: {
      "--w": "98px",
      "--h": "98px",
      "--r": "999px",
      "--oGlow": 1,
      "--oHalo": 1,
      "--oPill": 0,
      "--oBall": 1,
      "--oGreen": 0,
      "--oCard": 0,
      "--oRing": 0.6,
      "--oAur": 1,
      "--hOp": 0,
      "--dotS": 0,
      "--bloom": 1.6,
      "--sOp": 1,
      "--sTy": 0,
      "--oCenter": 1,
    },
    resolve: {
      "--w": "104px",
      "--h": "104px",
      "--r": "999px",
      "--oGlow": 0.6,
      "--oHalo": 0.85,
      "--oPill": 0,
      "--oBall": 0,
      "--oGreen": 1,
      "--oCard": 0,
      "--oRing": 0,
      "--oAur": 0.4,
      "--gs": 1,
      "--hOp": 0,
      "--dotS": 1,
      "--bloom": 1.2,
      "--sOp": 1,
      "--sTy": 0,
      "--oCenter": 0.8,
    },
    answered: {
      "--w": "740px",
      "--h": "320px",
      "--r": "24px",
      "--oGlow": 0.45,
      "--oHalo": 0.3,
      "--oPill": 0,
      "--oBall": 0,
      "--oGreen": 0,
      "--oCard": 1,
      "--oRing": 0,
      "--oAur": 0.2,
      "--cs": 1,
      "--hOp": 1,
      "--dotS": 1,
      "--bloom": 0.7,
      "--sOp": 0,
      "--sTy": 6,
      "--oCenter": 0.15,
    },
  };

  return (
    <div
      className="mo-root"
      data-phase={phase}
      style={{
        ...(phaseVars[phase] || phaseVars.idle),
        border: "1px solid rgba(56, 189, 248, 0.28)",
        boxShadow: "0 20px 55px rgba(0, 0, 0, 0.55)",
        padding: "20px 12px",
      }}
    >
      <div className="mo-bg" />
      <div className="mo-halo" />

      {/* FLOATING MINI ORB EMBLEM ABOVE PILL IN IDLE MODE */}
      {phase === "idle" && (
        <div
          className="hc-orb-float"
          style={{
            position: "relative",
            width: "76px",
            height: "76px",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 6,
          }}
        >
          <div
            className="hc-orb-ring-1"
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "2px dashed rgba(56, 189, 248, 0.65)",
            }}
          />
          <div
            className="hc-orb-ring-2"
            style={{
              position: "absolute",
              inset: "8px",
              borderRadius: "50%",
              border: "2px solid transparent",
              borderTopColor: "#fbbf24",
              borderBottomColor: "#38bdf8",
            }}
          />
          <div
            className="hc-orb-core"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "radial-gradient(circle at 30% 30%, #fde68a, #f59e0b 50%, #1d4ed8 100%)",
            }}
          />
        </div>
      )}

      <div className="mo-mover">
        <div
          className={`mo-actor ${phase === "think" ? "hc-orb-float" : ""}`}
          data-shake={shake ? "true" : undefined}
          style={{
            transition:
              "width 0.5s cubic-bezier(0.22, 1, 0.36, 1), height 0.5s cubic-bezier(0.22, 1, 0.36, 1), border-radius 0.5s ease",
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

          {/* SPINNING RINGS WHILE THINKING */}
          {phase === "think" && (
            <>
              <div
                className="hc-orb-ring-1"
                style={{
                  position: "absolute",
                  inset: "-12px",
                  borderRadius: "50%",
                  border: "2px dashed rgba(56, 189, 248, 0.75)",
                  pointerEvents: "none",
                }}
              />
              <div
                className="hc-orb-ring-2"
                style={{
                  position: "absolute",
                  inset: "-5px",
                  borderRadius: "50%",
                  border: "2px solid transparent",
                  borderTopColor: "#fbbf24",
                  borderBottomColor: "#34d399",
                  pointerEvents: "none",
                }}
              />
            </>
          )}

          <div className={`mo-ball ${phase === "think" ? "hc-orb-core" : ""}`} style={{ transition: "opacity 0.3s ease" }} />
          <div className="mo-green" style={{ transition: "opacity 0.3s ease, transform 0.3s ease" }} />
          <div className="mo-card" style={{ transition: "opacity 0.35s ease, transform 0.35s ease" }} />
          <div className="mo-ring" />

          {/* RENDER INPUT ONLY IN IDLE PHASE (NO OVERLAP!) */}
          {phase === "idle" && (
            <form
              className="mo-input"
              onSubmit={(e) => {
                e.preventDefault();
                runQuery(inputValue);
              }}
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
              <button type="submit" className="mo-send" title="Send">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          )}

          {/* RENDER ANSWER CARD ONLY IN ANSWERED PHASE */}
          {phase === "answered" && (
            <div className="mo-answer" style={{ display: "flex" }}>
              <div className="mo-a-head">
                <span className="mo-a-dot" />
                <span>JARVIS • {questionAsked.slice(0, 52)}</span>
              </div>
              <p className="mo-a-body" style={{ fontSize: "14.5px", lineHeight: 1.65 }}>
                {answerText}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* STATUS INDICATOR */}
      <div className="mo-status" style={{ transition: "opacity 0.25s ease" }}>
        {phase === "think" && (
          <div className="mo-lab">
            <span>JARVIS IS THINKING</span>
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
      {phase === "answered" && (
        <button
          type="button"
          className="mo-reset hc-action-btn"
          style={{ display: "inline-flex" }}
          onClick={() => {
            setPhase("idle");
            setAnswerText("");
          }}
        >
          Ask Another Question
        </button>
      )}
    </div>
  );
}

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

// ============================================================================
// SECTION 6: MAIN APPLICATION
// ============================================================================
export default function App() {
  const [user, setUser] = useState(() => loadJSON("hc_user_profile", null));
  const [loginName, setLoginName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginRole, setLoginRole] = useState("Student");
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState("workspace");
  const [topicCategory, setTopicCategory] = useState("School");
  const [externalPrompt, setExternalPrompt] = useState("");
  const [dirSearch, setDirSearch] = useState("");
  const [dirCategory, setDirCategory] = useState("All");
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  const [schoolBg, setSchoolBg] = useState(
    () => localStorage.getItem("hc_school_bg") || APP_CONFIG.defaultSchoolBg
  );
  const [history, setHistory] = useState(() => loadJSON("hc_orb_history", []));

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

  // CALLS YOUR VERCEL BACKEND (/api/chat) — NO FRONTEND API KEY NEEDED!
  const handleAskAI = async (questionText) => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: questionText, user }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Server could not process the request.");
      }

      const reply = data.reply || "No response generated.";
      saveToHistory(questionText, reply);
      speakText(reply);
      return reply;
    } catch (err) {
      return `Connection Error: ${err.message}\n\nMake sure GROQ_API_KEY is saved in Vercel Settings → Environment Variables and api/chat.js is deployed.`;
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
        // Applies in current session if image is large
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
  // LOGIN SCREEN
  // ==========================================================================
  if (!user) {
    return (
      <div
        className="hc-desktop-shell"
        style={{ ...bgImageStyle, alignItems: "center", justifyContent: "center", padding: "24px" }}
      >
        <style>{PORTAL_STYLES}</style>
        <div
          className="hc-glass-panel"
          style={{ width: "100%", maxWidth: "450px", borderRadius: "28px", padding: "34px 28px" }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <HolyCrossCrestLogo size={70} />
            <h1
              style={{
                margin: "16px 0 6px",
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

          <form onSubmit={handleLoginSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: 700, color: "#cbd5e1", display: "block", marginBottom: "6px" }}>
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
              <label style={{ fontSize: "12px", fontWeight: 700, color: "#cbd5e1", display: "block", marginBottom: "6px" }}>
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
              <label style={{ fontSize: "12px", fontWeight: 700, color: "#cbd5e1", display: "block", marginBottom: "6px" }}>
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
              }}
            >
              Sign In to Portal
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
        </div>
      </div>
    );
  }

  // ==========================================================================
  // MAIN DESKTOP PORTAL
  // ==========================================================================
  return (
    <div className="hc-desktop-shell" style={bgImageStyle}>
      <style>{PORTAL_STYLES}</style>

      {/* HEADER */}
      <header
        className="hc-glass-panel"
        style={{
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "14px",
          position: "sticky",
          top: 0,
          zIndex: 30,
          borderLeft: "none",
          borderRight: "none",
          borderTop: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <HolyCrossCrestLogo size={42} />
          <div>
            <div
              style={{
                fontSize: "18px",
                fontWeight: 900,
                letterSpacing: "0.7px",
                background: "linear-gradient(135deg, #fde68a, #fbbf24, #38bdf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {APP_CONFIG.name}
            </div>
            <div style={{ fontSize: "11.5px", color: "#94a3b8" }}>
              {user.name} ({user.role}) • Online
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <label
            className="hc-action-btn"
            style={{
              background: "rgba(148, 163, 184, 0.16)",
              color: "#e2e8f0",
              border: "1px solid rgba(148, 163, 184, 0.35)",
              borderRadius: "999px",
              padding: "8px 15px",
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            Set School BG
            <input type="file" accept="image/*" onChange={handleBgUpload} style={{ display: "none" }} />
          </label>

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
              padding: "8px 15px",
              fontSize: "12px",
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
              padding: "8px 15px",
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <div style={{ maxWidth: "1240px", width: "100%", margin: "0 auto", padding: "22px 16px", flex: 1 }}>
        {/* TAB 1: AI WORKSPACE */}
        {activeTab === "workspace" && (
          <div className="hc-desktop-grid">
            <aside style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div className="hc-glass-panel" style={{ borderRadius: "22px", padding: "18px" }}>
                <div style={{ fontSize: "14px", fontWeight: 800, color: "#fbbf24", marginBottom: "12px" }}>
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

              <div className="hc-glass-panel" style={{ borderRadius: "22px", padding: "18px" }}>
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

            <section style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <MorphOrbStage
                onAsk={handleAskAI}
                externalPrompt={externalPrompt}
                onClearExternal={() => setExternalPrompt("")}
              />

              {history.length > 0 && (
                <div className="hc-glass-panel" style={{ borderRadius: "22px", padding: "18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                    <span style={{ fontSize: "14px", fontWeight: 800, color: "#fbbf24" }}>Latest Interaction</span>
                    <button
                      className="hc-action-btn"
                      onClick={() => setActiveTab("history")}
                      style={{ background: "transparent", border: "none", color: "#38bdf8", fontSize: "12px", fontWeight: 700 }}
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

        {/* TAB 2: FACULTY DIRECTORY */}
        {activeTab === "faculty" && (
          <div className="hc-glass-panel" style={{ borderRadius: "24px", padding: "22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px", marginBottom: "16px" }}>
              <div>
                <h2 style={{ margin: 0, fontSize: "20px", color: "#fbbf24" }}>
                  Faculty & Staff Directory ({filteredFaculty.length})
                </h2>
                <p style={{ margin: "4px 0 0", fontSize: "12.5px", color: "#94a3b8" }}>
                  Click any teacher card to ask JARVIS about them instantly.
                </p>
              </div>
              <input
                type="text"
                value={dirSearch}
                onChange={(e) => setDirSearch(e.target.value)}
                placeholder="Search teacher name or subject..."
                style={{
                  width: "280px",
                  maxWidth: "100%",
                  padding: "11px 15px",
                  borderRadius: "14px",
                  border: "1px solid rgba(251, 191, 36, 0.4)",
                  background: "rgba(2, 6, 23, 0.85)",
                  color: "#f8fafc",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
            </div>

            <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "12px" }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className="hc-action-btn"
                  onClick={() => setDirCategory(cat)}
                  style={{
                    padding: "7px 14px",
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
                gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
                gap: "14px",
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
                  style={{ borderRadius: "16px", padding: "16px" }}
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
        )}

        {/* TAB 3: CRICKET LIVE HUB */}
        {activeTab === "cricket" && (
          <div className="hc-desktop-grid">
            <div className="hc-glass-panel" style={{ borderRadius: "24px", padding: "22px" }}>
              <h2 style={{ margin: "0 0 10px", fontSize: "18px", color: "#fbbf24" }}>Live Match Portals</h2>
              <p style={{ margin: "0 0 16px", fontSize: "13px", color: "#94a3b8", lineHeight: 1.5 }}>
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

            <div className="hc-glass-panel" style={{ borderRadius: "24px", padding: "22px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                <h2 style={{ margin: 0, fontSize: "18px", color: "#38bdf8" }}>Interactive Match Scoreboard</h2>
                <button
                  className="hc-action-btn"
                  onClick={() => setMatchState({ ...matchState, runs: 0, wickets: 0, balls: 0 })}
                  style={{
                    background: "rgba(239, 68, 68, 0.2)",
                    color: "#f87171",
                    border: "none",
                    borderRadius: "10px",
                    padding: "8px 14px",
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
                  padding: "20px 24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "18px",
                }}
              >
                <div>
                  <div style={{ fontSize: "13px", color: "#94a3b8", fontWeight: 700 }}>
                    {matchState.teamA} vs {matchState.teamB}
                  </div>
                  <div style={{ fontSize: "36px", fontWeight: 900, color: "#fbbf24" }}>
                    {matchState.runs}/{matchState.wickets}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "17px", fontWeight: 800, color: "#38bdf8" }}>Overs: {oversFormatted}</div>
                  <div style={{ fontSize: "13px", color: "#cbd5e1", marginTop: "4px" }}>Run Rate: {runRate}</div>
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
                      flex: "1 1 95px",
                      background: btn.bg,
                      color: "#fff",
                      border: "none",
                      borderRadius: "12px",
                      padding: "11px",
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

        {/* TAB 4: RECENT HISTORY */}
        {activeTab === "history" && (
          <div className="hc-glass-panel" style={{ borderRadius: "24px", padding: "22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h2 style={{ margin: 0, fontSize: "19px", color: "#fbbf24" }}>
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
                    padding: "8px 14px",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  Clear All
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <div style={{ padding: "30px", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>
                No conversations saved yet. Ask JARVIS a question in the AI Workspace to build your history.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {history.map((item) => (
                  <div key={item.id} className="hc-hover-card" style={{ borderRadius: "16px", padding: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <span style={{ fontSize: "14px", fontWeight: 800, color: "#38bdf8" }}>{item.question}</span>
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
              padding: "9px 18px",
              borderRadius: "999px",
              border: "none",
              whiteSpace: "nowrap",
              fontSize: "12.5px",
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

      {/* FLOATING QUICK-ASK BUTTON */}
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
