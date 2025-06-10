import React, { useState } from 'react';
import ChatBox from './components/ChatBox.jsx';
import InputBar from './components/InputBar.jsx';
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    {
      sender: 'Tina',
      text: "I’m Tina. So you want to know about insurance? I can help with that! Ask me anything.",
    },
  ]);

  const handleUserMessage = async (text) => {
    const userMsg = { sender: 'You', text };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch('http://localhost:5000/api/gemini', {
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