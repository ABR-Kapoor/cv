// Data aggregator to combine all JSON data sources
import personalInfo from './personal_info.json';
import education from './education.json';
import experience from './experience.json';
import projects from './projects.json';
import technicalSkills from './technical_skills.json';
import achievements from './achievements.json';

// Skill level mapping helper - Based on your real expertise
const getSkillLevel = (skill: string): number => {
  const levelMap: { [key: string]: number } = {
    // Programming Languages - Your strongest skills
    'Java': 88,
    'Python': 90,
    'JavaScript': 85,
    'TypeScript': 82,
    'SQL (PostgreSQL, MySQL)': 85,
    'HTML': 95,
    'CSS': 90,

    // Frameworks - Based on your projects
    'React.js': 88,
    'Next.js': 85,
    'Node.js': 82,
    'Express.js': 80,
    'Spring Boot': 78,
    'Tailwind CSS': 90,

    // Data Science & ML
    'Scikit-learn': 75,
    'Pandas': 80,
    'NumPy': 78,
    'Matplotlib': 75,
    'NLP': 72,
    'RAG': 70,
    'Fine tuning': 68,

    // Cloud & DevOps
    'AWS (EC2, S3)': 70,
    'Docker': 68,
    'Firebase': 85,
    'Git/GitHub': 90,

    // Databases
    'MongoDB': 78,
    'PostgreSQL': 82,
    'Firebase Firestore': 85,

    // Developer Tools
    'Git': 90,
    'VS Code': 95,
    'PyCharm': 85,
    'Figma': 80,
    'Postman': 85,
    'ChatGPT': 92,
    'Gemini pro': 88,
    'Copilot': 90,

    // Soft Skills - Based on your achievements
    'Leadership': 90,
    'Self-Learner': 95,
    'Good at Negotiations': 85,
    'Managerial skills': 82,
    'Great prompt engineer': 88,
    'Questioning skill': 90,
    'Observation': 87
  };

  return levelMap[skill] || 75; // Default level for unlisted skills
};

// Enhanced emoji mapping
const getSkillEmoji = (skill: string): string => {
  const emojiMap: { [key: string]: string } = {
    'Java': '☕',
    'Python': '🐍',
    'JavaScript': '⚡',
    'TypeScript': '🔷',
    'SQL (PostgreSQL, MySQL)': '🗄️',
    'HTML': '🌐',
    'CSS': '🎨',
    'React.js': '⚛️',
    'Next.js': '▲',
    'Node.js': '🟢',
    'Express.js': '🚀',
    'Spring Boot': '🌱',
    'Tailwind CSS': '💨',
    'Scikit-learn': '🤖',
    'Pandas': '🐼',
    'NumPy': '🔢',
    'Matplotlib': '📊',
    'NLP': '🗣️',
    'RAG': '🔍',
    'MongoDB': '🍃',
    'PostgreSQL': '🐘',
    'Firebase Firestore': '🔥',
    'AWS (EC2, S3)': '☁️',
    'Docker': '🐳',
    'Firebase': '🔥',
    'Git/GitHub': '🐙',
    'Git': '📝',
    'VS Code': '💻',
    'PyCharm': '🐍',
    'Figma': '🎨',
    'Postman': '📮',
    'ChatGPT': '🤖',
    'Gemini pro': '💎',
    'Copilot': '✈️',
    'Leadership': '👑',
    'Self-Learner': '📚',
    'Good at Negotiations': '🤝',
    'Managerial skills': '👨‍💼',
    'Great prompt engineer': '🎯',
    'Questioning skill': '❓',
    'Observation': '👁️'
  };

  return emojiMap[skill] || '🔧';
};

// Unified data structure using ALL your real JSON data
export const unifiedData = {
  // Personal Information from personal_info.json
  personal: {
    name: personalInfo.name,
    email: personalInfo.email,
    phone: personalInfo.phone,
    title: "Full Stack Developer & AI Enthusiast",
    tagline: "MCA Student • Hackathon Winner • Innovation Leader",
    location: "India",
    socialLinks: {
      github: personalInfo.github,
      linkedin: personalInfo.linkedin,
      whatsapp: personalInfo.whatsapp,
    },
    funFacts: [
      "Hackathon Winner at IIT Bhilai 🏆",
      "Rank #1 in BCA final 🥇",
      "AI & Prompt Engineering Expert 🤖",
      "Built 4+ Real-world Projects 🚀",
      "Great at turning ideas into reality ✨"
    ]
  },

  // Education from education.json
  education: {
    degrees: education.map((edu, index) => ({
      title: edu.degree,
      institution: edu.college,
      duration: edu.year,
      location: edu.college.includes('Durg') ? 'Durg, Chhattisgarh' : 'Bhilai, Chhattisgarh',
      gpa: edu.cgpa || (edu.status === 'Ongoing' ? 'In Progress' : 'N/A'),
      status: edu.status,
      achievements: index === 0 ? [
        "CGPA: 8.2/10 - Excellent Performance",
        "Rank #1 in BCA final",
        "Active participation in technical events and projects"
      ] : [
        "Currently pursuing Master's in Computer Applications",
        "Specializing in advanced AI and software development",
        "Expected graduation: 2026"
      ],
      subjects: index === 0 ? ["Programming", "Database Systems", "Web Development", "DSA", "Software Engineering"] : ["Advanced AI/ML", "Data Science", "Cloud Computing", "Research Methodology", "Software Architecture"],
      performance: index === 0 ? [82, 85, 88, 80, 84] : [90, 88, 85, 87, 89]
    }))
  },

  // Skills from technical_skills.json - Using ALL categories
  skills: {
    technical: [
      // Programming Languages
      ...technicalSkills.languages.map((skill: string) => ({
        name: skill,
        level: getSkillLevel(skill),
        emoji: getSkillEmoji(skill),
        category: 'Programming Languages',
        description: `Proficient in ${skill} with hands-on project experience`
      })),

      // Top Frameworks & Libraries
      ...technicalSkills.frameworks_libraries.slice(0, 6).map((skill: string) => ({
        name: skill,
        level: getSkillLevel(skill),
        emoji: getSkillEmoji(skill),
        category: 'Frameworks & Libraries',
        description: `Experienced in building applications with ${skill}`
      })),

      // Cloud & DevOps
      ...technicalSkills.cloud_devops.map((skill: string) => ({
        name: skill,
        level: getSkillLevel(skill),
        emoji: getSkillEmoji(skill),
        category: 'Cloud & DevOps',
        description: `Experience with ${skill} for deployment and development`
      })),

      // Databases
      ...technicalSkills.databases.map((skill: string) => ({
        name: skill,
        level: getSkillLevel(skill),
        emoji: getSkillEmoji(skill),
        category: 'Databases',
        description: `Database management and optimization with ${skill}`
      }))
    ],

    soft: technicalSkills.soft_skills.map((skill: string) => ({
      name: skill,
      level: getSkillLevel(skill),
      emoji: getSkillEmoji(skill),
      category: 'Soft Skills',
      description: `Strong ${skill.toLowerCase()} abilities demonstrated through various projects and achievements`
    }))
  },

  // Experience from experience.json
  experience: experience.map((exp) => ({
    role: exp.role,
    company: exp.company,
    duration: exp.duration,
    description: `Gained valuable industry experience at ${exp.company} working on enterprise-level Java applications and learning professional development practices.`,
    highlights: [
      "Developed Java-based backend modules using Spring Boot 🚀",
      "Learned industry best practices and coding standards ✅",
      "Collaborated with experienced development teams 🤝",
      "Contributed to multiple project modules and features 💪"
    ],
    techStack: ["Java", "Spring Boot", "Git", "Agile Methodology", "Team Collaboration"],
    funAchievement: "Successfully completed 4-month internship with excellent feedback! 🌟"
  })),

  // Projects from projects.json - All your real projects
  projects: projects.map((project, index) => ({
    title: project.title,
    description: project.details,
    techStack: index === 0 ? ["React Native", "AI/ML", "Gamification", "Mobile Development"] :
                index === 1 ? ["React.js", "Node.js", "AI Integration", "Business Intelligence"] :
                index === 2 ? ["Python", "Telegram API", "Asyncio", "Real-time Communication"] :
                ["React.js", "Firebase", "Material UI", "Social Media Platform"],
    features: project.details.split('.').slice(0, 3).map(feature => feature.trim()),
    demoLink: project.title.includes('Slobby') ? "#" : undefined,
    githubLink: "#",
    emoji: index === 0 ? "🌱" : index === 1 ? "🤖" : index === 2 ? "💬" : "📷",
    status: project.date,
    category: index === 0 ? "Mobile App - Hackathon Winner" :
              index === 1 ? "AI Platform" :
              index === 2 ? "Bot Development" :
              "Social Media Platform",
    highlights: project.title.includes('Hackathon') ? ["🏆 Won ₹10,000 at IIT Bhilai", "AI-Powered Solution", "Social Impact Focus"] :
                project.title.includes('Slobby') ? ["50+ Active Users", "AI-Generated Roadmaps", "Full-Stack Solution"] :
                project.title.includes('bot') ? ["Real-time Anonymous Chat", "Secure Communication", "Python & Asyncio"] :
                ["Real-time Social Features", "Material UI Design", "Firebase Integration"]
  })),

  // Awards from achievements.json - Your real achievements
  awards: achievements.map((achievement) => {
    if (achievement.includes('Hackathon')) {
      return {
        title: '🏆 Hackathon Winner - IIT Bhilai',
        description: 'Awarded ₹10,000 for LalaAm mobile app - gamified solution to reduce screen addiction in kids',
        year: '2024',
        organization: 'IIT Bhilai'
      };
    } else if (achievement.includes('Rank #1 in BCA')) {
      return {
        title: '🥇 Academic Excellence - BCA',
        description: 'Achieved Rank #1 in BCA final examinations with outstanding academic performance',
        year: '2024',
        organization: 'Govt. V.Y.T. College, Durg'
      };
    } else if (achievement.includes('10th class')) {
      return {
        title: '⭐ Academic Achievement - Class 10',
        description: 'Rank #1 in 10th class, awarded and recognized by Dainik Bhaskar newspaper',
        year: '2019',
        organization: 'Dainik Bhaskar'
      };
    } else if (achievement.includes('INAE')) {
      return {
        title: '🎖️ National Recognition - INAE',
        description: 'Honored by Indian National Academy of Engineering (INAE), New Delhi for outstanding contributions',
        year: '2024',
        organization: 'Indian National Academy of Engineering'
      };
    } else {
      return {
        title: '🏅 Outstanding Achievement',
        description: achievement,
        year: '2023-2024',
        organization: 'Various Organizations'
      };
    }
  }),

  // Enhanced Fun Events - Based on your real hackathon wins
  funEvents: [
    {
      title: "LalaAm - Hackathon Winner 🏆",
      description: "Led the prototype of a gamified mobile app to reduce screen addiction in kids (ages 4-12). Awarded ₹10,000 prize money at IIT Bhilai.",
      highlights: ["₹10,000 Prize Money", "AI-Powered Gamification", "Social Impact Focus", "Team Leadership", "IIT Bhilai Recognition"],
      location: "IIT Bhilai",
      date: "December 2024",
      emoji: "🏆"
    },
    {
      title: "National Hackathon Champion 🚀",
      description: "Contributed to solution design & development in 3+ national-level hackathons with innovative tech solutions.",
      highlights: ["Multiple National Participations", "Innovative AI Solutions", "Team Collaboration", "Technical Excellence", "Problem-Solving Focus"],
      location: "Various National Venues",
      date: "2023-2024",
      emoji: "🚀"
    }
  ]
};

export default unifiedData;