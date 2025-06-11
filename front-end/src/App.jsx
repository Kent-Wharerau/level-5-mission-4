import React, { useState, useEffect } from 'react';
import ChatBox from './components/ChatBox.jsx';
import InputBar from './components/InputBar.jsx';
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    {
      sender: 'Tina',
      text: "I’m Tina. I help you choose the right insurance policy. May I ask you a few personal questions to make sure I recommend the best policy for you?",
    },
  ]);

  // Reset backend conversation when app loads
  useEffect(() => {
    fetch('http://localhost:5050/api/reset', {
      method: 'POST',
    }).catch((err) => {
      console.error('Failed to reset conversation:', err);
    });
  }, []);

  const handleUserMessage = async (text) => {
    if (!text.trim()) return; // ignore empty messages

    const userMsg = { sender: 'You', text };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch('http://localhost:5050/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      const tinaMsg = { sender: 'Tina', text: data.reply || 'No response from AI.' };
      setMessages((prev) => [...prev, tinaMsg]);
    } catch (err) {
      console.error("Fetch error:", err.message);
      setMessages((prev) => [
        ...prev,
        { sender: 'Tina', text: 'Oops, something went wrong talking to the AI!' },
      ]);
    }
  };

  return (
    <div className="app">
      <h1>Tina: Your Insurance Advisor</h1>
      <ChatBox messages={messages} />
      <InputBar onSend={handleUserMessage} />
    </div>
  );
}

export default App;

