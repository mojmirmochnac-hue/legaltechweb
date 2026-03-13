import 'dotenv/config';
import express from 'express';
import { Resend } from 'resend';

const app = express();
const port = process.env.PORT || 3000;
const toEmail = 'mojmi.mochnac@gmail.com';

if (!process.env.RESEND_API_KEY) {
  console.warn('Missing RESEND_API_KEY in environment. Email sending will fail until it is configured.');
}

const resend = new Resend(process.env.RESEND_API_KEY);

app.use(express.json());
app.use(express.static('public'));

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body ?? {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Prosím vyplňte meno, email aj správu.' });
  }

  try {
    const data = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'Formulár <onboarding@resend.dev>',
      to: [toEmail],
      reply_to: email,
      subject: `Nový formulár od: ${name}`,
      text: `Meno: ${name}\nEmail: ${email}\n\nSpráva:\n${message}`
    });

    return res.status(200).json({ success: true, id: data?.id });
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ error: 'Nepodarilo sa odoslať formulár.' });
  }
});

app.listen(port, () => {
  console.log(`Server beží na http://localhost:${port}`);
});
