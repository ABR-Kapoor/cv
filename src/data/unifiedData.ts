// Data aggregator — static data only.
// Dynamic data (projects, achievements, services, certifications, memberships)
// is now fetched from InsForge via src/hooks/useInsForge.ts
import personalInfo from './personal_info.json';
import education from './education.json';
import experience from './experience.json';
import technicalSkills from './technical_skills.json';

// Skill level mapping helper - Based on real expertise from CV
const getSkillLevel = (skill: string): number => {
  const levelMap: { [key: string]: number } = {
    // Programming Languages
    'Java': 88,
    'Python': 90,
    'JavaScript': 85,
    'TypeScript': 82,
    'SQL (PostgreSQL, MySQL)': 85,
    'HTML': 95,
    'CSS': 90,
    'Solidity': 45,

    // Frameworks & Libraries
    'React.js': 88,
    'Next.js': 85,
    'Node.js': 82,
    'Express.js': 80,
    'FastAPI': 78,
    'Spring Boot': 78,
    'Tailwind CSS': 90,
    'Framer Motion': 78,
    'Scikit-learn': 75,
    'Pandas': 80,
    'NumPy': 78,
    'Matplotlib': 75,
    'Axios': 82,
    'NLP': 72,
    'RAG': 72,
    'Fine-tuning': 68,

    // AI & Agentic Systems
    'Gemini Pro': 88,
    'Groq (LLaMA 3)': 80,
    'Local LLM Integration': 78,
    'Prompt Engineering': 90,
    'Agentic AI Pipelines': 75,
    'Autonomous Agents': 73,
    'Langraph': 70,
    'Function Calling': 78,
    'MCP': 72,
    'A2A': 70,
    'Judge0 API': 75,

    // Blockchain & Web3
    'IPFS via Pinata': 65,
    'Smart Contracts': 50,
    'Ethereum (fundamentals)': 45,

    // Cloud & DevOps
    'AWS (EC2, S3)': 70,
    'Docker': 68,
    'Firebase': 85,
    'Vercel': 88,
    'Git/GitHub': 90,
    'ZOHO Site24x7': 65,
    'CI/CD basics': 65,

    // Databases
    'PostgreSQL (Neon, Supabase)': 85,
    'MongoDB': 78,
    'Firebase Firestore': 85,
    'MySQL': 80,

    // Developer Tools
    'Git': 90,
    'VS Code': 95,
    'PyCharm': 85,
    'Figma': 80,
    'Postman': 85,
    'ChatGPT': 92,
    'Gemini pro': 88,
    'Copilot': 90,
    'Cursor': 85,

    // Soft Skills
    'Leadership': 90,
    'Self-Learner': 95,
    'Good at Negotiations': 85,
    'Managerial skills': 82,
    'Great prompt engineer': 90,
    'Questioning skill': 90,
    'Observation': 87,
    'Team Management': 85,
    'Agile Sprints': 80,
    'Product Thinking': 83,
    'Public Speaking': 78,
    'UX Thinking': 80,
  };

  return levelMap[skill] || 70;
};

// Emoji mapping
const getSkillEmoji = (skill: string): string => {
  const emojiMap: { [key: string]: string } = {
    'Java': '☕',
    'Python': '🐍',
    'JavaScript': '⚡',
    'TypeScript': '🔷',
    'SQL (PostgreSQL, MySQL)': '🗄️',
    'HTML': '🌐',
    'CSS': '🎨',
    'Solidity': '🔗',
    'React.js': '⚛️',
    'Next.js': '▲',
    'Node.js': '🟢',
    'Express.js': '🚂',
    'FastAPI': '⚡',
    'Spring Boot': '🌱',
    'Tailwind CSS': '💨',
    'Framer Motion': '🎞️',
    'Scikit-learn': '🤖',
    'Pandas': '🐼',
    'NumPy': '🔢',
    'Matplotlib': '📊',
    'Axios': '🔄',
    'NLP': '🗣️',
    'RAG': '🔍',
    'Fine-tuning': '🎛️',
    'Gemini Pro': '💎',
    'Groq (LLaMA 3)': '🦙',
    'Local LLM Integration': '🧠',
    'Prompt Engineering': '🎯',
    'Agentic AI Pipelines': '🤖',
    'Autonomous Agents': '🦾',
    'Langraph': '🕸️',
    'Function Calling': '📞',
    'MCP': '🔌',
    'A2A': '🔀',
    'Judge0 API': '⚖️',
    'IPFS via Pinata': '📌',
    'Smart Contracts': '📜',
    'Ethereum (fundamentals)': '🔷',
    'MongoDB': '🍃',
    'PostgreSQL (Neon, Supabase)': '🐘',
    'Firebase Firestore': '🔥',
    'MySQL': '🐬',
    'AWS (EC2, S3)': '☁️',
    'Docker': '🐳',
    'Firebase': '🔥',
    'Vercel': '▲',
    'Git/GitHub': '🐙',
    'ZOHO Site24x7': '📡',
    'CI/CD basics': '🔄',
    'Git': '📝',
    'VS Code': '💻',
    'Figma': '🎨',
    'Postman': '📮',
    'ChatGPT': '🤖',
    'Copilot': '✈️',
    'Cursor': '🖱️',
    'Leadership': '👑',
    'Self-Learner': '📚',
    'Good at Negotiations': '🤝',
    'Managerial skills': '👨‍💼',
    'Great prompt engineer': '🎯',
    'Questioning skill': '❓',
    'Observation': '👁️',
    'Team Management': '👥',
    'Agile Sprints': '🏃',
    'Product Thinking': '💡',
    'Public Speaking': '🎤',
    'UX Thinking': '🎨',
  };

  return emojiMap[skill] || '🔧';
};

// Unified data structure
export const unifiedData = {
  // Personal Information
  personal: {
    name: personalInfo.name,
    email: personalInfo.email,
    phone: personalInfo.phone,
    title: "Full-Stack & AI Engineer | Hackathon Winner",
    tagline: "MCA Student • ₹22K Hackathon Winner • Shipped 13+ Live Products",
    location: "Bhilai, Chhattisgarh, India",
    website: (personalInfo as any).website || "https://cv.kapoorabeer.me",
    socialLinks: {
      github: personalInfo.github,
      linkedin: personalInfo.linkedin,
      whatsapp: personalInfo.whatsapp,
      twitter: (personalInfo as any).twitter || "https://x.com/AbeerKapoor1/",
    },
    funFacts: [
      "₹22K Hackathon Winner (IIT Bhilai + SSTC) 🏆",
      "Rank #1 in BCA Final 🥇",
      "Shipped 13+ real-world live products 🚀",
      "5+ AI projects including Agentic AI systems 🤖",
      "INAE Member — Indian National Academy of Engineering ✨",
      "Top 11 in HackIndia 2025 (85+ teams) 🔥"
    ]
  },

  // Education
  education: {
    degrees: education.map((edu: any, index: number) => ({
      title: edu.degree,
      institution: edu.college,
      duration: edu.year,
      location: edu.college.includes('Durg') ? 'Durg, Chhattisgarh' : 'Bhilai, Chhattisgarh',
      gpa: edu.cgpa || 'In Progress',
      status: edu.status,
      achievements: edu.achievements,
      subjects: edu.subjects,
      performance: index === 0 ? [82, 85, 88, 80, 84] : [90, 88, 85, 87, 89]
    }))
  },

  // Skills
  skills: {
    technical: [
      ...technicalSkills.languages.map((skill: string) => ({
        name: skill,
        level: getSkillLevel(skill),
        emoji: getSkillEmoji(skill),
        category: 'Programming Languages',
        description: `Proficient in ${skill} with hands-on project experience across real-world shipped products`
      })),
      ...technicalSkills.frameworks_libraries.slice(0, 8).map((skill: string) => ({
        name: skill,
        level: getSkillLevel(skill),
        emoji: getSkillEmoji(skill),
        category: 'Frameworks & Libraries',
        description: `Built production apps using ${skill}`
      })),
      ...(technicalSkills as any).ai_agentic.slice(0, 5).map((skill: string) => ({
        name: skill,
        level: getSkillLevel(skill),
        emoji: getSkillEmoji(skill),
        category: 'AI & Agentic Systems',
        description: `Working expertise in ${skill} — used in real agentic AI pipelines and live products`
      })),
      ...technicalSkills.cloud_devops.map((skill: string) => ({
        name: skill,
        level: getSkillLevel(skill),
        emoji: getSkillEmoji(skill),
        category: 'Cloud & DevOps',
        description: `Deployed and maintained production apps using ${skill}`
      })),
      ...technicalSkills.databases.map((skill: string) => ({
        name: skill,
        level: getSkillLevel(skill),
        emoji: getSkillEmoji(skill),
        category: 'Databases',
        description: `Production database management and optimization with ${skill}`
      }))
    ],

    soft: technicalSkills.soft_skills.map((skill: string) => ({
      name: skill,
      level: getSkillLevel(skill),
      emoji: getSkillEmoji(skill),
      category: 'Soft Skills',
      description: `Demonstrated ${skill.toLowerCase()} across hackathons, team projects, and client engagements`
    }))
  },

  // Experience — pulled from updated experience.json
  experience: experience.map((exp: any) => ({
    role: exp.role,
    company: exp.company,
    duration: exp.duration,
    description: exp.description,
    highlights: exp.highlights,
    techStack: exp.techStack,
    funAchievement: exp.company === 'Botivate LLC'
      ? 'Led 2 developers & served as Techno expert with client — across 5 live products! 🚀'
      : 'Delivered ~20% backend performance improvement with 5+ UI components! 🌟'
  })),

  // Hackathon Events — complete from CV
  funEvents: [
    {
      title: "AuraSutra — Healthcare AI-EcoSystem 🏆",
      description: "SSTC National Level Winner (₹12,000). Full-stack app guiding 50+ rural & urban users through AI-generated health action plans. Local LLM integration, sub-300ms API latency, 99.9% uptime.",
      highlights: ["₹12,000 Prize Money", "SSTC National Level", "Local LLM Integration", "50+ Users Deployed", "99.9% Uptime"],
      location: "SSTC",
      date: "November 2025",
      emoji: "🏥"
    },
    {
      title: "LalaAm — Screen Addiction Reversal App 🏆",
      description: "IIT Bhilai National Level Winner (₹10,000). Gamified mobile app reducing screen time in kids aged 4–12. Analyzed 50+ psychology studies, validated with 30+ parents. 40% screen time reduction.",
      highlights: ["₹10,000 Prize Money", "IIT Bhilai National", "React Native", "40% Screen Time Reduction", "30+ Parent Validated"],
      location: "IIT Bhilai",
      date: "December 2024",
      emoji: "🏆"
    },
    {
      title: "HackIndia 2025 — National Finalist",
      description: "Competed at HackIndia 2025 against 85+ teams from across India. Built and shipped a working AI-powered prototype end-to-end within the hackathon window — made it to the finalist round through strategic prototyping and strong technical execution.",
      highlights: ["85+ Competing Teams", "AI-Powered Prototype", "End-to-End Delivery", "National Finalist Round", "Strategic Execution"],
      location: "HackIndia",
      date: "2025",
      emoji: "🌟"
    }
  ]
};

export default unifiedData;
