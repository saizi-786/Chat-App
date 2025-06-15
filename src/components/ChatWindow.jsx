import { useEffect, useRef } from 'react';

function ChatWindow({ messages, typing }) {
  const containerRef = useRef();

  useEffect(() => {
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="p-3 overflow-auto flex-grow-1 chat-window" ref={containerRef}>
      {messages.map((msg, index) => (
        <div key={index} className="d-flex justify-content-end mb-2">
          <div
            className="p-2 rounded bg-primary text-white"
            style={{ maxWidth: '70%' }}
          >
            <div>{msg.text}</div>
            <small className="text-white-50 d-block mt-1">
              {msg.timestamp} • {msg.status}
            </small>
          </div>
        </div>
      ))}

      {typing && (
        <div className="d-flex justify-content-end mb-2">
          <div className="p-2 rounded bg-light">
            <div className="typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatWindow;
