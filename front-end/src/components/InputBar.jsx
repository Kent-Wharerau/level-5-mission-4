import React, { useState } from 'react';
import styles from './InputBar.module.css';

function InputBar({ onSend }) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Type your answer..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        className={styles.input}
      />
      <button onClick={handleSend} className={styles.button}>
        Send
      </button>
    </div>
  );
}

export default InputBar;