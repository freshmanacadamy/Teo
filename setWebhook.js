/**
 * setWebhook.js
 *
 * Usage:
 * VERCEL_URL=your-app.vercel.app SECRET_PATH=webhook TELEGRAM_BOT_TOKEN=123456:ABC... node setWebhook.js
 *
 * This will call Telegram setWebhook API to set:
 * https://<VERCEL_URL>/api/webhook?secret=<SECRET_PATH>
 */
const axios = require('axios');

(async () => {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const vercelUrl = process.env.VERCEL_URL;
    const secret = process.env.SECRET_PATH || 'webhook';

    if (!token) {
      console.error('Provide TELEGRAM_BOT_TOKEN environment variable.');
      process.exit(1);
    }
    if (!vercelUrl) {
      console.error('Provide VERCEL_URL environment variable (e.g. your-app.vercel.app).');
      process.exit(1);
    }

    const webhookUrl = `https://${vercelUrl}/api/webhook?secret=${encodeURIComponent(secret)}`;
    const setWebhookUrl = `https://api.telegram.org/bot${token}/setWebhook`;

    const res = await axios.post(setWebhookUrl, {
      url: webhookUrl,
      allowed_updates: ["message","edited_message","callback_query","inline_query"]
    });

    console.log('setWebhook response:', res.data);
  } catch (err) {
    console.error('Error setting webhook:', err?.response?.data || err.message);
  }
})();
