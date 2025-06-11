# Turners AI Insurance App 

_Tina, your friendly AI insurance advisor, is here to help you choose the best car insurance — one question at a time._

## Description

**Turners AI Insurance App** is a full stack web application powered by Google's Gemini API. It simulates a friendly and intelligent conversation with "Tina," an AI assistant designed to recommend the most suitable car insurance policy for users based on their answers to a series of personalized questions.

---

## Tech Stack

**Frontend**  
- React (with functional components and hooks)  
- CSS  

**Backend**  
- Node.js  
- Express.js  
- Axios  
- dotenv  

**AI**  
- Google Gemini 2.0-flash API (via `generateContent` endpoint)

**DevOps**  
- Docker (optional support)  
- RESTful API  
- CORS-enabled

---

## Features

- Chatbot-style interface with Tina, the insurance assistant  
- AI-powered recommendations using Google Gemini  
- Session reset endpoint for clean conversation starts  
- Handles vehicle eligibility rules (MBI, Comprehensive, Third Party)  
- Adapts questions dynamically based on previous answers  
- Friendly, formal, and professional tone throughout

---

## Project Structure

```
turners-ai-insurance-app/
├── front-end/
│   ├── App.jsx
│   ├── components/
│   ├── App.css
│   └── ...
├── back-end/
│   ├── server.js
│   └── .env (not committed)
├── docker-compose.yml (optional)
└── README.md
```

---

## Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/turners-ai-insurance-app.git
cd turners-ai-insurance-app
```

---

### 2. Environment Setup

Create a `.env` file in `/back-end`:

```env
GEMINI_API_KEY=your_google_gemini_api_key
PORT=5050
```

---

### 3. Running Locally (Without Docker)

**Backend**

```bash
cd back-end
npm install
npm start
```

**Frontend**

```bash
cd front-end
npm install
npm start
```

Frontend runs on `http://localhost:3000`, backend on `http://localhost:5050`.

---

### 4. Running With Docker

```bash
docker-compose up --build
```

Make sure to configure `.env` for the backend container.

---

## API Endpoints

| Method | Endpoint            | Description                             |
|--------|---------------------|-----------------------------------------|
| POST   | `/api/reset`        | Resets the conversation                |
| POST   | `/api/gemini`       | Sends message to Gemini and returns AI response |
| GET    | `/test`             | Health check for backend server         |

---

## Author

Built by **Kent Wharerau**  
[GitHub](https://github.com/Kent-Wharerau)
---

## Notes

- Tina uses a system prompt that defines conversation rules and tone.
- Recommendation logic is handled entirely through the AI prompt.
- Be sure to keep your API key safe — do not commit your `.env` file.