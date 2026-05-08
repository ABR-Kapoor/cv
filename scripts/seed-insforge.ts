/**
 * InsForge Database Seed Script
 * Run once after creating your database tables:
 *   npx tsx scripts/seed-insforge.ts
 *
 * Requires .env to have:
 *   VITE_INSFORGE_URL=https://db.insforge.dev/YOUR_PROJECT_ID
 *   INSFORGE_SERVICE_KEY=your_service_key
 */

import * as dotenv from 'dotenv';
dotenv.config();

const BASE_URL = process.env.VITE_INSFORGE_URL;
const SERVICE_KEY = process.env.INSFORGE_SERVICE_KEY;

if (!BASE_URL || !SERVICE_KEY) {
  console.error('❌  Missing VITE_INSFORGE_URL or INSFORGE_SERVICE_KEY in .env');
  process.exit(1);
}

const headers = {
  'Content-Type': 'application/json',
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
  Prefer: 'return=minimal',
};

async function insert(table: string, rows: unknown[]) {
  const res = await fetch(`${BASE_URL}/${table}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(rows),
  });
  if (res.ok) {
    console.log(`✅  ${table}: inserted ${rows.length} row(s)`);
  } else {
    const text = await res.text();
    console.error(`❌  ${table}: ${res.status} — ${text}`);
  }
}

async function main() {
  console.log('\n🌱  Seeding InsForge database…\n');

  // ── Projects ────────────────────────────────────────────────────────────────
  await insert('projects', [
    {
      title: 'LalaAm — Hackathon Winner',
      details: 'Led the prototype of a gamified mobile app to reduce screen addiction in kids (ages 4–12). Awarded ₹10,000 prize at IIT Bhilai.',
      location: 'IIT Bhilai',
      date: 'December 2024',
      tech_stack: ['React Native', 'AI/ML', 'Gamification', 'Mobile Development'],
      category: 'Mobile App — Hackathon Winner',
      highlights: ['🏆 Won ₹10,000 at IIT Bhilai', 'AI-Powered Gamification', 'Social Impact Focus'],
      display_order: 1,
    },
    {
      title: 'Slobby — AI Expert System',
      details: 'Developed a full-stack app that guided 50+ users in converting business ideas into AI-generated task roadmaps. Business ecosystem provider.',
      date: 'April 2025',
      tech_stack: ['React.js', 'Node.js', 'AI Integration', 'Business Intelligence'],
      category: 'AI Platform',
      highlights: ['50+ Active Users', 'AI-Generated Roadmaps', 'Full-Stack Solution'],
      display_order: 2,
    },
    {
      title: 'Anbiden_Now_bot',
      details: 'Built a Telegram bot using Python, asyncio, and ConversationHandler for secure, real-time anonymous chats.',
      platform: 'Telegram bot',
      date: 'June 2025',
      tech_stack: ['Python', 'Telegram API', 'Asyncio', 'Real-time Communication'],
      category: 'Bot Development',
      highlights: ['Real-time Anonymous Chat', 'Secure Communication', 'Python & Asyncio'],
      display_order: 3,
    },
    {
      title: 'Photogram',
      details: 'Built a real-time social media platform using React.js, Firebase, and Material UI for content sharing and discovery.',
      platform: 'Web2 Social media platform',
      date: 'May 2025',
      tech_stack: ['React.js', 'Firebase', 'Material UI', 'Social Media Platform'],
      category: 'Social Media Platform',
      highlights: ['Real-time Social Features', 'Material UI Design', 'Firebase Integration'],
      display_order: 4,
    },
  ]);

  // ── Services ─────────────────────────────────────────────────────────────────
  await insert('services', [
    {
      title: 'Business Consulting',
      description: 'Expert advice to help you scale, optimize operations, and drive growth. Includes strategy sessions and actionable plans for startups and enterprises.',
      price: 4999,
      features: ['Strategy Sessions', 'Market Analysis', 'Growth Roadmap', 'Follow-up Support'],
      feedbacks: ['Helped us double our revenue!', 'Professional and insightful.', 'Highly recommended for startups.'],
      image_urls: [],
      display_order: 1,
    },
    {
      title: 'Web Development',
      description: 'Custom websites and web apps built for performance, security, and conversion. Includes design, development, and launch support.',
      price: 14999,
      features: ['Custom Design', 'Responsive UI', 'SEO Optimised', 'Post-launch Support'],
      feedbacks: ['Our new site looks amazing!', 'Fast delivery and great support.', 'Best dev team we\'ve worked with.'],
      image_urls: [],
      display_order: 2,
    },
    {
      title: 'Technical Support',
      description: '24/7 support for your business tech stack. Includes troubleshooting, updates, and proactive monitoring for peace of mind.',
      price: 2999,
      features: ['24/7 Availability', 'Proactive Monitoring', 'Quick Response', 'Monthly Reports'],
      feedbacks: ['Quick response times.', 'Solved every issue.', 'Reliable and friendly.'],
      image_urls: [],
      display_order: 3,
    },
  ]);

  // ── Achievements ─────────────────────────────────────────────────────────────
  await insert('achievements', [
    {
      title: '🏆 Hackathon Winner — IIT Bhilai',
      description: 'Awarded ₹10,000 for LalaAm mobile app — gamified solution to reduce screen addiction in kids.',
      year: '2024',
      organization: 'IIT Bhilai',
      display_order: 1,
    },
    {
      title: '🚀 National Hackathon Contributor',
      description: 'Contributed to solution design & development in 3+ national-level hackathons with innovative tech solutions.',
      year: '2023–2024',
      organization: 'Various National Venues',
      display_order: 2,
    },
    {
      title: '🥇 Academic Excellence — BCA Rank #1',
      description: 'Achieved Rank #1 in BCA final examinations with outstanding academic performance.',
      year: '2024',
      organization: 'Govt. V.Y.T. College, Durg',
      display_order: 3,
    },
    {
      title: '⭐ Academic Achievement — Class 10 Rank #1',
      description: 'Rank #1 in 10th class, awarded and recognized by Dainik Bhaskar newspaper.',
      year: '2019',
      organization: 'Dainik Bhaskar',
      display_order: 4,
    },
    {
      title: '🎖️ National Recognition — INAE',
      description: 'Honored by Indian National Academy of Engineering (INAE), New Delhi for outstanding contributions.',
      year: '2024',
      organization: 'Indian National Academy of Engineering',
      display_order: 5,
    },
  ]);

  // ── Certifications ────────────────────────────────────────────────────────────
  await insert('certifications', [
    { name: 'Data Science, Data Analytics & Coding for Data', issuer: 'Coursera', year: '2023', display_order: 1 },
    { name: 'Java & HTML (Spoken Tutorial)', issuer: 'IIT Bombay', year: '2022', display_order: 2 },
    { name: 'Data Manipulation using Python & SciPy', issuer: 'Great Learning', year: '2023', display_order: 3 },
    { name: 'Full Stack Web Development', issuer: 'Udemy (Angela Yu)', year: '2023', display_order: 4 },
  ]);

  // ── Memberships ───────────────────────────────────────────────────────────────
  await insert('memberships', [
    {
      role: 'Student Member',
      organization: 'Indian National Academy of Engineering (INAE)',
      duration: 'December 2024 – 2029',
      display_order: 1,
    },
    {
      role: 'Executive Member',
      organization: 'Association of MCA, Bhilai Institute of Technology, Durg',
      duration: 'September 2024 – 2026',
      display_order: 2,
    },
  ]);

  console.log('\n✨  Seeding complete!\n');
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
