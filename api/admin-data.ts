import type { VercelRequest, VercelResponse } from '@vercel/node';

const ALLOWED_TABLES = [
  'projects',
  'services',
  'achievements',
  'certifications',
  'memberships',
  'contact_messages',
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Token');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // Verify admin token
  const adminToken = req.headers['x-admin-token'];
  if (!adminToken || adminToken !== process.env.VITE_ADMIN_PASSWORD_HASH) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { table, id } = req.query;

  if (!table || !ALLOWED_TABLES.includes(table as string)) {
    return res.status(400).json({ error: 'Invalid table' });
  }

  let url = `${process.env.VITE_INSFORGE_URL}/${table}`;
  if (id) url += `?id=eq.${id}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    apikey: process.env.INSFORGE_SERVICE_KEY!,
    Authorization: `Bearer ${process.env.INSFORGE_SERVICE_KEY}`,
  };

  if (req.method === 'POST') {
    headers['Prefer'] = 'return=representation';
  } else if (req.method === 'PATCH' || req.method === 'DELETE') {
    headers['Prefer'] = 'return=minimal';
  }

  try {
    const insforgeRes = await fetch(url, {
      method: req.method,
      headers,
      body: ['POST', 'PATCH'].includes(req.method!)
        ? JSON.stringify(req.body)
        : undefined,
    });

    const text = await insforgeRes.text();
    const data = text ? JSON.parse(text) : null;
    return res.status(insforgeRes.status).json(data);
  } catch (err) {
    console.error('admin-data error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
