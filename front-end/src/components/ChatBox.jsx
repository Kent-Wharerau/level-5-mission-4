import React from 'react';
import styles from './ChatBox.module.css';

function ChatBox({ messages }) {
  return (
    <div className={styles.chatBox}>
      {messages.map((msg, index) => (
        <p key={index}>
          <strong>{msg.sender}:</strong> {msg.text}
        </p>
      ))}
    </div>
  );
}

export default ChatBox;