import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();


// ========== CONFIGERATION ========== //

// load enviornment variables
const app = express();
const PORT = process.env.PORT || 5000;
const GEMINI_API_KEY= process.env.GEMINI_API_KEY;


// ========== MIDDLEWARE ========== //

app.use(cors());
app.use(express.json());


// ========== ENDPOINTS ========== //

// Health check endpoint
app.get('/', (req, res) => {
  res.send('Backend is running ✅');
});

// Gemini API endpoint
app.post('/api/gemini', async (req, res) => {
    try {
      const { message } = req.body;
  
      console.log("Incoming message from frontend:", message);
  
      if (!message) {
        return res.status(400).json({ error: 'Missing message in request body' });
      }
  
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
  
      const geminiPayload = {
        contents: [
          {
            role: "user", // First part is the instruction / system prompt
            parts: [
              {
                text: ""
              }
            ]
          },
          {
            role: "user", // Second part is the actual user message sent from the frontend
            parts: [
              {
                text: message
              }
            ]
          }
        ]
      };
  
  
      const response = await axios.post(url, geminiPayload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No reply from Gemini.';
      res.json({ reply });
  
    } catch (error) {
      console.error('Error calling Gemini API:', error?.response?.data || error.message || error);
      res.status(500).json({ error: 'Failed to call Gemini API' });
    }
  });
  
  // ---------- START SERVER ---------- // 
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
