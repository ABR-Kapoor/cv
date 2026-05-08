import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, message } = req.body ?? {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  if (String(message).length > 2000) {
    return res.status(400).json({ error: 'Message too long (max 2000 chars)' });
  }

  // Send directly to Telegram (no DB, no email)
  try {
    const tgText =
      `🔔 <b>New Portfolio Contact!</b>\n\n` +
      `👤 <b>Name:</b> ${name}\n` +
      `📧 <b>Email:</b> ${email}\n` +
      `💬 <b>Message:</b>\n${String(message).slice(0, 400)}${String(message).length > 400 ? '...' : ''}`;

    const tgRes = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: tgText,
          parse_mode: 'HTML',
        }),
      }
    );

    if (!tgRes.ok) {
      throw new Error(`Telegram API error: ${tgRes.status}`);
    }

    return res.status(200).json({
      success: true,
      message: 'Message delivered to Telegram!',
    });
  } catch (err) {
    console.error('Telegram error:', err);
    return res.status(500).json({ error: 'Failed to send message' });
  }
}
