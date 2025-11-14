# Telegram Bot for Vercel (Webhook-based)

This project is a minimal Telegram bot implemented as a **Vercel serverless function** (webhook). It **echoes** incoming text messages back to the sender and shows how to register the webhook.

## Files
- `api/webhook.js` - Vercel serverless function handling Telegram updates.
- `setWebhook.js` - Script to set Telegram webhook to your Vercel domain.
- `package.json` - Dependencies and scripts.
- `.env.example` - Example environment variables.
- `README.md` - This file.

## Setup & Deploy
1. Create a new Vercel project and link your repository, or deploy manually.
2. In your Vercel project's **Environment Variables**, set:
   - `TELEGRAM_BOT_TOKEN` = `your_bot_token` (from @BotFather)
   - `SECRET_PATH` = `optional_secret_path` (recommended, e.g. `mysecret123`)
3. Deploy the project. After deployment, note your Vercel domain, e.g. `your-app.vercel.app`.
4. Register the webhook (one-time) by running locally:

```bash
# install deps
npm install

# set webhook (replace with your domain)
VERCEL_URL=your-app.vercel.app SECRET_PATH=mysecret123 node setWebhook.js
```

This calls Telegram's `setWebhook` API to point updates to:
`https://your-app.vercel.app/api/webhook?secret=<SECRET_PATH>`

## Local Testing
You can test locally using `vercel dev` or with ngrok tunneling to expose a local port and then set webhook using that public URL.

## Security
- **Never** store your bot token in source code. Use Vercel environment variables.
- Use `SECRET_PATH` to add a secret query parameter so only Telegram (which you set) reaches your endpoint.

## Behavior
- On receiving a text message, the bot replies with the same text (echo).
- You can modify `api/webhook.js` to add more functionality.

