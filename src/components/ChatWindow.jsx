import React, { useEffect, useRef } from 'react';

function ChatWindow({ messages }) {
  const endRef = useRef();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-grow-1 overflow-auto p-3" style={{ marginTop: '56px' }}>
      {messages.map((msg, index) => (
        <div key={index} className="d-flex mb-2">
          <div className="bg-secondary text-white p-2 rounded">{msg}</div>
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
}

export default ChatWindow;
