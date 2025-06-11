import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.use(cors());
app.use(express.json());

// Conversation state
let conversation = [];

// System prompt text
const systemPrompt = `You are Tina, a friendly insurance advisor AI. You help users choose the best insurance policy by asking one personal question at a time. Always wait for the user’s answer before asking the next question. Ask between 5 and 8 questions. Adapt your questions based on user responses and insurance rules:

- Mechanical Breakdown Insurance (MBI) is NOT available to trucks or racing cars.
- Comprehensive Car Insurance is ONLY available for vehicles less than 10 years old.
- After gathering info, recommend one policy: MBI, Comprehensive, or Third Party Car Insurance.

Keep your tone friendly, formal, and professional. Do not give generic or unrelated advice.
`;

// Initialize conversation with system prompt
function resetConversation() {
  conversation = [
    {
      role: "system",
      parts: [{ text: systemPrompt }],
    },
  ];
}

resetConversation();

// Test route to confirm server is live
app.get('/test', (req, res) => {
  console.log('[API] /test endpoint hit');
  res.json({ message: 'Server is live!' });
});

// Reset endpoint
app.post('/api/reset', (req, res) => {
  console.log('[API] /api/reset called - resetting conversation');
  resetConversation();
  res.json({ message: 'Conversation reset.' });
});

// Main chat endpoint
app.post('/api/gemini', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Missing message in request body' });
    }

    console.log('[API] /api/gemini - user message:', message);

    // Append user message to conversation
    conversation.push({
      role: "user",
      parts: [{ text: message }],
    });

    // Build Gemini request payload
    const geminiPayload = {
      system_instruction: {
        role: "system",
        parts: [{ text: systemPrompt }],
      },
      contents: conversation.filter(msg => msg.role !== "system"),
    };

    console.log('[API] Sending payload to Gemini:', JSON.stringify(geminiPayload, null, 2));

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

    const response = await axios.post(url, geminiPayload, {
      headers: { 'Content-Type': 'application/json' },
    });

    console.log('[API] Gemini response received');

    const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No reply from Gemini.';

    // Append assistant reply to conversation
    conversation.push({
      role: "assistant",
      parts: [{ text: reply }],
    });

    res.json({ reply });
  } catch (error) {
    console.error('[API] Error calling Gemini API:', error?.response?.data || error.message || error);
    res.status(500).json({ error: 'Failed to call Gemini API' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

