import { useState, useEffect, useRef, useMemo, Fragment } from "react";
import type { CSSProperties, ReactNode, FormEvent, ChangeEvent } from "react";

// ============================================================================
// SECTION 1: STRICT TYPESCRIPT TYPES & SAFE HELPERS
// ============================================================================
type LanguageCode = "en" | "hi";
type ActiveTab = "orb" | "chat" | "faculty" | "exhibition" | "cricket" | "history";
type UserRole = "Student" | "Parent" | "Teacher" | "Exhibition Visitor" | "Guest";
type OrbPhase = "idle" | "think" | "resolve" | "answered";
type FontComfort = "normal" | "large";
type AccentTheme = "royal" | "cyber" | "emerald";

interface UserProfile {
  name: string;
  email: string;
  role: UserRole;
  joinedAt: string;
  isGuest?: boolean;
}

interface StoredAccount {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: string;
}

interface FacultyMember {
  id: string;
  name: string;
  role: string;
  category: string;
  wing: string;
  experienceFocus: string;
  description: string;
  specialties: string[];
  featured?: boolean;
}

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  language: LanguageCode;
  questionRef?: string;
  bookmarked?: boolean;
  source?: "cloud" | "offline-backup";
}

interface HistoryEntry {
  id: string;
  question: string;
  answer: string;
  timestamp: string;
  language: LanguageCode;
  bookmarked: boolean;
  source: "cloud" | "offline-backup";
}

interface BallEvent {
  label: string;
  runs: number;
  isWicket: boolean;
  isLegal: boolean;
}

interface CricketMatchState {
  teamA: string;
  teamB: string;
  runs: number;
  wickets: number;
  balls: number;
  target: number;
  timeline: BallEvent[];
}

interface StudyFormula {
  id: string;
  subject: "Physics" | "Chemistry" | "Mathematics" | "Economics" | "Social Science";
  title: string;
  formula: string;
  explanation: string;
  askPrompt: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  fact: string;
}

interface ToastMessage {
  id: number;
  text: string;
  type: "info" | "success" | "warn";
}

interface SpeechRecognitionEventLike {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionInstance {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  onresult: ((ev: SpeechRecognitionEventLike) => void) | null;
  start: () => void;
}

interface WindowWithSpeech {
  SpeechRecognition?: new () => SpeechRecognitionInstance;
  webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
}

interface ThemePalette {
  name: string;
  primary: string;
  secondary: string;
  glow: string;
  border: string;
}

const ACCENT_THEMES: Record<AccentTheme, ThemePalette> = {
  royal: {
    name: "Royal Gold",
    primary: "#fbbf24",
    secondary: "#38bdf8",
    glow: "rgba(251, 191, 36, 0.42)",
    border: "rgba(251, 191, 36, 0.42)",
  },
  cyber: {
    name: "Cyber Cyan",
    primary: "#38bdf8",
    secondary: "#818cf8",
    glow: "rgba(56, 189, 248, 0.42)",
    border: "rgba(56, 189, 248, 0.45)",
  },
  emerald: {
    name: "Campus Emerald",
    primary: "#34d399",
    secondary: "#fbbf24",
    glow: "rgba(52, 211, 153, 0.42)",
    border: "rgba(52, 211, 153, 0.42)",
  },
};

function makeOrbStyle(
  vars: Record<string, string | number>,
  extra: CSSProperties
): CSSProperties {
  return { ...vars, ...extra } as unknown as CSSProperties;
}

function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

// ============================================================================
// SECTION 2: OFFICIAL SCHOOL METADATA & VERIFIED LINKS
// ============================================================================
const SCHOOL_CONFIG = {
  brandName: "HOLY CROSS SCHOOL AI",
  tagline: "Official Intelligent Campus, Voice & Academic Portal",
  schoolFullName: "Holy Cross School, Khandwa Road, Indore",
  address: "Khandwa Road, Near Khandwa Naka, Bhavna Nagar, Indore, Madhya Pradesh 452001",
  board: "CBSE (Central Board of Secondary Education) • Affiliation No. 1030624",
  grades: "Co-Educational Senior Secondary (Nursery to Class XII)",
  motto: "Live and Let Live",
  principal: "Sr. Liasa Joseph",
  mentor: "Priyanka Ma'am (Computer Science & IT Department)",
  architect: "Gaurav Lalwani (Class IX B)",
  defaultBgPhoto: "/school-bg.jpg",
  defaultIntroVideo: "/school-intro.mp4",
  links: {
    schoolWebsite: "https://www.hcsindore.ac.in/",
    youtube: "https://www.youtube.com/@holycrossschoolindore2016/videos",
    instagram: "https://www.instagram.com/",
    googleMaps: "https://maps.google.com/?q=Holy+Cross+School+Khandwa+Road+Indore",
    cricbuzz: "https://www.cricbuzz.com/cricket-match/live-scores",
    espncricinfo: "https://www.espncricinfo.com/live-cricket-score",
    icc: "https://www.icc-cricket.com/",
  },
};

const WELCOME_CHAT_MESSAGE: ChatMessage = {
  id: "welcome-official",
  sender: "ai",
  text:
    "**Welcome to Holy Cross School AI!**\n\n" +
    "I am the official intelligent assistant for **" +
    SCHOOL_CONFIG.schoolFullName +
    '** (Motto: "' +
    SCHOOL_CONFIG.motto +
    '", Principal: **' +
    SCHOOL_CONFIG.principal +
    "**).\n\n" +
    "- Ask me about **any of our 45 respected teachers & office staff** for complete detailed profiles.\n" +
    "- Ask **NCERT Science, Mathematics, Economics, or Social Science** questions with clear step-by-step solutions.\n" +
    '- Ask **personal or conversational questions** ("How are you?", "Who created you?") anytime.\n' +
    "- Switch to **हिंदी** in the top bar or tap the **Mic** button to speak your question directly.",
  timestamp: "Official Welcome",
  language: "en",
  source: "offline-backup",
};

// ============================================================================
// SECTION 3: COMPLETE FACULTY & STAFF DIRECTORY (45 DETAILED PROFILES)
// ============================================================================
const FACULTY_DATA: FacultyMember[] = [
  {
    id: "sr_liasa_joseph",
    name: "Sr. Liasa Joseph",
    role: "Principal & Spiritual Guide",
    category: "Leadership",
    wing: "Executive Administration",
    experienceFocus: "Holistic Education, Moral Leadership & Institutional Vision",
    featured: true,
    specialties: ["School Leadership", "Value-Based Education", "Student Welfare", "Academic Excellence"],
    description:
      "Sr. Liasa Joseph serves as the respected Principal and Spiritual Guide of Holy Cross School, Khandwa Road, Indore. Under her visionary leadership, the institution lives its timeless motto 'Live and Let Live,' balancing strong CBSE academic rigor with compassion, discipline, and character formation. She actively champions student-led exhibitions, digital innovation, sports, fine arts, and community values so every Holy Crossian grows intellectually, emotionally, spiritually, and socially.",
  },
  {
    id: "priyanka_mam",
    name: "Priyanka Ma'am",
    role: "Computer Science & IT Mentor",
    category: "IT & Computer",
    wing: "Senior & Middle Wing",
    experienceFocus: "Artificial Intelligence, Coding & Digital Innovation",
    featured: true,
    specialties: ["Computer Science", "Programming Logic", "AI Project Mentorship", "Digital Citizenship"],
    description:
      "Priyanka Ma'am is the dedicated Computer Science and IT Mentor at Holy Cross School, Indore. She guides students beyond textbook theory into practical programming, web architecture, logical problem-solving, and modern Artificial Intelligence concepts. Known for her inspiring mentorship during school exhibitions and tech showcases, she empowers learners to design real, ethical, and useful digital portals like Holy Cross School AI.",
  },
  {
    id: "kamini_mam",
    name: "Kamini Ma'am",
    role: "Hindi, Sanskrit & Moral Values Educator",
    category: "Languages",
    wing: "Senior & Middle Wing",
    experienceFocus: "Indian Literature, Classical Grammar & Ethics",
    specialties: ["Hindi Literature", "Sanskrit Vyakaran", "Moral Education", "Public Speaking"],
    description:
      "Kamini Ma'am brings deep cultural richness and eloquence to the Hindi, Sanskrit, and Moral Values classrooms at Holy Cross School. She helps students appreciate classical shlokas, refined grammar, and expressive Hindi writing while weaving timeless ethical lessons into daily school life. Her guidance fosters respect for heritage, confident recitation, and graceful personal conduct.",
  },
  {
    id: "prachi_trivedi_mam",
    name: "Prachi Trivedi Ma'am",
    role: "Chemistry & Practical Lab Expert",
    category: "Science",
    wing: "Senior Wing",
    experienceFocus: "Experimental Chemistry, Reactions & CBSE Board Prep",
    specialties: ["Organic & Inorganic Chemistry", "Laboratory Safety", "Titration & Practicals", "Concept Clarity"],
    description:
      "Prachi Trivedi Ma'am specializes in Chemistry and hands-on laboratory instruction at Holy Cross School. She turns complex chemical equations, periodic trends, and reaction mechanisms into clear, memorable concepts through live lab demonstrations and practical inquiry. Students depend on her structured coaching to excel in both CBSE theory papers and practical exams.",
  },
  {
    id: "divya_mam",
    name: "Divya Ma'am",
    role: "Physics Educator",
    category: "Science",
    wing: "Senior Wing",
    experienceFocus: "Mechanics, Optics, Electricity & Numerical Problem-Solving",
    specialties: ["Laws of Motion", "Numerical Analysis", "Real-World Physics", "Science Exhibitions"],
    description:
      "Divya Ma'am teaches Physics with a sharp focus on curiosity, visualization, and step-by-step numerical mastery. Whether explaining Newton's Laws, electric circuits, or ray optics, she connects equations to everyday physical phenomena so students genuinely understand how the world works instead of memorizing formulas blindly.",
  },
  {
    id: "satyapal_sir",
    name: "Satyapal Sir",
    role: "Mathematics Educator",
    category: "Mathematics",
    wing: "Senior & Middle Wing",
    experienceFocus: "Algebra, Geometry, Trigonometry & Analytical Reasoning",
    specialties: ["Problem Solving", "Board Exam Strategy", "Logical Proofs", "Speed & Accuracy"],
    description:
      "Satyapal Sir is a pillar of the Mathematics department at Holy Cross School, renowned for making complex theorems systematic and approachable. Through disciplined practice, stepwise derivation breakdowns, and exam-ready strategies, he builds lasting mathematical confidence in students preparing for school assessments, Olympiads, and CBSE board examinations.",
  },
  {
    id: "sarika_mam",
    name: "Sarika Ma'am",
    role: "Biology & English Educator",
    category: "Science",
    wing: "Senior & Middle Wing",
    experienceFocus: "Life Sciences, Anatomy & Expressive English Communication",
    specialties: ["Human Physiology", "Botany & Ecology", "English Comprehension", "Diagrammatic Mastery"],
    description:
      "Sarika Ma'am uniquely bridges Biology and English with precision and warmth. In Biology, she emphasizes neat labeled diagrams, life processes, and scientific inquiry; in English, she nurtures fluent expression, vocabulary growth, and analytical reading. Her dual expertise trains students to present scientific ideas clearly and articulately.",
  },
  {
    id: "savita_mam",
    name: "Savita Ma'am",
    role: "Social Science & English Educator",
    category: "Social Science",
    wing: "Middle & Senior Wing",
    experienceFocus: "Civics, History, Geography & Literary Analysis",
    specialties: ["Constitutional Studies", "Historical Context", "English Writing", "Debate & Discussion"],
    description:
      "Savita Ma'am brings Social Science and English alive by encouraging thoughtful classroom discussions on society, history, governance, and literature. She trains learners to write well-structured, evidence-backed answers and build informed civic awareness alongside strong spoken and written English proficiency.",
  },
  {
    id: "lalita_mam",
    name: "Lalita Ma'am",
    role: "Mathematics Educator (Primary Wing)",
    category: "Primary",
    wing: "Primary Wing",
    experienceFocus: "Foundational Numeracy, Mental Math & Interactive Learning",
    specialties: ["Number Sense", "Mental Arithmetic", "Activity-Based Math", "Early Confidence"],
    description:
      "Lalita Ma'am lays the vital mathematical foundation for young learners in the Primary Wing of Holy Cross School. Using patient explanations, visual aids, and engaging mental arithmetic games, she removes fear of numbers early and turns foundational math into an enjoyable daily discovery.",
  },
  {
    id: "deepa_mam",
    name: "Deepa Ma'am",
    role: "Hindi & Sanskrit Educator",
    category: "Languages",
    wing: "Middle Wing",
    experienceFocus: "Grammar Precision, Essay Writing & Classical Sanskrit",
    specialties: ["Hindi Vyakaran", "Sanskrit Translation", "Creative Writing", "Pronunciation"],
    description:
      "Deepa Ma'am teaches Hindi and Sanskrit with strong commitment to linguistic accuracy and expressive composition. She helps students master grammar rules, comprehension passages, and Sanskrit shlokas with ease, building strong academic scores and lasting pride in Indian languages.",
  },
  {
    id: "sandhya_mam",
    name: "Sandhya Ma'am",
    role: "Mathematics & Computer Educator",
    category: "IT & Computer",
    wing: "Middle Wing",
    experienceFocus: "Logical Computation, Algorithmic Thinking & Core Mathematics",
    specialties: ["Mathematics Logic", "Computer Fundamentals", "Digital Skills", "Structured Reasoning"],
    description:
      "Sandhya Ma'am unites Mathematics and Computer Science to sharpen students' analytical and logical reasoning. Her lessons connect numerical clarity with practical computer skills, showing learners how mathematical logic powers everyday software, data handling, and coding.",
  },
  {
    id: "alka_mam",
    name: "Alka Ma'am",
    role: "Social Science Educator",
    category: "Social Science",
    wing: "Senior & Middle Wing",
    experienceFocus: "History, Political Science, Geography & Map Work",
    specialties: ["Historical Timelines", "Map Skills", "Democratic Politics", "NCERT Answer Structuring"],
    description:
      "Alka Ma'am specializes in Social Science, guiding students through rich historical events, geographical systems, and democratic institutions. She emphasizes accurate map work, critical evaluation, and clean point-wise NCERT exam writing so students link classroom learning with real-world developments.",
  },
  {
    id: "archana_mam",
    name: "Archana Ma'am",
    role: "Social Science Educator",
    category: "Social Science",
    wing: "Middle & Senior Wing",
    experienceFocus: "Geography, Economics Basics & Social Awareness",
    specialties: ["Economic Literacy", "Civics & Governance", "Project Guidance", "Conceptual Clarity"],
    description:
      "Archana Ma'am sparks curiosity in Social Science by linking historical movements, environmental geography, and civic responsibility to everyday life in India. She mentors students on research projects, handwritten portfolios, and analytical writing for strong academic outcomes.",
  },
  {
    id: "sumit_sir",
    name: "Sumit Sir",
    role: "English & Social Studies Educator",
    category: "Social Science",
    wing: "Middle & Senior Wing",
    experienceFocus: "Communicative English, Civic Responsibility & World History",
    specialties: ["Spoken English", "Grammar & Composition", "Social Studies", "Student Mentorship"],
    description:
      "Sumit Sir teaches English and Social Studies with an energetic, interactive style that motivates students to speak confidently, debate respectfully, and think independently. His guidance builds strong communication skills alongside historical and civic maturity.",
  },
  {
    id: "venus_mam",
    name: "Venus Ma'am",
    role: "English Educator",
    category: "Languages",
    wing: "Senior & Middle Wing",
    experienceFocus: "English Literature, Poetic Appreciation & Formal Writing",
    specialties: ["Literature Analysis", "Grammar Mastery", "Formal Letters & Essays", "Reading Fluency"],
    description:
      "Venus Ma'am brings passion and polish to the English department at Holy Cross School. She guides students through prose, poetry, grammar nuances, and structured formal writing, cultivating refined vocabulary, thoughtful interpretation, and articulate public speaking.",
  },
  {
    id: "rama_mam",
    name: "Rama Ma'am",
    role: "Hindi & Sanskrit Educator",
    category: "Languages",
    wing: "Middle & Senior Wing",
    experienceFocus: "Literary Expression, Shloka Meaning & Grammar",
    specialties: ["Hindi Poetry & Prose", "Sanskrit Grammar", "Neat Presentation", "Cultural Values"],
    description:
      "Rama Ma'am is dedicated to developing strong mastery in both Hindi and Sanskrit. With calm, detailed explanations, she helps students understand classical roots, literary devices, and grammatical precision while nurturing appreciation for India's rich literary traditions.",
  },
  {
    id: "preeti_mam",
    name: "Preeti Ma'am",
    role: "Hindi & Sanskrit Educator",
    category: "Languages",
    wing: "Middle Wing",
    experienceFocus: "Language Fluency, Vocabulary Enrichment & Exam Readiness",
    specialties: ["Hindi Composition", "Sanskrit Lessons", "Reading Comprehension", "Oral Recitation"],
    description:
      "Preeti Ma'am makes learning Hindi and Sanskrit clear and engaging for every student. By breaking down grammar topics into intuitive steps and encouraging steady reading and writing practice, she helps learners build lasting fluency and exam confidence.",
  },
  {
    id: "jyoti_mam",
    name: "Jyoti Ma'am",
    role: "English Educator",
    category: "Languages",
    wing: "Middle & Primary Wing",
    experienceFocus: "Reading Comprehension, Grammar & Creative Expression",
    specialties: ["Creative Writing", "Vocabulary Building", "Spoken Fluency", "Interactive Reading"],
    description:
      "Jyoti Ma'am nurtures a genuine love for English through engaging storytelling, structured grammar exercises, and guided creative writing. She focuses on pronunciation, sentence clarity, and imagination so students express themselves effortlessly.",
  },
  {
    id: "anjana_mam",
    name: "Anjana Ma'am",
    role: "Biology & Science Educator",
    category: "Science",
    wing: "Senior & Middle Wing",
    experienceFocus: "Cellular Biology, Environmental Science & Scientific Method",
    specialties: ["Biology Concepts", "Science Models", "Lab Observation", "NCERT Clarity"],
    description:
      "Anjana Ma'am guides students through Biology and general Science with enthusiasm and depth. She encourages close observation, clean scientific diagrams, and working 3D models that strengthen understanding of ecosystems, human anatomy, and natural sciences.",
  },
  {
    id: "sr_lisa_t",
    name: "Sr. Lisa T.",
    role: "English & Value Education Educator",
    category: "Languages",
    wing: "Middle & Senior Wing",
    experienceFocus: "Character Formation, Empathy & English Communication",
    specialties: ["Value Education", "English Literature", "Ethical Leadership", "Compassionate Guidance"],
    description:
      "Sr. Lisa T. blends strong English instruction with deeply meaningful Value Education rooted in Holy Cross principles. She inspires learners to practice empathy, integrity, gratitude, and service to others while refining their language skills and personal discipline.",
  },
  {
    id: "ekta_mam",
    name: "Ekta Ma'am",
    role: "Mathematics Educator",
    category: "Mathematics",
    wing: "Middle & Senior Wing",
    experienceFocus: "Algebraic Equations, Mensuration & Stepwise Problem Solving",
    specialties: ["Algebra & Equations", "Geometry", "Doubt Clearing", "Practice Drills"],
    description:
      "Ekta Ma'am makes Mathematics logical, accessible, and rewarding for every learner. Through patient doubt-clearing and structured step-by-step practice, she helps students overcome hesitation with numbers and score consistently well in exams.",
  },
  {
    id: "shweta_verma_mam",
    name: "Shweta Verma Ma'am",
    role: "Science, Value Education & Computer Educator",
    category: "IT & Computer",
    wing: "Middle Wing",
    experienceFocus: "Integrated Science, Digital Skills & Responsible Ethics",
    specialties: ["General Science", "Computer Studies", "Value Education", "Exhibition Projects"],
    description:
      "Shweta Verma Ma'am contributes across Science, Computer Education, and Value Education. Her multidisciplinary teaching shows students how scientific curiosity and modern computing must always go hand in hand with strong ethics and responsible digital citizenship.",
  },
  {
    id: "shweta_vyas_mam",
    name: "Shweta Vyas Ma'am",
    role: "Mathematics Educator",
    category: "Mathematics",
    wing: "Middle & Senior Wing",
    experienceFocus: "Conceptual Mathematics, Data Handling & Exam Techniques",
    specialties: ["Number Systems", "Statistics & Data", "Logical Reasoning", "Concept Reinforcement"],
    description:
      "Shweta Vyas Ma'am teaches core Mathematics with clarity, patience, and practical everyday analogies. She emphasizes understanding the reasoning behind every theorem so students confidently solve unfamiliar application problems during exams.",
  },
  {
    id: "nisha_sharma_mam",
    name: "Nisha Sharma Ma'am",
    role: "Mathematics Educator",
    category: "Mathematics",
    wing: "Middle Wing",
    experienceFocus: "Arithmetic Mastery, Fractions, Ratios & Geometry",
    specialties: ["Arithmetic Foundations", "Geometric Constructions", "Analytical Thinking", "Daily Practice"],
    description:
      "Nisha Sharma Ma'am strengthens students' core numerical fluency through organized classroom drills and clear visual explanations. Her supportive coaching ensures learners keep steady pace with the syllabus and transition smoothly into higher-grade mathematics.",
  },
  {
    id: "neha_yadav_mam",
    name: "Neha Yadav Ma'am",
    role: "English Educator",
    category: "Languages",
    wing: "Middle & Primary Wing",
    experienceFocus: "Communication Skills, Grammar & Expressive Reading",
    specialties: ["English Grammar", "Reading Skills", "Essay Structure", "Confidence Building"],
    description:
      "Neha Yadav Ma'am builds confident English communication through interactive reading circles, systematic grammar practice, and structured writing workshops. She encourages learners to articulate original ideas clearly both in notebooks and on stage.",
  },
  {
    id: "neha_shukla_mam",
    name: "Neha Shukla Ma'am",
    role: "Science Educator",
    category: "Science",
    wing: "Middle Wing",
    experienceFocus: "Everyday Science, Experiments & Inquiry-Based Learning",
    specialties: ["Scientific Inquiry", "NCERT Experiments", "Environmental Awareness", "Concept Mapping"],
    description:
      "Neha Shukla Ma'am makes Science engaging by encouraging active questioning, observation, and hands-on experiments. Her clear explanations simplify physics, chemistry, and biology fundamentals and inspire students to build creative STEM exhibition models.",
  },
  {
    id: "ashwini_mam",
    name: "Ashwini Ma'am",
    role: "English Educator",
    category: "Languages",
    wing: "Middle & Senior Wing",
    experienceFocus: "Language Fluency, Literature & Effective Presentation",
    specialties: ["Literature Comprehension", "Writing Skills", "Elocution", "Grammar Accuracy"],
    description:
      "Ashwini Ma'am helps students elevate their English proficiency through thoughtful literary discussion, structured writing practice, and constructive feedback. She encourages wide reading and poised presentation in academic and co-curricular forums.",
  },
  {
    id: "ruby_mam",
    name: "Ruby Ma'am",
    role: "Primary Wing Educator",
    category: "Primary",
    wing: "Primary Wing",
    experienceFocus: "Early Childhood Growth, Joyful Learning & Foundational Skills",
    specialties: ["Primary Literacy", "Activity-Based Learning", "Student Care", "Creative Classroom"],
    description:
      "Ruby Ma'am is a caring and dedicated Primary Wing teacher at Holy Cross School, Indore. She nurtures a joyful, warm, and encouraging classroom environment where young students develop strong foundations in reading, writing, numeracy, and good daily habits during their formative years.",
  },
  {
    id: "vineeta_mam",
    name: "Vineeta Ma'am",
    role: "Chemistry & Science Educator",
    category: "Science",
    wing: "Senior & Middle Wing",
    experienceFocus: "Chemical Concepts, Everyday Science & Analytical Clarity",
    specialties: ["Chemistry Foundations", "Science Practicals", "Concept Simplification", "Exam Readiness"],
    description:
      "Vineeta Ma'am teaches Chemistry and Science with clear, well-paced instruction and real-life relevance. She helps learners decode chemical formulas, properties of matter, and experimental reasoning step by step for strong senior-wing readiness.",
  },
  {
    id: "barkha_mam",
    name: "Barkha Ma'am",
    role: "Primary Wing Educator",
    category: "Primary",
    wing: "Primary Wing",
    experienceFocus: "Foundational Academics, Storytelling & Holistic Early Care",
    specialties: ["Early Learning", "Interactive Activities", "Good Manners & Discipline", "Individual Attention"],
    description:
      "Barkha Ma'am nurtures young Holy Crossians in the Primary Wing with patience, affection, and creative classroom methods. Through stories, visual learning games, and attentive care, she helps children love coming to school while steadily mastering essential basics.",
  },
  {
    id: "sheetal_mam",
    name: "Sheetal Ma'am",
    role: "Hindi & Sanskrit Educator",
    category: "Languages",
    wing: "Middle & Primary Wing",
    experienceFocus: "Language Basics, Correct Pronunciation & Sanskrit Appreciation",
    specialties: ["Hindi Writing", "Sanskrit Basics", "Grammar Clarity", "Reading Practice"],
    description:
      "Sheetal Ma'am guides students in Hindi and Sanskrit through gentle encouragement and consistent practice. She highlights neat presentation, accurate spelling, and clear comprehension so learners build lasting confidence in both languages.",
  },
  {
    id: "bhawana_mam",
    name: "Bhawana Ma'am",
    role: "Computer & Mathematics Educator",
    category: "IT & Computer",
    wing: "Middle Wing",
    experienceFocus: "Practical Computing, Coding Basics & Mathematical Thinking",
    specialties: ["Computer Lab Skills", "Mathematics", "Logical Problem Solving", "Digital Projects"],
    description:
      "Bhawana Ma'am empowers students across Computer Science and Mathematics by pairing classroom logic with practical computer lab applications. Her guidance helps learners strengthen analytical thinking alongside vital digital fluency.",
  },
  {
    id: "veena_mam",
    name: "Veena Ma'am",
    role: "Fine Arts Educator",
    category: "Activities",
    wing: "All Wings",
    experienceFocus: "Drawing, Painting, Craftsmanship & Visual Creativity",
    specialties: ["Sketching & Painting", "Craft & Exhibition Models", "Color Theory", "Artistic Expression"],
    description:
      "Veena Ma'am leads Fine Arts at Holy Cross School, awakening imagination, aesthetic sense, and visual confidence across all grades. From sketching and watercolor painting to vibrant exhibition decorations and craft competitions, she helps students express creativity with pride.",
  },
  {
    id: "pinky_mam",
    name: "Pinky Ma'am",
    role: "School Librarian",
    category: "Activities",
    wing: "School Library & Knowledge Center",
    experienceFocus: "Reading Culture, Reference Research & Book Curation",
    specialties: ["Library Management", "Reading Recommendations", "Academic References", "Knowledge Discovery"],
    description:
      "Pinky Ma'am curates and manages the Holy Cross School Library, maintaining a welcoming sanctuary of encyclopedias, storybooks, NCERT reference texts, and periodicals. She motivates students to explore beyond textbooks and cultivate lifelong reading habits.",
  },
  {
    id: "jay_sir",
    name: "Jay Sir",
    role: "Dance Instructor & Performing Arts Mentor",
    category: "Activities",
    wing: "Co-Curricular & Cultural Wing",
    experienceFocus: "Choreography, Rhythm, Annual Day & Cultural Performances",
    specialties: ["Classical & Contemporary Dance", "Stage Choreography", "Rhythm & Fitness", "Stage Confidence"],
    description:
      "Jay Sir brings rhythm, energy, and artistic flair to Holy Cross School as the Dance Instructor. He choreographs standout performances for Annual Days, national celebrations, and inter-school cultural competitions, nurturing coordination, teamwork, and stage presence.",
  },
  {
    id: "deepak_sir",
    name: "Deepak Sir",
    role: "Sports & Physical Education Coach",
    category: "Sports",
    wing: "Athletics & Sports Ground",
    experienceFocus: "Physical Fitness, Team Sports, Discipline & Sportsmanship",
    specialties: ["Cricket & Athletics", "Physical Conditioning", "Sports Day Training", "Team Spirit"],
    description:
      "Deepak Sir leads Sports and Physical Education at Holy Cross School, championing physical fitness, teamwork, and true sportsmanship on the ground. From morning drills and Annual Sports Day to cricket, track events, and inter-house tournaments, he keeps Holy Crossians active and resilient.",
  },
  {
    id: "simran_mam",
    name: "Simran Ma'am",
    role: "General Knowledge & Social Studies Educator",
    category: "Social Science",
    wing: "Middle & Primary Wing",
    experienceFocus: "Current Affairs, Quizzes, Geography & Civic Awareness",
    specialties: ["General Knowledge", "Quiz Preparation", "Social Studies", "Curiosity Building"],
    description:
      "Simran Ma'am broadens students' outlook through General Knowledge and Social Studies. She keeps lessons lively with current affairs, quiz rounds, and fascinating facts about India and the world so learners stay curious and well-informed.",
  },
  {
    id: "jenny_mam",
    name: "Jenny Ma'am",
    role: "Primary Wing Educator",
    category: "Primary",
    wing: "Primary Wing",
    experienceFocus: "Early Literacy, Joyful Engagement & Student Confidence",
    specialties: ["Primary Teaching", "Creative Activities", "Reading Fluency", "Supportive Mentorship"],
    description:
      "Jenny Ma'am brings warmth, creativity, and cheerful energy to the Primary Wing at Holy Cross School. She supports young learners in developing disciplined study habits, expressive speaking, and friendly teamwork from their earliest school years.",
  },
  {
    id: "bharti_mam",
    name: "Bharti Ma'am",
    role: "Primary Wing Educator",
    category: "Primary",
    wing: "Primary Wing",
    experienceFocus: "Core Foundational Subjects & Caring Classroom Guidance",
    specialties: ["Foundational Skills", "Student Encouragement", "Neat Presentation", "Interactive Learning"],
    description:
      "Bharti Ma'am guides Primary Wing learners with steady care and structured foundational teaching. She ensures every child feels encouraged to ask questions, participate joyfully, and grow steadily in confidence.",
  },
  {
    id: "ravi_sir",
    name: "Ravi Sir",
    role: "School Faculty Member",
    category: "Faculty",
    wing: "Academic Wing",
    experienceFocus: "Academic Support, Student Discipline & Campus Mentorship",
    specialties: ["Classroom Instruction", "Student Guidance", "School Events", "Team Coordination"],
    description:
      "Ravi Sir is a dedicated faculty member at Holy Cross School who contributes wholeheartedly to classroom learning, student discipline, and school-wide academic and co-curricular activities.",
  },
  {
    id: "deepshika_mam",
    name: "Deepshika Ma'am",
    role: "School Faculty Member",
    category: "Faculty",
    wing: "Academic Wing",
    experienceFocus: "Student Development, Academic Clarity & Co-Curricular Support",
    specialties: ["Academic Instruction", "Student Mentorship", "Classroom Engagement", "Event Support"],
    description:
      "Deepshika Ma'am is a committed educator at Holy Cross School focused on fostering clear academic understanding, positive classroom participation, and well-rounded student growth.",
  },
  {
    id: "subash_sir",
    name: "Subash Sir",
    role: "Lead Technician (Office & Technical Support Staff)",
    category: "Office Staff",
    wing: "Campus Technical Operations",
    experienceFocus: "Hardware, Audio-Visual Setup, Smart Classrooms & Exhibition Tech",
    specialties: ["Technical Infrastructure", "Smart Class Support", "Audio-Visual Systems", "Rapid Troubleshooting"],
    description:
      "Subash Sir serves as the dependable Lead Technician in the Office and Technical Staff of Holy Cross School, Indore. He keeps campus technology running smoothly behind the scenes—maintaining computer labs, smart classrooms, audio setups, and technical infrastructure vital for daily lessons, assemblies, and major school exhibitions.",
  },
  {
    id: "gloria_mam",
    name: "Gloria Ma'am",
    role: "Office Administration Staff",
    category: "Office Staff",
    wing: "Main School Office",
    experienceFocus: "Admissions Support, Parent Coordination & Records Management",
    specialties: ["School Administration", "Parent Assistance", "Student Records", "Front-Office Coordination"],
    description:
      "Gloria Ma'am plays an essential role in the Holy Cross School administrative office, assisting parents, students, and educators with official documentation, schedules, and day-to-day school inquiries with courtesy and precision.",
  },
  {
    id: "rosemary_mam",
    name: "Rosemary Ma'am",
    role: "Office Administration Staff",
    category: "Office Staff",
    wing: "Main School Office",
    experienceFocus: "Administrative Operations, Documentation & Communication",
    specialties: ["Office Management", "Official Records", "Parent Support", "School Coordination"],
    description:
      "Rosemary Ma'am ensures smooth administrative operations at the Holy Cross School office. Her organized handling of records, notices, and visitor inquiries keeps parent communication and school coordination seamless.",
  },
  {
    id: "sasmith_jasmeet",
    name: "Sasmith Ma'am & Jasmeet",
    role: "Office Administration Staff",
    category: "Office Staff",
    wing: "Main School Office",
    experienceFocus: "Daily Office Support, Record-Keeping & Visitor Assistance",
    specialties: ["Administrative Support", "Student Services", "Office Coordination", "Helpful Guidance"],
    description:
      "Sasmith Ma'am and Jasmeet form a vital part of the Holy Cross School office administration team, supporting daily records, student services, and warm, helpful assistance for parents and visiting guests.",
  },
];

// ============================================================================
// SECTION 4: PROMPTS, NCERT FORMULAS & INTERACTIVE EXHIBITION QUIZ
// ============================================================================
const RECOMMENDED_PROMPTS: Record<string, { en: string[]; hi: string[] }> = {
  Exhibition: {
    en: [
      "Welcome our parents & judges to Holy Cross School AI!",
      "How does Holy Cross School AI work behind the scenes?",
      "Tell me about Holy Cross School, Khandwa Road, Indore",
      "Who is Sr. Liasa Joseph and what is the school motto?",
    ],
    hi: [
      "होली क्रॉस स्कूल एआई में अभिभावकों और जजों का स्वागत करें!",
      "होली क्रॉस स्कूल, खंडवा रोड, इंदौर के बारे में विस्तार से बताएं",
      "सिस्टर लियासा जोसेफ और प्रियंका मैम के बारे में बताएं",
      "यह एआई प्रोजेक्ट छात्रों की पढ़ाई में कैसे मदद करता है?",
    ],
  },
  Faculty: {
    en: [
      "Tell me about Priyanka Ma'am and her IT mentorship",
      "What does Ruby Ma'am teach at Holy Cross School?",
      "Who is Subash Sir and how does he help the school?",
      "Tell me about Prachi Trivedi Ma'am and Divya Ma'am",
    ],
    hi: [
      "प्रियंका मैम के बारे में विस्तार से बताएं",
      "रूबी मैम कौन सी कक्षा और विषय पढ़ाती हैं?",
      "सुभाष सर स्कूल में क्या भूमिका निभाते हैं?",
      "सत्यपाल सर और दीपक सर के बारे में बताएं",
    ],
  },
  Academics: {
    en: [
      "Explain Newton's Three Laws of Motion with daily examples",
      "Compare Direct Tax and Indirect Tax clearly for students",
      "Solve 3x + 7 = 28 step-by-step and verify the answer",
      "Give a high-efficiency 95%+ CBSE exam study schedule",
    ],
    hi: [
      "न्यूटन के गति के तीनों नियमों को आसान उदाहरणों से समझाएं",
      "प्रत्यक्ष कर (Direct Tax) और अप्रत्यक्ष कर (Indirect Tax) में अंतर बताएं",
      "प्रकाश संश्लेषण (Photosynthesis) की प्रक्रिया सरल भाषा में समझाएं",
      "परीक्षा में 95% से अधिक अंक लाने का टाइम-टेबल बनाएं",
    ],
  },
  Personal: {
    en: [
      "Hello! How are you doing today?",
      "Who created Holy Cross School AI?",
      "Tell me a motivating quote for students before exams",
      "How can parents support their child's learning at home?",
    ],
    hi: [
      "नमस्ते! आप कैसे हैं और आज क्या मदद कर सकते हैं?",
      "होली क्रॉस स्कूल एआई को किसने बनाया है?",
      "छात्रों के लिए एक प्रेरणादायक विचार सुनाएं",
      "माता-पिता घर पर बच्चों की पढ़ाई में कैसे मदद कर सकते हैं?",
    ],
  },
  Cricket: {
    en: [
      "List top ICC records of Virat Kohli and Rohit Sharma",
      "Explain the physics of swing and spin bowling in cricket",
      "Analyze MS Dhoni's greatest captaincy decisions",
      "Best fitness and batting practice routine for students",
    ],
    hi: [
      "विराट कोहली और रोहित शर्मा के प्रमुख आईसीसी रिकॉर्ड बताएं",
      "क्रिकेट में स्विंग और स्पिन गेंदबाजी का विज्ञान समझाएं",
      "एमएस धोनी की कप्तानी की सबसे बड़ी खासियतें क्या थीं?",
      "युवा क्रिकेटरों के लिए सबसे अच्छा अभ्यास रूटीन क्या है?",
    ],
  },
};

const NCERT_FORMULAS: StudyFormula[] = [
  {
    id: "phy_newton",
    subject: "Physics",
    title: "Newton's Second Law of Motion",
    formula: "F = m x a",
    explanation: "Force equals mass multiplied by acceleration (SI Unit: Newton, N).",
    askPrompt: "Explain Newton's Second Law (F = ma) with 2 solved numerical examples for CBSE students.",
  },
  {
    id: "phy_kinematics",
    subject: "Physics",
    title: "Three Equations of Motion",
    formula: "v = u + at  |  s = ut + 1/2 at^2  |  v^2 - u^2 = 2as",
    explanation: "Links initial velocity (u), final velocity (v), acceleration (a), time (t), and displacement (s).",
    askPrompt: "Explain the three equations of motion clearly with a simple numerical example.",
  },
  {
    id: "phy_ohm",
    subject: "Physics",
    title: "Ohm's Law & Electric Power",
    formula: "V = I x R   |   P = V x I = I^2 R",
    explanation: "Potential difference across a conductor is directly proportional to current at constant temperature.",
    askPrompt: "Explain Ohm's Law and solve a sample electric circuit problem step-by-step.",
  },
  {
    id: "chem_mole",
    subject: "Chemistry",
    title: "Mole Concept & Avogadro Constant",
    formula: "n = Given Mass (m) / Molar Mass (M) = N / 6.022 x 10^23",
    explanation: "Connects mass of a substance with number of moles and total particles.",
    askPrompt: "Explain the Mole Concept and Avogadro's number with a clear solved example.",
  },
  {
    id: "chem_ph",
    subject: "Chemistry",
    title: "Acids, Bases & pH Scale",
    formula: "pH < 7 (Acidic)  |  pH = 7 (Neutral)  |  pH > 7 (Basic)",
    explanation: "Measures hydrogen ion concentration; essential in digestion, soil fertility, and dental care.",
    askPrompt: "Explain the pH scale and its importance in everyday life for CBSE Science.",
  },
  {
    id: "math_quad",
    subject: "Mathematics",
    title: "Quadratic Formula",
    formula: "x = [ -b +/- sqrt(b^2 - 4ac) ] / 2a",
    explanation: "Finds roots of ax^2 + bx + c = 0; Discriminant D = b^2 - 4ac defines root nature.",
    askPrompt: "Solve x^2 - 5x + 6 = 0 using the quadratic formula and explain the discriminant.",
  },
  {
    id: "math_heron",
    subject: "Mathematics",
    title: "Heron's Formula (Triangle Area)",
    formula: "Area = sqrt[ s(s - a)(s - b)(s - c) ],  where s = (a + b + c)/2",
    explanation: "Calculates the exact area of any triangle directly from its three side lengths.",
    askPrompt: "Find the area of a triangle with sides 13 cm, 14 cm, and 15 cm using Heron's Formula.",
  },
  {
    id: "eco_tax",
    subject: "Economics",
    title: "Direct Tax vs. Indirect Tax",
    formula: "Direct (Income Tax) -> Paid Directly | Indirect (GST) -> Shifted via Goods",
    explanation: "Direct taxes are non-transferable and progressive; indirect taxes apply on consumption.",
    askPrompt: "Compare Direct Tax and Indirect Tax with Indian examples like Income Tax and GST.",
  },
  {
    id: "eco_demand",
    subject: "Economics",
    title: "Law of Demand & Supply",
    formula: "Price Up => Demand Down & Supply Up (Other Factors Constant)",
    explanation: "Market equilibrium occurs where quantity demanded equals quantity supplied.",
    askPrompt: "Explain the Law of Demand, Law of Supply, and Market Equilibrium simply.",
  },
  {
    id: "sst_democracy",
    subject: "Social Science",
    title: "Three Organs of Indian Democracy",
    formula: "Legislature (Makes Laws) • Executive (Implements) • Judiciary (Protects)",
    explanation: "Horizontal power sharing guarantees constitutional checks and balances.",
    askPrompt: "Explain horizontal power sharing between Legislature, Executive, and Judiciary in India.",
  },
];

const EXHIBITION_QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "What is the official motto of Holy Cross School, Khandwa Road, Indore?",
    options: ["Knowledge is Power", "Live and Let Live", "Work is Worship", "Truth Alone Triumphs"],
    correctIndex: 1,
    fact: "'Live and Let Live' reflects Holy Cross School's core mission of harmony, empathy, and holistic growth.",
  },
  {
    id: "q2",
    question: "Who serves as the Principal & Spiritual Guide of Holy Cross School, Indore?",
    options: ["Sr. Liasa Joseph", "Priyanka Ma'am", "Kamini Ma'am", "Sarika Ma'am"],
    correctIndex: 0,
    fact: "Sr. Liasa Joseph leads Holy Cross School, Indore with vision, compassion, and academic excellence.",
  },
  {
    id: "q3",
    question: "In Physics, which formula represents Newton's Second Law of Motion?",
    options: ["E = mc^2", "V = I x R", "F = m x a", "P = W / t"],
    correctIndex: 2,
    fact: "Force equals mass multiplied by acceleration (F = ma), measured in Newtons (N).",
  },
  {
    id: "q4",
    question: "Which of the following is an example of an Indirect Tax in India?",
    options: ["Income Tax", "Corporate Tax", "GST (Goods & Services Tax)", "Wealth Tax"],
    correctIndex: 2,
    fact: "GST is an indirect tax collected on goods and services, whereas Income Tax is paid directly to the government.",
  },
  {
    id: "q5",
    question: "Why does Holy Cross School AI use a Vercel Serverless Backend (/api/chat)?",
    options: [
      "To keep the AI API key hidden and secure on the server",
      "To slow down the website",
      "To remove Hindi language support",
      "To force visitors to buy an API key",
    ],
    correctIndex: 0,
    fact: "Storing keys in Vercel Environment Variables protects them completely while giving every visitor instant AI access.",
  },
];

// ============================================================================
// SECTION 5: OFFLINE EXHIBITION FAILSAFE ENGINE (ZERO-BACKTICK SAFE)
// ============================================================================
function getOfflineBackupAnswer(
  question: string,
  language: LanguageCode,
  user: UserProfile | null
): string {
  const q = question.toLowerCase().trim();
  const visitor = user?.name && user.name !== "Exhibition Visitor" ? ", " + user.name : "";

  if (
    /^(hi|hello|hey|namaste|good morning|good afternoon|good evening)\b/.test(q) ||
    q.includes("how are you") ||
    q.includes("kaise ho") ||
    q.includes("कैसे हैं")
  ) {
    if (language === "hi") {
      return (
        "**नमस्ते" +
        visitor +
        "!** मैं **होली क्रॉस स्कूल एआई** हूँ और बिल्कुल ठीक हूँ, धन्यवाद!\n\n" +
        "मैं होली क्रॉस स्कूल, खंडवा रोड, इंदौर की जानकारी, हमारे सभी 45 शिक्षकों का विवरण, NCERT पढ़ाई, गणित, विज्ञान और क्रिकेट से जुड़े सवालों के जवाब देने के लिए तैयार हूँ। आज मैं आपकी क्या मदद करूँ?"
      );
    }
    return (
      "**Hello" +
      visitor +
      "!** I am **Holy Cross School AI**, and I am doing wonderful—thank you for asking!\n\n" +
      "I am honored to welcome parents, judges, teachers, and students to our exhibition showcase. Ask me about **Holy Cross School, Indore**, any of our **45 faculty & office staff members**, NCERT academics, science, mathematics, or cricket!"
    );
  }

  if (
    q.includes("who made") ||
    q.includes("who built") ||
    q.includes("who created") ||
    q.includes("किसने बनाया")
  ) {
    if (language === "hi") {
      return (
        "**होली क्रॉस स्कूल एआई का निर्माण**\n\n" +
        "इस आधिकारिक एआई पोर्टल को **गौरव लालवानी (कक्षा IX B)** ने कंप्यूटर साइंस और आईटी मेंटर **प्रियंका मैम** के मार्गदर्शन तथा आदरणीय प्रधानाचार्या **सिस्टर लियासा जोसेफ** की प्रेरणा से तैयार किया है।"
      );
    }
    return (
      "**About the Creator & Technical Architecture**\n\n" +
      "**Holy Cross School AI** was architected by **" +
      SCHOOL_CONFIG.architect +
      "** under the mentorship of **" +
      SCHOOL_CONFIG.mentor +
      "** and the inspiring leadership of Principal **" +
      SCHOOL_CONFIG.principal +
      "**.\n\n" +
      "- **Frontend:** React + TypeScript + Vite featuring a 60FPS Morphing Orb & Dual-Tab interface.\n" +
      "- **Backend:** Secure Vercel Serverless API (/api/chat) keeping keys safely hidden with automatic failover.\n" +
      "- **Voice & Bilingual:** Built-in English & Hindi Speech Recognition plus Read Aloud voice synthesis."
    );
  }

  if (
    q.includes("holy cross") &&
    (q.includes("about") || q.includes("overview") || q.includes("school") || q.includes("indore") || q.includes("motto"))
  ) {
    return (
      "**" +
      SCHOOL_CONFIG.schoolFullName +
      "**\n\n" +
      '- **Motto:** "' +
      SCHOOL_CONFIG.motto +
      '"\n' +
      "- **Principal:** " +
      SCHOOL_CONFIG.principal +
      "\n" +
      "- **Board:** " +
      SCHOOL_CONFIG.board +
      "\n" +
      "- **Classes:** " +
      SCHOOL_CONFIG.grades +
      "\n" +
      "- **Address:** " +
      SCHOOL_CONFIG.address +
      "\n" +
      "- **Official Website:** " +
      SCHOOL_CONFIG.links.schoolWebsite +
      "\n\n" +
      "Holy Cross School nurtures holistic excellence—balancing strong CBSE academics with moral values, science innovation, fine arts, and athletics."
    );
  }

  const matchedFaculty = FACULTY_DATA.find((f) => {
    const cleanName = f.name
      .toLowerCase()
      .replace(/ma'am|mam|sir|sr\.|sister/g, "")
      .trim();
    const firstToken = cleanName.split(" ")[0] || "";
    return (
      q.includes(f.name.toLowerCase()) ||
      (cleanName.length >= 3 && q.includes(cleanName)) ||
      (firstToken.length >= 4 && q.includes(firstToken))
    );
  });

  if (matchedFaculty) {
    return (
      "**" +
      matchedFaculty.name +
      " — " +
      matchedFaculty.role +
      "**\n\n" +
      "- **Department:** " +
      matchedFaculty.category +
      " (" +
      matchedFaculty.wing +
      ")\n" +
      "- **Core Focus:** " +
      matchedFaculty.experienceFocus +
      "\n" +
      "- **Specialties:** " +
      matchedFaculty.specialties.join(", ") +
      "\n\n" +
      matchedFaculty.description
    );
  }

  return "";
}

// ============================================================================
// SECTION 6: RICH TEXT RENDERER (CRISP BOLD & HEADINGS, ZERO RAW ** OR ###)
// ============================================================================
function renderInlineBold(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={idx} style={{ color: "#fde68a", fontWeight: 800 }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={idx}>{part.replace(/\*/g, "")}</Fragment>;
  });
}

function FormattedAnswer({ text, fontSize }: { text: string; fontSize: number }) {
  const lines = text.split("\n");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: fontSize + "px", lineHeight: 1.68 }}>
      {lines.map((rawLine, index) => {
        const line = rawLine.trim();
        if (!line || line === "---" || line === "***") {
          return <div key={index} style={{ height: "4px" }} />;
        }

        if (/^#{1,4}\s+/.test(line)) {
          const cleanHeading = line.replace(/^#{1,4}\s+/, "");
          return (
            <div
              key={index}
              style={{
                fontSize: fontSize + 2 + "px",
                fontWeight: 900,
                color: "#fbbf24",
                marginTop: index > 0 ? "6px" : "0px",
              }}
            >
              {renderInlineBold(cleanHeading)}
            </div>
          );
        }

        if (/^[-*•]\s+/.test(line)) {
          const content = line.replace(/^[-*•]\s+/, "");
          return (
            <div key={index} style={{ display: "flex", gap: "10px", paddingLeft: "4px", alignItems: "flex-start" }}>
              <span style={{ color: "#38bdf8", fontWeight: 900, flexShrink: 0 }}>•</span>
              <span style={{ color: "#e2e8f0" }}>{renderInlineBold(content)}</span>
            </div>
          );
        }

        const numMatch = line.match(/^(\d+\.)\s+(.*)$/);
        if (numMatch) {
          return (
            <div key={index} style={{ display: "flex", gap: "10px", paddingLeft: "4px", alignItems: "flex-start" }}>
              <span style={{ color: "#fbbf24", fontWeight: 800, minWidth: "22px", flexShrink: 0 }}>{numMatch[1]}</span>
              <span style={{ color: "#e2e8f0" }}>{renderInlineBold(numMatch[2])}</span>
            </div>
          );
        }

        return (
          <p key={index} style={{ margin: 0, color: "#f1f5f9" }}>
            {renderInlineBold(line)}
          </p>
        );
      })}
    </div>
  );
}

// ============================================================================
// SECTION 7: SELF-CONTAINED PREMIUM STYLESHEET (INCLUDES FULL MORPHORB CSS)
// ============================================================================
const PORTAL_STYLES = `
  @keyframes hcFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
  @keyframes hcSpin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes hcSpinRev {
    from { transform: rotate(360deg); }
    to { transform: rotate(0deg); }
  }
  @keyframes hcPulseCore {
    0%, 100% { transform: scale(1); box-shadow: 0 0 28px rgba(251,191,36,0.55), 0 0 54px rgba(56,189,248,0.35); }
    50% { transform: scale(1.09); box-shadow: 0 0 48px rgba(251,191,36,0.92), 0 0 82px rgba(56,189,248,0.65); }
  }
  @keyframes hcAuroraDrift {
    0%, 100% { transform: translate(0px, 0px); }
    50% { transform: translate(20px, -9px); }
  }
  @keyframes hcMicPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.75); }
    50% { box-shadow: 0 0 0 12px rgba(239, 68, 68, 0); }
  }
  @keyframes hcShimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes hcFadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0px); }
  }
  @keyframes moBounce {
    0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
    40% { transform: translateY(-4px); opacity: 1; }
  }
  @keyframes moShake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-6px); }
    75% { transform: translateX(6px); }
  }

  .hc-orb-float { animation: hcFloat 3.4s ease-in-out infinite; }
  .hc-orb-ring-1 { animation: hcSpin 6.5s linear infinite; }
  .hc-orb-ring-2 { animation: hcSpinRev 4.2s linear infinite; }
  .hc-orb-core { animation: hcPulseCore 1.9s ease-in-out infinite; }
  .hc-mic-live { animation: hcMicPulse 1.2s infinite; }
  .hc-fade-up { animation: hcFadeUp 0.28s ease-out; }
  .scroll-hide::-webkit-scrollbar { display: none; }
  .scroll-hide { -ms-overflow-style: none; scrollbar-width: none; }

  .hc-thinking-bar {
    height: 4px;
    border-radius: 999px;
    background: linear-gradient(90deg, rgba(56,189,248,0.2), #fbbf24, #38bdf8, rgba(56,189,248,0.2));
    background-size: 200% 100%;
    animation: hcShimmer 1.4s linear infinite;
  }

  /* SELF-CONTAINED MORPHORB CLASSES */
  .mo-root {
    position: relative;
    width: 100%;
    min-height: 485px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 26px;
    background: radial-gradient(circle at 50% 42%, rgba(30, 58, 138, 0.36), rgba(2, 6, 23, 0.96) 76%);
  }
  .mo-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(circle at 50% 50%, rgba(251, 191, 36, calc(0.14 * var(--bloom))), transparent 55%),
      radial-gradient(circle at 28% 28%, rgba(56, 189, 248, 0.12), transparent 50%);
  }
  .mo-halo {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 340px;
    height: 340px;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    pointer-events: none;
    opacity: calc(var(--oHalo) + var(--oCenter) * 0.45);
    background: radial-gradient(circle, rgba(251, 191, 36, 0.24), rgba(56, 189, 248, 0.1) 45%, transparent 72%);
    filter: blur(22px);
  }
  .mo-mover { position: relative; z-index: 5; display: flex; align-items: center; justify-content: center; }
  .mo-actor {
    position: relative;
    width: var(--w);
    max-width: calc(100vw - 44px);
    height: var(--h);
    border-radius: var(--r);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .mo-actor[data-shake] { animation: moShake 0.26s ease; }
  .mo-underglow {
    position: absolute;
    inset: -10px;
    border-radius: var(--r);
    opacity: var(--oGlow);
    background: radial-gradient(ellipse at center, rgba(251, 191, 36, 0.28), rgba(56, 189, 248, 0.16) 60%, transparent 78%);
    filter: blur(14px);
    pointer-events: none;
  }
  .mo-halo-green {
    position: absolute;
    inset: -14px;
    border-radius: var(--r);
    opacity: var(--oGreen);
    transform: scale(var(--gs));
    background: radial-gradient(circle, rgba(52, 211, 153, 0.36), transparent 72%);
    filter: blur(16px);
    pointer-events: none;
  }
  .mo-surface {
    position: absolute;
    inset: 0;
    border-radius: var(--r);
    opacity: var(--oPill);
    background: rgba(15, 23, 42, 0.94);
    overflow: hidden;
    pointer-events: none;
  }
  .mo-aurora { position: absolute; inset: 0; opacity: calc(var(--oAur) * 0.36); pointer-events: none; }
  .mo-aurora i { position: absolute; border-radius: 50%; filter: blur(22px); animation: hcAuroraDrift 5.2s ease-in-out infinite; }
  .mo-aurora i:nth-child(1) { width: 140px; height: 60px; left: 5%; top: -10px; background: #fbbf24; }
  .mo-aurora i:nth-child(2) { width: 160px; height: 60px; right: 8%; bottom: -15px; background: #38bdf8; }
  .mo-aurora i:nth-child(3) { width: 120px; height: 50px; left: 45%; top: 10px; background: #818cf8; }
  .mo-aurora i:nth-child(4) { width: 120px; height: 50px; left: 25%; bottom: -10px; background: #34d399; }
  .mo-ball {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    opacity: var(--oBall);
    background: radial-gradient(circle at 35% 30%, #fde68a, #f59e0b 55%, #1d4ed8 100%);
    pointer-events: none;
  }
  .mo-green {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    opacity: var(--oGreen);
    transform: scale(var(--gs));
    background: radial-gradient(circle at 35% 30%, #6ee7b7, #10b981 65%, #064e3b 100%);
    pointer-events: none;
  }
  .mo-card {
    position: absolute;
    inset: 0;
    border-radius: var(--r);
    opacity: var(--oCard);
    transform: scale(var(--cs));
    background: linear-gradient(145deg, rgba(15, 23, 42, 0.98), rgba(2, 6, 23, 0.98));
    border: 1px solid rgba(251, 191, 36, 0.38);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.85);
    pointer-events: none;
  }
  .mo-ring {
    position: absolute;
    inset: 0;
    border-radius: var(--r);
    opacity: var(--oRing);
    border: 1.5px solid rgba(251, 191, 36, 0.45);
    pointer-events: none;
  }
  .mo-input {
    position: relative;
    z-index: 6;
    width: 100%;
    height: 100%;
    padding: 0 10px 0 18px;
    display: flex;
    align-items: center;
    gap: 10px;
    opacity: var(--oInput);
    transform: scale(var(--inScale));
  }
  .mo-spark { width: 20px; height: 20px; color: #fbbf24; flex-shrink: 0; }
  .mo-field { flex: 1; min-width: 0; background: transparent; border: none; outline: none; color: #f8fafc; font-size: 14.5px; font-weight: 600; }
  .mo-field::placeholder { color: #94a3b8; }
  .mo-send {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border: none;
    background: linear-gradient(135deg, #fbbf24, #f59e0b);
    color: #020617;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
  }
  .mo-send svg { width: 18px; height: 18px; }
  .mo-status {
    position: relative;
    z-index: 8;
    margin-top: 14px;
    min-height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: var(--sOp);
    transform: translateY(calc(var(--sTy) * 1px));
    pointer-events: none;
  }
  .mo-lab { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 800; color: #fbbf24; letter-spacing: 0.6px; }
  .mo-lab-done { color: #34d399; }
  .mo-dots { display: inline-flex; gap: 3px; }
  .mo-dots i { width: 4px; height: 4px; border-radius: 50%; background: #38bdf8; display: inline-block; animation: moBounce 1s infinite ease-in-out; }
  .mo-dots i:nth-child(2) { animation-delay: 0.15s; }
  .mo-dots i:nth-child(3) { animation-delay: 0.3s; }
  .mo-answer { position: relative; z-index: 8; width: 100%; height: 100%; padding: 20px 24px; display: flex; flex-direction: column; overflow-y: auto; }
  .mo-a-head { display: flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; color: #38bdf8; opacity: var(--hOp); }
  .mo-a-dot { width: 8px; height: 8px; border-radius: 50%; background: #34d399; display: inline-block; transform: scale(var(--dotS)); }
  .mo-reset {
    padding: 8px 18px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(251, 191, 36, 0.4);
    color: #fbbf24;
    font-size: 12px;
    font-weight: 800;
    cursor: pointer;
  }

  /* PORTAL SHELL & CARDS */
  .hc-desktop-shell {
    min-height: 100vh;
    width: 100%;
    background-color: #020617;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    display: flex;
    flex-direction: column;
    padding-bottom: 108px;
    position: relative;
    color: #f8fafc;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }
  .hc-glass-panel {
    background: rgba(9, 17, 35, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(56, 189, 248, 0.26);
    box-shadow: 0 16px 46px rgba(0, 0, 0, 0.5);
  }
  .hc-hover-card {
    background: rgba(15, 23, 42, 0.88);
    border: 1px solid rgba(148, 163, 184, 0.22);
    transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  }
  .hc-hover-card:hover {
    transform: translateY(-2px);
    border-color: rgba(251, 191, 36, 0.62);
    box-shadow: 0 12px 28px rgba(251, 191, 36, 0.14);
  }
  .hc-btn {
    transition: transform 0.16s ease, filter 0.16s ease, background 0.2s ease;
    cursor: pointer;
    user-select: none;
  }
  .hc-btn:hover { filter: brightness(1.12); }
  .hc-btn:active { transform: scale(0.96); }

  .hc-floating-dock {
    position: fixed;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 45;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 16px;
    border-radius: 999px;
    background: rgba(6, 12, 28, 0.94);
    backdrop-filter: blur(22px);
    -webkit-backdrop-filter: blur(22px);
    border: 1px solid rgba(251, 191, 36, 0.44);
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.72), 0 0 26px rgba(56, 189, 248, 0.2);
    max-width: calc(100vw - 20px);
    overflow-x: auto;
  }
  .hc-fab-quick {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 46;
    width: 54px;
    height: 54px;
    border-radius: 50%;
    border: 1.5px solid rgba(251, 191, 36, 0.75);
    background: linear-gradient(135deg, #fbbf24, #d97706);
    color: #020617;
    font-weight: 900;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 12px 32px rgba(251, 191, 36, 0.42);
    cursor: pointer;
  }
  .hc-desktop-grid {
    display: grid;
    grid-template-columns: 330px 1fr;
    gap: 24px;
    align-items: start;
  }
  .hc-two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 22px;
  }
  @media (max-width: 980px) {
    .hc-desktop-grid, .hc-two-col { grid-template-columns: 1fr; }
    .hc-fab-quick { bottom: 84px; right: 14px; width: 46px; height: 46px; font-size: 17px; }
  }
`;

// ============================================================================
// SECTION 8: OFFICIAL HOLY CROSS CREST SVG
// ============================================================================
function HolyCrossCrestLogo({ size = 48 }: { size?: number }) {
  const outerR = Math.round(size * 0.28);
  const innerR = Math.round(size * 0.24);
  const svgSize = Math.round(size * 0.78);

  return (
    <div
      style={{
        width: size + "px",
        height: size + "px",
        borderRadius: outerR + "px",
        background: "linear-gradient(135deg, #fde68a 0%, #fbbf24 45%, #b45309 100%)",
        padding: "2px",
        boxShadow: "0 0 24px rgba(251, 191, 36, 0.48)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
      title="Holy Cross School, Indore — Official Crest"
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: innerR + "px",
          background: "radial-gradient(circle at 50% 25%, #1e3a8a, #020617 88%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg viewBox="0 0 64 64" width={svgSize} height={svgSize} fill="none">
          <path
            d="M32 4L8 14V30C8 46.5 18.2 57.4 32 61C45.8 57.4 56 46.5 56 30V14L32 4Z"
            stroke="#fbbf24"
            strokeWidth="2.5"
            fill="rgba(30, 58, 138, 0.48)"
          />
          <path d="M32 11V39M22 21H42" stroke="#fbbf24" strokeWidth="4.4" strokeLinecap="round" />
          <path
            d="M23 45C23 48.5 27 51 32 51C37 51 41 48.5 41 45H23Z"
            fill="#38bdf8"
            stroke="#fbbf24"
            strokeWidth="1.5"
          />
          <path d="M32 35.5C32 35.5 28.5 39.8 30 43C31 44.5 33 44.5 34 43C35.5 39.8 32 35.5 32 35.5Z" fill="#f59e0b" />
        </svg>
      </div>
    </div>
  );
}

// ============================================================================
// SECTION 9: TAB 1 — LIVING 60FPS MORPHING ORB STAGE
// ============================================================================
interface MorphOrbStageProps {
  language: LanguageCode;
  fontSize: number;
  palette: ThemePalette;
  isListening: boolean;
  onStartVoice: (cb: (spoken: string) => void) => void;
  onAsk: (q: string) => Promise<{ reply: string; source: "cloud" | "offline-backup" }>;
  onSpeak: (text: string) => void;
  onStopSpeak: () => void;
  onCopy: (text: string) => void;
  onSwitchToChat: () => void;
  externalPrompt: string;
  onClearExternal: () => void;
}

function MorphOrbStage({
  language,
  fontSize,
  palette,
  isListening,
  onStartVoice,
  onAsk,
  onSpeak,
  onStopSpeak,
  onCopy,
  onSwitchToChat,
  externalPrompt,
  onClearExternal,
}: MorphOrbStageProps) {
  const [phase, setPhase] = useState<OrbPhase>("idle");
  const [inputValue, setInputValue] = useState("");
  const [questionAsked, setQuestionAsked] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [thinkingStep, setThinkingStep] = useState("Finding solution...");
  const [shake, setShake] = useState(false);

  const runQuery = async (text: string) => {
    const clean = text.trim();
    if (!clean) {
      setShake(true);
      window.setTimeout(() => setShake(false), 300);
      return;
    }

    onStopSpeak();
    setQuestionAsked(clean);
    setInputValue("");
    setPhase("think");
    setThinkingStep(
      language === "hi"
        ? "प्रश्न समझा जा रहा है और उत्तर तैयार किया जा रहा है..."
        : "Finding solution & preparing structured answer..."
    );

    const stepTimer = window.setTimeout(() => {
      setThinkingStep(
        language === "hi"
          ? "होली क्रॉस स्कूल एआई उत्तर को अंतिम रूप दे रहा है..."
          : "Holy Cross School AI is finalizing response..."
      );
    }, 1100);

    const { reply } = await onAsk(clean);
    window.clearTimeout(stepTimer);

    setPhase("resolve");
    window.setTimeout(() => {
      setAnswerText(reply);
      setPhase("answered");
    }, 380);
  };

  useEffect(() => {
    if (externalPrompt) {
      void runQuery(externalPrompt);
      onClearExternal();
    }
  }, [externalPrompt]);

  const phaseVars: Record<OrbPhase, Record<string, string | number>> = {
    idle: {
      "--w": "680px",
      "--h": "66px",
      "--r": "999px",
      "--oGlow": 1,
      "--oHalo": 0.4,
      "--oPill": 1,
      "--oBall": 0,
      "--oGreen": 0,
      "--oCard": 0,
      "--oRing": 1,
      "--oInput": 1,
      "--inScale": 1,
      "--oAur": 1,
      "--gs": 0.55,
      "--cs": 0.94,
      "--hOp": 0,
      "--dotS": 0,
      "--bloom": 1.1,
      "--sOp": 0,
      "--sTy": 6,
      "--oCenter": 0.3,
    },
    think: {
      "--w": "106px",
      "--h": "106px",
      "--r": "999px",
      "--oGlow": 1,
      "--oHalo": 1,
      "--oPill": 0,
      "--oBall": 1,
      "--oGreen": 0,
      "--oCard": 0,
      "--oRing": 0.65,
      "--oInput": 0,
      "--inScale": 0.7,
      "--oAur": 1,
      "--gs": 0.65,
      "--cs": 0.85,
      "--hOp": 0,
      "--dotS": 0,
      "--bloom": 1.7,
      "--sOp": 1,
      "--sTy": 0,
      "--oCenter": 1,
    },
    resolve: {
      "--w": "112px",
      "--h": "112px",
      "--r": "999px",
      "--oGlow": 0.65,
      "--oHalo": 0.9,
      "--oPill": 0,
      "--oBall": 0,
      "--oGreen": 1,
      "--oCard": 0,
      "--oRing": 0,
      "--oInput": 0,
      "--inScale": 0.7,
      "--oAur": 0.4,
      "--gs": 1,
      "--cs": 0.92,
      "--hOp": 0,
      "--dotS": 1,
      "--bloom": 1.25,
      "--sOp": 1,
      "--sTy": 0,
      "--oCenter": 0.85,
    },
    answered: {
      "--w": "780px",
      "--h": "370px",
      "--r": "26px",
      "--oGlow": 0.48,
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
      "--bloom": 0.72,
      "--sOp": 0,
      "--sTy": 6,
      "--oCenter": 0.15,
    },
  };

  return (
    <div
      className="mo-root"
      data-phase={phase}
      style={makeOrbStyle(phaseVars[phase], {
        padding: "26px 16px",
        border: "1px solid " + palette.border,
        boxShadow: "0 22px 60px rgba(0, 0, 0, 0.58)",
      })}
    >
      <div className="mo-bg" />
      <div className="mo-halo" />

      {phase === "idle" && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "26px", zIndex: 6 }}>
          <div
            className="hc-orb-float"
            style={{
              position: "relative",
              width: "92px",
              height: "92px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "14px",
            }}
          >
            <div
              className="hc-orb-ring-1"
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: "2px dashed " + palette.secondary,
              }}
            />
            <div
              className="hc-orb-ring-2"
              style={{
                position: "absolute",
                inset: "9px",
                borderRadius: "50%",
                border: "2.5px solid transparent",
                borderTopColor: palette.primary,
                borderBottomColor: "#34d399",
              }}
            />
            <div
              className="hc-orb-core"
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                background: "radial-gradient(circle at 30% 28%, #fef08a, " + palette.primary + " 52%, #1d4ed8 100%)",
              }}
            />
          </div>
          <div style={{ fontSize: "21px", fontWeight: 900, color: "#f8fafc", textAlign: "center" }}>
            {language === "hi" ? "होली क्रॉस स्कूल एआई से कुछ भी पूछें" : "Ask Holy Cross School AI Anything"}
          </div>
          <div style={{ fontSize: "12.5px", color: "#94a3b8", marginTop: "5px", textAlign: "center" }}>
            {language === "hi"
              ? "स्कूल • 45 शिक्षक विवरण • NCERT पढ़ाई • व्यक्तिगत प्रश्न • आवाज़ से पूछें"
              : "School Info • All 45 Faculty Profiles • NCERT Academics • Voice Enabled"}
          </div>
        </div>
      )}

      <div className="mo-mover">
        <div
          className={"mo-actor " + (phase === "think" ? "hc-orb-float" : "")}
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

          {phase === "think" && (
            <>
              <div
                className="hc-orb-ring-1"
                style={{
                  position: "absolute",
                  inset: "-14px",
                  borderRadius: "50%",
                  border: "2.5px dashed " + palette.secondary,
                  pointerEvents: "none",
                }}
              />
              <div
                className="hc-orb-ring-2"
                style={{
                  position: "absolute",
                  inset: "-6px",
                  borderRadius: "50%",
                  border: "2.5px solid transparent",
                  borderTopColor: palette.primary,
                  borderBottomColor: "#34d399",
                  pointerEvents: "none",
                }}
              />
            </>
          )}

          <div className={"mo-ball " + (phase === "think" ? "hc-orb-core" : "")} style={{ transition: "opacity 0.32s ease" }} />
          <div className="mo-green" style={{ transition: "opacity 0.3s ease, transform 0.3s ease" }} />
          <div className="mo-card" style={{ transition: "opacity 0.38s ease, transform 0.38s ease" }} />
          <div className="mo-ring" />

          {phase === "idle" && (
            <form
              className="mo-input"
              onSubmit={(e) => {
                e.preventDefault();
                void runQuery(inputValue);
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
                placeholder={
                  language === "hi"
                    ? "अपना प्रश्न टाइप करें या माइक दबाकर बोलें..."
                    : "Type any question or tap the mic to speak..."
                }
              />
              <button
                type="button"
                onClick={() =>
                  onStartVoice((spoken) => {
                    setInputValue(spoken);
                    void runQuery(spoken);
                  })
                }
                className={"hc-btn " + (isListening ? "hc-mic-live" : "")}
                title="Speak your question"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "1px solid rgba(56, 189, 248, 0.45)",
                  background: isListening ? "#ef4444" : "rgba(30, 41, 59, 0.9)",
                  color: "#f8fafc",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontSize: "16px",
                }}
              >
                🎤
              </button>
              <button type="submit" className="mo-send hc-btn" title="Ask Holy Cross School AI">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          )}

          {phase === "answered" && (
            <div className="mo-answer" style={{ gap: "10px" }}>
              <div
                className="mo-a-head"
                style={{ justifyContent: "space-between", flexWrap: "wrap", gap: "8px", marginBottom: "4px" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span className="mo-a-dot" />
                  <span>HOLY CROSS SCHOOL AI • {questionAsked.slice(0, 42)}</span>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    type="button"
                    className="hc-btn"
                    onClick={() => onSpeak(answerText)}
                    style={{
                      background: "rgba(56, 189, 248, 0.16)",
                      color: "#38bdf8",
                      border: "1px solid rgba(56, 189, 248, 0.35)",
                      borderRadius: "8px",
                      padding: "4px 10px",
                      fontSize: "11px",
                      fontWeight: 700,
                    }}
                  >
                    🔊 Listen
                  </button>
                  <button
                    type="button"
                    className="hc-btn"
                    onClick={() => onCopy(answerText)}
                    style={{
                      background: "rgba(251, 191, 36, 0.16)",
                      color: "#fbbf24",
                      border: "1px solid rgba(251, 191, 36, 0.35)",
                      borderRadius: "8px",
                      padding: "4px 10px",
                      fontSize: "11px",
                      fontWeight: 700,
                    }}
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div style={{ flex: 1, overflowY: "auto", paddingRight: "4px" }}>
                <FormattedAnswer text={answerText} fontSize={fontSize} />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mo-status" style={{ transition: "opacity 0.25s ease" }}>
        {phase === "think" && (
          <div className="mo-lab">
            <span>{thinkingStep}</span>
            <span className="mo-dots">
              <i />
              <i />
              <i />
            </span>
          </div>
        )}
        {phase === "resolve" && (
          <div className="mo-lab mo-lab-done">
            <span>{language === "hi" ? "उत्तर तैयार है" : "SOLUTION READY"}</span>
          </div>
        )}
      </div>

      {phase === "answered" && (
        <div
          style={{
            position: "relative",
            zIndex: 9,
            marginTop: "16px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <button
            type="button"
            className="mo-reset hc-btn"
            onClick={() => {
              onStopSpeak();
              setPhase("idle");
              setAnswerText("");
            }}
          >
            ✦ Ask Another Question
          </button>
          <button
            type="button"
            className="hc-btn"
            onClick={() =>
              void runQuery(
                "Explain this simply in " + (language === "hi" ? "English" : "Hindi") + ": " + questionAsked
              )
            }
            style={{
              padding: "8px 15px",
              borderRadius: "999px",
              background: "rgba(56, 189, 248, 0.16)",
              border: "1px solid rgba(56, 189, 248, 0.38)",
              color: "#7dd3fc",
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            {language === "hi" ? "Translate to English" : "Explain in Hindi"}
          </button>
          <button
            type="button"
            className="hc-btn"
            onClick={() => void runQuery("Give a clear real-life example for: " + questionAsked)}
            style={{
              padding: "8px 15px",
              borderRadius: "999px",
              background: "rgba(52, 211, 153, 0.14)",
              border: "1px solid rgba(52, 211, 153, 0.38)",
              color: "#6ee7b7",
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            Give Example
          </button>
          <button
            type="button"
            className="hc-btn"
            onClick={onSwitchToChat}
            style={{
              padding: "8px 15px",
              borderRadius: "999px",
              background: "rgba(148, 163, 184, 0.16)",
              border: "1px solid rgba(148, 163, 184, 0.32)",
              color: "#e2e8f0",
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            Open Full Chat Feed →
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// SECTION 10: MAIN HOLY CROSS SCHOOL AI PORTAL
// ============================================================================
export default function App() {
  // ---------------- AUTH & PASSWORD STATE ----------------
  const [user, setUser] = useState<UserProfile | null>(() => loadJSON<UserProfile | null>("hcs_user_v4", null));
  const [authMode, setAuthMode] = useState<"signin" | "register">("signin");
  const [loginName, setLoginName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginRole, setLoginRole] = useState<UserRole>("Student");
  const [loginError, setLoginError] = useState("");
  const [videoFailed, setVideoFailed] = useState(false);

  // ---------------- GLOBAL PORTAL SETTINGS ----------------
  const [activeTab, setActiveTab] = useState<ActiveTab>("orb");
  const [accentTheme, setAccentTheme] = useState<AccentTheme>("royal");
  const [language, setLanguage] = useState<LanguageCode>(() =>
    localStorage.getItem("hcs_lang_v4") === "hi" ? "hi" : "en"
  );
  const [voiceAutoSpeak, setVoiceAutoSpeak] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [fontComfort, setFontComfort] = useState<FontComfort>("normal");
  const [schoolBg, setSchoolBg] = useState<string>(
    () => localStorage.getItem("hcs_school_bg_v4") || SCHOOL_CONFIG.defaultBgPhoto
  );
  const [sessionCount, setSessionCount] = useState<number>(() =>
    Number(localStorage.getItem("hcs_session_q_count_v4") || "0")
  );
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // ---------------- ORB & CHAT STATE ----------------
  const [topicCategory, setTopicCategory] = useState<string>("Exhibition");
  const [externalOrbPrompt, setExternalOrbPrompt] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() =>
    loadJSON<ChatMessage[]>("hcs_chat_thread_v4", [WELCOME_CHAT_MESSAGE])
  );
  const [chatInput, setChatInput] = useState<string>("");
  const [chatLoading, setChatLoading] = useState<boolean>(false);
  const [chatThinkingStage, setChatThinkingStage] = useState<string>("Finding solution...");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // ---------------- FACULTY DIRECTORY STATE ----------------
  const [dirSearch, setDirSearch] = useState<string>("");
  const [dirCategory, setDirCategory] = useState<string>("All");
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(null);

  // ---------------- EXHIBITION QUIZ & NCERT FORMULAS ----------------
  const [formulaSubject, setFormulaSubject] = useState<string>("All");
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizSelected, setQuizSelected] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);

  // ---------------- HISTORY & BOOKMARKS ----------------
  const [history, setHistory] = useState<HistoryEntry[]>(() => loadJSON<HistoryEntry[]>("hcs_history_v4", []));
  const [historyFilter, setHistoryFilter] = useState<"all" | "bookmarked">("all");
  const [historySearch, setHistorySearch] = useState<string>("");

  // ---------------- CRICKET LIVE SCOREBOARD ----------------
  const [matchState, setMatchState] = useState<CricketMatchState>(() =>
    loadJSON<CricketMatchState>("hcs_cricket_v4", {
      teamA: "IND",
      teamB: "AUS",
      runs: 156,
      wickets: 2,
      balls: 90,
      target: 185,
      timeline: [
        { label: "1", runs: 1, isWicket: false, isLegal: true },
        { label: "4", runs: 4, isWicket: false, isLegal: true },
        { label: "0", runs: 0, isWicket: false, isLegal: true },
        { label: "6", runs: 6, isWicket: false, isLegal: true },
      ],
    })
  );

  const palette = ACCENT_THEMES[accentTheme];

  useEffect(() => {
    try {
      localStorage.setItem("hcs_lang_v4", language);
    } catch {
      // ignore storage limits
    }
  }, [language]);

  useEffect(() => {
    try {
      localStorage.setItem("hcs_chat_thread_v4", JSON.stringify(chatMessages.slice(-40)));
    } catch {
      // ignore storage limits
    }
  }, [chatMessages]);

  useEffect(() => {
    try {
      localStorage.setItem("hcs_cricket_v4", JSON.stringify(matchState));
    } catch {
      // ignore storage limits
    }
  }, [matchState]);

  useEffect(() => {
    if (activeTab === "chat" && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, chatLoading, activeTab]);

  // ---------------- TOAST HELPER ----------------
  const showToast = (text: string, type: "info" | "success" | "warn" = "info") => {
    const id = Date.now();
    setToast({ id, text, type });
    window.setTimeout(() => {
      setToast((prev) => (prev && prev.id === id ? null : prev));
    }, 3000);
  };

  // ---------------- SPEECH SYNTHESIS (READ ALOUD) ----------------
  const stopSpeaking = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  const speakText = (rawText: string, overrideLang?: LanguageCode) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      showToast("Read Aloud is not supported in this browser.", "warn");
      return;
    }
    window.speechSynthesis.cancel();
    const clean = rawText
      .replace(/[*#_>•]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (!clean) return;

    const targetLang = overrideLang || language;
    const utterance = new SpeechSynthesisUtterance(clean);
    const hasDevanagari = /[\u0900-\u097F]/.test(clean);
    utterance.lang = hasDevanagari || targetLang === "hi" ? "hi-IN" : "en-IN";
    utterance.rate = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find((v) =>
      hasDevanagari || targetLang === "hi"
        ? v.lang.toLowerCase().includes("hi")
        : v.lang.toLowerCase().includes("en-in") || v.lang.toLowerCase().includes("en")
    );
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // ---------------- SPEECH RECOGNITION (MIC INPUT) ----------------
  const startVoiceInput = (onTranscript: (spokenText: string) => void) => {
    if (typeof window === "undefined") return;
    const win = window as unknown as WindowWithSpeech;
    const SpeechRec = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRec) {
      showToast("Voice Mic works best in Chrome, Edge, or Android Chrome.", "warn");
      return;
    }

    try {
      stopSpeaking();
      const recognition = new SpeechRec();
      recognition.lang = language === "hi" ? "hi-IN" : "en-IN";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        showToast(language === "hi" ? "सुन रहा हूँ... अपना प्रश्न बोलें" : "Listening... speak your question now", "info");
      };
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => {
        setIsListening(false);
        showToast("Could not capture audio. Please allow microphone permission.", "warn");
      };
      recognition.onresult = (event) => {
        const transcript = event.results?.[0]?.[0]?.transcript?.trim();
        if (transcript) onTranscript(transcript);
      };

      recognition.start();
    } catch {
      setIsListening(false);
      showToast("Microphone could not start. Please try again.", "warn");
    }
  };

  // ---------------- COPY & BOOKMARKS ----------------
  const handleCopy = (text: string) => {
    if (navigator.clipboard) {
      void navigator.clipboard
        .writeText(text.replace(/\*\*/g, ""))
        .then(() => showToast("Copied to clipboard!", "success"))
        .catch(() => showToast("Copy unavailable on this browser.", "warn"));
    } else {
      showToast("Copy unavailable on this browser.", "warn");
    }
  };

  const recordInteraction = (question: string, answer: string, source: "cloud" | "offline-backup") => {
    const stamp = new Date().toLocaleString([], {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });

    const entry: HistoryEntry = {
      id: Date.now() + "-" + Math.random().toString(36).slice(2, 7),
      question,
      answer,
      timestamp: stamp,
      language,
      bookmarked: false,
      source,
    };

    setHistory((prev) => {
      const next = [entry, ...prev].slice(0, 60);
      try {
        localStorage.setItem("hcs_history_v4", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });

    setSessionCount((prev) => {
      const next = prev + 1;
      try {
        localStorage.setItem("hcs_session_q_count_v4", String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const toggleHistoryBookmark = (id: string) => {
    setHistory((prev) => {
      const next = prev.map((item) => (item.id === id ? { ...item, bookmarked: !item.bookmarked } : item));
      try {
        localStorage.setItem("hcs_history_v4", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const toggleChatBookmark = (msg: ChatMessage) => {
    setChatMessages((prev) =>
      prev.map((m) => (m.id === msg.id ? { ...m, bookmarked: !m.bookmarked } : m))
    );
    showToast(msg.bookmarked ? "Removed from pinned notes." : "Answer pinned!", "success");
  };

  // ---------------- CORE AI REQUEST ENGINE (/api/chat + OFFLINE FAILSAFE) ----------------
  const executeAIQuery = async (
    questionText: string,
    overrideLang?: LanguageCode
  ): Promise<{ reply: string; source: "cloud" | "offline-backup" }> => {
    const activeLang = overrideLang || language;
    const cleanQ = questionText.trim();

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: cleanQ,
          user,
          language: activeLang,
        }),
      });

      const data = (await response.json()) as { reply?: string; error?: string };
      if (response.ok && data?.reply) {
        const replyText = String(data.reply)
          .replace(/Sister Liza Joseph/gi, "Sr. Liasa Joseph")
          .replace(/Sr\.?\s*Liza Joseph/gi, "Sr. Liasa Joseph")
          .replace(/\bJARVIS\b/gi, "Holy Cross School AI");

        recordInteraction(cleanQ, replyText, "cloud");
        if (voiceAutoSpeak) speakText(replyText, activeLang);
        return { reply: replyText, source: "cloud" };
      }

      throw new Error(data?.error || "Cloud AI temporarily busy.");
    } catch {
      const offlineReply = getOfflineBackupAnswer(cleanQ, activeLang, user);
      if (offlineReply) {
        recordInteraction(cleanQ, offlineReply, "offline-backup");
        if (voiceAutoSpeak) speakText(offlineReply, activeLang);
        return { reply: offlineReply, source: "offline-backup" };
      }

      const gracefulFallback =
        activeLang === "hi"
          ? "**कनेक्शन नोटिस:** अभी सर्वर व्यस्त है या इंटरनेट धीमा है। कृपया 2 सेकंड बाद पुनः प्रयास करें—या हमारे **45 शिक्षकों की डायरेक्टरी** और **NCERT फॉर्मूला वॉल्ट** का उपयोग करें, जो बिना इंटरनेट भी काम करते हैं।"
          : "**Connection Notice:** The cloud AI server is momentarily busy or offline. Please retry in a moment—or explore our **Faculty Directory (45 detailed bios)**, **Interactive Exhibition Quiz**, and **NCERT Formula Vault**, which work 100% offline!";
      return { reply: gracefulFallback, source: "offline-backup" };
    }
  };

  // ---------------- FULL CHAT SUBMISSION ----------------
  const handleSendChat = async (customText?: string, overrideLang?: LanguageCode) => {
    const textToSend = (customText ?? chatInput).trim();
    if (!textToSend || chatLoading) return;

    stopSpeaking();
    const activeLang = overrideLang || language;
    const stamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg: ChatMessage = {
      id: "u-" + Date.now(),
      sender: "user",
      text: textToSend,
      timestamp: stamp,
      language: activeLang,
    };

    setChatMessages((prev) => [...prev, userMsg]);
    if (!customText) setChatInput("");
    setChatLoading(true);
    setChatThinkingStage(
      activeLang === "hi"
        ? "समाधान खोजा जा रहा है..."
        : "Finding solution & structuring explanation..."
    );

    const t1 = window.setTimeout(() => {
      setChatThinkingStage(
        activeLang === "hi"
          ? "होली क्रॉस स्कूल एआई सटीक उत्तर लिख रहा है..."
          : "Thinking deeply & verifying school/academic details..."
      );
    }, 1000);

    const { reply, source } = await executeAIQuery(textToSend, overrideLang);
    window.clearTimeout(t1);

    const aiMsg: ChatMessage = {
      id: "a-" + Date.now(),
      sender: "ai",
      text: reply,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      language: activeLang,
      questionRef: textToSend,
      bookmarked: false,
      source,
    };

    setChatMessages((prev) => [...prev, aiMsg]);
    setChatLoading(false);
  };

  const handleOrbAsk = async (q: string) => {
    const result = await executeAIQuery(q);
    const stamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setChatMessages((prev) => [
      ...prev,
      { id: "ou-" + Date.now(), sender: "user", text: q, timestamp: stamp, language },
      {
        id: "oa-" + (Date.now() + 1),
        sender: "ai",
        text: result.reply,
        timestamp: stamp,
        language,
        questionRef: q,
        bookmarked: false,
        source: result.source,
      },
    ]);
    return result;
  };

  // ---------------- PASSWORD LOGIN & REGISTRATION ----------------
  const handleAuthSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cleanEmail = loginEmail.trim().toLowerCase();
    const cleanPass = loginPassword.trim();
    const cleanName = loginName.trim();

    if (!cleanEmail || !cleanEmail.includes("@") || !cleanEmail.includes(".")) {
      setLoginError("Please enter a valid email address (e.g., student@gmail.com).");
      return;
    }
    if (cleanPass.length < 4) {
      setLoginError("Password must be at least 4 characters long.");
      return;
    }

    const accounts = loadJSON<StoredAccount[]>("hcs_accounts_v4", []);
    const existing = accounts.find((a) => a.email === cleanEmail);

    if (authMode === "register") {
      if (!cleanName) {
        setLoginError("Please enter your full name to create an account.");
        return;
      }
      const updatedAccounts = existing
        ? accounts.map((a) =>
            a.email === cleanEmail ? { ...a, name: cleanName, password: cleanPass, role: loginRole } : a
          )
        : [
            ...accounts,
            {
              name: cleanName,
              email: cleanEmail,
              password: cleanPass,
              role: loginRole,
              createdAt: new Date().toLocaleDateString(),
            },
          ];
      localStorage.setItem("hcs_accounts_v4", JSON.stringify(updatedAccounts));
      const profile: UserProfile = {
        name: cleanName,
        email: cleanEmail,
        role: loginRole,
        joinedAt: new Date().toLocaleDateString(),
      };
      setUser(profile);
      localStorage.setItem("hcs_user_v4", JSON.stringify(profile));
      setLoginError("");
      showToast("Welcome to Holy Cross School AI, " + cleanName + "!", "success");
      return;
    }

    if (existing) {
      if (existing.password !== cleanPass) {
        setLoginError("Incorrect password for this email. Try again or use 1-Click Visitor Pass.");
        return;
      }
      const profile: UserProfile = {
        name: existing.name,
        email: existing.email,
        role: existing.role,
        joinedAt: existing.createdAt,
      };
      setUser(profile);
      localStorage.setItem("hcs_user_v4", JSON.stringify(profile));
      setLoginError("");
      showToast("Welcome back, " + existing.name + "!", "success");
    } else {
      const baseName = cleanName || cleanEmail.split("@")[0].replace(/[._-]/g, " ");
      const capitalized = baseName.charAt(0).toUpperCase() + baseName.slice(1);
      const newAcc: StoredAccount = {
        name: capitalized,
        email: cleanEmail,
        password: cleanPass,
        role: loginRole,
        createdAt: new Date().toLocaleDateString(),
      };
      localStorage.setItem("hcs_accounts_v4", JSON.stringify([...accounts, newAcc]));
      const profile: UserProfile = {
        name: capitalized,
        email: cleanEmail,
        role: loginRole,
        joinedAt: newAcc.createdAt,
      };
      setUser(profile);
      localStorage.setItem("hcs_user_v4", JSON.stringify(profile));
      setLoginError("");
      showToast("Signed in as " + capitalized + "!", "success");
    }
  };

  const handleGuestPass = () => {
    const guest: UserProfile = {
      name: "Exhibition Visitor",
      email: "visitor@hcsindore.ac.in",
      role: "Exhibition Visitor",
      joinedAt: new Date().toLocaleDateString(),
      isGuest: true,
    };
    setUser(guest);
    localStorage.setItem("hcs_user_v4", JSON.stringify(guest));
    showToast("Welcome to the Holy Cross School AI Exhibition Portal!", "success");
  };

  const handleLogout = () => {
    stopSpeaking();
    localStorage.removeItem("hcs_user_v4");
    setUser(null);
    setLoginPassword("");
    setLoginError("");
  };

  const handleBgUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      setSchoolBg(result);
      try {
        localStorage.setItem("hcs_school_bg_v4", result);
      } catch {
        // Large images stay active for current session
      }
      showToast("School background photo updated!", "success");
    };
    reader.readAsDataURL(file);
  };

  // ---------------- CRICKET ACTIONS ----------------
  const recordBall = (label: string, addRuns: number, isWicket = false, isLegal = true) => {
    setMatchState((prev) => ({
      ...prev,
      runs: Math.max(0, prev.runs + addRuns),
      wickets: Math.min(10, prev.wickets + (isWicket ? 1 : 0)),
      balls: prev.balls + (isLegal ? 1 : 0),
      timeline: [...prev.timeline, { label, runs: addRuns, isWicket, isLegal }].slice(-18),
    }));
  };

  const undoLastBall = () => {
    setMatchState((prev) => {
      if (prev.timeline.length === 0) return prev;
      const last = prev.timeline[prev.timeline.length - 1];
      return {
        ...prev,
        runs: Math.max(0, prev.runs - last.runs),
        wickets: Math.max(0, prev.wickets - (last.isWicket ? 1 : 0)),
        balls: Math.max(0, prev.balls - (last.isLegal ? 1 : 0)),
        timeline: prev.timeline.slice(0, -1),
      };
    });
  };

  // ---------------- QUIZ HANDLERS ----------------
  const currentQuiz = EXHIBITION_QUIZ[quizIndex] || EXHIBITION_QUIZ[0];
  const handleSelectQuizOption = (idx: number) => {
    if (quizSelected !== null) return;
    setQuizSelected(idx);
    if (idx === currentQuiz.correctIndex) {
      setQuizScore((prev) => prev + 1);
      showToast("Correct Answer!", "success");
    } else {
      showToast("See the explanation below.", "info");
    }
  };

  const handleNextQuiz = () => {
    if (quizIndex + 1 < EXHIBITION_QUIZ.length) {
      setQuizIndex((prev) => prev + 1);
      setQuizSelected(null);
    } else {
      setQuizIndex(0);
      setQuizSelected(null);
      setQuizScore(0);
      showToast("Quiz restarted!", "info");
    }
  };

  // ---------------- DERIVED VALUES ----------------
  const fontSizePx = fontComfort === "large" ? 16.5 : 14.5;
  const oversFormatted = Math.floor(matchState.balls / 6) + "." + (matchState.balls % 6);
  const currentRR = matchState.balls > 0 ? ((matchState.runs / matchState.balls) * 6).toFixed(2) : "0.00";
  const runsNeeded = Math.max(0, matchState.target - matchState.runs);
  const ballsRemaining = Math.max(0, 120 - matchState.balls);
  const requiredRR = ballsRemaining > 0 && runsNeeded > 0 ? ((runsNeeded / ballsRemaining) * 6).toFixed(2) : "0.00";

  const facultyCategories = useMemo(
    () => ["All", ...Array.from(new Set(FACULTY_DATA.map((f) => f.category)))],
    []
  );

  const filteredFaculty = useMemo(() => {
    const s = dirSearch.toLowerCase().trim();
    return FACULTY_DATA.filter((f) => {
      const matchText =
        !s ||
        f.name.toLowerCase().includes(s) ||
        f.role.toLowerCase().includes(s) ||
        f.category.toLowerCase().includes(s) ||
        f.description.toLowerCase().includes(s) ||
        f.specialties.some((sp) => sp.toLowerCase().includes(s));
      const matchCat = dirCategory === "All" || f.category === dirCategory;
      return matchText && matchCat;
    });
  }, [dirSearch, dirCategory]);

  const filteredFormulas = useMemo(() => {
    if (formulaSubject === "All") return NCERT_FORMULAS;
    return NCERT_FORMULAS.filter((f) => f.subject === formulaSubject);
  }, [formulaSubject]);

  const filteredHistory = useMemo(() => {
    const s = historySearch.toLowerCase().trim();
    return history.filter((item) => {
      if (historyFilter === "bookmarked" && !item.bookmarked) return false;
      if (!s) return true;
      return item.question.toLowerCase().includes(s) || item.answer.toLowerCase().includes(s);
    });
  }, [history, historyFilter, historySearch]);

  const bookmarkedCount = useMemo(() => history.filter((h) => h.bookmarked).length, [history]);
  const activePromptList = RECOMMENDED_PROMPTS[topicCategory]?.[language] || RECOMMENDED_PROMPTS.Exhibition.en;

  const bgImageStyle: CSSProperties = {
    backgroundImage:
      "linear-gradient(180deg, rgba(2, 6, 23, 0.78) 0%, rgba(2, 6, 23, 0.94) 100%), url(" + schoolBg + ")",
  };

  // ==========================================================================
  // VIEW 1: OFFICIAL ENTRY & PASSWORD LOGIN SCREEN
  // ==========================================================================
  if (!user) {
    return (
      <div
        className="hc-desktop-shell"
        style={{
          ...bgImageStyle,
          alignItems: "center",
          justifyContent: "center",
          padding: "28px 18px",
          paddingBottom: "28px",
          overflow: "hidden",
        }}
      >
        <style>{PORTAL_STYLES}</style>

        {!videoFailed && (
          <video
            autoPlay
            muted
            loop
            playsInline
            onError={() => setVideoFailed(true)}
            style={{
              position: "fixed",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.28,
              pointerEvents: "none",
              zIndex: 0,
            }}
          >
            <source src={SCHOOL_CONFIG.defaultIntroVideo} type="video/mp4" />
          </video>
        )}

        <div
          className="hc-glass-panel hc-fade-up"
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: "960px",
            borderRadius: "30px",
            padding: "34px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(295px, 1fr))",
            gap: "32px",
            alignItems: "center",
          }}
        >
          {/* LEFT BRANDING COLUMN */}
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <HolyCrossCrestLogo size={74} />
              <div>
                <div style={{ fontSize: "11px", fontWeight: 900, letterSpacing: "1.4px", color: "#38bdf8", textTransform: "uppercase" }}>
                  Official School Exhibition Portal
                </div>
                <h1
                  style={{
                    margin: "4px 0 0",
                    fontSize: "27px",
                    fontWeight: 900,
                    lineHeight: 1.15,
                    background: "linear-gradient(135deg, #fef08a, #fbbf24, #38bdf8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {SCHOOL_CONFIG.brandName}
                </h1>
              </div>
            </div>

            <div
              style={{
                background: "rgba(15, 23, 42, 0.75)",
                border: "1px solid rgba(251, 191, 36, 0.3)",
                borderRadius: "18px",
                padding: "18px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <div style={{ fontSize: "14.5px", fontWeight: 800, color: "#fbbf24" }}>{SCHOOL_CONFIG.schoolFullName}</div>
              <div style={{ fontSize: "13px", color: "#cbd5e1", lineHeight: 1.55 }}>
                <strong>Motto:</strong> "{SCHOOL_CONFIG.motto}" • <strong>Principal:</strong> {SCHOOL_CONFIG.principal}
              </div>
              <div style={{ fontSize: "12px", color: "#94a3b8" }}>{SCHOOL_CONFIG.board}</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {[
                { title: "Dual AI Modes", desc: "60FPS MorphOrb + Full Chat" },
                { title: "Voice & Hindi", desc: "Mic Input + Read Aloud" },
                { title: "45 Faculty Bios", desc: "Complete School Directory" },
                { title: "NCERT & Quiz Hub", desc: "Formulas + Live Scoreboard" },
              ].map((feat) => (
                <div
                  key={feat.title}
                  style={{
                    background: "rgba(2, 6, 23, 0.72)",
                    border: "1px solid rgba(56, 189, 248, 0.22)",
                    borderRadius: "14px",
                    padding: "12px",
                  }}
                >
                  <div style={{ fontSize: "12.5px", fontWeight: 800, color: "#38bdf8" }}>{feat.title}</div>
                  <div style={{ fontSize: "11.5px", color: "#94a3b8", marginTop: "3px" }}>{feat.desc}</div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: "11.5px", color: "#64748b" }}>
              Architected by <strong style={{ color: "#cbd5e1" }}>{SCHOOL_CONFIG.architect}</strong> • Mentored by{" "}
              <strong style={{ color: "#cbd5e1" }}>{SCHOOL_CONFIG.mentor}</strong>
            </div>
          </div>

          {/* RIGHT PASSWORD LOGIN CARD */}
          <div
            style={{
              background: "rgba(2, 6, 23, 0.82)",
              border: "1px solid rgba(56, 189, 248, 0.3)",
              borderRadius: "24px",
              padding: "26px 24px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px",
                background: "rgba(15, 23, 42, 0.92)",
                padding: "5px",
                borderRadius: "14px",
                marginBottom: "20px",
              }}
            >
              <button
                type="button"
                className="hc-btn"
                onClick={() => {
                  setAuthMode("signin");
                  setLoginError("");
                }}
                style={{
                  padding: "9px",
                  borderRadius: "10px",
                  border: "none",
                  fontWeight: 800,
                  fontSize: "13px",
                  background: authMode === "signin" ? "linear-gradient(135deg, #fbbf24, #f59e0b)" : "transparent",
                  color: authMode === "signin" ? "#020617" : "#94a3b8",
                }}
              >
                Sign In
              </button>
              <button
                type="button"
                className="hc-btn"
                onClick={() => {
                  setAuthMode("register");
                  setLoginError("");
                }}
                style={{
                  padding: "9px",
                  borderRadius: "10px",
                  border: "none",
                  fontWeight: 800,
                  fontSize: "13px",
                  background: authMode === "register" ? "linear-gradient(135deg, #38bdf8, #2563eb)" : "transparent",
                  color: authMode === "register" ? "#fff" : "#94a3b8",
                }}
              >
                Create Account
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 700, color: "#cbd5e1", display: "block", marginBottom: "6px" }}>
                  Full Name {authMode === "signin" ? "(Optional if returning)" : "*"}
                </label>
                <input
                  type="text"
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                  placeholder="Enter your full name"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: "1px solid rgba(56, 189, 248, 0.35)",
                    background: "rgba(15, 23, 42, 0.92)",
                    color: "#f8fafc",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: 700, color: "#cbd5e1", display: "block", marginBottom: "6px" }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="student@gmail.com"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: "1px solid rgba(56, 189, 248, 0.35)",
                    background: "rgba(15, 23, 42, 0.92)",
                    color: "#f8fafc",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: 700, color: "#cbd5e1", display: "block", marginBottom: "6px" }}>
                  Password *
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter password (min. 4 chars)"
                    style={{
                      width: "100%",
                      padding: "12px 62px 12px 14px",
                      borderRadius: "12px",
                      border: "1px solid rgba(56, 189, 248, 0.35)",
                      background: "rgba(15, 23, 42, 0.92)",
                      color: "#f8fafc",
                      fontSize: "14px",
                      outline: "none",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "transparent",
                      border: "none",
                      color: "#38bdf8",
                      fontSize: "11.5px",
                      fontWeight: 800,
                      cursor: "pointer",
                    }}
                  >
                    {showPassword ? "HIDE" : "SHOW"}
                  </button>
                </div>
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: 700, color: "#cbd5e1", display: "block", marginBottom: "6px" }}>
                  Portal Role
                </label>
                <select
                  value={loginRole}
                  onChange={(e) => setLoginRole(e.target.value as UserRole)}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: "1px solid rgba(56, 189, 248, 0.35)",
                    background: "#0f172a",
                    color: "#f8fafc",
                    fontSize: "14px",
                    outline: "none",
                  }}
                >
                  <option value="Student">Student</option>
                  <option value="Parent">Parent</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Exhibition Visitor">Exhibition Visitor / Judge</option>
                </select>
              </div>

              {loginError && (
                <div
                  style={{
                    fontSize: "12.5px",
                    color: "#fca5a5",
                    background: "rgba(239, 68, 68, 0.14)",
                    border: "1px solid rgba(239, 68, 68, 0.35)",
                    borderRadius: "10px",
                    padding: "8px 12px",
                  }}
                >
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="hc-btn"
                style={{
                  marginTop: "4px",
                  padding: "13px",
                  borderRadius: "14px",
                  border: "none",
                  background: "linear-gradient(135deg, #38bdf8, #2563eb)",
                  color: "#fff",
                  fontWeight: 900,
                  fontSize: "14.5px",
                  boxShadow: "0 10px 24px rgba(37, 99, 235, 0.42)",
                }}
              >
                {authMode === "signin" ? "Enter Official Portal →" : "Register & Enter Portal →"}
              </button>

              <button
                type="button"
                onClick={handleGuestPass}
                className="hc-btn"
                style={{
                  padding: "12px",
                  borderRadius: "14px",
                  border: "1px solid rgba(251, 191, 36, 0.48)",
                  background: "rgba(251, 191, 36, 0.14)",
                  color: "#fde68a",
                  fontWeight: 800,
                  fontSize: "13px",
                }}
              >
                ✦ 1-Click Exhibition Visitor Pass
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // VIEW 2: MAIN HOLY CROSS SCHOOL AI PORTAL
  // ==========================================================================
  return (
    <div className="hc-desktop-shell" style={bgImageStyle}>
      <style>{PORTAL_STYLES}</style>

      {toast && (
        <div
          className="hc-fade-up"
          style={{
            position: "fixed",
            top: "84px",
            right: "20px",
            zIndex: 70,
            padding: "11px 18px",
            borderRadius: "14px",
            fontSize: "13px",
            fontWeight: 700,
            color: "#f8fafc",
            background:
              toast.type === "success"
                ? "rgba(5, 150, 105, 0.94)"
                : toast.type === "warn"
                ? "rgba(217, 119, 6, 0.94)"
                : "rgba(15, 23, 42, 0.95)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 12px 30px rgba(0, 0, 0, 0.55)",
          }}
        >
          {toast.text}
        </div>
      )}

      {/* TOP EXECUTIVE HEADER */}
      <header
        className="hc-glass-panel"
        style={{
          padding: "14px 22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "14px",
          position: "sticky",
          top: 0,
          zIndex: 35,
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
                letterSpacing: "0.7px",
                background: "linear-gradient(135deg, #fef08a, " + palette.primary + ", " + palette.secondary + ")",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {SCHOOL_CONFIG.brandName}
            </div>
            <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "2px" }}>
              {user.name} ({user.role}) • {SCHOOL_CONFIG.schoolFullName}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <button
            type="button"
            className="hc-btn"
            onClick={() => {
              const next: LanguageCode = language === "en" ? "hi" : "en";
              setLanguage(next);
              showToast(next === "hi" ? "भाषा हिंदी में बदल गई है" : "Switched to English Mode", "info");
            }}
            style={{
              background: language === "hi" ? "rgba(251, 191, 36, 0.22)" : "rgba(56, 189, 248, 0.16)",
              color: language === "hi" ? "#fde68a" : "#7dd3fc",
              border: "1px solid " + (language === "hi" ? "rgba(251, 191, 36, 0.5)" : "rgba(56, 189, 248, 0.4)"),
              borderRadius: "999px",
              padding: "8px 14px",
              fontSize: "12px",
              fontWeight: 800,
            }}
          >
            {language === "en" ? "🌐 EN → हिंदी" : "🌐 हिंदी → EN"}
          </button>

          <button
            type="button"
            className="hc-btn"
            onClick={() => {
              const next = !voiceAutoSpeak;
              setVoiceAutoSpeak(next);
              if (!next) stopSpeaking();
              showToast(next ? "Auto Read Aloud enabled" : "Auto Read Aloud muted", "info");
            }}
            style={{
              background: voiceAutoSpeak ? "rgba(52, 211, 153, 0.2)" : "rgba(148, 163, 184, 0.14)",
              color: voiceAutoSpeak ? "#6ee7b7" : "#cbd5e1",
              border: "1px solid " + (voiceAutoSpeak ? "rgba(52, 211, 153, 0.45)" : "rgba(148, 163, 184, 0.3)"),
              borderRadius: "999px",
              padding: "8px 14px",
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            {voiceAutoSpeak ? "🔊 Auto-Voice: ON" : "🔇 Auto-Voice: OFF"}
          </button>

          {isSpeaking && (
            <button
              type="button"
              className="hc-btn"
              onClick={stopSpeaking}
              style={{
                background: "#ef4444",
                color: "#fff",
                border: "none",
                borderRadius: "999px",
                padding: "8px 14px",
                fontSize: "12px",
                fontWeight: 800,
              }}
            >
              ■ Stop Audio
            </button>
          )}

          <button
            type="button"
            className="hc-btn"
            onClick={() => {
              const order: AccentTheme[] = ["royal", "cyber", "emerald"];
              const next = order[(order.indexOf(accentTheme) + 1) % order.length];
              setAccentTheme(next);
              showToast("Theme: " + ACCENT_THEMES[next].name, "info");
            }}
            style={{
              background: "rgba(148, 163, 184, 0.14)",
              color: palette.primary,
              border: "1px solid " + palette.border,
              borderRadius: "999px",
              padding: "8px 13px",
              fontSize: "12px",
              fontWeight: 800,
            }}
          >
            🎨 {palette.name}
          </button>

          <button
            type="button"
            className="hc-btn"
            onClick={() => setFontComfort(fontComfort === "normal" ? "large" : "normal")}
            style={{
              background: "rgba(148, 163, 184, 0.14)",
              color: "#e2e8f0",
              border: "1px solid rgba(148, 163, 184, 0.3)",
              borderRadius: "999px",
              padding: "8px 13px",
              fontSize: "12px",
              fontWeight: 800,
            }}
          >
            {fontComfort === "normal" ? "Text: A" : "Text: A+"}
          </button>

          <label
            className="hc-btn"
            style={{
              background: "rgba(148, 163, 184, 0.14)",
              color: "#e2e8f0",
              border: "1px solid rgba(148, 163, 184, 0.3)",
              borderRadius: "999px",
              padding: "8px 14px",
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            🖼 Set BG
            <input type="file" accept="image/*" onChange={handleBgUpload} style={{ display: "none" }} />
          </label>

          <button
            type="button"
            className="hc-btn"
            onClick={handleLogout}
            style={{
              background: "rgba(239, 68, 68, 0.18)",
              color: "#fca5a5",
              border: "1px solid rgba(239, 68, 68, 0.4)",
              borderRadius: "999px",
              padding: "8px 14px",
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* MAIN WORKSPACE */}
      <main style={{ maxWidth: "1300px", width: "100%", margin: "0 auto", padding: "24px 18px", flex: 1 }}>
        {/* TAB 1: MORPHING ORB AI */}
        {activeTab === "orb" && (
          <div className="hc-desktop-grid hc-fade-up">
            <aside style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div className="hc-glass-panel" style={{ borderRadius: "24px", padding: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ fontSize: "14px", fontWeight: 900, color: palette.primary }}>
                    {language === "hi" ? "सुझाए गए प्रश्न" : "Quick Exhibition Prompts"}
                  </span>
                  <span style={{ fontSize: "11px", color: palette.secondary, fontWeight: 700 }}>Tap to Ask</span>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "14px" }}>
                  {Object.keys(RECOMMENDED_PROMPTS).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      className="hc-btn"
                      onClick={() => setTopicCategory(cat)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "999px",
                        border: "none",
                        fontSize: "11.5px",
                        fontWeight: 800,
                        background: topicCategory === cat ? palette.primary : "#1e293b",
                        color: topicCategory === cat ? "#020617" : "#cbd5e1",
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {activePromptList.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      className="hc-btn"
                      onClick={() => setExternalOrbPrompt(prompt)}
                      style={{
                        textAlign: "left",
                        background: "rgba(15, 23, 42, 0.88)",
                        color: "#e2e8f0",
                        border: "1px solid rgba(56, 189, 248, 0.28)",
                        borderRadius: "13px",
                        padding: "11px 14px",
                        fontSize: "12.5px",
                        lineHeight: 1.45,
                      }}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="hc-glass-panel" style={{ borderRadius: "24px", padding: "20px" }}>
                <div style={{ fontSize: "14px", fontWeight: 900, color: palette.secondary, marginBottom: "12px" }}>
                  Official School & Media Links
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  {[
                    { label: "School Web", url: SCHOOL_CONFIG.links.schoolWebsite, bg: "#2563eb" },
                    { label: "YouTube", url: SCHOOL_CONFIG.links.youtube, bg: "#dc2626" },
                    { label: "Instagram", url: SCHOOL_CONFIG.links.instagram, bg: "linear-gradient(135deg, #ec4899, #f59e0b)" },
                    { label: "Campus Map", url: SCHOOL_CONFIG.links.googleMaps, bg: "#059669" },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="hc-btn"
                      style={{
                        textDecoration: "none",
                        textAlign: "center",
                        color: "#fff",
                        background: item.bg,
                        padding: "10px 12px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        fontWeight: 800,
                      }}
                    >
                      {item.label} ↗
                    </a>
                  ))}
                </div>
              </div>
            </aside>

            <section style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <MorphOrbStage
                language={language}
                fontSize={fontSizePx}
                palette={palette}
                isListening={isListening}
                onStartVoice={startVoiceInput}
                onAsk={handleOrbAsk}
                onSpeak={(t) => speakText(t)}
                onStopSpeak={stopSpeaking}
                onCopy={handleCopy}
                onSwitchToChat={() => setActiveTab("chat")}
                externalPrompt={externalOrbPrompt}
                onClearExternal={() => setExternalOrbPrompt("")}
              />

              <div
                className="hc-glass-panel"
                style={{
                  borderRadius: "22px",
                  padding: "18px 22px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "14px",
                }}
              >
                <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                  <div>
                    <div style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase" }}>
                      Questions Answered
                    </div>
                    <div style={{ fontSize: "20px", fontWeight: 900, color: palette.primary }}>{sessionCount}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase" }}>
                      Faculty Profiles
                    </div>
                    <div style={{ fontSize: "20px", fontWeight: 900, color: palette.secondary }}>{FACULTY_DATA.length}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase" }}>
                      Active Mode
                    </div>
                    <div style={{ fontSize: "15px", fontWeight: 800, color: "#34d399", marginTop: "4px" }}>
                      {language === "hi" ? "हिंदी + वॉइस" : "English + Voice"}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="hc-btn"
                  onClick={() => setActiveTab("chat")}
                  style={{
                    padding: "10px 18px",
                    borderRadius: "12px",
                    border: "1px solid rgba(56, 189, 248, 0.45)",
                    background: "rgba(56, 189, 248, 0.16)",
                    color: "#7dd3fc",
                    fontSize: "12.5px",
                    fontWeight: 800,
                  }}
                >
                  Switch to Full Chat Feed →
                </button>
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: FULL CHAT FEED */}
        {activeTab === "chat" && (
          <div className="hc-desktop-grid hc-fade-up">
            <aside className="hc-glass-panel" style={{ borderRadius: "24px", padding: "20px", display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <HolyCrossCrestLogo size={38} />
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 900, color: palette.primary }}>Full Chat Assistant</div>
                  <div style={{ fontSize: "11.5px", color: "#94a3b8" }}>Clean bold & structured replies</div>
                </div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {Object.keys(RECOMMENDED_PROMPTS).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className="hc-btn"
                    onClick={() => setTopicCategory(cat)}
                    style={{
                      padding: "5px 11px",
                      borderRadius: "999px",
                      border: "none",
                      fontSize: "11px",
                      fontWeight: 800,
                      background: topicCategory === cat ? palette.secondary : "#1e293b",
                      color: topicCategory === cat ? "#020617" : "#cbd5e1",
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                {activePromptList.map((q) => (
                  <button
                    key={q}
                    type="button"
                    className="hc-btn"
                    onClick={() => void handleSendChat(q)}
                    style={{
                      textAlign: "left",
                      background: "rgba(15, 23, 42, 0.85)",
                      color: "#e2e8f0",
                      border: "1px solid rgba(148, 163, 184, 0.25)",
                      borderRadius: "12px",
                      padding: "10px 12px",
                      fontSize: "12px",
                      lineHeight: 1.4,
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="hc-btn"
                onClick={() => {
                  setChatMessages([WELCOME_CHAT_MESSAGE]);
                  showToast("Started a fresh chat thread.", "info");
                }}
                style={{
                  marginTop: "6px",
                  padding: "10px",
                  borderRadius: "12px",
                  border: "1px solid rgba(239, 68, 68, 0.35)",
                  background: "rgba(239, 68, 68, 0.14)",
                  color: "#fca5a5",
                  fontSize: "12px",
                  fontWeight: 700,
                }}
              >
                Clear Chat Thread
              </button>
            </aside>

            <section
              className="hc-glass-panel"
              style={{
                borderRadius: "26px",
                display: "flex",
                flexDirection: "column",
                height: "650px",
                maxHeight: "calc(100vh - 205px)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "16px 22px",
                  borderBottom: "1px solid rgba(56, 189, 248, 0.2)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "rgba(2, 6, 23, 0.65)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#34d399" }} />
                  <span style={{ fontSize: "15px", fontWeight: 900, color: "#f8fafc" }}>
                    Holy Cross School AI — Full Conversational Feed
                  </span>
                </div>
                <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 700 }}>
                  {language === "hi" ? "हिंदी मोड" : "English Mode"}
                </span>
              </div>

              <div style={{ flex: 1, overflowY: "auto", padding: "22px", display: "flex", flexDirection: "column", gap: "20px" }}>
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className="hc-fade-up"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: msg.sender === "user" ? "flex-end" : "flex-start",
                    }}
                  >
                    <div
                      style={{
                        maxWidth: msg.sender === "user" ? "78%" : "94%",
                        borderRadius: msg.sender === "user" ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
                        padding: msg.sender === "user" ? "13px 18px" : "18px 22px",
                        background:
                          msg.sender === "user"
                            ? "linear-gradient(135deg, #2563eb, #0284c7)"
                            : "rgba(15, 23, 42, 0.94)",
                        border: msg.sender === "user" ? "none" : "1px solid rgba(251, 191, 36, 0.28)",
                        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.28)",
                      }}
                    >
                      {msg.sender === "ai" && (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "12px",
                            marginBottom: "10px",
                            paddingBottom: "8px",
                            borderBottom: "1px solid rgba(148, 163, 184, 0.16)",
                          }}
                        >
                          <span style={{ fontSize: "11.5px", fontWeight: 900, color: palette.secondary, letterSpacing: "0.7px" }}>
                            ✦ HOLY CROSS SCHOOL AI
                          </span>
                          <span style={{ fontSize: "11px", color: "#64748b" }}>{msg.timestamp}</span>
                        </div>
                      )}

                      {msg.sender === "user" ? (
                        <div style={{ fontSize: fontSizePx + "px", fontWeight: 600, color: "#fff", lineHeight: 1.55 }}>
                          {msg.text}
                        </div>
                      ) : (
                        <FormattedAnswer text={msg.text} fontSize={fontSizePx} />
                      )}

                      {msg.sender === "ai" && (
                        <div style={{ marginTop: "14px", paddingTop: "10px", borderTop: "1px solid rgba(148, 163, 184, 0.15)" }}>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: msg.questionRef ? "10px" : "0px" }}>
                            <button
                              type="button"
                              className="hc-btn"
                              onClick={() => speakText(msg.text, msg.language)}
                              style={{
                                background: "rgba(56, 189, 248, 0.14)",
                                color: "#7dd3fc",
                                border: "1px solid rgba(56, 189, 248, 0.3)",
                                borderRadius: "8px",
                                padding: "5px 11px",
                                fontSize: "11.5px",
                                fontWeight: 700,
                              }}
                            >
                              🔊 Read Aloud
                            </button>
                            <button
                              type="button"
                              className="hc-btn"
                              onClick={() => handleCopy(msg.text)}
                              style={{
                                background: "rgba(251, 191, 36, 0.14)",
                                color: "#fde68a",
                                border: "1px solid rgba(251, 191, 36, 0.3)",
                                borderRadius: "8px",
                                padding: "5px 11px",
                                fontSize: "11.5px",
                                fontWeight: 700,
                              }}
                            >
                              📋 Copy
                            </button>
                            <button
                              type="button"
                              className="hc-btn"
                              onClick={() => toggleChatBookmark(msg)}
                              style={{
                                background: msg.bookmarked ? "rgba(52, 211, 153, 0.2)" : "rgba(148, 163, 184, 0.14)",
                                color: msg.bookmarked ? "#6ee7b7" : "#cbd5e1",
                                border: "1px solid rgba(148, 163, 184, 0.28)",
                                borderRadius: "8px",
                                padding: "5px 11px",
                                fontSize: "11.5px",
                                fontWeight: 700,
                              }}
                            >
                              {msg.bookmarked ? "★ Pinned" : "☆ Pin"}
                            </button>
                          </div>

                          {msg.questionRef && (
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                              <button
                                type="button"
                                className="hc-btn"
                                onClick={() =>
                                  void handleSendChat(
                                    msg.language === "hi"
                                      ? "Explain this in clear English: " + msg.questionRef
                                      : "इसे सरल हिंदी में समझाएं: " + msg.questionRef,
                                    msg.language === "hi" ? "en" : "hi"
                                  )
                                }
                                style={{
                                  background: "rgba(251, 191, 36, 0.12)",
                                  color: "#fbbf24",
                                  border: "1px solid rgba(251, 191, 36, 0.32)",
                                  borderRadius: "999px",
                                  padding: "5px 12px",
                                  fontSize: "11.5px",
                                  fontWeight: 700,
                                }}
                              >
                                {msg.language === "hi" ? "Switch to English" : "हिंदी में समझाएं"}
                              </button>
                              <button
                                type="button"
                                className="hc-btn"
                                onClick={() => void handleSendChat("Explain simply in 3 short points: " + msg.questionRef)}
                                style={{
                                  background: "rgba(56, 189, 248, 0.12)",
                                  color: "#7dd3fc",
                                  border: "1px solid rgba(56, 189, 248, 0.3)",
                                  borderRadius: "999px",
                                  padding: "5px 12px",
                                  fontSize: "11.5px",
                                  fontWeight: 700,
                                }}
                              >
                                Explain Simply
                              </button>
                              <button
                                type="button"
                                className="hc-btn"
                                onClick={() => void handleSendChat("Give a practical real-life example for: " + msg.questionRef)}
                                style={{
                                  background: "rgba(52, 211, 153, 0.12)",
                                  color: "#6ee7b7",
                                  border: "1px solid rgba(52, 211, 153, 0.3)",
                                  borderRadius: "999px",
                                  padding: "5px 12px",
                                  fontSize: "11.5px",
                                  fontWeight: 700,
                                }}
                              >
                                Real-Life Example
                              </button>
                              <button
                                type="button"
                                className="hc-btn"
                                onClick={() => void handleSendChat("Ask me 2 quick quiz questions on: " + msg.questionRef)}
                                style={{
                                  background: "rgba(168, 85, 247, 0.16)",
                                  color: "#d8b4fe",
                                  border: "1px solid rgba(168, 85, 247, 0.35)",
                                  borderRadius: "999px",
                                  padding: "5px 12px",
                                  fontSize: "11.5px",
                                  fontWeight: 700,
                                }}
                              >
                                Quiz Me
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {chatLoading && (
                  <div
                    className="hc-fade-up"
                    style={{
                      maxWidth: "460px",
                      background: "rgba(15, 23, 42, 0.94)",
                      border: "1px solid rgba(56, 189, 248, 0.4)",
                      borderRadius: "18px",
                      padding: "16px 20px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", fontWeight: 800, color: palette.primary }}>
                      <span className="hc-orb-core" style={{ width: "12px", height: "12px", borderRadius: "50%", background: palette.primary }} />
                      <span>{chatThinkingStage}</span>
                    </div>
                    <div className="hc-thinking-bar" />
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void handleSendChat();
                }}
                style={{
                  padding: "14px 18px",
                  borderTop: "1px solid rgba(56, 189, 248, 0.22)",
                  background: "rgba(2, 6, 23, 0.88)",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <button
                  type="button"
                  className={"hc-btn " + (isListening ? "hc-mic-live" : "")}
                  onClick={() =>
                    startVoiceInput((spoken) => {
                      setChatInput(spoken);
                      void handleSendChat(spoken);
                    })
                  }
                  title="Voice Input (Mic)"
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    border: "1px solid rgba(56, 189, 248, 0.45)",
                    background: isListening ? "#ef4444" : "rgba(30, 41, 59, 0.9)",
                    color: "#fff",
                    fontSize: "18px",
                    flexShrink: 0,
                  }}
                >
                  🎤
                </button>
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={
                    language === "hi"
                      ? "अपना सवाल यहाँ लिखें या माइक से बोलें..."
                      : "Ask Holy Cross School AI anything (Personal, School, Teachers, NCERT)..."
                  }
                  style={{
                    flex: 1,
                    padding: "13px 16px",
                    borderRadius: "14px",
                    border: "1px solid rgba(56, 189, 248, 0.32)",
                    background: "rgba(15, 23, 42, 0.95)",
                    color: "#f8fafc",
                    fontSize: "14.5px",
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  disabled={chatLoading}
                  className="hc-btn"
                  style={{
                    padding: "13px 22px",
                    borderRadius: "14px",
                    border: "none",
                    background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                    color: "#020617",
                    fontWeight: 900,
                    fontSize: "14px",
                    opacity: chatLoading ? 0.6 : 1,
                    flexShrink: 0,
                  }}
                >
                  Send →
                </button>
              </form>
            </section>
          </div>
        )}

        {/* TAB 3: COMPLETE FACULTY DIRECTORY */}
        {activeTab === "faculty" && (
          <div className="hc-fade-up" style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
            <div className="hc-two-col">
              {FACULTY_DATA.filter((f) => f.featured).map((leader) => (
                <div
                  key={leader.id}
                  className="hc-glass-panel"
                  style={{
                    borderRadius: "24px",
                    padding: "24px",
                    borderColor: palette.border,
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                    <div>
                      <span style={{ fontSize: "11px", fontWeight: 900, color: palette.secondary, textTransform: "uppercase", letterSpacing: "1px" }}>
                        ★ {leader.wing}
                      </span>
                      <h2 style={{ margin: "4px 0 2px", fontSize: "22px", fontWeight: 900, color: palette.primary }}>
                        {leader.name}
                      </h2>
                      <div style={{ fontSize: "13.5px", fontWeight: 700, color: "#e2e8f0" }}>{leader.role}</div>
                    </div>
                    <button
                      type="button"
                      className="hc-btn"
                      onClick={() => speakText(leader.name + ", " + leader.role + ". " + leader.description)}
                      style={{
                        background: "rgba(56, 189, 248, 0.16)",
                        color: "#7dd3fc",
                        border: "1px solid rgba(56, 189, 248, 0.35)",
                        borderRadius: "10px",
                        padding: "7px 12px",
                        fontSize: "12px",
                        fontWeight: 700,
                      }}
                    >
                      🔊 Listen Bio
                    </button>
                  </div>
                  <p style={{ margin: 0, fontSize: "13.5px", color: "#cbd5e1", lineHeight: 1.65 }}>{leader.description}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "4px" }}>
                    {leader.specialties.map((sp) => (
                      <span
                        key={sp}
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          color: "#fde68a",
                          background: "rgba(251, 191, 36, 0.14)",
                          border: "1px solid rgba(251, 191, 36, 0.3)",
                          padding: "4px 10px",
                          borderRadius: "999px",
                        }}
                      >
                        {sp}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="hc-glass-panel" style={{ borderRadius: "24px", padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "18px" }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: "21px", fontWeight: 900, color: palette.primary }}>
                    Complete Faculty & Office Staff Directory ({filteredFaculty.length})
                  </h2>
                  <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#94a3b8" }}>
                    Click any educator to view their complete profile, listen aloud, or ask Holy Cross School AI.
                  </p>
                </div>
                <input
                  type="text"
                  value={dirSearch}
                  onChange={(e) => setDirSearch(e.target.value)}
                  placeholder="Search teacher name, subject, or specialty..."
                  style={{
                    width: "320px",
                    maxWidth: "100%",
                    padding: "12px 16px",
                    borderRadius: "14px",
                    border: "1px solid " + palette.border,
                    background: "rgba(2, 6, 23, 0.9)",
                    color: "#f8fafc",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "14px" }}>
                {facultyCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className="hc-btn"
                    onClick={() => setDirCategory(cat)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "999px",
                      border: "none",
                      whiteSpace: "nowrap",
                      fontSize: "12px",
                      fontWeight: 800,
                      background: dirCategory === cat ? palette.secondary : "#1e293b",
                      color: dirCategory === cat ? "#020617" : "#cbd5e1",
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "16px", marginTop: "12px" }}>
                {filteredFaculty.map((f) => (
                  <div
                    key={f.id}
                    className="hc-hover-card"
                    style={{
                      borderRadius: "18px",
                      padding: "18px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      gap: "12px",
                    }}
                  >
                    <div>
                      <span style={{ fontSize: "10.5px", color: palette.secondary, fontWeight: 900, textTransform: "uppercase" }}>
                        {f.category} • {f.wing}
                      </span>
                      <div style={{ fontSize: "17px", fontWeight: 900, color: palette.primary, marginTop: "6px" }}>{f.name}</div>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "#f8fafc", marginTop: "2px" }}>{f.role}</div>
                      <p style={{ margin: "10px 0 0", fontSize: "12.5px", color: "#cbd5e1", lineHeight: 1.58 }}>{f.description}</p>
                    </div>

                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", paddingTop: "8px", borderTop: "1px solid rgba(148,163,184,0.16)" }}>
                      <button
                        type="button"
                        className="hc-btn"
                        onClick={() => setSelectedFaculty(f)}
                        style={{
                          flex: 1,
                          padding: "8px 10px",
                          borderRadius: "10px",
                          border: "1px solid rgba(251, 191, 36, 0.35)",
                          background: "rgba(251, 191, 36, 0.14)",
                          color: "#fde68a",
                          fontSize: "11.5px",
                          fontWeight: 800,
                        }}
                      >
                        Full Profile
                      </button>
                      <button
                        type="button"
                        className="hc-btn"
                        onClick={() => {
                          setActiveTab("chat");
                          void handleSendChat(
                            "Give a full detailed introduction about " + f.name + " (" + f.role + ") at Holy Cross School, Indore."
                          );
                        }}
                        style={{
                          flex: 1,
                          padding: "8px 10px",
                          borderRadius: "10px",
                          border: "none",
                          background: "linear-gradient(135deg, #38bdf8, #2563eb)",
                          color: "#fff",
                          fontSize: "11.5px",
                          fontWeight: 800,
                        }}
                      >
                        Ask AI →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedFaculty && (
              <div
                onClick={() => setSelectedFaculty(null)}
                style={{
                  position: "fixed",
                  inset: 0,
                  background: "rgba(0, 0, 0, 0.82)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 65,
                  padding: "20px",
                }}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="hc-glass-panel hc-fade-up"
                  style={{ width: "100%", maxWidth: "580px", borderRadius: "26px", padding: "28px", borderColor: palette.border }}
                >
                  <div style={{ fontSize: "11.5px", fontWeight: 900, color: palette.secondary, textTransform: "uppercase" }}>
                    {selectedFaculty.category} • {selectedFaculty.wing}
                  </div>
                  <h3 style={{ margin: "6px 0 4px", fontSize: "24px", fontWeight: 900, color: palette.primary }}>
                    {selectedFaculty.name}
                  </h3>
                  <div style={{ fontSize: "14.5px", fontWeight: 700, color: "#f8fafc", marginBottom: "14px" }}>
                    {selectedFaculty.role}
                  </div>
                  <div style={{ fontSize: "12.5px", color: "#7dd3fc", marginBottom: "12px", fontWeight: 700 }}>
                    Core Focus: {selectedFaculty.experienceFocus}
                  </div>
                  <p style={{ margin: "0 0 18px", fontSize: "14px", color: "#e2e8f0", lineHeight: 1.7 }}>
                    {selectedFaculty.description}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "22px" }}>
                    {selectedFaculty.specialties.map((sp) => (
                      <span
                        key={sp}
                        style={{
                          fontSize: "11.5px",
                          fontWeight: 700,
                          color: "#fde68a",
                          background: "rgba(251, 191, 36, 0.14)",
                          border: "1px solid rgba(251, 191, 36, 0.3)",
                          padding: "5px 12px",
                          borderRadius: "999px",
                        }}
                      >
                        {sp}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", flexWrap: "wrap" }}>
                    <button
                      type="button"
                      className="hc-btn"
                      onClick={() =>
                        speakText(selectedFaculty.name + ", " + selectedFaculty.role + ". " + selectedFaculty.description)
                      }
                      style={{
                        background: "rgba(56, 189, 248, 0.18)",
                        color: "#7dd3fc",
                        border: "1px solid rgba(56, 189, 248, 0.4)",
                        borderRadius: "12px",
                        padding: "10px 16px",
                        fontWeight: 800,
                        fontSize: "12.5px",
                      }}
                    >
                      🔊 Read Profile Aloud
                    </button>
                    <button
                      type="button"
                      className="hc-btn"
                      onClick={() => setSelectedFaculty(null)}
                      style={{
                        background: "#1e293b",
                        color: "#f8fafc",
                        border: "none",
                        borderRadius: "12px",
                        padding: "10px 20px",
                        fontWeight: 800,
                        fontSize: "12.5px",
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: EXHIBITION SHOWCASE, QUIZ & NCERT FORMULAS */}
        {activeTab === "exhibition" && (
          <div className="hc-fade-up" style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
            <div className="hc-two-col">
              <div className="hc-glass-panel" style={{ borderRadius: "24px", padding: "24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "14px" }}>
                  <HolyCrossCrestLogo size={54} />
                  <div>
                    <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 900, color: palette.primary }}>
                      {SCHOOL_CONFIG.schoolFullName}
                    </h2>
                    <div style={{ fontSize: "12.5px", color: palette.secondary, fontWeight: 700 }}>
                      Motto: "{SCHOOL_CONFIG.motto}"
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "9px", fontSize: "13.5px", color: "#cbd5e1", lineHeight: 1.6 }}>
                  <div><strong>Principal:</strong> {SCHOOL_CONFIG.principal}</div>
                  <div><strong>Affiliation:</strong> {SCHOOL_CONFIG.board}</div>
                  <div><strong>Classes:</strong> {SCHOOL_CONFIG.grades}</div>
                  <div><strong>Campus Address:</strong> {SCHOOL_CONFIG.address}</div>
                  <div><strong>Student Architect:</strong> {SCHOOL_CONFIG.architect}</div>
                  <div><strong>IT Faculty Mentor:</strong> {SCHOOL_CONFIG.mentor}</div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "9px", marginTop: "16px" }}>
                  {[
                    {
                      label: "▶ Live Welcome Speech for Parents & Judges",
                      prompt:
                        "Deliver a warm, impressive 5-line welcome speech to parents and exhibition judges visiting the Holy Cross School AI stall at Holy Cross School, Khandwa Road, Indore.",
                    },
                    {
                      label: "▶ Explain Our AI Architecture to Judges",
                      prompt:
                        "Explain clearly how Holy Cross School AI works using React, TypeScript, Vercel Serverless backend, secure API keys, and Voice Recognition.",
                    },
                  ].map((demo) => (
                    <button
                      key={demo.label}
                      type="button"
                      className="hc-btn"
                      onClick={() => {
                        setActiveTab("chat");
                        void handleSendChat(demo.prompt);
                      }}
                      style={{
                        textAlign: "left",
                        padding: "11px 14px",
                        borderRadius: "12px",
                        border: "1px solid rgba(251, 191, 36, 0.35)",
                        background: "rgba(15, 23, 42, 0.9)",
                        color: "#fde68a",
                        fontWeight: 800,
                        fontSize: "12.5px",
                      }}
                    >
                      {demo.label}
                    </button>
                  ))}
                </div>
              </div>

              <div
                className="hc-glass-panel"
                style={{ borderRadius: "24px", padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "14px" }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                    <h2 style={{ margin: 0, fontSize: "19px", fontWeight: 900, color: palette.secondary }}>
                      Interactive Exhibition Quiz
                    </h2>
                    <span
                      style={{
                        background: "rgba(251, 191, 36, 0.16)",
                        color: "#fbbf24",
                        border: "1px solid rgba(251, 191, 36, 0.4)",
                        borderRadius: "999px",
                        padding: "4px 12px",
                        fontSize: "12px",
                        fontWeight: 800,
                      }}
                    >
                      Score: {quizScore}/{EXHIBITION_QUIZ.length}
                    </span>
                  </div>

                  <div style={{ fontSize: "11.5px", color: "#94a3b8", marginBottom: "8px", fontWeight: 700 }}>
                    Question {quizIndex + 1} of {EXHIBITION_QUIZ.length}
                  </div>
                  <div style={{ fontSize: "15.5px", fontWeight: 800, color: "#f8fafc", lineHeight: 1.5, marginBottom: "14px" }}>
                    {currentQuiz.question}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                    {currentQuiz.options.map((opt, idx) => {
                      const isCorrect = idx === currentQuiz.correctIndex;
                      const isPicked = quizSelected === idx;
                      let bg = "rgba(15, 23, 42, 0.9)";
                      let border = "1px solid rgba(148, 163, 184, 0.25)";
                      if (quizSelected !== null) {
                        if (isCorrect) {
                          bg = "rgba(5, 150, 105, 0.35)";
                          border = "1px solid #34d399";
                        } else if (isPicked) {
                          bg = "rgba(220, 38, 38, 0.3)";
                          border = "1px solid #f87171";
                        }
                      }
                      return (
                        <button
                          key={opt}
                          type="button"
                          className="hc-btn"
                          onClick={() => handleSelectQuizOption(idx)}
                          style={{
                            textAlign: "left",
                            padding: "11px 14px",
                            borderRadius: "12px",
                            background: bg,
                            border,
                            color: "#f8fafc",
                            fontSize: "13px",
                            fontWeight: 700,
                          }}
                        >
                          {String.fromCharCode(65 + idx)}. {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {quizSelected !== null && (
                  <div
                    className="hc-fade-up"
                    style={{
                      background: "rgba(2, 6, 23, 0.85)",
                      border: "1px solid rgba(56, 189, 248, 0.35)",
                      borderRadius: "14px",
                      padding: "12px 14px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "12px",
                      flexWrap: "wrap",
                    }}
                  >
                    <span style={{ fontSize: "12.5px", color: "#cbd5e1", flex: 1 }}>{currentQuiz.fact}</span>
                    <button
                      type="button"
                      className="hc-btn"
                      onClick={handleNextQuiz}
                      style={{
                        background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                        color: "#020617",
                        border: "none",
                        borderRadius: "10px",
                        padding: "8px 16px",
                        fontSize: "12px",
                        fontWeight: 900,
                      }}
                    >
                      {quizIndex + 1 < EXHIBITION_QUIZ.length ? "Next Question →" : "Restart Quiz ↻"}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="hc-glass-panel" style={{ borderRadius: "24px", padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px", marginBottom: "16px" }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 900, color: palette.primary }}>
                    NCERT Quick Formula & Concept Vault
                  </h2>
                  <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#94a3b8" }}>
                    Works 100% offline. Click "Explain with AI" on any card for a worked CBSE explanation.
                  </p>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {["All", "Physics", "Chemistry", "Mathematics", "Economics", "Social Science"].map((sub) => (
                    <button
                      key={sub}
                      type="button"
                      className="hc-btn"
                      onClick={() => setFormulaSubject(sub)}
                      style={{
                        padding: "7px 14px",
                        borderRadius: "999px",
                        border: "none",
                        fontSize: "12px",
                        fontWeight: 800,
                        background: formulaSubject === sub ? palette.primary : "#1e293b",
                        color: formulaSubject === sub ? "#020617" : "#cbd5e1",
                      }}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "16px" }}>
                {filteredFormulas.map((item) => (
                  <div
                    key={item.id}
                    className="hc-hover-card"
                    style={{
                      borderRadius: "18px",
                      padding: "18px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      gap: "12px",
                    }}
                  >
                    <div>
                      <span style={{ fontSize: "10.5px", fontWeight: 900, color: palette.secondary, textTransform: "uppercase" }}>
                        {item.subject}
                      </span>
                      <div style={{ fontSize: "16px", fontWeight: 800, color: "#f8fafc", marginTop: "4px" }}>{item.title}</div>
                      <div
                        style={{
                          margin: "10px 0",
                          padding: "10px 12px",
                          borderRadius: "12px",
                          background: "rgba(2, 6, 23, 0.88)",
                          border: "1px solid rgba(251, 191, 36, 0.3)",
                          color: "#fbbf24",
                          fontWeight: 800,
                          fontSize: "13.5px",
                          fontFamily: "monospace",
                        }}
                      >
                        {item.formula}
                      </div>
                      <p style={{ margin: 0, fontSize: "12.5px", color: "#cbd5e1", lineHeight: 1.55 }}>{item.explanation}</p>
                    </div>
                    <button
                      type="button"
                      className="hc-btn"
                      onClick={() => {
                        setActiveTab("chat");
                        void handleSendChat(item.askPrompt);
                      }}
                      style={{
                        padding: "9px 12px",
                        borderRadius: "10px",
                        border: "none",
                        background: "linear-gradient(135deg, #38bdf8, #2563eb)",
                        color: "#fff",
                        fontSize: "12px",
                        fontWeight: 800,
                      }}
                    >
                      Explain with AI →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CRICKET LIVE HUB & SCOREBOARD */}
        {activeTab === "cricket" && (
          <div className="hc-desktop-grid hc-fade-up">
            <aside className="hc-glass-panel" style={{ borderRadius: "24px", padding: "22px", display: "flex", flexDirection: "column", gap: "14px" }}>
              <h2 style={{ margin: 0, fontSize: "19px", fontWeight: 900, color: palette.primary }}>Live Cricket Portals</h2>
              <p style={{ margin: 0, fontSize: "13px", color: "#94a3b8", lineHeight: 1.5 }}>
                Follow live international, IPL, and domestic ball-by-ball scores directly:
              </p>
              <a
                href={SCHOOL_CONFIG.links.cricbuzz}
                target="_blank"
                rel="noreferrer"
                className="hc-btn"
                style={{ textDecoration: "none", textAlign: "center", background: "#059669", color: "#fff", padding: "12px", borderRadius: "12px", fontWeight: 800, fontSize: "13px" }}
              >
                Cricbuzz Live Scores ↗
              </a>
              <a
                href={SCHOOL_CONFIG.links.espncricinfo}
                target="_blank"
                rel="noreferrer"
                className="hc-btn"
                style={{ textDecoration: "none", textAlign: "center", background: "#0284c7", color: "#fff", padding: "12px", borderRadius: "12px", fontWeight: 800, fontSize: "13px" }}
              >
                ESPNcricinfo Match Center ↗
              </a>
              <a
                href={SCHOOL_CONFIG.links.icc}
                target="_blank"
                rel="noreferrer"
                className="hc-btn"
                style={{ textDecoration: "none", textAlign: "center", background: "#4f46e5", color: "#fff", padding: "12px", borderRadius: "12px", fontWeight: 800, fontSize: "13px" }}
              >
                ICC Official Portal ↗
              </a>

              <div style={{ marginTop: "8px", paddingTop: "14px", borderTop: "1px solid rgba(148,163,184,0.2)" }}>
                <div style={{ fontSize: "12.5px", fontWeight: 800, color: palette.secondary, marginBottom: "10px" }}>
                  Edit Match Setup
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "8px" }}>
                  <input
                    type="text"
                    value={matchState.teamA}
                    onChange={(e) => setMatchState({ ...matchState, teamA: e.target.value.toUpperCase().slice(0, 8) })}
                    placeholder="Team A"
                    style={{ padding: "8px 10px", borderRadius: "10px", border: "1px solid #334155", background: "#020617", color: "#fff", fontSize: "12.5px", fontWeight: 800 }}
                  />
                  <input
                    type="text"
                    value={matchState.teamB}
                    onChange={(e) => setMatchState({ ...matchState, teamB: e.target.value.toUpperCase().slice(0, 8) })}
                    placeholder="Team B"
                    style={{ padding: "8px 10px", borderRadius: "10px", border: "1px solid #334155", background: "#020617", color: "#fff", fontSize: "12.5px", fontWeight: 800 }}
                  />
                </div>
                <label style={{ fontSize: "11px", color: "#94a3b8", display: "block", marginBottom: "4px" }}>
                  Chase Target (20 Overs):
                </label>
                <input
                  type="number"
                  value={matchState.target}
                  onChange={(e) => setMatchState({ ...matchState, target: Math.max(0, Number(e.target.value)) })}
                  style={{ width: "100%", padding: "8px 10px", borderRadius: "10px", border: "1px solid #334155", background: "#020617", color: "#fbbf24", fontSize: "13px", fontWeight: 800 }}
                />
              </div>
            </aside>

            <section className="hc-glass-panel" style={{ borderRadius: "24px", padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "18px" }}>
                <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 900, color: palette.secondary }}>
                  Interactive Live Match Scoreboard
                </h2>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    type="button"
                    className="hc-btn"
                    onClick={undoLastBall}
                    style={{
                      background: "rgba(251, 191, 36, 0.16)",
                      color: "#fde68a",
                      border: "1px solid rgba(251, 191, 36, 0.35)",
                      borderRadius: "10px",
                      padding: "8px 14px",
                      fontSize: "12px",
                      fontWeight: 800,
                    }}
                  >
                    ↩ Undo Ball
                  </button>
                  <button
                    type="button"
                    className="hc-btn"
                    onClick={() => setMatchState({ ...matchState, runs: 0, wickets: 0, balls: 0, timeline: [] })}
                    style={{
                      background: "rgba(239, 68, 68, 0.2)",
                      color: "#fca5a5",
                      border: "1px solid rgba(239, 68, 68, 0.35)",
                      borderRadius: "10px",
                      padding: "8px 14px",
                      fontSize: "12px",
                      fontWeight: 800,
                    }}
                  >
                    Reset Match
                  </button>
                </div>
              </div>

              <div
                style={{
                  background: "linear-gradient(135deg, rgba(2, 6, 23, 0.94), rgba(15, 23, 42, 0.94))",
                  border: "1px solid rgba(251, 191, 36, 0.32)",
                  borderRadius: "20px",
                  padding: "24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "16px",
                  marginBottom: "18px",
                }}
              >
                <div>
                  <div style={{ fontSize: "14px", color: "#94a3b8", fontWeight: 800, letterSpacing: "0.8px" }}>
                    {matchState.teamA} vs {matchState.teamB}
                  </div>
                  <div style={{ fontSize: "44px", fontWeight: 900, color: "#fbbf24", lineHeight: 1.1, marginTop: "4px" }}>
                    {matchState.runs}/{matchState.wickets}
                  </div>
                  {matchState.target > 0 && (
                    <div style={{ fontSize: "12.5px", color: "#34d399", fontWeight: 700, marginTop: "6px" }}>
                      {runsNeeded === 0
                        ? matchState.teamA + " won the match!"
                        : "Need " + runsNeeded + " runs from " + ballsRemaining + " balls (RRR: " + requiredRR + ")"}
                    </div>
                  )}
                </div>

                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "20px", fontWeight: 900, color: "#38bdf8" }}>Overs: {oversFormatted}</div>
                  <div style={{ fontSize: "14px", color: "#cbd5e1", marginTop: "4px", fontWeight: 700 }}>Current RR: {currentRR}</div>
                  <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "4px" }}>Target: {matchState.target}</div>
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <div style={{ fontSize: "11.5px", fontWeight: 800, color: "#94a3b8", marginBottom: "8px", textTransform: "uppercase" }}>
                  Recent Balls Timeline
                </div>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {matchState.timeline.length === 0 ? (
                    <span style={{ fontSize: "12.5px", color: "#64748b" }}>No balls bowled yet. Tap a scoring button below.</span>
                  ) : (
                    matchState.timeline.map((b, i) => (
                      <span
                        key={i}
                        style={{
                          minWidth: "34px",
                          height: "34px",
                          padding: "0 8px",
                          borderRadius: "50%",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: 900,
                          color: "#fff",
                          background: b.isWicket
                            ? "#dc2626"
                            : b.runs === 6
                            ? "#d97706"
                            : b.runs === 4
                            ? "#059669"
                            : "#334155",
                        }}
                      >
                        {b.label}
                      </span>
                    ))
                  )}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: "12px" }}>
                {[
                  { label: "Dot Ball", tag: "0", r: 0, w: false, legal: true, bg: "#334155" },
                  { label: "+1 Run", tag: "1", r: 1, w: false, legal: true, bg: "#1d4ed8" },
                  { label: "+2 Runs", tag: "2", r: 2, w: false, legal: true, bg: "#1d4ed8" },
                  { label: "+3 Runs", tag: "3", r: 3, w: false, legal: true, bg: "#0369a1" },
                  { label: "FOUR (4)", tag: "4", r: 4, w: false, legal: true, bg: "#059669" },
                  { label: "SIX (6)", tag: "6", r: 6, w: false, legal: true, bg: "#d97706" },
                  { label: "Wide (+1)", tag: "WD", r: 1, w: false, legal: false, bg: "#475569" },
                  { label: "No Ball (+1)", tag: "NB", r: 1, w: false, legal: false, bg: "#64748b" },
                  { label: "WICKET!", tag: "W", r: 0, w: true, legal: true, bg: "#dc2626" },
                ].map((btn) => (
                  <button
                    key={btn.label}
                    type="button"
                    className="hc-btn"
                    onClick={() => recordBall(btn.tag, btn.r, btn.w, btn.legal)}
                    style={{
                      background: btn.bg,
                      color: "#fff",
                      border: "none",
                      borderRadius: "13px",
                      padding: "13px 10px",
                      fontSize: "13px",
                      fontWeight: 800,
                    }}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* TAB 6: HISTORY & PINNED NOTES */}
        {activeTab === "history" && (
          <div className="hc-glass-panel hc-fade-up" style={{ borderRadius: "24px", padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px", marginBottom: "18px" }}>
              <div>
                <h2 style={{ margin: 0, fontSize: "21px", fontWeight: 900, color: palette.primary }}>
                  Conversation History & Pinned Notes ({filteredHistory.length})
                </h2>
                <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#94a3b8" }}>
                  Search past Q&As, replay audio aloud, or bookmark key answers for quick exhibition demos.
                </p>
              </div>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <input
                  type="text"
                  value={historySearch}
                  onChange={(e) => setHistorySearch(e.target.value)}
                  placeholder="Search saved Q&As..."
                  style={{
                    padding: "10px 14px",
                    borderRadius: "12px",
                    border: "1px solid rgba(56, 189, 248, 0.35)",
                    background: "rgba(2, 6, 23, 0.9)",
                    color: "#f8fafc",
                    fontSize: "13px",
                    outline: "none",
                  }}
                />
                <button
                  type="button"
                  className="hc-btn"
                  onClick={() => setHistoryFilter(historyFilter === "all" ? "bookmarked" : "all")}
                  style={{
                    padding: "10px 16px",
                    borderRadius: "12px",
                    border: "1px solid rgba(251, 191, 36, 0.4)",
                    background: historyFilter === "bookmarked" ? "#fbbf24" : "rgba(251, 191, 36, 0.14)",
                    color: historyFilter === "bookmarked" ? "#020617" : "#fde68a",
                    fontSize: "12.5px",
                    fontWeight: 800,
                  }}
                >
                  ★ Pinned ({bookmarkedCount})
                </button>
                {history.length > 0 && (
                  <button
                    type="button"
                    className="hc-btn"
                    onClick={() => {
                      setHistory([]);
                      localStorage.removeItem("hcs_history_v4");
                      showToast("History cleared.", "info");
                    }}
                    style={{
                      background: "rgba(239, 68, 68, 0.2)",
                      color: "#fca5a5",
                      border: "none",
                      borderRadius: "12px",
                      padding: "10px 16px",
                      fontSize: "12.5px",
                      fontWeight: 800,
                    }}
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {filteredHistory.length === 0 ? (
              <div style={{ padding: "40px 20px", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>
                No matching conversations found. Ask Holy Cross School AI in the MorphOrb or Full Chat tab!
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {filteredHistory.map((item) => (
                  <div key={item.id} className="hc-hover-card" style={{ borderRadius: "18px", padding: "18px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <span style={{ fontSize: "15px", fontWeight: 900, color: palette.secondary }}>{item.question}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "11px", color: "#64748b" }}>{item.timestamp}</span>
                        <button
                          type="button"
                          className="hc-btn"
                          onClick={() => toggleHistoryBookmark(item.id)}
                          style={{
                            background: item.bookmarked ? "rgba(251, 191, 36, 0.22)" : "rgba(148, 163, 184, 0.14)",
                            color: item.bookmarked ? "#fbbf24" : "#cbd5e1",
                            border: "none",
                            borderRadius: "8px",
                            padding: "5px 10px",
                            fontSize: "11.5px",
                            fontWeight: 800,
                          }}
                        >
                          {item.bookmarked ? "★ Pinned" : "☆ Pin"}
                        </button>
                        <button
                          type="button"
                          className="hc-btn"
                          onClick={() => speakText(item.answer, item.language)}
                          style={{
                            background: "rgba(56, 189, 248, 0.16)",
                            color: "#7dd3fc",
                            border: "none",
                            borderRadius: "8px",
                            padding: "5px 10px",
                            fontSize: "11.5px",
                            fontWeight: 800,
                          }}
                        >
                          🔊 Listen
                        </button>
                        <button
                          type="button"
                          className="hc-btn"
                          onClick={() => handleCopy(item.answer)}
                          style={{
                            background: "rgba(52, 211, 153, 0.16)",
                            color: "#6ee7b7",
                            border: "none",
                            borderRadius: "8px",
                            padding: "5px 10px",
                            fontSize: "11.5px",
                            fontWeight: 800,
                          }}
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                    <FormattedAnswer text={item.answer} fontSize={fontSizePx - 0.5} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* FLOATING GLASS NAVIGATION DOCK */}
      <nav className="hc-floating-dock scroll-hide" aria-label="Primary Portal Navigation">
        {(
          [
            { id: "orb", label: "✦ MorphOrb AI" },
            { id: "chat", label: "💬 Full Chat" },
            { id: "faculty", label: "🏫 Faculty (" + FACULTY_DATA.length + ")" },
            { id: "exhibition", label: "🎓 Exhibition & Quiz" },
            { id: "cricket", label: "🏏 Cricket Live" },
            { id: "history", label: "🕘 History (" + history.length + ")" },
          ] as { id: ActiveTab; label: string }[]
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            className="hc-btn"
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "10px 18px",
              borderRadius: "999px",
              border: "none",
              whiteSpace: "nowrap",
              fontSize: "12.5px",
              fontWeight: 800,
              background:
                activeTab === tab.id
                  ? "linear-gradient(135deg, " + palette.primary + ", #f59e0b)"
                  : "rgba(30, 41, 59, 0.78)",
              color: activeTab === tab.id ? "#020617" : "#e2e8f0",
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* FLOATING QUICK-SWITCH BUTTON */}
      <button
        type="button"
        className="hc-fab-quick hc-btn"
        title="Switch between MorphOrb and Full Chat"
        onClick={() => {
          setActiveTab(activeTab === "orb" ? "chat" : "orb");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        ✦
      </button>
    </div>
  );
}
