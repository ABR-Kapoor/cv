import type { VercelRequest, VercelResponse } from '@vercel/node';

export const config = {
  api: {
    bodyParser: false, // handle raw binary ourselves
  },
};

async function readRawBody(req: VercelRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Token');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  // Verify admin token
  const adminToken = req.headers['x-admin-token'];
  if (!adminToken || adminToken !== process.env.VITE_ADMIN_PASSWORD_HASH) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const bucket = (req.query.bucket as string) || 'portfolio-assets';
  const filename = req.query.filename as string;

  if (!filename) {
    return res.status(400).json({ error: 'filename query param required' });
  }

  try {
    const body = await readRawBody(req);
    const storageUrl = `${process.env.VITE_INSFORGE_URL}/storage/v1/object/${bucket}/${filename}`;

    const storageRes = await fetch(storageUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.INSFORGE_SERVICE_KEY}`,
        'Content-Type': req.headers['content-type'] || 'application/octet-stream',
      },
      body,
    });

    const data = await storageRes.json();
    return res.status(storageRes.status).json(data);
  } catch (err) {
    console.error('admin-upload error:', err);
    return res.status(500).json({ error: 'Upload failed' });
  }
}
