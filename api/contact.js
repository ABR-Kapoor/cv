export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('[CONTACT] Handler invoked, method:', req.method);

    const body = req.body || {};
    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const message = String(body.message || '').trim();

    console.log('[CONTACT] Data parsed:', { name: name.length, email: email.length, message: message.length });

    if (!name || !email || !message) {
      console.warn('[CONTACT] Missing fields');
      return res.status(400).json({ error: 'All fields required' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.warn('[CONTACT] Invalid email:', email);
      return res.status(400).json({ error: 'Invalid email' });
    }

    if (message.length > 2000) {
      console.warn('[CONTACT] Message too long');
      return res.status(400).json({ error: 'Message too long' });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.error('[CONTACT] Missing env: token=' + !!token + ', chatId=' + !!chatId);
      return res.status(500).json({ error: 'Server not configured' });
    }

    console.log('[CONTACT] Env present, sending to Telegram...');

    const timestamp = new Date().toISOString();
    const heading = 'Enquiry msg from portfolio website';
    const text = `${heading}\n\nTimestamp: ${timestamp}\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message.slice(0, 1200)}`;

    let error = null;
    for (let i = 1; i <= 2; i++) {
      try {
        const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text }),
        });

        const data = await response.json();
        console.log(`[CONTACT] Telegram attempt ${i}: status=${response.status}, ok=${data.ok}`);

        if (data.ok) {
          console.log('[CONTACT] Success!');
          return res.status(200).json({ success: true });
        }

        error = data.description || 'Unknown error';
        if (i === 1) await new Promise((r) => setTimeout(r, 500));
      } catch (e) {
        error = e instanceof Error ? e.message : 'Fetch failed';
        console.error(`[CONTACT] Attempt ${i} failed:`, error);
        if (i === 1) await new Promise((r) => setTimeout(r, 500));
      }
    }

    console.error('[CONTACT] Failed after retries:', error);
    return res.status(502).json({ error: 'Failed to send', detail: error });
  } catch (err) {
    console.error('[CONTACT] Exception:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
