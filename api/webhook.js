/**
 * Vercel Serverless function for Telegram webhook.
 * Expects TELEGRAM_BOT_TOKEN and SECRET_PATH in environment variables.
 *
 * This function replies (echo) to incoming text messages.
 */
const axios = require('axios');

module.exports = async (req, res) => {
  try {
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const SECRET_PATH = process.env.SECRET_PATH || 'webhook';
    if (!TELEGRAM_BOT_TOKEN) {
      res.status(500).send('TELEGRAM_BOT_TOKEN is not configured.');
      return;
    }

    // Simple protection: require secret path as query parameter
    const secretQuery = req.query.secret || '';
    if (secretQuery !== SECRET_PATH) {
      res.status(401).send('Unauthorized - invalid secret');
      return;
    }

    // Telegram sends updates as JSON POST requests
    const update = req.body;

    // Always respond quickly to Telegram
    res.status(200).send('OK');

    if (!update) return;

    // Handle message updates
    if (update.message && update.message.text) {
      const chatId = update.message.chat.id;
      const text = update.message.text;
      const messageId = update.message.message_id;

      // Echo the same text back
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      await axios.post(url, {
        chat_id: chatId,
        text: `You said: ${text}`,
        reply_to_message_id: messageId
      }).catch(err => {
        // Log error to Vercel logs
        console.error('Failed to send message:', err?.response?.data || err.message);
      });
    }

    // You can handle other update types here (callback_query, inline_query, etc.)
  } catch (err) {
    console.error('Webhook handler error:', err);
    // If response not yet sent, send error
    if (!res.headersSent) res.status(500).send('Internal Server Error');
  }
};
