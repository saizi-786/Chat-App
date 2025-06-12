// ✅ Enhancements for chat app with animations and typing indicator

import { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

const contacts = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

function ChatNavbar() {
  return (
    <nav className="navbar navbar-dark bg-primary fixed-top">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">Chat App</span>
      </div>
    </nav>
  );
}

function ContactSidebar({ contacts, onSelect, selectedId, isCollapsed, toggleSidebar }) {
  return (
    <div className={`bg-light border-end h-100 sidebar ${isCollapsed ? 'collapsed' : ''}`}> 
      <div className="d-flex justify-content-between align-items-center p-2 border-bottom">
        <strong>Contacts</strong>
        <button className="btn btn-sm btn-outline-secondary" onClick={toggleSidebar}>
          <i className={`bi ${isCollapsed ? 'bi-chevron-right' : 'bi-chevron-left'}`}></i>
        </button>
      </div>
      <div className="list-group">
        {contacts.map((contact) => (
          <button
            key={contact.id}
            className={`list-group-item list-group-item-action ${
              selectedId === contact.id ? 'active' : ''
            }`}
            onClick={() => onSelect(contact.id)}
          >
            {contact.name}
          </button>
        ))}
      </div>
    </div>
  );
}

function ChatWindow({ messages, typing }) {
  const containerRef = useRef();

  useEffect(() => {
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="p-3 overflow-auto flex-grow-1 chat-window" ref={containerRef}>
      {messages.map((msg, index) => (
        <div key={index} className={`chat-message ${msg.sentByMe ? 'sent' : 'received'}`}>
          <div className="p-2 rounded">
            <div>{msg.text}</div>
            <small className="text-muted d-block mt-1">{msg.status}</small>
          </div>
        </div>
      ))}
      {typing && (
        <div className="chat-message received">
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

function App() {
  const [selectedContactId, setSelectedContactId] = useState(1);
  const [messages, setMessages] = useState({
    1: [{ text: 'Hi Alice!', sentByMe: true, status: 'Sent' }],
    2: [{ text: 'Hey Bob!', sentByMe: true, status: 'Sent' }]
  });
  const [isTyping, setIsTyping] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSend = (text) => {
    const newMsg = { text, sentByMe: true, status: 'Sent' };
    setMessages((prev) => ({
      ...prev,
      [selectedContactId]: [...(prev[selectedContactId] || []), newMsg]
    }));
    setTimeout(() => {
      setMessages((prev) => ({
        ...prev,
        [selectedContactId]: prev[selectedContactId].map((m, i, arr) =>
          i === arr.length - 1 ? { ...m, status: 'Received' } : m
        )
      }));
    }, 1000);
  };

  return (
    <div>
      <ChatNavbar />
      <div className="d-flex" style={{ marginTop: '56px', height: 'calc(100vh - 56px)' }}>
        <ContactSidebar
          contacts={contacts}
          onSelect={setSelectedContactId}
          selectedId={selectedContactId}
          isCollapsed={isCollapsed}
          toggleSidebar={() => setIsCollapsed(!isCollapsed)}
        />
        <div className="d-flex flex-column flex-grow-1">
          <ChatWindow messages={messages[selectedContactId] || []} typing={isTyping} />
          <ChatInput onSend={handleSend} onTyping={setIsTyping} />
        </div>
      </div>
    </div>
  );
}

export default App;
