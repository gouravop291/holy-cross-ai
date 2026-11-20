import React, { useState, useEffect, useRef } from "react";

// ==========================================
// SECTION 1: APP METADATA
// ==========================================
const APP_METADATA = {
  name: "HOLY CROSS AI",
  edition: "JARVIS Enterprise Edition",
  school: "Holy Cross School, Khandwa Road, Indore",
  motto: "Live and Let Live",
  principal: "Sister Liza Joseph",
  mentor: "Priyanka Ma'am (Computer Science & IT)",
  architect: "Gaurav Lalwani (Class IX B IT Topper)",
  city: "Indore, Madhya Pradesh",
};

// ==========================================
// SECTION 2: OFFICIAL HOLY CROSS CREST LOGO
// ==========================================
function HolyCrossCrestLogo({ size = 56, glow = true }) {
  const outerR = Math.round(size * 0.28);
  const innerR = Math.round(size * 0.24);
  const svgSize = Math.round(size * 0.78);

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: `${outerR}px`,
        background:
          "linear-gradient(135deg, #fbbf24 0%, #d97706 55%, #78350f 100%)",
        padding: "2.5px",
        boxShadow: glow ? "0 0 28px rgba(251, 191, 36, 0.55)" : "none",
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
          background:
            "radial-gradient(circle at 50% 30%, #1e3a8a, #020617 85%)",
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
// SECTION 3: COMPLETE FACULTY & SCHOOL BRAIN
// ==========================================
const FACULTY_DATA = [
  {
    id: "sister_liza",
    name: "Sister Liza Joseph",
    role: "Principal & Spiritual Guide",
    category: "Leadership",
    keywords: ["principal", "sister liza", "liza", "head"],
    answer:
      "Sister Liza Joseph is the respected Principal of Holy Cross School, Khandwa Road, Indore, guiding students with discipline and the motto 'Live and Let Live'.",
    hindiSummary:
      "सिस्टर लिज़ा जोसेफ होली क्रॉस स्कूल, इंदौर की प्रिंसिपल हैं।",
  },
  {
    id: "priyanka_mam",
    name: "Priyanka Ma'am",
    role: "Computer Science & IT Mentor",
    category: "IT & Computer",
    keywords: ["priyanka", "computer", "it", "mentor"],
    answer:
      "Priyanka Ma'am is the Computer Science & IT mentor who guided Gaurav Lalwani in building Holy Cross AI.",
    hindiSummary:
      "प्रियंका मैम हमारी कंप्यूटर साइंस और आईटी टीचर हैं।",
  },
  {
    id: "kamini_mam",
    name: "Kamini Ma'am",
    role: "Hindi, Sanskrit & Moral Values",
    category: "Languages",
    keywords: ["kamini", "hindi", "sanskrit", "moral"],
    answer:
      "Kamini Ma'am teaches Hindi, Sanskrit, and Moral Values with deep clarity and warmth.",
    hindiSummary:
      "कामिनी मैम हमें हिंदी, संस्कृत और जीवन के नैतिक मूल्य पढ़ाती हैं।",
  },
  {
    id: "prachi_mam",
    name: "Prachi Trivedi Ma'am",
    role: "Chemistry & Practical Lab Expert",
    category: "Science",
    keywords: ["prachi", "trivedi", "chemistry", "lab"],
    answer:
      "Prachi Trivedi Ma'am teaches Chemistry and makes chemical equations and practical lab experiments easy to understand.",
    hindiSummary:
      "प्राची त्रिवेदी मैम हमारी केमिस्ट्री टीचर हैं।",
  },
  {
    id: "divya_mam",
    name: "Divya Ma'am",
    role: "Physics",
    category: "Science",
    keywords: ["divya", "physics", "phy"],
    answer:
      "Divya Ma'am teaches Physics and connects laws of motion, force, and optics with real-life examples.",
    hindiSummary:
      "दिव्या मैम हमें फिजिक्स पढ़ाती हैं।",
  },
  {
    id: "satyapal_sir",
    name: "Satyapal Sir",
    role: "Mathematics",
    category: "Mathematics",
    keywords: ["satyapal", "maths", "math", "mathematics"],
    answer:
      "Satyapal Sir is a senior Mathematics teacher who simplifies theorems, algebra, and geometry.",
    hindiSummary:
      "सत्यपाल सर हमारे मैथ्स के टीचर हैं।",
  },
  {
    id: "sarika_mam",
    name: "Sarika Ma'am",
    role: "Biology & English",
    category: "Science & Languages",
    keywords: ["sarika", "bio", "biology", "english"],
    answer: "Sarika Ma'am teaches Biology and English.",
    hindiSummary: "सारिका मैम बायोलॉजी और इंग्लिश पढ़ाती हैं।",
  },
  {
    id: "savita_mam",
    name: "Savita Ma'am",
    role: "Social Science & English",
    category: "Social & Languages",
    keywords: ["savita", "social", "sst", "english"],
    answer: "Savita Ma'am teaches Social Science and English.",
    hindiSummary: "सविता मैम सोशल साइंस और इंग्लिश पढ़ाती हैं।",
  },
  {
    id: "lalita_mam",
    name: "Lalita Ma'am",
    role: "Maths (Primary)",
    category: "Primary",
    keywords: ["lalita", "maths", "primary"],
    answer: "Lalita Ma'am teaches Primary Mathematics.",
    hindiSummary: "ललिता मैम प्राइमरी में मैथ्स पढ़ाती हैं।",
  },
  {
    id: "deepa_mam",
    name: "Deepa Ma'am",
    role: "Hindi & Sanskrit",
    category: "Languages",
    keywords: ["deepa", "hindi", "sanskrit"],
    answer: "Deepa Ma'am teaches Hindi and Sanskrit.",
    hindiSummary: "दीपा मैम हिंदी और संस्कृत पढ़ाती हैं।",
  },
  {
    id: "sandhya_mam",
    name: "Sandhya Ma'am",
    role: "Maths & Computer",
    category: "Maths & IT",
    keywords: ["sandhya", "maths", "computer"],
    answer: "Sandhya Ma'am teaches Mathematics and Computer.",
    hindiSummary: "संध्या मैम मैथ्स और कंप्यूटर पढ़ाती हैं।",
  },
  {
    id: "alka_mam",
    name: "Alka Ma'am",
    role: "Social Science",
    category: "Social Science",
    keywords: ["alka", "social", "sst"],
    answer: "Alka Ma'am teaches Social Science.",
    hindiSummary: "अल्का मैम सोशल साइंस पढ़ाती हैं।",
  },
  {
    id: "archana_mam",
    name: "Archana Ma'am",
    role: "Social Science",
    category: "Social Science",
    keywords: ["archana", "social", "sst"],
    answer: "Archana Ma'am teaches Social Science.",
    hindiSummary: "अर्चना मैम सोशल साइंस पढ़ाती हैं।",
  },
  {
    id: "sumit_sir",
    name: "Sumit Sir",
    role: "English & SST",
    category: "Social & Languages",
    keywords: ["sumit", "english", "sst"],
    answer: "Sumit Sir teaches English and Social Studies (SST).",
    hindiSummary: "सुमित सर इंग्लिश और सोशल स्टडीज़ पढ़ाते हैं।",
  },
  {
    id: "venus_mam",
    name: "Venus Ma'am",
    role: "English",
    category: "Languages",
    keywords: ["venus", "english"],
    answer: "Venus Ma'am teaches English.",
    hindiSummary: "वीनस मैम इंग्लिश पढ़ाती हैं।",
  },
  {
    id: "rama_mam",
    name: "Rama Ma'am",
    role: "Hindi & Sanskrit",
    category: "Languages",
    keywords: ["rama", "hindi", "sanskrit"],
    answer: "Rama Ma'am teaches Hindi and Sanskrit.",
    hindiSummary: "रमा मैम हिंदी और संस्कृत पढ़ाती हैं।",
  },
  {
    id: "preeti_mam",
    name: "Preeti Ma'am",
    role: "Hindi & Sanskrit",
    category: "Languages",
    keywords: ["preeti", "hindi", "sanskrit"],
    answer: "Preeti Ma'am teaches Hindi and Sanskrit.",
    hindiSummary: "प्रीति मैम हिंदी और संस्कृत पढ़ाती हैं।",
  },
  {
    id: "jyoti_mam",
    name: "Jyoti Ma'am",
    role: "English",
    category: "Languages",
    keywords: ["jyoti", "english"],
    answer: "Jyoti Ma'am teaches English.",
    hindiSummary: "ज्योति मैम इंग्लिश पढ़ाती हैं।",
  },
  {
    id: "anjana_mam",
    name: "Anjana Ma'am",
    role: "Biology & Science",
    category: "Science",
    keywords: ["anjana", "bio", "biology", "science"],
    answer: "Anjana Ma'am teaches Biology and Science.",
    hindiSummary: "अंजना मैम बायोलॉजी और साइंस पढ़ाती हैं।",
  },
  {
    id: "sr_lisa_t",
    name: "Sr. Lisa T.",
    role: "English & Value Education",
    category: "Languages & Values",
    keywords: ["lisa", "sr lisa", "english", "value"],
    answer: "Sr. Lisa T. teaches English and Value Education.",
    hindiSummary: "सिस्टर लिज़ा टी. इंग्लिश और वैल्यू एजुकेशन पढ़ाती हैं।",
  },
  {
    id: "ekta_mam",
    name: "Ekta Ma'am",
    role: "Mathematics",
    category: "Mathematics",
    keywords: ["ekta", "maths"],
    answer: "Ekta Ma'am teaches Mathematics.",
    hindiSummary: "एकता मैम मैथ्स पढ़ाती हैं।",
  },
  {
    id: "shweta_verma",
    name: "Shweta Verma Ma'am",
    role: "Science, Value Education & Computer",
    category: "Science & IT",
    keywords: ["shweta verma", "verma", "science", "value", "computer"],
    answer: "Shweta Verma Ma'am teaches Science, Value Education, and Computer.",
    hindiSummary: "श्वेता वर्मा मैम साइंस, वैल्यू और कंप्यूटर पढ़ाती हैं।",
  },
  {
    id: "shweta_vyas",
    name: "Shweta Vyas Ma'am",
    role: "Mathematics",
    category: "Mathematics",
    keywords: ["shweta vyas", "vyas", "maths"],
    answer: "Shweta Vyas Ma'am teaches Mathematics.",
    hindiSummary: "श्वेता व्यास मैम मैथ्स पढ़ाती हैं।",
  },
  {
    id: "nisha_sharma",
    name: "Nisha Sharma Ma'am",
    role: "Mathematics",
    category: "Mathematics",
    keywords: ["nisha", "nisha sharma", "maths"],
    answer: "Nisha Sharma Ma'am teaches Mathematics.",
    hindiSummary: "निशा शर्मा मैम मैथ्स पढ़ाती हैं।",
  },
  {
    id: "neha_yadav",
    name: "Neha Yadav Ma'am",
    role: "English",
    category: "Languages",
    keywords: ["neha yadav", "yadav", "english"],
    answer: "Neha Yadav Ma'am teaches English.",
    hindiSummary: "नेहा यादव मैम इंग्लिश पढ़ाती हैं।",
  },
  {
    id: "neha_shukla",
    name: "Neha Shukla Ma'am",
    role: "Science",
    category: "Science",
    keywords: ["neha shukla", "shukla", "science"],
    answer: "Neha Shukla Ma'am teaches Science.",
    hindiSummary: "नेहा शुक्ला मैम साइंस पढ़ाती हैं।",
  },
  {
    id: "ashwini_mam",
    name: "Ashwini Ma'am",
    role: "English",
    category: "Languages",
    keywords: ["ashwini", "english"],
    answer: "Ashwini Ma'am teaches English.",
    hindiSummary: "अश्विनी मैम इंग्लिश पढ़ाती हैं।",
  },
  {
    id: "ruby_mam",
    name: "Ruby Ma'am",
    role: "Primary Teacher",
    category: "Primary",
    keywords: ["ruby", "primary"],
    answer: "Ruby Ma'am is a dedicated Primary Wing teacher at Holy Cross School.",
    hindiSummary: "रूबी मैम प्राइमरी विंग में पढ़ाती हैं।",
  },
  {
    id: "vineeta_mam",
    name: "Vineeta Ma'am",
    role: "Chemistry & Science",
    category: "Science",
    keywords: ["vineeta", "chemistry", "science"],
    answer: "Vineeta Ma'am teaches Chemistry and Science.",
    hindiSummary: "विनीता मैम केमिस्ट्री और साइंस पढ़ाती हैं।",
  },
  {
    id: "barkha_mam",
    name: "Barkha Ma'am",
    role: "Primary Teacher",
    category: "Primary",
    keywords: ["barkha", "primary"],
    answer: "Barkha Ma'am teaches in the Primary Wing.",
    hindiSummary: "बरखा मैम प्राइमरी विंग में पढ़ाती हैं।",
  },
  {
    id: "sheetal_mam",
    name: "Sheetal Ma'am",
    role: "Hindi & Sanskrit",
    category: "Languages",
    keywords: ["sheetal", "hindi", "sanskrit"],
    answer: "Sheetal Ma'am teaches Hindi and Sanskrit.",
    hindiSummary: "शीतल मैम हिंदी और संस्कृत पढ़ाती हैं।",
  },
  {
    id: "bhawana_mam",
    name: "Bhawana Ma'am",
    role: "Computer & Maths",
    category: "Maths & IT",
    keywords: ["bhawana", "computer", "maths"],
    answer: "Bhawana Ma'am teaches Computer and Mathematics.",
    hindiSummary: "भावना मैम कंप्यूटर और मैथ्स पढ़ाती हैं।",
  },
  {
    id: "veena_mam",
    name: "Veena Ma'am",
    role: "Arts",
    category: "Activities",
    keywords: ["veena", "arts", "drawing"],
    answer: "Veena Ma'am teaches Arts and creative expression.",
    hindiSummary: "वीना मैम आर्ट्स पढ़ाती हैं।",
  },
  {
    id: "pinky_mam",
    name: "Pinky Ma'am",
    role: "Library",
    category: "Library",
    keywords: ["pinky", "library", "lib"],
    answer: "Pinky Ma'am manages the School Library.",
    hindiSummary: "पिंकी मैम स्कूल की लाइब्रेरी संभालती हैं।",
  },
  {
    id: "jay_sir",
    name: "Jay Sir",
    role: "Dance",
    category: "Activities",
    keywords: ["jay", "dance"],
    answer: "Jay Sir is our Dance teacher.",
    hindiSummary: "जय सर हमारे डांस टीचर हैं।",
  },
  {
    id: "deepak_sir",
    name: "Deepak Sir",
    role: "Sports & Physical Education",
    category: "Sports",
    keywords: ["deepak", "sports", "pt", "games"],
    answer: "Deepak Sir is our Sports and Physical Education teacher.",
    hindiSummary: "दीपक सर हमारे स्पोर्ट्स टीचर हैं।",
  },
  {
    id: "simran_mam",
    name: "Simran Ma'am",
    role: "GK, SST & Commerce/Computer",
    category: "Social & GK",
    keywords: ["simran", "gk", "sst"],
    answer: "Simran Ma'am teaches GK and SST.",
    hindiSummary: "सिमरन मैम जीके और एसएसटी पढ़ाती हैं।",
  },
  {
    id: "jenny_mam",
    name: "Jenny Ma'am",
    role: "Primary Teacher",
    category: "Primary",
    keywords: ["jenny", "primary"],
    answer: "Jenny Ma'am teaches in the Primary Wing.",
    hindiSummary: "जेनी मैम प्राइमरी विंग में पढ़ाती हैं।",
  },
  {
    id: "bharti_mam",
    name: "Bharti Ma'am",
    role: "Primary Teacher",
    category: "Primary",
    keywords: ["bharti", "primary"],
    answer: "Bharti Ma'am teaches in the Primary Wing.",
    hindiSummary: "भारती मैम प्राइमरी विंग में पढ़ाती हैं।",
  },
  {
    id: "ravi_sir",
    name: "Ravi Sir",
    role: "School Faculty",
    category: "Faculty",
    keywords: ["ravi", "ravi sir"],
    answer: "Ravi Sir is a valued faculty member of Holy Cross School.",
    hindiSummary: "रवि सर होली क्रॉस स्कूल के टीचर हैं।",
  },
  {
    id: "deepshika_mam",
    name: "Deepshika Ma'am",
    role: "School Faculty",
    category: "Faculty",
    keywords: ["deepshika", "deepshikha"],
    answer: "Deepshika Ma'am is a valued faculty member of Holy Cross School.",
    hindiSummary: "दीपशिखा मैम होली क्रॉस स्कूल की टीचर हैं।",
  },
  {
    id: "subash_sir",
    name: "Subash Sir",
    role: "The Best Technician (Office Staff)",
    category: "Office Staff",
    keywords: ["subash", "technician", "tech", "staff"],
    answer: "Subash Sir is known as the best technician in our school office staff.",
    hindiSummary: "सुभाष सर स्कूल के सबसे बेहतरीन टेक्नीशियन हैं।",
  },
  {
    id: "gloria_mam",
    name: "Gloria Ma'am",
    role: "Office Staff",
    category: "Office Staff",
    keywords: ["gloria", "office", "staff"],
    answer: "Gloria Ma'am is part of the Holy Cross School Office Staff.",
    hindiSummary: "ग्लोरिया मैम स्कूल ऑफिस स्टाफ की सदस्य हैं।",
  },
  {
    id: "rosemary_mam",
    name: "Rosemary Ma'am",
    role: "Office Staff",
    category: "Office Staff",
    keywords: ["rosemary", "office", "staff"],
    answer: "Rosemary Ma'am is part of the Holy Cross School Office Staff.",
    hindiSummary: "रोज़मेरी मैम स्कूल ऑफिस स्टाफ की सदस्य हैं।",
  },
  {
    id: "sasmith_mam",
    name: "Sasmith Ma'am",
    role: "Office Staff",
    category: "Office Staff",
    keywords: ["sasmith", "jasmeet", "office", "staff"],
    answer: "Sasmith Ma'am & Jasmeet are part of the Holy Cross School Office Staff.",
    hindiSummary: "सस्मिथ मैम और जसमीत स्कूल ऑफिस स्टाफ के सदस्य हैं।",
  },
];

// ==========================================
// SECTION 4: MAIN APPLICATION
// ==========================================
export default function App() {
  const [activeTab, setActiveTab] = useState("assistant");
  const [query, setQuery] = useState("");
  const [dirSearch, setDirSearch] = useState("");
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Welcome to HOLY CROSS AI! Ask me about any teacher, office staff, or Holy Cross School, Khandwa Road, Indore.",
      hindi:
        "होली क्रॉस एआई में आपका स्वागत है! आप किसी भी टीचर या स्कूल के बारे में पूछ सकते हैं।",
    },
  ]);

  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const speakText = (text) => {
    if (!voiceEnabled || typeof window === "undefined" || !window.speechSynthesis) {
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const findAnswer = (inputText) => {
    const q = inputText.toLowerCase().trim();

    if (q.includes("gaurav") || q.includes("creator") || q.includes("who made")) {
      return {
        text: `Holy Cross AI was architected by ${APP_METADATA.architect} under the mentorship of ${APP_METADATA.mentor}.`,
        hindi:
          "होली क्रॉस एआई को गौरव लालवानी (क्लास IX B) ने प्रियंका मैम के मार्गदर्शन में बनाया है।",
      };
    }

    if (q.includes("motto") || q.includes("school")) {
      return {
        text: `${APP_METADATA.school} — Motto: "${APP_METADATA.motto}". Principal: ${APP_METADATA.principal}.`,
        hindi:
          "होली क्रॉस स्कूल, खंडवा रोड, इंदौर का आदर्श वाक्य 'लिव एंड लेट लिव' है।",
      };
    }

    const match = FACULTY_DATA.find(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.role.toLowerCase().includes(q) ||
        item.keywords.some((kw) => q.includes(kw))
    );

    if (match) {
      return {
        text: `${match.name} (${match.role}): ${match.answer}`,
        hindi: match.hindiSummary,
      };
    }

    return {
      text: "I couldn't find an exact match for that. Try typing a teacher's name like 'Ruby Ma'am', 'Divya Ma'am', 'Subash Sir', or check the Faculty tab!",
      hindi:
        "माफ़ कीजिए, यह जानकारी नहीं मिली। कृपया किसी टीचर का नाम लिखें या फैकल्टी टैब देखें।",
    };
  };

  const handleSend = (customQuery) => {
    const textToSend = (customQuery || query).trim();
    if (!textToSend) return;

    const userMsg = { sender: "user", text: textToSend };
    const aiReply = findAnswer(textToSend);

    setMessages((prev) => [
      ...prev,
      userMsg,
      { sender: "ai", text: aiReply.text, hindi: aiReply.hindi },
    ]);
    setQuery("");
    speakText(aiReply.text);
  };

  const filteredFaculty = FACULTY_DATA.filter((f) => {
    const s = dirSearch.toLowerCase();
    return (
      f.name.toLowerCase().includes(s) ||
      f.role.toLowerCase().includes(s) ||
      f.category.toLowerCase().includes(s)
    );
  });

  const quickChips = [
    "Ruby Ma'am",
    "Sister Liza",
    "Priyanka Ma'am",
    "Divya Ma'am",
    "Subash Sir",
    "Who made this?",
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #0f172a 0%, #020617 70%)",
        color: "#f8fafc",
        fontFamily: "system-ui, -apple-system, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid rgba(56, 189, 248, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          background: "rgba(2, 6, 23, 0.85)",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <HolyCrossCrestLogo size={46} glow={true} />
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: 800,
                letterSpacing: "0.8px",
                color: "#fbbf24",
              }}
            >
              {APP_METADATA.name}
            </h1>
            <p style={{ margin: 0, fontSize: "11px", color: "#94a3b8" }}>
              {APP_METADATA.school}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setVoiceEnabled(!voiceEnabled);
            if (window.speechSynthesis) window.speechSynthesis.cancel();
          }}
          style={{
            background: voiceEnabled
              ? "rgba(56, 189, 248, 0.2)"
              : "rgba(148, 163, 184, 0.15)",
            color: voiceEnabled ? "#38bdf8" : "#94a3b8",
            border: "1px solid rgba(56, 189, 248, 0.4)",
            borderRadius: "20px",
            padding: "6px 12px",
            fontSize: "12px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {voiceEnabled ? (isSpeaking ? "Speaking..." : "Voice ON") : "Voice OFF"}
        </button>
      </header>

      {/* NAV TABS */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          padding: "12px 16px",
          background: "rgba(15, 23, 42, 0.6)",
        }}
      >
        <button
          onClick={() => setActiveTab("assistant")}
          style={{
            padding: "8px 18px",
            borderRadius: "999px",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "13px",
            background: activeTab === "assistant" ? "#38bdf8" : "#1e293b",
            color: activeTab === "assistant" ? "#020617" : "#cbd5e1",
          }}
        >
          JARVIS Assistant
        </button>
        <button
          onClick={() => setActiveTab("faculty")}
          style={{
            padding: "8px 18px",
            borderRadius: "999px",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "13px",
            background: activeTab === "faculty" ? "#fbbf24" : "#1e293b",
            color: activeTab === "faculty" ? "#020617" : "#cbd5e1",
          }}
        >
          Faculty Directory ({FACULTY_DATA.length})
        </button>
      </div>

      {/* MAIN CONTENT */}
      {activeTab === "assistant" ? (
        <main
          style={{
            flex: 1,
            maxWidth: "760px",
            width: "100%",
            margin: "0 auto",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            boxSizing: "border-box",
          }}
        >
          {/* MORPH ORB */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "10px 0",
            }}
          >
            <div
              style={{
                width: "74px",
                height: "74px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 35% 35%, #38bdf8, #1d4ed8 60%, #020617 100%)",
                boxShadow: isSpeaking
                  ? "0 0 40px #38bdf8, 0 0 18px #fbbf24"
                  : "0 0 24px rgba(56, 189, 248, 0.55)",
                transition: "all 0.3s ease",
              }}
            />
            <span style={{ fontSize: "11px", color: "#64748b", marginTop: "8px" }}>
              {APP_METADATA.motto} • Built by {APP_METADATA.architect}
            </span>
          </div>

          {/* QUICK CHIPS */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              justifyContent: "center",
            }}
          >
            {quickChips.map((chip) => (
              <button
                key={chip}
                onClick={() => handleSend(chip)}
                style={{
                  background: "rgba(30, 41, 59, 0.9)",
                  color: "#e2e8f0",
                  border: "1px solid rgba(56, 189, 248, 0.3)",
                  borderRadius: "16px",
                  padding: "6px 12px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* CHAT MESSAGES */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              overflowY: "auto",
              padding: "8px 0",
            }}
          >
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: m.sender === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                  background:
                    m.sender === "user"
                      ? "linear-gradient(135deg, #0284c7, #1d4ed8)"
                      : "rgba(30, 41, 59, 0.85)",
                  border:
                    m.sender === "user"
                      ? "none"
                      : "1px solid rgba(56, 189, 248, 0.25)",
                  padding: "12px 14px",
                  borderRadius: "14px",
                  fontSize: "14px",
                  lineHeight: 1.5,
                }}
              >
                <div>{m.text}</div>
                {m.hindi && (
                  <div
                    style={{
                      marginTop: "6px",
                      paddingTop: "6px",
                      borderTop: "1px solid rgba(255,255,255,0.1)",
                      fontSize: "13px",
                      color: "#fde68a",
                    }}
                  >
                    {m.hindi}
                  </div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* INPUT BAR */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            style={{
              display: "flex",
              gap: "8px",
              position: "sticky",
              bottom: "10px",
              background: "#020617",
              padding: "8px",
              borderRadius: "14px",
              border: "1px solid rgba(56, 189, 248, 0.35)",
            }}
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about any teacher (e.g. Ruby Ma'am, Physics)..."
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#f8fafc",
                fontSize: "14px",
                padding: "6px 8px",
              }}
            />
            <button
              type="submit"
              style={{
                background: "#38bdf8",
                color: "#020617",
                border: "none",
                borderRadius: "10px",
                padding: "8px 16px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Ask
            </button>
          </form>
        </main>
      ) : (
        <main
          style={{
            flex: 1,
            maxWidth: "860px",
            width: "100%",
            margin: "0 auto",
            padding: "16px",
            boxSizing: "border-box",
          }}
        >
          <input
            type="text"
            value={dirSearch}
            onChange={(e) => setDirSearch(e.target.value)}
            placeholder="Search teacher or subject..."
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: "12px",
              border: "1px solid rgba(251, 191, 36, 0.35)",
              background: "rgba(15, 23, 42, 0.9)",
              color: "#f8fafc",
              fontSize: "14px",
              marginBottom: "16px",
              boxSizing: "border-box",
            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "12px",
            }}
          >
            {filteredFaculty.map((f) => (
              <div
                key={f.id}
                style={{
                  background: "rgba(30, 41, 59, 0.7)",
                  border: "1px solid rgba(148, 163, 184, 0.2)",
                  borderRadius: "12px",
                  padding: "14px",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    color: "#38bdf8",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    marginBottom: "4px",
                  }}
                >
                  {f.category}
                </div>
                <div style={{ fontSize: "16px", fontWeight: 700, color: "#fbbf24" }}>
                  {f.name}
                </div>
                <div style={{ fontSize: "13px", color: "#cbd5e1", marginTop: "4px" }}>
                  {f.role}
                </div>
              </div>
            ))}
          </div>
        </main>
      )}
    </div>
  );
}
