
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
Bot,
CalendarDays,
Mic,
ShieldCheck,
Award,
Globe,
Volume2,
VolumeX,
Cpu,
BrainCircuit,
CheckCircle2,
RotateCcw,
Play,
History,
QrCode,
Presentation,
ExternalLink,

Youtube,
Instagram,
X,
Trash2,
BookOpen,
Layers,
Sparkles,
Calculator,
Compass,
FileText,
Search,
Star,
Clock,
MapPin,
Lock,
Unlock,
Sliders,
Activity,
Terminal,
Lightbulb

} from 'lucide-react';

// ============================================================================
// SECTION 1: CORE CONFIGURATION, API ENDPOINTS & OFFICIAL LINKS
// ============================================================================
const GEMINI_API_KEY = "AQ.Ab8RN6JKHOixD-IfwUPhrwFH5F8FYJcaKHihxYKtuIg-49RkMA";

const DEFAULT_DRONE_VIDEO_URL = "/1001864785.mp4";
const FALLBACK_CAMPUS_VIDEO_URL =
"https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-university-campus-41547-large.mp4";

const OFFICIAL_LINKS = {
website: "https://www.hcsindore.ac.in/",
youtube: "https://m.youtube.com/@holycrossschoolindore2016",
instagram: "https://www.instagram.com/hcs_indore_official",
projectLiveUrl:
typeof window !== "undefined"
? window.location.origin
: "https://holy-cross-ai.vercel.app",
};

const APP_METADATA = {
name: "HOLY CROSS AI",
edition: "JARVIS Mega Enterprise Edition (3000+ Lines)",
school: "Holy Cross School, Khandwa Road, Indore",
motto: "Live and Let Live",
principal: "Sister Liza Joseph",

mentor: "Priyanka Ma'am (Computer Science & IT)",
architect: "Gaurav Lalwani (Class IX B IT Topper)",
academicStats: {
pt1: "19.5 / 20",
halfYearly: "47.5 / 50",
section: "Class IX B",
city: "Indore, Madhya Pradesh",
},
};

// ============================================================================
// SECTION 2: OFFICIAL HOLY CROSS SCHOOL CREST MONOGRAM (SVG)
// ============================================================================
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
      title="Holy Cross School Monogram: The Cross & The Burning Lamp (Live and Let Live)"
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
        <svg
          viewBox="0 0 64 64"
          width={svgSize}
          height={svgSize}
          fill="none"
        >
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



// ============================================================================
// SECTION 3: EXTENDED BILINGUAL KNOWLEDGE BASE (FACULTY, DIARY, STUDY & GK)
// ============================================================================
const PERSONALIZED_BRAIN = [
{
id: "sister_liza",
subjectName: "Sister Liza Joseph (Principal)",
category: "School Leadership & Guidance",
roleInfo: "Principal & Spiritual Guide of Holy Cross School, Indore",
keywords: [
"sister liza",

"liza joseph",
"principal",
"sister",
"सिस्टर लाइजा",
"प्रिंसिपल",
"cleanliness",
"स्वच्छता",
 ],
answer:
"🙏 Sister Liza Joseph (Principal & Guiding Light): Sister Liza Joseph is the revered Principal and spiritual pillar of Holy Cross School, Khandwa Road, Indore. She guides every student toward moral excellence, strict discipline, compassion, and keeping ourselves, our classrooms, and our entire campus spotless and clean.\n\n🇮🇳 हिंदी में: सिस्टर लाइजा जोसेफ हमारे होली क्रॉस स्कूल की आदरणीय प्रिंसिपल हैं, जो हमें उच्च नैतिक मूल्यों, अनुशासन और स्वच्छता की शिक्षा देती हैं।",
hindiSummary:

"सिस्टर लाइजा जोसेफ हमारे होली क्रॉस स्कूल की आदरणीय प्रिंसिपल और मार्गदर्शक हैं। वह हमें नैतिक मूल्यों, अनुशासन और स्वच्छता की प्रेरणा देती हैं।",
},
{
id: "priyanka_mam",
subjectName: "Priyanka Ma'am (Computer Science & IT Mentor)",
category: "Faculty • Computer Science & IT",
roleInfo: "Computer Science & IT Teacher & Chief Project Mentor",
keywords: [
"priyanka",
"computer teacher",
"cs teacher",
"it teacher",
"mentor",
"प्रियंका मैम",
"कंप्यूटर",
 ],

answer:
"👩‍💻 Priyanka Ma'am (Computer Science & IT Mentor): Priyanka Ma'am is our brilliant Computer Science & IT teacher at Holy Cross School. Her visionary mentorship, technical clarity, and constant encouragement empowered Gaurav Lalwani (Class IX B) to architect and build this Holy Cross AI system.\n\n🇮🇳 हिंदी में: प्रियंका मैम हमारी कंप्यूटर साइंस और आईटी टीचर हैं, जिनके मार्गदर्शन से गौरव लालवानी ने यह Holy Cross AI प्रोजेक्ट तैयार किया है।",
hindiSummary:
"प्रियंका मैम हमारी कंप्यूटर साइंस और आईटी टीचर हैं, जिनके शानदार मार्गदर्शन से गौरव लालवानी ने यह होली क्रॉस एआई प्रोजेक्ट बनाया है।",
},
{
id: "kamini_mam",
subjectName: "Kamini Ma'am (Hindi, Sanskrit & Moral Values)",

category: "Faculty • Languages & Moral Values",
roleInfo: "Hindi, Sanskrit & Value Education Teacher",
keywords: [
"kamini",
"sanskrit teacher",
"hindi teacher",
"value teacher",
"कामिनी मैम",
"संस्कृत",
"moral values",
 ],
answer:
"📚 Kamini Ma'am (Hindi, Sanskrit & Moral Values): Kamini Ma'am teaches Hindi, Sanskrit, and Moral Values with extraordinary depth, warmth, and eloquence—strengthening our command over classical and modern languages while nurturing strong ethical character.\n\n🇮🇳 हिंदी में: कामिनी मैम हमें हिंदी, संस्कृत और नैतिक मूल्य बहुत 

ही गहराई और मधुरता के साथ पढ़ाती हैं।",
hindiSummary:
"कामिनी मैम हमें हिंदी, संस्कृत और जीवन के नैतिक मूल्य बहुत ही गहराई और मधुरता से पढ़ाती हैं।",
},
{
id: "prachi_mam",
subjectName: "Prachi Trivedi Ma'am (Chemistry)",
category: "Faculty • Science & Chemistry",
roleInfo: "Chemistry Teacher & Practical Lab Expert",
keywords: [
"prachi",
"trivedi",
"chemistry teacher",
"chemistry mam",
"प्राची मैम",
"केमिस्ट्री",
"reactions",

 ],
answer:
"🧪 Prachi Trivedi Ma'am (Chemistry): Prachi Trivedi Ma'am transforms complex chemical equations, bonding, and reactions into crystal-clear concepts and conducts engaging hands-on laboratory experiments.\n\n🇮🇳 हिंदी में: प्राची त्रिवेदी मैम हमारी केमिस्ट्री की बेहतरीन टीचर हैं जो शानदार प्रैक्टिकल एक्सपेरिमेंट्स करवाकर केमिस्ट्री को आसान बना देती हैं।",
hindiSummary:
"प्राची त्रिवेदी मैम हमारी केमिस्ट्री टीचर हैं जो शानदार प्रैक्टिकल एक्सपेरिमेंट्स करवाकर केमिस्ट्री को आसान बना देती हैं।",
},
{
id: "divya_mam",
subjectName: "Divya Ma'am (Physics)",
category: "Faculty • Science & Physics",
roleInfo: "Physics Teacher & Real-Life Concept Explainer",

keywords: [
"divya",
"physics teacher",
"physics mam",
"दिव्या मैम",
"फिजिक्स",
"motion",
"energy",
 ],
answer:
"⚡ Divya Ma'am (Physics): Divya Ma'am connects laws of motion, force, gravitation, optics, and energy with relatable real-life examples so students build strong analytical intuition.\n\n🇮🇳 हिंदी में: दिव्या मैम फिजिक्स के हर नियम को असल ज़िंदगी के उदाहरणों से जोड़कर बहुत शानदार तरीके से पढ़ाती हैं।",
hindiSummary:
"दिव्या मैम फिजिक्स के नियमों को असल ज़िंदगी के उदाहरणों से जोड़कर बहुत ही शानदार तरीके से पढ़ाती हैं।",

},
{
id: "satyapal_sir",
subjectName: "Satyapal Sir (Mathematics)",
category: "Faculty • Mathematics & Logic",
roleInfo: "Senior Mathematics Teacher & Problem-Solving Specialist",
keywords: [
"satyapal",
"maths teacher",
"math teacher",
"satyapal sir",
"सत्यपाल सर",
"मैथ्स",
"गणित",
 ],
answer:
"📐 Satyapal Sir (Mathematics): Satyapal Sir breaks down theorems, algebra, geometry, and mensuration with super interesting step-by-step 

question-solving tricks that make problem-solving logical and fun!\n\n🇮🇳 हिंदी में: सत्यपाल सर हमारे गणित के बेहद कुशल शिक्षक हैं और उनके सवाल हल करने का तरीका बेहद इंटरेस्टिंग होता है।",
hindiSummary:
"सत्यपाल सर बहुत अच्छा मैथ्स पढ़ाते हैं और उनके सवाल हल करने का तरीका बेहद इंटरेस्टिंग और अनोखा होता है।",
},
{
id: "meenakshi_mam",
subjectName: "Meenakshi Parihar Ma'am (Social Science / SST)",
category: "Faculty • Social Science (SST)",
roleInfo: "History, Geography, Civics & Economics Teacher",
keywords: [
"meenakshi",
"parihar",
"sst teacher",
"social science teacher",

"मीनाक्षी मैम",
"एसएसटी",
"history",
"geography",
 ],
answer:
"🌍 Meenakshi Parihar Ma'am (Social Science): Meenakshi Parihar Ma'am explains History, Geography, Democratic Politics, and Economics so engagingly and clearly that every concept is understood right in class.\n\n🇮🇳 हिंदी में: मीनाक्षी परिहार मैम हमारी एसएसटी टीचर हैं जिनके समझाने का तरीका इतना स्पष्ट है कि सारे अध्याय क्लास में ही समझ आ जाते हैं।",
hindiSummary:
"मीनाक्षी परिहार मैम हमारी एसएसटी टीचर हैं जिनके पढ़ाने का तरीका इतना अच्छा है कि सारे विषय तुरंत समझ आ जाते हैं।",
},
{

id: "nisha_mam",
subjectName: "Nisha Ma'am (English)",
category: "Faculty • English Literature & Grammar",
roleInfo: "English Teacher & Student Mentor",
keywords: [
"nisha",
"english teacher",
"english mam",
"निशा मैम",
"इंग्लिश टीचर",
"grammar",
"literature",
 ],
answer:
"📖 Nisha Ma'am (English): Nisha Ma'am connects with students like a supportive friend! Her warm nature and clear teaching of English prose, poetry, writing skills, and grammar make learning joyful.\n\n🇮🇳 हिंदी में: निशा मैम हमारी इंग्लिश 

टीचर हैं जो विद्यार्थियों के साथ दोस्त की तरह रहती हैं और सरल अंदाज में इंग्लिश पढ़ाती हैं।",
hindiSummary:
"निशा मैम हमारी दोस्त जैसी हैं और वह बहुत ही शानदार व सरल तरीके से इंग्लिश पढ़ाती हैं।",
},
{
id: "gaurav_creator",
subjectName: "Gaurav Lalwani (Lead Architect & Class IX B IT Topper)",
category: "Sole Creator & System Architect",
roleInfo: "Sole Full-Stack Developer • PT1: 19.5/20, HY: 47.5/50",
keywords: [
"who made you",
"who created you",
"who built you",
"kisne banaya",
"creator",
"gaurav lalwani",

"topper marks",
"गौरव लालवानी",
"architect",
 ],
answer:
"🏆 Gaurav Lalwani (Sole Lead Architect & IT Topper): Holy Cross AI is engineered by Gaurav Lalwani, Class IX B IT Topper (PT-1: 19.5/20, Half-Yearly: 47.5/50) at Holy Cross School, Khandwa Road, Indore, under the mentorship of Priyanka Ma'am!\n\n🇮🇳 हिंदी में: मुझे होली क्रॉस स्कूल के कक्षा 9वीं 'बी' के आईटी टॉपर गौरव लालवानी ने प्रियंका मैम के मार्गदर्शन में बनाया है।",
hindiSummary:
"मुझे होली क्रॉस स्कूल के कक्षा 9वीं बी के आईटी टॉपर गौरव लालवानी ने प्रियंका मैम के मार्गदर्शन में बनाया है।",
},
{
id: "school_motto_vision",
subjectName: "Holy Cross School Motto, 

Monogram, Vision & Mission",
category: "School Philosophy & NEP Objectives",
roleInfo: "Motto: Live and Let Live • Cross & Burning Lamp",
keywords: [
"motto",
"live and let live",
"monogram",
"vision",
"mission",
"nep",
"मोटो",
"विजन",
"logo",
 ],
answer:
"✝️ Holy Cross Monogram & Motto ('Live and Let Live'): The Cross echoes love, sacrifice, and service; the Burning Lamp represents students burning bright with curiosity, wisdom, and truth. 

Our mission builds academic excellence, moral integrity, eco-friendly habits, and NEP 2020 digital fluency.\n\n🇮🇳 हिंदी में: हमारे स्कूल का आदर्श वाक्य 'Live and Let Live' (जियो और जीने दो) है।",
hindiSummary:
"हमारे स्कूल का मोटो 'Live and Let Live' (जियो और जीने दो) है, और हमारा मोनोग्राम प्रेम, सेवा और ज्ञान के दीपक का प्रतीक है।",
},
{
id: "school_discipline",
subjectName: "Holy Cross School Discipline & Conduct Rules",
category: "School Rules & Code of Conduct",
roleInfo: "First Bell at 7:50 AM • Eco-Habits & Silence",
keywords: [
"discipline",
"school rules",
"conduct",

"bell time",
"first bell",
"uniform",
"अनुशासन",
"नियम",
 ],
answer:
"📏 Discipline & Conduct: The first bell rings at 7:50 AM sharp. When leaving classrooms, lights and fans must be switched off, students walk in orderly silence, classrooms stay secure during assembly/recess, and punctuality + neat uniform are essential.\n\n🇮🇳 हिंदी में: स्कूल की पहली घंटी सुबह 7:50 बजे बजती है। लाइट-पंखे बंद करना और अनुशासन बनाए रखना अनिवार्य है।",
hindiSummary:
"स्कूल की पहली घंटी सुबह 7:50 बजे बजती है। लाइट-पंखे बंद करना और अनुशासन बनाए रखना अनिवार्य है।",
},
{

id: "school_prayers",
subjectName: "Holy Cross School Prayers & Hymns",
category: "Spiritual Heritage",
roleInfo: "Morning Assembly Prayer & Hymns",
keywords: [
"prayer",
"hymn",
"we shall overcome",
"give me oil",
"showers of blessing",
"प्रार्थना",
 ],
answer:
"🙌 Morning Assembly Prayer: 'O, My God, I offer you, all I think or do, or say today. Help me to do what is right and keep me away from what is wrong. Bless my father and mother, my teachers and friends...' Beloved Hymns: 'Give Me Oil In My Lamp', 'All Things Bright and Beautiful', 'Showers 

of Blessing', and 'We Shall Overcome'.",
hindiSummary:
"प्रातःकालीन प्रार्थना हमें सही मार्ग पर चलने, माता-पिता व शिक्षकों का सम्मान करने और सद्भाव से रहने की सीख देती है।",
},
{
id: "project_consultant",
subjectName: "3D Model & Exhibition Project Consultant",
category: "Exhibition Ideas & Blueprints",
roleInfo: "Working 3D Models for IT, English, Science & SST",
keywords: [
"3d model",
"project idea",
"exhibition",
"working model",
"प्रोजेक्ट",
"मॉडल",

"blueprint",
 ],
answer:
"🏗️ 3D Exhibition Model Blueprints:\n1. IT / CS: Smart Holy Cross Eco-Campus 3D Model using IR sensors to auto-switch lights/fans + live Holy Cross AI Kiosk.\n2. English: 3D Shakespearean Globe Theatre miniature with interactive QR audio explanations.\n3. Science / SST: Electromagnetic Maglev Demonstration, Rainwater Harvesting & Solar Microgrid, or 3D Parliament & Constitutional Workflow Model.",
hindiSummary:
"एग्ज़िबिशन के लिए स्मार्ट इको-कैंपस 3D मॉडल, सोलर/रेनवाटर हार्वेस्टिंग मॉडल और इंटरएक्टिव एआई कियोस्क बेहतरीन विकल्प हैं।",
},
{
id: "seminar_pitch",
subjectName: "Official Seminar Pitch for Sister & 

Judges",
category: "Keynote Presentation",
roleInfo: "Executive Pitch Script",
keywords: [
"seminar pitch",
"keynote",
"judges pitch",
"सेमिनार",
"presentation script",
 ],
answer:
"🎙️ Official Seminar Pitch: 'Respected Sister Liza Joseph, esteemed Judges, Educators, and Guests—Welcome to Holy Cross School, Khandwa Road, Indore! Guided by our motto Live and Let Live and NEP 2020 vision, Class IX B IT Topper Gaurav Lalwani, mentored by Priyanka Ma'am, presents Holy Cross AI—an interactive educational AI platform featuring a 60FPS morphing particle orb, Gemini 2.5 Flash 

integration, JARVIS voice synthesis, conversational memory, and 3D exhibition consultation!'",
hindiSummary:
"यह प्रोजेक्ट 'Live and Let Live' के आदर्श और NEP 2020 के विजन को ध्यान में रखते हुए छात्रों को इंटरएक्टिव और स्मार्ट लर्निंग देने के लिए बनाया गया है।",
},
{
id: "economics_finance_basics",
subjectName: "Economics, Demand-Supply & Financial Literacy",
category: "Commerce & Economics Lab",
roleInfo: "Demand, Supply, Economies of Scale & Taxation",
keywords: [
"economics",
"demand",
"supply",
"economies of scale",

"tax",
"gst",
"अर्थशास्त्र",
 ],
answer:
"📊 Economics & Finance Lab: Law of Demand shows an inverse relation between price and quantity demanded (ceteris paribus). Economies of Scale lower per-unit cost as production volume rises. Direct tax is paid directly by the taxpayer (e.g., Income Tax), while Indirect tax like GST is levied on goods/services and passed on to consumers.",
hindiSummary:
"मांग का नियम कीमत और मांग के विपरीत संबंध को बताता है, जबकि पैमाने की बचत से अधिक उत्पादन पर प्रति इकाई लागत कम होती है।",
},
{
id: "science_formulas_guide",

subjectName: "Physics & Chemistry Quick Concepts",
category: "Science Study Lab",
roleInfo: "Newton's Laws, Ohm's Law, Chemical Equations",
keywords: [
"newton",
"ohm",
"gravity",
"atom",
"molecule",
"photosynthesis",
"विज्ञान",
 ],
answer:
"🔬 Science Quick Revision: Force F = m * a (Newton's 2nd Law). Kinetic Energy KE = 0.5 * m * v^2. Photosynthesis converts 6CO2 + 6H2O into C6H12O6 + 6O2 in the presence of sunlight and chlorophyll.",

hindiSummary:
"प्रकाश संश्लेषण की प्रक्रिया में पौधे सूर्य के प्रकाश और क्लोरोफिल की उपस्थिति में ग्लूकोज़ और ऑक्सीजन बनाते हैं।",
},
{
id: "virat_kohli",
subjectName: "Virat Kohli (Indian Cricket Legend)",
category: "Sports & Cricket",
keywords: ["virat kohli", "king kohli", "about virat", "kohli", "cricket"],
answer:
"🏏 Virat Kohli (King Kohli) is one of modern cricket's greatest batters with 80+ international centuries, 27,000+ international runs, 2023 ODI World Cup Player of the Tournament (765 runs), and a crucial knock in India's 2024 T20 World Cup triumph.",
hindiSummary:

"विराट कोहली आधुनिक क्रिकेट के महानतम बल्लेबाज़ों में से एक हैं, जिनके नाम 80 से अधिक अंतरराष्ट्रीय शतक दर्ज हैं।",
},
{
id: "isro_space",
subjectName: "ISRO & Chandrayaan-3 Mission",
category: "Space & Astrophysics",
keywords: ["isro", "chandrayaan", "indian space", "mangalyaan", "moon"],
answer:
"🚀 ISRO made historic milestones with Chandrayaan-3 on August 23, 2023, making India the FIRST nation to achieve a soft landing near the Moon's South Pole, alongside Aditya-L1 (solar mission) and Gaganyaan preparations.",
hindiSummary:
"इसरो के चंद्रयान-3 मिशन ने 23 अगस्त 2023 को चंद्रमा के दक्षिणी ध्रुव के पास सफल लैंडिंग कर इतिहास रचा।",
},
];


// ============================================================================
// SECTION 4: 6-LAYER HYBRID AI ENGINE (VERTEX AQ. KEY + FALLBACKS)
// ============================================================================
async function askHolyCrossAIWithMemory(rawQuery, history, memoryEnabled) {
const startTime = performance.now();
const clean = rawQuery.trim().toLowerCase().replace(/\s+/g, " ");
const lastTurn = memoryEnabled && history.length > 0 ? history[0] : null;

// Hindi Follow-up via Conversational Memory

if (
lastTurn &&
(clean.includes("in hindi") ||
clean.includes("hindi me") ||
clean.includes("हिंदी"))
) {
const prevBrain = PERSONALIZED_BRAIN.find(
(b) => b.subjectName === lastTurn.subjectName
);
if (prevBrain && prevBrain.hindiSummary) {
return {
answer: 🇮🇳 ${prevBrain.subjectName} (हिंदी में Follow-Up):\n${prevBrain.hindiSummary},
subjectName: prevBrain.subjectName,
category: ${prevBrain.category} (Memory)`,
engineLayer: "Layer 1 • Conversational Memory Core",
confidence: "100%",
latencyMs: Math.round(performance.now() - startTime) + 8,

usedMemoryContext: true,
};
}
}

// Layer 1: Scored Knowledge Matrix Match
let bestEntry = null;
let bestScore = 0;
for (const entry of PERSONALIZED_BRAIN) {
let score = 0;
for (const kw of entry.keywords) {
if (clean.includes(kw)) {
score += kw.split(" ").length * 14 + kw.length;
}
}
if (score > bestScore) {
bestScore = score;
bestEntry = entry;
}
}


if (bestEntry) {
return {
answer: bestEntry.answer,
subjectName: bestEntry.subjectName,
category: bestEntry.category,
engineLayer: "Layer 1 • Holy Cross Knowledge Matrix",
confidence: "99.9%",
latencyMs: Math.round(performance.now() - startTime) + 10,
usedMemoryContext: false,
};
}

// Layer 2: Instant Math ALU
const mathExpr = clean
.replace(/what is|calculate|solve|evaluate|kitna hota hai|equals|=?/gi, "")
.trim();

if (/^[0-9+-*/().\s%]+$/.test(mathExpr) && /[+\-*/%]/.test(mathExpr)) { try { const result = Function("use strict"; return (

{mathExpr} = 

{mathExpr})`,
category: "Mathematics & ALU",
engineLayer: "Layer 2 • Holy Cross ALU",
confidence: "100%",
latencyMs: Math.round(performance.now() - startTime) + 4,
usedMemoryContext: false,

};
}
} catch (_) {}
}

const memoryContextString = lastTurn
? Previous topic: "${lastTurn.subjectName}" (User asked: "${lastTurn.query}").
: "";

const systemPrompt = You are Holy Cross AI (JARVIS Mega Edition) for Holy Cross School, Khandwa Road, Indore (Motto: Live and Let Live). Solely built by Class IX B IT Topper Gaurav Lalwani under Priyanka Ma'am. Principal: Sister Liza Joseph. ${memoryContextString} Answer clearly, accurately, and concisely in 2-4 sentences in English or Hinglish.`;
const key = GEMINI_API_KEY.trim();

// Layer 3: Vertex AI Express (AQ. Key)
if (key.startsWith("AQ.")) {
try {
const res = await fetch(
https://aiplatform.googleapis.com/v1/publishers/google/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(
key
)}, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [ { role: "user", parts: [{ text:

{rawQuery}}], }, ], }), } ); if (res.ok) { const data = await res.json(); const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text; if (reply && reply.trim().length &gt; 4) { return { answer: 

reply.replace(/[*#]/g, "").trim(),
subjectName: rawQuery.slice(0, 34),
category: "Google Gemini 2.5 Flash",
engineLayer: "Layer 3 • Gemini 2.5 Flash (Vertex)",
confidence: "99.9%",
latencyMs: Math.round(performance.now() - startTime),
usedMemoryContext: !!lastTurn,
};
}
}
} catch (_) {}
}

// Layer 4: Pollinations OpenAI Router
try {
const res = await fetch("https://text.pollinations.ai/openai", {
method: "POST",

headers: { "Content-Type": "application/json" },
body: JSON.stringify({
model: "openai",
messages: [
{ role: "system", content: systemPrompt },
{ role: "user", content: rawQuery },
 ],
}),
});
if (res.ok) {
const data = await res.json();
const reply = data?.choices?.[0]?.message?.content;
if (reply && reply.trim().length > 4) {
return {
answer: reply.replace(/[*#`]/g, "").trim(),
subjectName: rawQuery.slice(0, 34),
category: "Cloud AI Synthesis",
engineLayer: "Layer 4 • Cloud Transformer",
confidence: "99.4%",

latencyMs: Math.round(performance.now() - startTime),
usedMemoryContext: !!lastTurn,
};
}
}
} catch (_) {}

// Layer 5: Direct GET Cloud Stream
try {
const res = await fetch(
https://text.pollinations.ai/${encodeURIComponent(
systemPrompt + " " + rawQuery
)}); if (res.ok) { const txt = await res.text(); if (txt && txt.trim().length &gt; 4) { return { answer: txt.replace(/[*#]/g, "").trim(),
subjectName: rawQuery.slice(0, 34),
category: "Direct Cloud Stream",
engineLayer: "Layer 5 • Direct Stream",

confidence: "99.0%",
latencyMs: Math.round(performance.now() - startTime),
usedMemoryContext: false,
};
}
}
} catch (_) {}

// Layer 6: Wikipedia Fallback
try {
const cleanTopic = rawQuery
.replace(/^(can you|please|tell me|who is|what is|explain|about)\s+/gi, "")
.replace(/[?.,!]/g, "")
.trim();
const searchRes = await fetch(
https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(

cleanTopic
)}&utf8=&format=json&origin=*); const searchData = await searchRes.json(); if (searchData?.query?.search?.length &gt; 0) { const title = searchData.query.search[0].title; const sumRes = await fetch(https://en.wikipedia.org/api/rest_v1/page/summary/

{sumData.title}: ${sumData.extract .split(". ") .slice(0, 3) .join(". ")}.,
subjectName: sumData.title,
category: "Encyclopedic Knowledge",
engineLayer: "Layer 6 • Knowledge Graph",
confidence: "98.8%",

latencyMs: Math.round(performance.now() - startTime),
usedMemoryContext: false,
};
}
}
}
} catch (_) {}

return {
answer: ✨ Holy Cross AI processed "${rawQuery}". Ask about Sister Liza Joseph, Priyanka Ma'am, any Class IX B teacher, school rules, 3D exhibition models, study topics, or general knowledge!`,
subjectName: "Holy Cross AI",
category: "Core Fallback",
engineLayer: "Layer 1 • Core",
confidence: "96.0%",
latencyMs: Math.round(performance.now() - 

startTime),
usedMemoryContext: false,
};
}

// ============================================================================
// SECTION 5: 3D TILTED GRID HERO BACKGROUND
// ============================================================================
const SLICES = 12;
const CAMERA = 1.6;
const MAX_WIDTH = 55;
const HERO_IMAGES = [
{
src: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?

auto=format&fit=crop&w=800&q=80",
},
{
src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
},
{
src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
},
{
src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
},
];

function arc(bend) {

return (CAMERA - 1 + Math.cos(bend)) / (2 * CAMERA * Math.sin(bend));
}

function measureGrid(width, height, tile, aspect, gap, bend) {
const h = Math.min(
(tile / 100) * height,
((MAX_WIDTH / 100) * width) / aspect
);
const radius = width * arc(bend);
if (!(h > 0) || !(radius > 0))
return { columns: 2, sweep: 0, unit: 0, limit: 0 };
const deg = (rad) => (rad * 180) / Math.PI;
const unit = deg(h / radius);
const pitch = (aspect + gap / 100) * unit;
const limit = deg(bend) + (aspect * unit) / 2;
const columns = Math.min(36, Math.max(2, Math.ceil((2 * limit) / pitch)));
const round = (n) => +n.toFixed(4);

const sweep = round((columns * pitch) / 2);
return { columns, sweep, unit: round(unit), limit: round(Math.min(sweep, limit)) };
}

function TiltedGridHero({ children }) {
const ref = useRef(null);
const bend = (75 * Math.PI) / 180;
const [layout, setLayout] = useState(() =>
measureGrid(1200, 220, 34, 16 / 9, 6, bend)
);

useEffect(() => {
const el = ref.current;
if (!el || typeof ResizeObserver === "undefined") return;
const ro = new ResizeObserver(([entry]) => {
const { width, height } = entry.contentRect;
setLayout(measureGrid(width, height, 34, 16 / 9, 6, bend));

});
ro.observe(el);
return () => ro.disconnect();
}, [bend]);

const { columns, sweep, unit, limit } = layout;
const aspectRatio = 16 / 9;
const tileHeight = 34;
const speed = 4;
const u = (n) =>
calc(${+n.toFixed(4)} * min(${tileHeight}cqh, ${+(
MAX_WIDTH / aspectRatio
).toFixed(4)}cqw)); const r = 100 * arc(bend); const radius = ``${+r.toFixed(3)}cqw;
const turn = (deg) =>
translateZ(${radius}) rotateY(${+deg.toFixed(4)}deg) translateZ(-${radius}); const hide = +(((sweep - limit) / (2 * sweep || 1)) * 100).toFixed(4); const css =@keyframes hcOrbit{from{transform:${turn( -sweep )}}

to{transform:${turn(
sweep
)}}0%,${hide}%,${100 - hide}%,100%{visibility:hidden}${ hide + 0.001 }%,${100 - hide - 0.001}%{visibility:visible}}; const share = aspectRatio / SLICES; const duration = columns * speed; const mask =linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)`;

return (
<div
ref={ref}
style={{
position: "relative",
overflow: "hidden",
containerType: "size",
height: "215px",
width: "100%",
borderRadius: "26px",

background:
"radial-gradient(circle at 50% 0%, rgba(30, 58, 138, 0.55), rgba(2, 6, 23, 0.96) 75%)",
border: "1px solid rgba(251, 191, 36, 0.25)",
boxShadow: "0 20px 45px rgba(0,0,0,0.65)",
}}
>
<style>{css}</style>
<div
aria-hidden="true"
style={{
position: "absolute",
inset: 0,
pointerEvents: "none",
opacity: 0.36,
perspective: ``${+(r * CAMERA).toFixed(3)}cqw, perspectiveOrigin:50% 56%, maskImage: mask, WebkitMaskImage: mask, }} &gt; {Array.from({ length: columns }, (_, t) =&gt; { const img = HERO_IMAGES[t % HERO_IMAGES.length]; return 

( &lt;div key={t} style={{ position: "absolute", left:calc(50% - 

{u(0.5)}), width: u(aspectRatio), height: u(1), transformStyle: "preserve-3d", animation:hcOrbit 

{
-t * speed
}s infinite, }} &gt; {Array.from({ length: SLICES }, (_, k) =&gt; ( &lt;div key={k} style={{ position: "absolute", top: 0, overflow: "hidden", left: u((aspectRatio - share) / 2), width: k === SLICES - 1 ? u(share) :calc(${u(share)} + 1px),
height: u(1),
transform: turn(
(aspectRatio / 2 - (k + 0.5) * share) * unit
),
}}
>
<img

src={img.src}
alt=""
draggable={false}
style={{
position: "absolute",
top: 0,
maxWidth: "none",
objectFit: "cover",
left: u(-k * share),
width: u(aspectRatio),
height: u(1),
}}
/>
</div>
))}
</div>
);
})}
</div>
{children}

</div>
);
}

// ============================================================================
// SECTION 6: 60FPS MORPHING NEURAL ORB ENGINE
// ============================================================================
const COPY = {
placeholder:
"Ask Holy Cross AI about Teachers, Motto/Rules, 3D Models, Study Lab, or any topic…",
labels: [
"Tokenizing Question",
"Checking Memory Context",
"Querying Gemini 2.5 Flash",

"Synthesizing Answer",
 ],
done: "Answer Ready",
answerTitle: "Holy Cross AI Official Response",
reset: "Ask Follow-Up / New Question",
};

const PILL_H = 60,
BALL_SMALL = 58,
ORB_D = 136,
ORB_R = 68,
CANVAS = 220,
CARD_H = 230,
FLY_D = 140;
const pillW = () => Math.min(720, Math.max(280, window.innerWidth - 72));
const cardW = () => Math.min(740, Math.max(290, window.innerWidth - 64));
const homeDy = () => 90;

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const lerp = (a, b, t) => a + (b - a) * t;
const fmt = (v) => String(Math.round(v * 1e4) / 1e4);
const TAU = Math.PI * 2;

function mulberry32(a) {
return function () {
a |= 0;
a = (a + 0x6d2b79f5) | 0;
let t = Math.imul(a ^ (a >>> 15), 1 | a);
t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
}

function cubicBezier(x1, y1, x2, y2) {
const cx = 3 * x1,
bx = 3 * (x2 - x1) - cx,
ax = 1 - cx - bx;

const cy = 3 * y1,
by = 3 * (y2 - y1) - cy,
ay = 1 - cy - by;
const sx = (t) => ((ax * t + bx) * t + cx) * t;
const sy = (t) => ((ay * t + by) * t + cy) * t;
const dx = (t) => (3 * ax * t + 2 * bx) * t + cx;
const solve = (x) => {
let t = x;
for (let i = 0; i < 8; i++) {
const e = sx(t) - x;
if (Math.abs(e) < 1e-6) return t;
const d = dx(t);
if (Math.abs(d) < 1e-6) break;
t -= e / d;
}
return t;
};
return (x) => (x <= 0 ? 0 : x >= 1 ? 1 : sy(solve(x)));
}

const E = {
out: cubicBezier(0.22, 1, 0.36, 1),
io: cubicBezier(0.65, 0, 0.35, 1),
in: cubicBezier(0.4, 0, 1, 1),
fly: cubicBezier(0.5, 0, 0.1, 1),
grow: cubicBezier(0.3, 0, 0.2, 1),
vortex: cubicBezier(0.6, 0, 0.2, 1),
spring: cubicBezier(0.34, 1.4, 0.64, 1),
card: cubicBezier(0.65, 0, 0.2, 1),
lin: (t) => t,
};

const bez = (t, p0, c, p2) =>
(1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * c + t * t * p2;
const T = (ch, from, to, t0, t1, ease = E.io) => ({
ch,
from,
to,
t0,
t1,

ease,
});

const launchTracks = (g) => [
T("w", g.pw, g.pw - 12, 0, 100, E.out),
T("oInput", 1, 0, 0, 160, E.in),
T("inScale", 1, 0.6, 0, 160, E.in),
T("oGlow", 1, 0, 0, 300, E.out),
T("w", g.pw - 12, BALL_SMALL, 100, 560, E.io),
T("h", PILL_H, PILL_H + 6, 380, 500, E.out),
T("h", PILL_H + 6, BALL_SMALL, 500, 620, E.out),
T("oPill", 1, 0, 300, 560, E.out),
T("oBall", 0, 1, 300, 560, E.out),
T("u", 0, 1, 620, 1350, E.fly),
T("w", BALL_SMALL, FLY_D, 620, 1150, E.grow),
T("h", BALL_SMALL, FLY_D, 620, 1150, E.grow),
T("w", FLY_D, ORB_D, 1150, 1350, E.out),
T("h", FLY_D, ORB_D, 1150, 1350, E.out),
T("cHalo", 0, 0.65, 620, 1350, E.out),
];


const ASSEMBLE = [
T("oRing", 1, 0, 0, 260, E.out),
T("oBall", 1, 0, 0, 240, E.out),
T("orb.k", 0, 1, 0, 650, E.out),
T("orb.alpha", 0, 1, 0, 650, E.out),
T("orb.spin", 0, 1.15, 0, 650, E.out),
T("orb.pop", 1, 1.06, 0, 320, E.out),
T("orb.pop", 1.06, 1, 320, 650, E.io),
T("sOp", 0, 1, 200, 480, E.out),
T("sTy", 6, 0, 200, 480, E.out),
];

const RESOLVE = [
T("orb.sweep", 0, 1, 0, 520, E.io),
T("orb.spin", 1.15, 0.3, 0, 520, E.out),
T("orb.gain", 1, 0, 0, 520, E.out),
T("orb.floor", 0, 0.95, 280, 600, E.out),
T("orb.rad", 0, 0.15, 280, 600, E.out),
];


const CONDENSE = [
T("orb.pop", 1, 1.06, 0, 100, E.out),
T("sOp", 1, 0, 0, 140, E.in),
T("sTy", 0, -6, 0, 140, E.in),
T("orb.k", 1, 0, 100, 500, E.vortex),
T("orb.vortex", 0, 1.6, 100, 500, E.vortex),
T("oGreen", 0, 1, 220, 560, E.spring),
T("gs", 0.55, 1, 220, 560, E.spring),
T("pulse", 0, 1, 240, 600, E.out),
T("oHalo", 0, 0.4, 280, 560, E.out),
T("orb.alpha", 1, 0, 380, 620, E.out),
];

const unfoldTracks = (g, tw) => [
T("w", ORB_D, 124, 0, 80, E.in),
T("h", ORB_D, 124, 0, 80, E.in),
T("w", 124, g.cw, 80, 580, E.card),
T("h", 124, CARD_H, 80, 580, E.out),
T("r", ORB_D / 2, 24, 80, 580, E.io),

T("oGreen", 1, 0, 160, 460, E.out),
T("oCard", 0, 1, 160, 460, E.out),
T("oHalo", 0.4, 0, 220, 580, E.out),
T("cHalo", 0.65, 0.25, 220, 580, E.out),
T("hOp", 0, 1, 400, 680, E.out),
T("dotS", 0, 1, 400, 680, E.spring),
T("wp", 0, 1, 460, 460 + tw, E.lin),
];

const FADE = [
"oGlow",
"oPill",
"oBall",
"oGreen",
"oCard",
"oRing",
"oInput",
"oHalo",
"sOp",
"orb.alpha",

];

const INIT = {
h: PILL_H,
r: 999,
oGlow: 1,
oHalo: 0,
oPill: 1,
oBall: 0,
oGreen: 0,
oCard: 0,
oRing: 1,
oInput: 1,
inScale: 1,
gs: 0.55,
hOp: 0,
dotS: 0,
u: 0,
yOff: 0,
pulse: -1,

sOp: 0,
sTy: 6,
cHalo: 0,
wp: 0,
"orb.k": 0,
"orb.alpha": 0,
"orb.spin": 0,
"orb.pop": 1,
"orb.sweep": 0,
"orb.vortex": 0,
"orb.gain": 1,
"orb.floor": 0,
"orb.rad": 0,
};

const ABORT = Symbol("abort");
function sleep(ms, sig) {
return new Promise((res) => {
if (sig.aborted) return res();
const id = window.setTimeout(res, Math.max(0, 

ms));
sig.addEventListener(
"abort",
() => {
window.clearTimeout(id);
res();
},
{ once: true }
);
});
}

const RINGS = 16;
const DOT_LIST = (() => {
const rand = mulberry32(7);
const out = [];
for (let k = 0; k < RINGS; k++) {
const y = 1 - ((k + 0.5) / RINGS) * 2;
const r = Math.sqrt(1 - y * y);
const m = Math.max(4, Math.round(30 * r));

for (let j = 0; j < m; j++) {
const a = (j / m) * TAU + k * 0.35;
out.push({
x: Math.cos(a) * r,
y,
z: Math.sin(a) * r,
u: (1 - y) / 2,
seed: rand() * 6.283,
});
}
}
return out;
})();

const N = DOT_LIST.length;
const DX = Float32Array.from(DOT_LIST, (d) => d.x);
const DY = Float32Array.from(DOT_LIST, (d) => d.y);
const DZ = Float32Array.from(DOT_LIST, (d) => 

d.z);
const DU = Float32Array.from(DOT_LIST, (d) => d.u);
const DS = Float32Array.from(DOT_LIST, (d) => d.seed);

const G_STEPS = 24,
A_STEPS = 48;
const COLORS = (() => {
const out = [];
for (let gi = 0; gi <= G_STEPS; gi++) {
const g = gi / G_STEPS;
const r = Math.round(lerp(251, 52, g)),
gg = Math.round(lerp(191, 211, g)),
b = Math.round(lerp(36, 153, g));
for (let ai = 0; ai <= A_STEPS; ai++) {
out.push(rgba(${r},

{b},${(ai / A_STEPS).toFixed(3)}));
}

}
return out;
})();

const ORB_KEYS = [
"k",
"alpha",
"spin",
"sweep",
"pop",
"vortex",
"gain",
"floor",
"rad",
];

function createOrb(canvas, getSpeed) {
const P = {
k: 0,
alpha: 0,

spin: 0,
rot: 0,
sweep: 0,
pop: 1,
vortex: 0,
gain: 1,
floor: 0,
rad: 0,
};
const ctx = canvas.getContext("2d");
const lit = new Float32Array(N);
const SX = new Float32Array(N),
SY = new Float32Array(N),
SR = new Float32Array(N),
SD = new Float32Array(N);
const SC = new Int16Array(N);
let time = 0,
raf = 0,
last = 0,
dead = false;


const reset = () => {
Object.assign(P, {
k: 0,
alpha: 0,
spin: 0,
rot: 0,
sweep: 0,
pop: 1,
vortex: 0,
gain: 1,
floor: 0,
rad: 0,
});
lit.fill(0);
time = 0;
};
reset();
if (!ctx) return { P, ensure() {}, reset, destroy() {} };

const dpr = Math.min(2, window.devicePixelRatio || 1);
canvas.width = Math.round(CANVAS * dpr);
canvas.height = Math.round(CANVAS * dpr);
ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

const S = 0.6,
CP = Math.cos(0.35),
SP = Math.sin(0.35),
C0 = CANVAS / 2;

const draw = (dt) => {
ctx.clearRect(0, 0, CANVAS, CANVAS);
time += dt;
P.rot += P.spin * dt;
const yaw = P.rot + P.vortex,
cyw = Math.cos(yaw),
syw = Math.sin(yaw);
const decay = Math.exp(-dt / 0.5),
h0 = (time * 320) % N,

swirlK = P.vortex * 1.5;

for (let n = 0; n < N; n++) {
const dx = DX[n],
dy = DY[n],
dz = DZ[n],
u = DU[n];
let dd = Math.abs(n - h0);
if (dd > N - dd) dd = N - dd;
const v = Math.max(0, 1 - dd / 18),
l = Math.max(lit[n] * decay, v * v * P.gain);
lit[n] = l;
const ki = clamp01(P.k * (1 + S) - S * u);
if (ki <= 0.001) {
SC[n] = -1;
continue;
}
const eo = E.out(ki),
kk = eo * P.pop;
const x1 = dx * cyw + dz * syw,

z1 = -dx * syw + dz * cyw;
const y2 = dy * CP - z1 * SP,
z2 = dy * SP + z1 * CP;
const f = 2.8 / (2.8 - z2),
depth = (z2 + 1) / 2;
let ox = x1 * ORB_R * kk * f,
oy = -y2 * ORB_R * kk * f;
if (swirlK > 0.001) {
const sw = (1 - ki) * swirlK,
cc = Math.cos(sw),
ss = Math.sin(sw);
const tx = ox * cc - oy * ss;
oy = ox * ss + oy * cc;
ox = tx;
}
const g = clamp01((P.sweep * 1.4 - u) / 0.4);
let a =
0.15 +
0.035 * Math.sin(DS[n] + time * 1.6) * (1 - g) +
0.35 * depth * depth +

0.75 * l * (1 - g) +
g * (0.55 + 0.4 * depth);
a = Math.min(1, Math.max(a, P.floor * (0.7 + 0.3 * depth))) * eo * P.alpha;
SX[n] = C0 + ox;
SY[n] = C0 + oy;
SD[n] = depth;
SR[n] =
(1.3 * (0.45 + 0.75 * depth) * f + 0.9 * l + g * 0.25) *
(1 + P.rad) *
(0.4 + 0.6 * eo);
const ai = Math.round(a * A_STEPS),
gi = Math.round(g * G_STEPS);
SC[n] = ai <= 0 ? -1 : gi * (A_STEPS + 1) + ai;
}

for (let pass = 0; pass < 2; pass++) {
for (let n = 0; n < N; n++) {
const c = SC[n];

if (c < 0 || (SD[n] >= 0.5) !== (pass === 1)) continue;
ctx.fillStyle = COLORS[c];
ctx.beginPath();
ctx.arc(SX[n], SY[n], SR[n], 0, TAU);
ctx.fill();
}
}
};

const frame = (now) => {
raf = 0;
if (dead) return;
const dt = Math.max(0, Math.min(0.05, (now - last) / 1000)) * getSpeed();
last = now;
draw(dt);
if (P.alpha > 0.002) raf = requestAnimationFrame(frame);
else ctx.clearRect(0, 0, CANVAS, CANVAS);

};

const ensure = () => {
if (raf || dead || P.alpha <= 0.002) return;
last = performance.now();
raf = requestAnimationFrame(frame);
};

const destroy = () => {
dead = true;
if (raf) cancelAnimationFrame(raf);
raf = 0;
};
return { P, ensure, reset, destroy };
}

function MorphOrb({ onSubmit, onStepChange, externalTriggerRef, minThinkMs = 1300 }) {
const [phase, setPhaseState] = useState("idle");
const [value, setValue] = useState("");

const [lbl, setLbl] = useState(COPY.labels[0]);
const [answer, setAnswer] = useState("");
const [askedQuery, setAskedQuery] = useState("");

const rootRef = useRef(null),
moverRef = useRef(null),
actorRef = useRef(null);
const inputRef = useRef(null),
canvasRef = useRef(null),
pulseRef = useRef(null);
const statusRef = useRef(null),
bodyRef = useRef(null),
rtRef = useRef(null);
const onSubmitRef = useRef(onSubmit);
onSubmitRef.current = onSubmit;
const onStepRef = useRef(onStepChange);
onStepRef.current = onStepChange;

useEffect(() => {

const root = rootRef.current,
mover = moverRef.current,
actor = actorRef.current;
const canvas = canvasRef.current,
pulse = pulseRef.current,
status = statusRef.current;
if (!root || !mover || !actor || !canvas || !pulse || !status) return;

const life = new AbortController();
const geo = { pw: pillW(), cw: cardW(), H: homeDy(), dir: -1 };
const orb = createOrb(canvas, () => 1.35);
const vals = {},
dirty = new Set(),
CH = {};
let current = null,
busy = false,
idling = false,
epoch = 0,

wStagger = 12,
wDur = 170;

const child = () => {
const ac = new AbortController();
if (life.signal.aborted) ac.abort();
else life.signal.addEventListener("abort", () => ac.abort(), { once: true });
return ac;
};

const applyPath = () => {
const u = vals.u ?? 0,
H = geo.H;
mover.style.transform = translate3d(${bez(
u,
0,
geo.dir * 0.25 * H,
0
).toFixed(2)}px,${(bez(u, H, 0.5 * H, 0) + 

(vals.yOff ?? 0)).toFixed( 2 )}px,0);
};

const applyWords = (v) => {
const body = bodyRef.current;
if (!body) return;
const nodes = body.querySelectorAll(".mo-w");
const total = Math.max(1, (nodes.length - 1) * wStagger + wDur),
time = v * total;
nodes.forEach((el, i) => {
const p = E.out(clamp01((time - i * wStagger) / wDur));
el.style.opacity = fmt(p);
el.style.transform =
p >= 0.999 ? "none" : translateY(${fmt((1 - p) * 4)}px)`;
});
};

[
"oGlow",
"oHalo",
"oPill",
"oBall",
"oGreen",
"oCard",
"oRing",
"oInput",
"gs",
"hOp",
"dotS",
 ].forEach((n) => {
CH[n] = (v) => actor.style.setProperty("--" + n, fmt(v));
});
["w", "h", "r"].forEach((n) => {
CH[n] = (v) => actor.style.setProperty("--" + n, fmt(v) + "px");
});

CH.inScale = (v) => actor.style.setProperty("--inScale", fmt(v));
CH.sOp = (v) => status.style.setProperty("--sOp", fmt(v));
CH.sTy = (v) => status.style.setProperty("--sTy", fmt(v));
CH.cHalo = (v) => root.style.setProperty("--oCenter", fmt(v));
CH.u = applyPath;
CH.yOff = applyPath;
CH.pulse = (v) => {
if (v < 0) {
pulse.style.opacity = "0";
return;
}
pulse.style.opacity = fmt(0.5 * (1 - v));
pulse.style.transform = scale(${fmt(1 + v)})`;
};
CH.wp = applyWords;
ORB_KEYS.forEach((name) => {

CH["orb." + name] = (v) => {
orb.P[name] = v;
if (name === "alpha") orb.ensure();
};
});

const set = (ch, v) => {
vals[ch] = v;
dirty.add(ch);
};
const flush = () => {
dirty.forEach((ch) => CH[ch]?.(vals[ch]));
dirty.clear();
};
const setNow = (ch, v) => {
vals[ch] = v;
CH[ch]?.(v);
};
const resetChannels = () => {
setNow("w", geo.pw);

for (const ch of Object.keys(INIT)) setNow(ch, INIT[ch]);
};

const play = (tracks, sig) =>
new Promise((res) => {
if (sig.aborted) return res();
const end = tracks.reduce((m, k) => Math.max(m, k.t1), 0),
done = new Set();
let raf = 0,
t = 0,
last = performance.now();
const onAbort = () => {
cancelAnimationFrame(raf);
res();
};
const step = (now) => {
const dt = Math.max(0, Math.min(100, now - last));

last = now;
t += dt * 1.35;
for (const k of tracks) {
if (done.has(k) || t < k.t0) continue;
const p = Math.min(1, (t - k.t0) / Math.max(1, k.t1 - k.t0));
set(k.ch, k.from + (k.to - k.from) * (k.ease ?? E.io)(p));
if (p === 1) done.add(k);
}
flush();
if (t >= end) {
sig.removeEventListener("abort", onAbort);
res();
} else raf = requestAnimationFrame(step);
};
sig.addEventListener("abort", onAbort, { once: true });
raf = requestAnimationFrame(step);
});


const run = async (text, sig) => {
const go = async (tracks) => {
await play(tracks, sig);
if (sig.aborted) throw ABORT;
};
try {
setAskedQuery(text);
onStepRef.current?.(1, text);
setLbl(COPY.labels[0]);
setPhaseState("launch");
await go(launchTracks(geo));

onStepRef.current?.(2, text);
setLbl(COPY.labels[1]);
setNow("r", ORB_D / 2);
setPhaseState("assemble");
await go(ASSEMBLE);

onStepRef.current?.(3, text);

setLbl(COPY.labels[2]);
setPhaseState("think");
const t0 = performance.now();
const body = await onSubmitRef.current(text);
await sleep(minThinkMs - (performance.now() - t0), sig);
if (sig.aborted) throw ABORT;

onStepRef.current?.(4, text);
setLbl(COPY.done);
const n = Math.max(1, body.split(/\s+/).filter(Boolean).length);
setPhaseState("resolve");
await go(RESOLVE);

setPhaseState("condense");
await go(CONDENSE);

onStepRef.current?.(5, text);
setPhaseState("unfold");

wDur = 160;
wStagger = n > 1 ? Math.min(11, 140 / (n - 1)) : 0;
setAnswer(body);
await go(unfoldTracks(geo, (n - 1) * wStagger + wDur));
setPhaseState("answered");
} catch (e) {
if (e === ABORT) return;
}
};

const toIdle = async () => {
if (idling) return;
idling = true;
const my = ++epoch,
ac = child(),
sig = ac.signal;
setPhaseState("reset");
const out = [T("cHalo", vals.cHalo ?? 0, 0, 0, 180, E.out)];

for (const ch of FADE) {
const v = vals[ch] ?? 0;
if (v > 0.001) out.push(T(ch, v, 0, 0, 180, E.out));
}
await play(out, sig);
if (sig.aborted || my !== epoch) return;
setNow("pulse", -1);
setAnswer("");
setAskedQuery("");
setLbl(COPY.labels[0]);
setValue("");
orb.reset();
geo.pw = pillW();
geo.cw = cardW();
geo.H = homeDy();
resetChannels();
current = null;
busy = false;
idling = false;
setPhaseState("idle");

onStepRef.current?.(0, "");
inputRef.current?.focus({ preventScroll: true });
};

resetChannels();
const api = {
start(text) {
if (busy) {
current?.abort();
orb.reset();
geo.pw = pillW();
geo.cw = cardW();
geo.H = homeDy();
resetChannels();
busy = false;
idling = false;
}
busy = true;
geo.pw = pillW();
geo.cw = cardW();

geo.H = homeDy();
geo.dir = -geo.dir;
orb.reset();
setNow("u", 0);
const ac = child();
current = ac;
void run(text, ac.signal);
},
reset() {
if (!busy || idling) return;
current?.abort();
void toIdle();
},
};
rtRef.current = api;
if (externalTriggerRef) externalTriggerRef.current = api;
return () => {
life.abort();
orb.destroy();

};
}, [minThinkMs, externalTriggerRef]);

const triggerSubmit = (e) => {
if (e) e.preventDefault();
const text = value.trim();
if (!text) {
actorRef.current?.setAttribute("data-shake", "");
setTimeout(() => actorRef.current?.removeAttribute("data-shake"), 260);
return;
}
rtRef.current?.start(text);
};

const words = answer.split(/\s+/).filter(Boolean);
return (
<div className="mo-root" data-phase={phase} ref={rootRef}>

<div className="mo-halo" aria-hidden="true" />
<div className="mo-mover" ref={moverRef}>
<div className="mo-actor" ref={actorRef}>
<div className="mo-underglow" aria-hidden="true" />
<div className="mo-halo-green" aria-hidden="true" />
<div className="mo-surface" aria-hidden="true" />
<div className="mo-ball" aria-hidden="true" />
<div className="mo-green" aria-hidden="true" />
<div className="mo-card" aria-hidden="true" />
<div className="mo-ring" aria-hidden="true" />
<form className="mo-input" onSubmit={triggerSubmit} autoComplete="off">
<svg
className="mo-spark"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"

strokeWidth="1.8"
>
<path d="M10 3.5l1.7 4.8 4.8 1.7-4.8 1.7L10 16.5l-1.7-4.8L3.5 10l4.8-1.7L10 3.5z" />
<path d="M18 14.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8z" />
</svg>
<input
ref={inputRef}
className="mo-field"
type="text"
value={value}
maxLength={280}
placeholder={COPY.placeholder}
onChange={(e) => setValue(e.target.value)}
/>
<button type="submit" className="mo-send" title="Ask Holy Cross AI">
<svg
viewBox="0 0 24 24"

fill="none"
stroke="currentColor"
strokeWidth="2.4"
>
<path d="M12 19V5" />
<path d="M5.5 11.5L12 5l6.5 6.5" />
</svg>
</button>
</form>
<canvas className="mo-orb" ref={canvasRef} aria-hidden="true" />
<div className="mo-pulse" ref={pulseRef} aria-hidden="true" />
<div className="mo-answer scroll-hide" tabIndex={-1}>
<div className="mo-a-head" style={{ justifyContent: "space-between" }}>
<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
<i className="mo-a-dot" aria-hidden="true" />

<span>{COPY.answerTitle}</span>
</div>
{askedQuery && (
<span
style={{
color: "#fbbf24",
fontSize: "10.5px",
textTransform: "none",
maxWidth: "240px",
overflow: "hidden",
textOverflow: "ellipsis",
whiteSpace: "nowrap",
}}
>
Q: "{askedQuery}"
</span>
)}
</div>
<p className="mo-a-body" ref={bodyRef}>
{words.map((w, i) => (

<React.Fragment key={i}>
<span className="mo-w">{w}</span>{" "}
</React.Fragment>
))}
</p>
</div>
</div>
</div>
<div className="mo-status" ref={statusRef} aria-hidden="true">
<span className={lbl === COPY.done ? "mo-lab-done" : ""}>{lbl}</span>
</div>
<button
type="button"
className="mo-reset"
onClick={() => rtRef.current?.reset()}
>
✨ {COPY.reset}
</button>

</div>
);
}

// ============================================================================
// SECTION 7: PASSWORD STRENGTH METER, SPLASH INTRO & QR MODAL
// ============================================================================
const PW_RULES = [
{ id: "length", label: "8+ characters", test: (v) => v.length >= 8 },
{
id: "case",
label: "Upper & lower case",
test: (v) => /[a-z]/.test(v) && /[A-Z]/.test(v),
},

{ id: "digit", label: "Contains a number", test: (v) => /\d/.test(v) },
{
id: "symbol",
label: "Contains a symbol",
test: (v) => /[!-/:-@[-`{-~]/.test(v),
},
];

function PasswordStrengthMeter({ value }) {
const evaluated = PW_RULES.map((r) => ({ ...r, met: r.test(value) }));
const score =
value.length === 0 ? 0 : Math.max(1, evaluated.filter((r) => r.met).length);
const labels = ["Empty", "Weak", "Fair", "Good", "Strong"],
colors = ["#334155", "#ef4444", "#f59e0b", "#38bdf8", "#10b981"];
const activeColor = colors[score];

return (
<div style={{ marginTop: "12px", textAlign: "left" }}>
<div
style={{
display: "grid",
gridTemplateColumns: "repeat(4, 1fr)",
gap: "6px",
}}
>
{[0, 1, 2, 3].map((i) => (
<div
key={i}
style={{
height: "6px",
borderRadius: "4px",
background: i < score ? activeColor : "rgba(255,255,255,0.12)",
}}
/>

))}
</div>
<div
style={{
display: "flex",
justifyContent: "space-between",
marginTop: "8px",
fontSize: "12px",
fontWeight: "bold",
color: activeColor,
}}
>
<span>Security: {labels[score]}</span>
<span>{score}/4 Rules</span>
</div>
<div
style={{
display: "grid",
gridTemplateColumns: "1fr 1fr",
gap: "6px",

marginTop: "8px",
}}
>
{evaluated.map((r) => (
<div
key={r.id}
style={{
fontSize: "11px",
color: r.met ? "#34d399" : "#64748b",
fontWeight: "600",
}}
>
{r.met ? "✅" : "⚪"} {r.label}
</div>
))}
</div>
</div>
);
}

function SchoolIntroVideoModal({ onEnter }) {
const [videoSrc, setVideoSrc] = useState(DEFAULT_DRONE_VIDEO_URL);
return (
<div
style={{
position: "fixed",
inset: 0,
zIndex: 99999,
background: "#020617",
display: "flex",
flexDirection: "column",
alignItems: "center",
justifyContent: "center",
overflow: "hidden",
}}
>
<video
key={videoSrc}
src={videoSrc}

autoPlay
muted
loop
playsInline
onError={() => {
if (videoSrc !== FALLBACK_CAMPUS_VIDEO_URL)
setVideoSrc(FALLBACK_CAMPUS_VIDEO_URL);
}}
style={{
position: "absolute",
inset: 0,
width: "100%",
height: "100%",
objectFit: "cover",
opacity: 0.45,
}}
/>
<div
style={{

position: "absolute",
inset: 0,
background:
"radial-gradient(circle at 50% 50%, rgba(15,23,42,0.45), rgba(2,6,23,0.95) 85%)",
pointerEvents: "none",
}}
/>
<div
style={{
position: "relative",
zIndex: 10,
textAlign: "center",
maxWidth: "820px",
padding: "28px",
}}
>
<div
style={{
marginBottom: "18px",

display: "flex",
justifyContent: "center",
}}
>
<HolyCrossCrestLogo size={92} />
</div>
<span
style={{
background: "rgba(251,191,36,0.18)",
border: "1px solid rgba(251,191,36,0.5)",
color: "#fbbf24",
padding: "6px 20px",
borderRadius: "999px",
fontSize: "11.5px",
fontWeight: "900",
textTransform: "uppercase",
letterSpacing: "2px",
display: "inline-block",
marginBottom: "12px",
}}

>
✝️ Motto: "Live and Let Live" • Official Exhibition Presentation
</span>
<h1
style={{
fontSize: "clamp(34px, 6vw, 54px)",
fontWeight: "900",
color: "#fff",
margin: "0 0 8px 0",
}}
>
HOLY CROSS <span style={{ color: "#fbbf24" }}>SCHOOL</span>
</h1>
<h2
style={{
fontSize: "clamp(14px, 2.5vw, 20px)",
fontWeight: "800",
color: "#38bdf8",

margin: "0 0 14px 0",
textTransform: "uppercase",
letterSpacing: "2px",
}}
>
Khandwa Road, Indore • Holy Cross AI (JARVIS Edition)
</h2>
<p
style={{
fontSize: "15px",
color: "#e2e8f0",
lineHeight: "1.6",
fontWeight: "600",
marginBottom: "28px",
}}
>
Inspired by Principal{" "}
<b style={{ color: "#34d399" }}>Sister Liza Joseph</b> • Solely

Engineered by Class IX B IT Topper{" "}
<b style={{ color: "#fbbf24" }}>Gaurav Lalwani</b> under{" "}
<b style={{ color: "#38bdf8" }}>Priyanka Ma'am</b>.
</p>
<button
type="button"
onClick={onEnter}
style={{
background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
color: "#000",
border: "none",
padding: "16px 40px",
borderRadius: "999px",
fontSize: "15px",
fontWeight: "900",
textTransform: "uppercase",
letterSpacing: "1.5px",

cursor: "pointer",
display: "inline-flex",
alignItems: "center",
gap: "10px",
boxShadow: "0 0 36px rgba(251,191,36,0.65)",
}}
>
<Play size={18} fill="#000" /> Enter Holy Cross AI Website
</button>
</div>
</div>
);
}

function SeminarQRModal({ onClose }) {
const qrImageUrl = https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
OFFICIAL_LINKS.projectLiveUrl

)}`;
return (
<div
style={{
position: "fixed",
inset: 0,
zIndex: 9999,
background: "rgba(2,6,23,0.85)",
backdropFilter: "blur(10px)",
display: "flex",
alignItems: "center",
justifyContent: "center",
padding: "20px",
}}
>
<div
style={{
background: "linear-gradient(145deg, #0f172a, #020617)",
border: "1.5px solid #fbbf24",

borderRadius: "26px",
maxWidth: "440px",
width: "100%",
padding: "28px",
textAlign: "center",
position: "relative",
}}
>
<button
onClick={onClose}
style={{
position: "absolute",
top: "16px",
right: "16px",
background: "rgba(255,255,255,0.08)",
border: "none",
color: "#fff",
width: "34px",
height: "34px",
borderRadius: "50%",

cursor: "pointer",
display: "flex",
alignItems: "center",
justifyContent: "center",
}}
>
<X size={18} />
</button>
<h3
style={{
color: "#fbbf24",
fontSize: "22px",
fontWeight: "900",
margin: "0 0 4px 0",
}}
>
Holy Cross School AI
</h3>
<p
style={{

color: "#38bdf8",
fontSize: "12px",
fontWeight: "800",
margin: "0 0 16px 0",
}}
>
Digital Exhibition Pass • Scan to Open Live
</p>
<div
style={{
background: "#fff",
padding: "12px",
borderRadius: "18px",
display: "inline-block",
marginBottom: "16px",
}}
>
<img
src={qrImageUrl}
alt="QR Code"

style={{ width: "180px", height: "180px", display: "block" }}
/>
</div>
<div
style={{
background: "rgba(255,255,255,0.04)",
borderRadius: "14px",
padding: "12px",
textAlign: "left",
fontSize: "12.5px",
color: "#cbd5e1",
lineHeight: "1.7",
}}
>
<div>
👑 <b>Principal:</b> Sister Liza Joseph
</div>
<div>
👩‍💻 <b>IT Mentor:</b> Priyanka Ma'am

</div>
<div>
🏆 <b>Sole Architect:</b> Gaurav Lalwani (Class IX B)
</div>
</div>
</div>
</div>
);
}

// ============================================================================
// SECTION 8: DECKS, STUDY LAB MODULES, SHOWCASE & SCHEDULE DATA
// ============================================================================
const QUESTION_CATEGORIES = {

"👩‍🏫 Teachers & Sister": [
"Tell me about Sister Liza Joseph",
"Tell me about Priyanka Ma'am",
"Tell me about Kamini Ma'am",
"Tell me about Prachi Trivedi Ma'am",
"Tell me about Divya Ma'am",
"Tell me about Satyapal Sir",
"Tell me about Meenakshi Parihar Ma'am",
"Tell me about Nisha Ma'am",
"इनके बारे में हिंदी में बताओ",
 ],
"📖 School Diary": [
"What is the School Motto & Monogram?",
"Tell me about School Discipline & Rules",
"Recite the Morning Assembly Prayer & Hymns",
"Who created you & IT Topper marks?",
 ],
"🏗️ 3D Models & Pitch": [
"Suggest 3D model ideas for Exhibition",
"Deliver the Official Seminar Pitch for Sister & 

Judges",
 ],
"📚 Study & Economics Lab": [
"Explain Economics demand, supply and GST",
"Explain Physics and Chemistry concepts",
"Tell me about Virat Kohli",
"Tell me about ISRO & Chandrayaan 3",
"Solve 125 * 64 + 200",
 ],
};

const STUDY_MODULES = [
{
id: "m1",
subject: "Economics & Finance",
title: "Demand, Supply & Economies of Scale",
prompt: "Explain Economics demand, supply and GST",
badge: "Commerce / SST",
},

{
id: "m2",
subject: "Physics & Chemistry",
title: "Laws of Motion, Energy & Reactions",
prompt: "Explain Physics and Chemistry concepts",
badge: "Science Lab",
},
{
id: "m3",
subject: "Exhibition 3D",
title: "Working 3D Models & Smart Campus",
prompt: "Suggest 3D model ideas for Exhibition",
badge: "Innovation",
},
{
id: "m4",
subject: "Keynote Speech",
title: "Presentation Script for Judges & Sister",
prompt: "Deliver the Official Seminar Pitch for 

Sister & Judges",
badge: "Stage Ready",
},
];

const DEFAULT_SHOWCASE = [
{
id: 1,
category: "AI Architecture",
title: "60FPS Morphing Neural Orb",
body: "Real-time 3D particle physics engine running smoothly on mobile and desktop browsers.",
author: "Gaurav Lalwani (Class IX B)",
},
{
id: 2,
category: "NEP 2020 Vision",
title: "Bilingual Faculty & Diary Matrix",
body: "Instant English + Hindi voice synthesis 

honouring Principal Sister Liza Joseph and Class IX B teachers.",
author: "Priyanka Ma'am (Mentor)",
},
{
id: 3,
category: "Academic Excellence",
title: "IT Topper Benchmark & Study Lab",
body: "Designed for interactive student learning, school heritage recall, and live exhibition demonstrations.",
author: "Holy Cross School • Indore",
},
];

const DEFAULT_SCHEDULE = [
{
id: 1,
time: "08:00 AM",
title: "Morning Assembly & Inauguration",

description:
"Opening prayer, school motto pledge & welcome address by Sister Liza Joseph.",
location: "Main Campus Ground",
},
{
id: 2,
time: "09:30 AM",
title: "Holy Cross AI Live Demo (JARVIS Edition)",
description:
"Interactive voice Q&A, 60FPS Neural Orb & 3D Exhibition Consultant showcase.",
location: "IT & Computer Science Pavilion",
},
{
id: 3,
time: "11:30 AM",
title: "Judges Keynote & Seminar Pitch",
description:
"Official technical review & live Gemini 2.5 Flash 

diagnostics presentation.",
location: "Auditorium Hall",
},
{
id: 4,
time: "01:00 PM",
title: "Student Study Lab & Interactive Q&A",
description:
"Hands-on walkthrough of bilingual answers, voice controls, and 3D model ideas.",
location: "Exhibition Hall",
},
];

// ============================================================================
// SECTION 9: MAIN MEGA APPLICATION COMPONENT
// 

============================================================================
export default function App() {
const [showIntro, setShowIntro] = useState(true);
const [activePage, setActivePage] = useState("home");

// AI & Voice States
const [voiceOn, setVoiceOn] = useState(true);
const [voiceCharacter, setVoiceCharacter] = useState("jarvis");
const [memoryMode, setMemoryMode] = useState(true);
const [historyOpen, setHistoryOpen] = useState(false);
const [qrOpen, setQrOpen] = useState(false);
const [activeTab, setActiveTab] = useState("👩‍🏫 Teachers & Sister");
const [activeStep, setActiveStep] = useState(0);
const [currentQuery, setCurrentQuery] = 

useState("");
const [lastTelemetry, setLastTelemetry] = useState(null);
const [searchFilter, setSearchFilter] = useState("");

// History State
const [chatHistory, setChatHistory] = useState(() => {
try {
return JSON.parse(localStorage.getItem("hc-ai-chat-history") || "[]");
} catch {
return [];
}
});

// Showcase State
const [gallery, setGallery] = useState(() => {
try {

const s = localStorage.getItem("hc-showcase-entries");
return s ? JSON.parse(s) : DEFAULT_SHOWCASE;
} catch {
return DEFAULT_SHOWCASE;
}
});
const [gTitle, setGTitle] = useState("");
const [gBody, setGBody] = useState("");
const [gAuthor, setGAuthor] = useState("Gaurav Lalwani");
const [gFormOpen, setGFormOpen] = useState(false);

// Admin State
const [password, setPassword] = useState("");
const [authError, setAuthError] = useState("");
const [localAuth, setLocalAuth] = useState(
() => localStorage.getItem("hc-admin-auth") === "true"

);

const orbTriggerRef = useRef(null);
const historyRef = useRef(chatHistory);
historyRef.current = chatHistory;
const memoryRef = useRef(memoryMode);
memoryRef.current = memoryMode;
const voiceCharRef = useRef(voiceCharacter);
voiceCharRef.current = voiceCharacter;

useEffect(() => {
try {
localStorage.setItem(
"hc-ai-chat-history",
JSON.stringify(chatHistory.slice(0, 40))
);
} catch (_) {}
}, [chatHistory]);

useEffect(() => {

try {
localStorage.setItem("hc-showcase-entries", JSON.stringify(gallery));
} catch (_) {}
}, [gallery]);

const speakText = (text) => {
if (!voiceOn || !("speechSynthesis" in window)) return;
window.speechSynthesis.cancel();
const isJarvis = voiceCharRef.current === "jarvis";
const cleanSpeech = text
.replace(
/[*#`_~🏆💻🙏🚀🏏🧮🌟🇮🇳👩‍🏫👩‍💻📚🧪⚡📐🌍📖✝️📏🙌🏗️🎙️✨📊🔬]/g,
""
)
.replace(/\s+/g, " ")
.trim();

const utter = new SpeechSynthesisUtterance(cleanSpeech);
const isHindi = /[\u0900-\u097F]/.test(cleanSpeech);
utter.lang = isHindi ? "hi-IN" : isJarvis ? "en-GB" : "en-IN";
utter.pitch = isJarvis && !isHindi ? 0.78 : 1.05;
utter.rate = isJarvis ? 0.98 : 1.04;
window.speechSynthesis.speak(utter);
};

const handleOrbAI = async (query) => {
const res = await askHolyCrossAIWithMemory(
query,
historyRef.current,
memoryRef.current
);
setLastTelemetry(res);
setChatHistory((prev) => [
{

id: String(Date.now()),
timestamp: new Date().toLocaleTimeString([], {
hour: "2-digit",
minute: "2-digit",
}),
query,
answer: res.answer,
subjectName: res.subjectName,
},
...prev.slice(0, 39),
]);
speakText(res.answer);
return res.answer;
};

const startVoiceInput = () => {
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SR) {
alert("Voice input works best in Google 

Chrome!");
return;
}
const rec = new SR();
rec.lang = "en-IN";
rec.onresult = (e) => orbTriggerRef.current?.start(e.results[0][0].transcript);
rec.start();
};

const thinkingSteps = [
{
id: 1,
title: "1. Sentence Tokenization",
desc: "Reads complete question in English/Hindi",
},
{
id: 2,

title: "2. Memory Context Link",
desc: "Checks previous chat for follow-ups",
},
{
id: 3,
title: "3. Matrix + Gemini 2.5",
desc: "Queries Faculty, Diary & Vertex AI",
},
{
id: 4,
title: "4. Bilingual Synthesis",
desc: "Composes clean English + Hindi answer",
},
{
id: 5,
title: "5. JARVIS Voice + Orb",
desc: "Unfolds 60FPS card & triggers Voice I/O",
},
 ];

const filteredQuestions = useMemo(() => {
const base = QUESTION_CATEGORIES[activeTab] || [];
if (!searchFilter.trim()) return base;
const f = searchFilter.trim().toLowerCase();
return base.filter((item) => item.toLowerCase().includes(f));
}, [activeTab, searchFilter]);

const handlePublishGallery = (e) => {
e.preventDefault();
if (!gTitle.trim() || !gBody.trim()) return;
setGallery((prev) => [
{
id: Date.now(),
category: "Exhibition Review",
title: gTitle.trim(),
body: gBody.trim(),
author: gAuthor.trim() || "Visitor",
},

...prev,
 ]);
setGTitle("");
setGBody("");
setGFormOpen(false);
};

const handleAdminLogin = (e) => {
e.preventDefault();
if (["Gaurav@2026", "HolyCross@9B", "admin123"].includes(password.trim())) {
setLocalAuth(true);
localStorage.setItem("hc-admin-auth", "true");
setAuthError("");
} else {
setAuthError("Access Denied! Use Master Password: Gaurav@2026");
}
};

return (
<div
style={{
background: "#020617",
color: "#f8fafc",
minHeight: "100vh",
width: "100%",
display: "flex",
flexDirection: "column",
}}
>
{showIntro && <SchoolIntroVideoModal onEnter={() => setShowIntro(false)} />}
{qrOpen && <SeminarQRModal onClose={() => setQrOpen(false)} />}

{/* SLIDE-OUT CHAT HISTORY DRAWER */}
{historyOpen && (
<div
style={{

position: "fixed",
inset: 0,
zIndex: 9998,
background: "rgba(2,6,23,0.78)",
backdropFilter: "blur(8px)",
display: "flex",
justifyContent: "flex-end",
}}
>
<div
style={{
width: "min(430px, 100vw)",
height: "100%",
background: "#0f172a",
borderLeft: "1px solid rgba(251,191,36,0.35)",
padding: "24px",
display: "flex",
flexDirection: "column",
gap: "14px",
}}

>
<div
style={{
display: "flex",
justifyContent: "space-between",
alignItems: "center",
borderBottom: "1px solid rgba(255,255,255,0.1)",
paddingBottom: "12px",
}}
>
<b style={{ color: "#fbbf24", fontSize: "16px" }}>
Chat History ({chatHistory.length})
</b>
<div style={{ display: "flex", gap: "8px" }}>
<button
onClick={() => setChatHistory([])}
style={{
background: "rgba(239,68,68,0.15)",
border: "none",
color: "#f87171",

padding: "7px",
borderRadius: "10px",
cursor: "pointer",
}}
>
<Trash2 size={15} />
</button>
<button
onClick={() => setHistoryOpen(false)}
style={{
background: "rgba(255,255,255,0.08)",
border: "none",
color: "#fff",
padding: "7px",
borderRadius: "10px",
cursor: "pointer",
}}
>
<X size={16} />
</button>

</div>
</div>
<div
className="scroll-hide"
style={{
flex: 1,
overflowY: "auto",
display: "flex",
flexDirection: "column",
gap: "10px",
}}
>
{chatHistory.length === 0 ? (
<div
style={{
textAlign: "center",
color: "#64748b",
marginTop: "40px",
fontSize: "13px",
}}

>
No questions asked yet.
</div>
) : (
chatHistory.map((item) => (
<div
key={item.id}
onClick={() => {
setHistoryOpen(false);
setActivePage("home");
orbTriggerRef.current?.start(item.query);
}}
style={{
background: "#020617",
border: "1px solid rgba(255,255,255,0.08)",
borderRadius: "14px",
padding: "12px",
cursor: "pointer",
}}
>

<div
style={{
display: "flex",
justifyContent: "space-between",
fontSize: "10.5px",
color: "#38bdf8",
fontWeight: "800",
}}
>
<span>📌 {item.subjectName}</span>
<span>{item.timestamp}</span>
</div>
<div
style={{
color: "#fbbf24",
fontSize: "13px",
fontWeight: "800",
marginTop: "4px",
}}
>

Q: "{item.query}"
</div>
</div>
))
)}
</div>
</div>
</div>
)}

{/* TOP NAVIGATION HEADER */}
<header
style={{
position: "sticky",
top: 0,
background: "rgba(2, 6, 23, 0.94)",
backdropFilter: "blur(18px)",
padding: "12px 24px",
display: "flex",
justifyContent: "space-between",

alignItems: "center",
zIndex: 100,
borderBottom: "1px solid rgba(251, 191, 36, 0.25)",
flexWrap: "wrap",
gap: "12px",
}}
>
<div
style={{
display: "flex",
alignItems: "center",
gap: "12px",
cursor: "pointer",
}}
onClick={() => setActivePage("home")}
>
<HolyCrossCrestLogo size={44} />
<div>
<b

style={{
color: "#fbbf24",
fontSize: "17px",
letterSpacing: "1px",
display: "block",
}}
>
{APP_METADATA.name}
</b>
<small
style={{
fontSize: "10px",
textTransform: "uppercase",
color: "#38bdf8",
fontWeight: "900",
}}
>
Holy Cross School • Class IX B, Indore
</small>
</div>

</div>

<nav
style={{
display: "flex",
gap: "8px",
alignItems: "center",
flexWrap: "wrap",
}}
>
{[
{ id: "home", label: "AI Center", icon: Bot },
{ id: "study", label: "Study Lab", icon: Layers },
{ id: "showcase", label: "Showcase", icon: Globe },
{ id: "schedule", label: "Timeline", icon: CalendarDays },
{ id: "admin", label: "Admin", icon: ShieldCheck },
 ].map(({ id, label, icon: Icon }) => (
<button
key={id}

onClick={() => setActivePage(id)}
style={{
display: "flex",
alignItems: "center",
gap: "6px",
padding: "8px 14px",
borderRadius: "12px",
cursor: "pointer",
color: activePage === id ? "#000" : "#cbd5e1",
background:
activePage === id ? "#fbbf24" : "rgba(255,255,255,0.05)",
fontWeight: "900",
fontSize: "11.5px",
textTransform: "uppercase",
border:
activePage === id
? "none"
: "1px solid rgba(255,255,255,0.08)",
}}

>
<Icon size={14} /> {label}
</button>
))}
<button
onClick={() => setShowIntro(true)}
style={{
background: "rgba(56,189,248,0.12)",
border: "1px solid rgba(56,189,248,0.35)",
color: "#38bdf8",
padding: "8px 12px",
borderRadius: "12px",
fontWeight: "900",
fontSize: "11px",
cursor: "pointer",
display: "flex",
alignItems: "center",
gap: "5px",
}}
>

<Play size={12} /> Intro
</button>
</nav>
</header>

{/* MAIN CONTENT BODY /}
<main
style={{
flex: 1,
width: "100%",
maxWidth: "1320px",
margin: "0 auto",
padding: "22px",
}}
>
{/ TAB 1: AI CENTER */}
{activePage === "home" && (
<div style={{ display: "flex", flexDirection: "column", gap: "26px" }}>
<TiltedGridHero>

<div
style={{
position: "relative",
zIndex: 10,
height: "100%",
display: "flex",
flexDirection: "column",
alignItems: "center",
justifyContent: "center",
textAlign: "center",
padding: "16px",
}}
>
<span
style={{
background: "rgba(251,191,36,0.18)",
border: "1px solid rgba(251,191,36,0.5)",
color: "#fbbf24",
padding: "5px 16px",
borderRadius: "999px",

fontSize: "11px",
fontWeight: "900",
textTransform: "uppercase",
letterSpacing: "1.8px",
marginBottom: "8px",
}}
>
✝️ Motto: "{APP_METADATA.motto}" • Principal:{" "}
{APP_METADATA.principal}
</span>
<h1
style={{
fontSize: "clamp(26px, 4.5vw, 40px)",
fontWeight: "900",
color: "#fff",
margin: "0 0 6px 0",
}}
>
Holy Cross School •{" "}

<span style={{ color: "#fbbf24" }}>Holy Cross AI</span>
</h1>
<p
style={{
maxWidth: "760px",
fontSize: "13.5px",
color: "#e2e8f0",
fontWeight: "600",
margin: 0,
}}
>
60FPS Morphing Orb, JARVIS Voice & 3D Exhibition Consultant
solely built by <b>Gaurav Lalwani (Class IX B)</b> under{" "}
<b>Priyanka Ma'am</b>.
</p>
</div>
</TiltedGridHero>


{/* MORPHING ORB COMMAND CENTER */}
<div
style={{
background: "rgba(15, 23, 42, 0.9)",
border: "1px solid rgba(56, 189, 248, 0.35)",
borderRadius: "28px",
padding: "22px",
display: "flex",
flexDirection: "column",
gap: "18px",
}}
>
<div
style={{
display: "flex",
justifyContent: "space-between",
alignItems: "center",
flexWrap: "wrap",
gap: "10px",

}}
>
<h2
style={{
margin: 0,
fontSize: "20px",
fontWeight: "900",
color: "#fff",
}}
>
🔮 Ask Holy Cross AI (Morphing Orb)
</h2>
<div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
<button
onClick={() =>
setVoiceCharacter(
voiceCharacter === "jarvis" ? "classic" : "jarvis"
)
}

style={{
background: "rgba(251,191,36,0.18)",
border: "1px solid #fbbf24",
color: "#fbbf24",
padding: "7px 12px",
borderRadius: "999px",
fontSize: "11px",
fontWeight: "900",
cursor: "pointer",
display: "flex",
alignItems: "center",
gap: "5px",
}}
>
<Cpu size={13} />{" "}
{voiceCharacter === "jarvis" ? "JARVIS" : "Classic"}
</button>
<button
onClick={() => setMemoryMode(!memoryMode)}

style={{
background: memoryMode
? "rgba(16,185,129,0.18)"
: "rgba(255,255,255,0.06)",
border: memoryMode ? "1px solid #34d399" : "none",
color: memoryMode ? "#34d399" : "#94a3b8",
padding: "7px 12px",
borderRadius: "999px",
fontSize: "11px",
fontWeight: "800",
cursor: "pointer",
display: "flex",
alignItems: "center",
gap: "5px",
}}
>
<BrainCircuit size={13} /> Memory
</button>
<button

onClick={() => setHistoryOpen(true)}
style={{
background: "rgba(56,189,248,0.15)",
border: "1px solid rgba(56,189,248,0.4)",
color: "#38bdf8",
padding: "7px 12px",
borderRadius: "999px",
fontSize: "11px",
fontWeight: "800",
cursor: "pointer",
display: "flex",
alignItems: "center",
gap: "5px",
}}
>
<History size={13} /> ({chatHistory.length})
</button>
<button
onClick={() =>
orbTriggerRef.current?.start(

"Deliver the Official Seminar Pitch for Sister & Judges"
)
}
style={{
background: "rgba(236,72,153,0.15)",
border: "1px solid rgba(236,72,153,0.4)",
color: "#f472b6",
padding: "7px 12px",
borderRadius: "999px",
fontSize: "11px",
fontWeight: "800",
cursor: "pointer",
display: "flex",
alignItems: "center",
gap: "5px",
}}
>
<Presentation size={13} /> Pitch
</button>

<button
onClick={() => setQrOpen(true)}
style={{
background: "rgba(168,85,247,0.15)",
border: "1px solid rgba(168,85,247,0.4)",
color: "#c084fc",
padding: "7px 12px",
borderRadius: "999px",
fontSize: "11px",
fontWeight: "800",
cursor: "pointer",
display: "flex",
alignItems: "center",
gap: "5px",
}}
>
<QrCode size={13} /> QR
</button>
<button
onClick={startVoiceInput}

style={{
background: "rgba(251,191,36,0.15)",
border: "1px solid rgba(251,191,36,0.4)",
color: "#fbbf24",
padding: "7px 12px",
borderRadius: "999px",
fontSize: "11px",
fontWeight: "800",
cursor: "pointer",
display: "flex",
alignItems: "center",
gap: "5px",
}}
>
<Mic size={13} /> Speak
</button>
{lastTelemetry && (
<button
onClick={() => speakText(lastTelemetry.answer)}
style={{

background: "rgba(255,255,255,0.08)",
border: "none",
color: "#cbd5e1",
padding: "7px 12px",
borderRadius: "999px",
fontSize: "11px",
fontWeight: "800",
cursor: "pointer",
display: "flex",
alignItems: "center",
gap: "4px",
}}
>
<RotateCcw size={12} /> Replay
</button>
)}
<button
onClick={() => {
window.speechSynthesis?.cancel();
setVoiceOn(!voiceOn);

}}
style={{
background: "rgba(255,255,255,0.08)",
border: "none",
color: voiceOn ? "#34d399" : "#94a3b8",
padding: "7px 12px",
borderRadius: "999px",
fontSize: "11px",
fontWeight: "800",
cursor: "pointer",
display: "flex",
alignItems: "center",
gap: "4px",
}}
>
{voiceOn ? <Volume2 size={13} /> : <VolumeX size={13} />}{" "}
{voiceOn ? "ON" : "OFF"}
</button>
</div>

</div>

<MorphOrb
onSubmit={handleOrbAI}
onStepChange={(step, qText) => {
setActiveStep(step);
if (qText !== undefined) setCurrentQuery(qText);
}}
externalTriggerRef={orbTriggerRef}
minThinkMs={1250}
/>

{/* QUESTION DECK WITH SEARCH FILTER */}
<div
style={{
background: "rgba(2, 6, 23, 0.65)",
border: "1px solid rgba(255,255,255,0.08)",
borderRadius: "20px",
padding: "16px",
}}

>
<div
style={{
display: "flex",
justifyContent: "space-between",
alignItems: "center",
gap: "10px",
flexWrap: "wrap",
marginBottom: "12px",
}}
>
<div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
{Object.keys(QUESTION_CATEGORIES).map((cat) => (
<button
key={cat}
onClick={() => setActiveTab(cat)}
style={{
padding: "6px 13px",

borderRadius: "999px",
fontSize: "11.5px",
fontWeight: "800",
cursor: "pointer",
border:
activeTab === cat
? "none"
: "1px solid rgba(255,255,255,0.12)",
background:
activeTab === cat
? "#fbbf24"
: "rgba(255,255,255,0.05)",
color: activeTab === cat ? "#000" : "#cbd5e1",
}}
>
{cat}
</button>
))}
</div>
<div

style={{
display: "flex",
alignItems: "center",
gap: "6px",
background: "#0f172a",
border: "1px solid rgba(255,255,255,0.12)",
borderRadius: "999px",
padding: "5px 12px",
}}
>
<Search size={13} color="#94a3b8" />
<input
type="text"
value={searchFilter}
onChange={(e) => setSearchFilter(e.target.value)}
placeholder="Filter prompts..."
style={{
background: "transparent",
border: "none",

outline: "none",
color: "#fff",
fontSize: "12px",
width: "130px",
}}
/>
</div>
</div>
<div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
{filteredQuestions.map((qp) => (
<button
key={qp}
onClick={() => orbTriggerRef.current?.start(qp)}
style={{
background: "rgba(56,189,248,0.1)",
border: "1px solid rgba(56,189,248,0.35)",
color: "#f8fafc",
padding: "8px 14px",
borderRadius: "999px",

fontSize: "12.5px",
fontWeight: "700",
cursor: "pointer",
}}
>
{qp}
</button>
))}
</div>
</div>
</div>

{/* 5-STAGE THINKING DIAGNOSTICS */}
<div
style={{
background: "rgba(15, 23, 42, 0.92)",
border: "1px solid rgba(16, 185, 129, 0.35)",
borderRadius: "26px",
padding: "24px",
}}

>
<h3
style={{
margin: "0 0 16px 0",
fontSize: "19px",
fontWeight: "900",
color: "#fff",
}}
>
🧠 Live 5-Stage Neural Thinking Diagnostics
</h3>
<div
style={{
display: "grid",
gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
gap: "12px",
marginBottom: "16px",
}}
>

{thinkingSteps.map((st) => {
const isDone = activeStep >= st.id,
isCurrent = activeStep === st.id;
return (
<div
key={st.id}
style={{
background: isCurrent
? "rgba(56,189,248,0.16)"
: isDone
? "rgba(16,185,129,0.12)"
: "rgba(255,255,255,0.03)",
border: isCurrent
? "1.5px solid #38bdf8"
: isDone
? "1px solid rgba(52,211,153,0.45)"
: "1px solid rgba(255,255,255,0.08)",
borderRadius: "16px",
padding: "14px",
}}

>
<div
style={{
display: "flex",
justifyContent: "space-between",
marginBottom: "6px",
}}
>
<span
style={{
fontSize: "10.5px",
fontWeight: "900",
color: isCurrent
? "#38bdf8"
: isDone
? "#34d399"
: "#64748b",
}}
>
STAGE 0{st.id}

</span>
<CheckCircle2
size={15}
color={isDone ? "#34d399" : "#475569"}
/>
</div>
<b
style={{
display: "block",
fontSize: "13px",
color: "#fff",
marginBottom: "4px",
}}
>
{st.title}
</b>
<p
style={{
margin: 0,
fontSize: "11.5px",

color: "#94a3b8",
}}
>
{st.desc}
</p>
</div>
);
})}
</div>
<div
style={{
background: "#020617",
borderRadius: "16px",
padding: "14px",
display: "grid",
gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
gap: "12px",
fontSize: "12.5px",
}}

>
<div>
<small style={{ color: "#64748b", display: "block" }}>
QUESTION
</small>
<b style={{ color: "#fbbf24" }}>
{currentQuery || "Standby..."}
</b>
</div>
<div>
<small style={{ color: "#64748b", display: "block" }}>
ACTIVE LAYER
</small>
<b style={{ color: "#34d399" }}>
{lastTelemetry
? lastTelemetry.engineLayer
: "6-Layer Hybrid Ready"}
</b>

</div>
<div>
<small style={{ color: "#64748b", display: "block" }}>
LATENCY
</small>
<b style={{ color: "#38bdf8" }}>
{lastTelemetry ? ${lastTelemetry.latencyMs} ms : "< 20 ms"}
</b>
</div>
</div>
</div>

{/* ARCHITECT & HONOURED FACULTY CARD */}
<div
style={{
background: "rgba(15, 23, 42, 0.92)",
border: "1px solid rgba(251, 191, 36, 0.35)",
borderRadius: "26px",

padding: "26px",
display: "grid",
gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
gap: "20px",
}}
>
<div>
<div
style={{
display: "flex",
alignItems: "center",
gap: "10px",
marginBottom: "10px",
}}
>
<Award size={26} color="#fbbf24" />
<b style={{ color: "#fbbf24", fontSize: "19px" }}>
Gaurav Lalwani — Sole Lead Architect
</b>

</div>
<p
style={{
color: "#cbd5e1",
fontSize: "13.5px",
lineHeight: "1.6",
marginBottom: "14px",
}}
>
Class IX B IT Topper (PT-1:{" "}
{APP_METADATA.academicStats.pt1}, Half-Yearly:{" "}
{APP_METADATA.academicStats.halfYearly}) at Holy Cross School,
Indore. Guided by Principal <b>Sister Liza Joseph</b> & Mentor{" "}
<b>Priyanka Ma'am</b>.
</p>
<div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>

<a
href={OFFICIAL_LINKS.website}
target="_blank"
rel="noreferrer"
style={{
color: "#38bdf8",
fontSize: "12px",
fontWeight: "800",
textDecoration: "none",
display: "flex",
alignItems: "center",
gap: "4px",
}}
>
<ExternalLink size={13} /> hcsindore.ac.in
</a>
<a
href={OFFICIAL_LINKS.youtube}
target="_blank"
rel="noreferrer"

style={{
color: "#f87171",
fontSize: "12px",
fontWeight: "800",
textDecoration: "none",
display: "flex",
alignItems: "center",
gap: "4px",
}}
>
<Youtube size={13} /> YouTube
</a>
<a
href={OFFICIAL_LINKS.instagram}
target="_blank"
rel="noreferrer"
style={{
color: "#f472b6",
fontSize: "12px",
fontWeight: "800",

textDecoration: "none",
display: "flex",
alignItems: "center",
gap: "4px",
}}
>
<Instagram size={13} /> Instagram
</a>
</div>
</div>
<div
style={{
background: "#020617",
padding: "18px",
borderRadius: "18px",
border: "1px solid rgba(56,189,248,0.2)",
}}
>
<div
style={{

display: "flex",
alignItems: "center",
gap: "8px",
marginBottom: "8px",
}}
>
<BookOpen size={18} color="#38bdf8" />
<b style={{ color: "#38bdf8", fontSize: "15px" }}>
Class IX B Honoured Faculty
</b>
</div>
<p
style={{
margin: 0,
color: "#cbd5e1",
fontSize: "12.5px",
lineHeight: "1.75",
}}
>
• <b>Sister Liza Joseph</b> (Principal) • 

<b>Priyanka Ma'am</b>{" "}
(CS/IT)
<br />• <b>Kamini Ma'am</b> (Hindi/Sanskrit) •{" "}
<b>Prachi Trivedi Ma'am</b> (Chemistry)
<br />• <b>Divya Ma'am</b> (Physics) • <b>Satyapal Sir</b>{" "}
(Maths)
<br />• <b>Meenakshi Parihar Ma'am</b> (SST) •{" "}
<b>Nisha Ma'am</b> (English)
</p>
</div>
</div>
</div>
)}

{/* TAB 2: STUDY LAB & 3D EXHIBITION BLUEPRINTS */}
{activePage === "study" && (

<div style={{ maxWidth: "1060px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px" }}>
<div style={{ background: "#0f172a", border: "1px solid rgba(56,189,248,0.3)", borderRadius: "24px", padding: "24px" }}>
<span style={{ color: "#38bdf8", fontSize: "11.5px", fontWeight: "900", textTransform: "uppercase" }}>
Interactive Learning & Project Lab
</span>
<h1 style={{ fontSize: "28px", fontWeight: "900", margin: "6px 0 8px 0" }}>
Holy Cross Study & Exhibition Lab
</h1>
<p style={{ color: "#94a3b8", fontSize: "13.5px", margin: 0 }}>
Tap any study or exhibition module below to launch it directly in the Morphing Orb AI Center.
</p>

</div>

<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "16px" }}>
{STUDY_MODULES.map((mod) => (
<div
key={mod.id}
style={{
background: "#0f172a",
border: "1px solid rgba(251,191,36,0.25)",
borderRadius: "20px",
padding: "20px",
display: "flex",
flexDirection: "column",
justifyContent: "space-between",
gap: "14px",
}}
>
<div>

<span style={{ background: "rgba(251,191,36,0.15)", color: "#fbbf24", padding: "4px 10px", borderRadius: "8px", fontSize: "10.5px", fontWeight: "900" }}>
{mod.badge}
</span>
<h3 style={{ margin: "10px 0 6px 0", fontSize: "17px", color: "#fff" }}>
{mod.title}
</h3>
<p style={{ margin: 0, fontSize: "12.5px", color: "#94a3b8" }}>
Subject: {mod.subject}
</p>
</div>
<button
onClick={() => {
setActivePage("home");
setTimeout(() => orbTriggerRef.current?.start(mod.prompt), 80);

}}
style={{
padding: "10px 14px",
background: "#fbbf24",
color: "#000",
border: "none",
borderRadius: "12px",
fontWeight: "900",
fontSize: "12px",
cursor: "pointer",
}}
>
Launch in Orb AI →
</button>
</div>
))}
</div>
</div>
)}

{/* TAB 3: CLOUD SHOWCASE WALL */}
{activePage === "showcase" && (
<div style={{ maxWidth: "1000px", margin: "0 auto" }}>
<div
style={{
display: "flex",
justifyContent: "space-between",
alignItems: "center",
marginBottom: "22px",
}}
>
<h1 style={{ fontSize: "28px", fontWeight: "900", margin: 0 }}>
Cloud Showcase Wall
</h1>
<button
onClick={() => setGFormOpen(!gFormOpen)}
style={{
padding: "10px 20px",

background: "#fbbf24",
color: "#000",
border: "none",
borderRadius: "12px",
fontWeight: "900",
cursor: "pointer",
}}
>
{gFormOpen ? "Close" : "+ Add Review / Note"}
</button>
</div>
{gFormOpen && (
<form
onSubmit={handlePublishGallery}
style={{
background: "#0f172a",
padding: "20px",
borderRadius: "20px",
border: "1px solid rgba(251,191,36,0.4)",
marginBottom: "22px",

display: "flex",
flexDirection: "column",
gap: "12px",
}}
>
<input
required
placeholder="Title"
value={gTitle}
onChange={(e) => setGTitle(e.target.value)}
style={{
padding: "12px",
borderRadius: "10px",
background: "#020617",
border: "1px solid #334155",
color: "#fff",
}}
/>
<input
required

placeholder="Your Name"
value={gAuthor}
onChange={(e) => setGAuthor(e.target.value)}
style={{
padding: "12px",
borderRadius: "10px",
background: "#020617",
border: "1px solid #334155",
color: "#fff",
}}
/>
<textarea
required
rows={3}
placeholder="Write feedback or thought..."
value={gBody}
onChange={(e) => setGBody(e.target.value)}
style={{
padding: "12px",
borderRadius: "10px",

background: "#020617",
border: "1px solid #334155",
color: "#fff",
}}
/>
<button
type="submit"
style={{
padding: "12px",
background: "#fbbf24",
color: "#000",
border: "none",
borderRadius: "10px",
fontWeight: "900",
cursor: "pointer",
}}
>
Publish Live
</button>
</form>

)}
<div
style={{
display: "grid",
gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
gap: "18px",
}}
>
{gallery.map((e) => (
<div
key={e.id}
style={{
background: "#0f172a",
padding: "22px",
borderRadius: "20px",
border: "1px solid rgba(255,255,255,0.08)",
}}
>
<span

style={{
fontSize: "11px",
fontWeight: "900",
color: "#fbbf24",
textTransform: "uppercase",
}}
>
{e.category}
</span>
<h3 style={{ margin: "8px 0", fontSize: "18px", color: "#fff" }}>
{e.title}
</h3>
<p
style={{
fontSize: "13.5px",
color: "#cbd5e1",
lineHeight: "1.55",
}}
>

{e.body}
</p>
<div
style={{
marginTop: "12px",
fontSize: "12px",
color: "#38bdf8",
fontWeight: "bold",
}}
>
— {e.author}
</div>
</div>
))}
</div>
</div>
)}

{/* TAB 4: EXHIBITION TIMELINE */}
{activePage === "schedule" && (

<div
style={{
maxWidth: "860px",
margin: "0 auto",
display: "flex",
flexDirection: "column",
gap: "14px",
}}
>
<h1 style={{ fontSize: "28px", fontWeight: "900", margin: "0 0 10px 0" }}>
Exhibition Timeline
</h1>
{DEFAULT_SCHEDULE.map((ev) => (
<div
key={ev.id}
style={{
background: "#0f172a",
padding: "22px",
borderRadius: "20px",

border: "1px solid rgba(255,255,255,0.08)",
display: "flex",
justifyContent: "space-between",
alignItems: "center",
flexWrap: "wrap",
gap: "12px",
}}
>
<div>
<span
style={{
background: "#fbbf24",
color: "#000",
padding: "4px 10px",
borderRadius: "8px",
fontSize: "11.5px",
fontWeight: "900",
}}
>
{ev.time}

</span>
<h3
style={{
margin: "8px 0 4px 0",
fontSize: "18px",
color: "#fff",
}}
>
{ev.title}
</h3>
<p
style={{
margin: 0,
color: "#94a3b8",
fontSize: "13.5px",
}}
>
{ev.description}
</p>
</div>

<div
style={{
fontSize: "12.5px",
color: "#38bdf8",
fontWeight: "800",
}}
>
📍 {ev.location}
</div>
</div>
))}
</div>
)}

{/* TAB 5: ADMIN SECURITY GATE */}
{activePage === "admin" && (
<div
style={{
maxWidth: "460px",
margin: "30px auto",

background: "#0f172a",
padding: "32px",
borderRadius: "26px",
border: "1px solid rgba(251,191,36,0.4)",
textAlign: "center",
}}
>
<ShieldCheck
size={40}
color="#fbbf24"
style={{ margin: "0 auto 10px auto" }}
/>
<h2
style={{
margin: "0 0 8px 0",
fontSize: "22px",
fontWeight: "900",
}}
>
Admin Security Gate

</h2>
{!localAuth ? (
<form onSubmit={handleAdminLogin}>
<input
type="password"
placeholder="Master Password (Gaurav@2026)"
value={password}
onChange={(e) => {
setPassword(e.target.value);
setAuthError("");
}}
style={{
width: "100%",
padding: "14px",
borderRadius: "12px",
background: "#020617",
color: "#fff",
border: "1px solid #334155",
marginTop: "10px",
}}

/>
<PasswordStrengthMeter value={password} />
{authError && (
<div
style={{
color: "#ef4444",
marginTop: "10px",
fontSize: "12.5px",
fontWeight: "bold",
}}
>
{authError}
</div>
)}
<button
type="submit"
style={{
width: "100%",
marginTop: "18px",
padding: "14px",

background: "#fbbf24",
color: "#000",
border: "none",
borderRadius: "12px",
fontWeight: "900",
cursor: "pointer",
}}
>
Verify & Sign In
</button>
</form>
) : (
<div>
<p
style={{
color: "#34d399",
fontWeight: "800",
margin: "14px 0",
}}
>

● ROOT ACCESS GRANTED • Gaurav Lalwani (Class IX B)
</p>
<button
onClick={() => {
setLocalAuth(false);
localStorage.removeItem("hc-admin-auth");
setPassword("");
}}
style={{
padding: "12px 26px",
background: "#ef4444",
color: "#fff",
border: "none",
borderRadius: "12px",
fontWeight: "900",
cursor: "pointer",
}}
>
Lock & Sign Out

</button>
</div>
)}
</div>
)}
</main>

{/* FOOTER */}
<footer
style={{
padding: "18px 24px",
borderTop: "1px solid rgba(255,255,255,0.08)",
fontSize: "12px",
color: "#94a3b8",
textAlign: "center",
}}
>
<b style={{ color: "#fbbf24" }}>{APP_METADATA.school.toUpperCase()}</b>{" "}
• Engineered by <b>{APP_METADATA.architect}</b> • Mentored by{" "}
<b>{APP_METADATA.mentor}</b>
</footer>
</div>
);
}


