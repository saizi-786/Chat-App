// 📁 src/App.jsx

import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

import ChatNavbar from './components/ChatNavbar';
import ContactSidebar from './components/ContactSidebar';
import ChatWindow from './components/chatWindow'; 
import ChatInput from './components/ChatInput';

function App() {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Faisal', online: true },
    { id: 2, name: 'Afzal', online: false },
    { id: 3, name: 'Huzaifa', online: true },
    { id: 4, name: 'Owais', online: false },
    { id: 5, name: 'Ammar', online: true },
    { id: 6, name: 'Hummam', online: false },
    { id: 7, name: 'Shaheer', online: true },
    { id: 8, name: 'Shayan', online: false },
    { id: 9, name: 'Hammad', online: true },
    { id: 10, name: 'Misbah', online: false },
    { id: 11, name: 'Sufiyan', online: true },
    { id: 12, name: 'Nyle', online: false }
  ]);

  const [selectedContactId, setSelectedContactId] = useState(1);
  const [messages, setMessages] = useState({
    1: [{ text: 'Hi Faisal!', sentByMe: true, status: 'Sent', timestamp: '10:15 AM' }],
    2: [{ text: 'Hey Afzal!', sentByMe: true, status: 'Sent', timestamp: '10:16 AM' }],
    3: [{ text: 'Hello Huzaifa!', sentByMe: true, status: 'Sent', timestamp: '10:17 AM' }],
    4: [{ text: 'Good morning Owais!', sentByMe: true, status: 'Sent', timestamp: '10:18 AM' }],
    5: [{ text: 'How are you, Ammar?', sentByMe: true, status: 'Sent', timestamp: '10:19 AM' }],
    6: [{ text: 'Hey Hummam!', sentByMe: true, status: 'Sent', timestamp: '10:20 AM' }],
    7: [{ text: 'Hello Shaheer!', sentByMe: true, status: 'Sent', timestamp: '10:21 AM' }],
    8: [{ text: "What's up, Shayan?", sentByMe: true, status: 'Sent', timestamp: '10:22 AM' }],
    9: [{ text: 'Hi Hammad!', sentByMe: true, status: 'Sent', timestamp: '10:23 AM' }],
    10: [{ text: 'Hey Misbah!', sentByMe: true, status: 'Sent', timestamp: '10:24 AM' }],
    11: [{ text: 'Sufiyan, are you there?', sentByMe: true, status: 'Sent', timestamp: '10:25 AM' }],
    12: [{ text: 'Morning Nyle!', sentByMe: true, status: 'Sent', timestamp: '10:26 AM' }]
  });

  const [isTyping, setIsTyping] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // 🔁 Randomly toggle online/offline status every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setContacts(prev =>
        prev.map(contact =>
          Math.random() > 0.5
            ? { ...contact, online: !contact.online }
            : contact
        )
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = (text) => {
    const newMsg = {
      text,
      sentByMe: true,
      status: 'Sent',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
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
      <div
        className={`d-flex transition-all duration-300 ease-in-out ${isCollapsed ? 'sidebar-collapsed' : ''}`}
        style={{ marginTop: '56px', height: 'calc(100vh - 56px)' }}
      >
        {isCollapsed ? (
          <div
            className="bg-light border-end d-flex align-items-center justify-content-center"
            style={{ width: '40px', transition: 'width 0.3s ease' }}
          >
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setIsCollapsed(false)}
              title="Show Contacts"
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        ) : (
          <div style={{ transition: 'width 0.3s ease' }}>
            <ContactSidebar
              contacts={contacts}
              onSelect={setSelectedContactId}
              selectedId={selectedContactId}
              isCollapsed={isCollapsed}
              toggleSidebar={() => setIsCollapsed(true)}
            />
          </div>
        )}

        <div className="d-flex flex-column flex-grow-1">
          <ChatWindow messages={messages[selectedContactId] || []} typing={isTyping} />
          <ChatInput onSend={handleSend} onTyping={setIsTyping} />
        </div>
      </div>
    </div>
  );
}

export default App;
