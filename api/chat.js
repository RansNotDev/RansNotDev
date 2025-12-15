import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { question } = req.body || {};
  if (!question) {
    return res.status(400).json({ error: 'question is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = await model.generateContent({
      contents: [{ parts: [{ text: question }]}],
    });
    const text = result?.response?.text?.() || 'No response';
    return res.status(200).json({ text });
  } catch (err) {
    console.error('Gemini error:', err);
    // Surface a concise error to the client
    return res.status(500).json({ error: 'Gemini request failed. Check API key, model access, or usage limits.' });
  }
}

