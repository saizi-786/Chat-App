import { useState } from 'react';
import './ChatInput.css';

function ChatInput({ onSend, onTyping }) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText('');
  };

  return (
    <div className="p-3 border-top bg-white">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            onTyping(true);
            setTimeout(() => onTyping(false), 1000);
          }}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button className="btn btn-primary" onClick={handleSend} disabled={!text.trim()}>
          <i className="bi bi-telegram fs-4"></i>
        </button>
      </div>
    </div>
  );
}

export default ChatInput;