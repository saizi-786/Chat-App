import React, { useState } from 'react';
import './ChatInput.css';

function ChatInput({ onSend }) {
  const [text, setText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSend = () => {
    if (!text.trim()) return;

    setIsAnimating(true);
    onSend(text);
    setText('');

    setTimeout(() => {
      setIsAnimating(false);
    }, 500); // duration of spin
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="p-3 border-top bg-white">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="btn btn-primary" onClick={handleSend} disabled={!text.trim()}>
  <i className="bi bi-telegram fs-4"></i>
</button>

      </div>
    </div>
  );
}

export default ChatInput;
