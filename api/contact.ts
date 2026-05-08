import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { name, email, message } = req.body ?? {};
    const cleanName = String(name ?? '').trim();
    const cleanEmail = String(email ?? '').trim();
    const cleanMessage = String(message ?? '').trim();

    if (!cleanName || !cleanEmail || !cleanMessage) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    if (cleanMessage.length > 2000) {
      return res.status(400).json({ error: 'Message too long (max 2000 chars)' });
    }

    if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
      return res.status(500).json({ error: 'Telegram env is not configured' });
    }

    const tgText =
      `New Portfolio Contact\n\n` +
      `Name: ${cleanName}\n` +
      `Email: ${cleanEmail}\n` +
      `Message:\n${cleanMessage.slice(0, 1200)}${cleanMessage.length > 1200 ? '...' : ''}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const tgRes = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: tgText,
        }),
        signal: controller.signal,
      }
    );
    clearTimeout(timeout);

    const raw = await tgRes.text();
    let tgData: { ok?: boolean; description?: string } | null = null;
    try {
      tgData = JSON.parse(raw);
    } catch {
      tgData = null;
        const hasToken = !!process.env.TELEGRAM_BOT_TOKEN;
        const hasChat = !!process.env.TELEGRAM_CHAT_ID;
        console.log('telegram env present', { hasToken, hasChat });
        if (!hasToken || !hasChat) {
          console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID');
          return res.status(500).json({ error: 'Telegram env is not configured' });
        }
      const detail = tgData?.description || raw || `HTTP ${tgRes.status}`;
      console.error('Telegram send error:', detail);
      return res.status(502).json({ error: 'Telegram delivery failed', detail });
    }

    return res.status(200).json({ success: true, message: 'Message delivered to Telegram!' });
  } catch (err) {
        // Attempt send with a small retry to handle transient network issues
        let lastError: any = null;
        for (let attempt = 1; attempt <= 2; attempt++) {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 10000);
          try {
            const tgRes = await fetch(
              `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text: tgText }),
                signal: controller.signal,
              }
            );
            clearTimeout(timeout);

            const raw = await tgRes.text();
            let tgData: { ok?: boolean; description?: string } | null = null;
            try {
              tgData = JSON.parse(raw);
            } catch {
              tgData = null;
            }

            console.log(`telegram response attempt=${attempt}`, { status: tgRes.status, ok: tgRes.ok, parsedOk: tgData?.ok === true });

            if (tgRes.ok && tgData?.ok !== false) {
              return res.status(200).json({ success: true, message: 'Message delivered to Telegram!' });
            }

            lastError = tgData?.description || raw || `HTTP ${tgRes.status}`;
            console.error('Telegram send error attempt', attempt, lastError);
            // small backoff before retrying
            if (attempt < 2) await new Promise((r) => setTimeout(r, 500));
          } catch (fetchErr) {
            clearTimeout(timeout);
            lastError = fetchErr && fetchErr.message ? fetchErr.message : String(fetchErr);
            console.error('Telegram fetch exception attempt', attempt, lastError);
            if (attempt < 2) await new Promise((r) => setTimeout(r, 500));
          }
        }

        return res.status(502).json({ error: 'Telegram delivery failed', detail: lastError });
