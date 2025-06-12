import React from 'react';

function ContactSidebar({ contacts, selectedContact, onSelect }) {
  return (
    <div className="bg-light border-end" style={{ width: '250px', marginTop: '56px' }}>
      <ul className="list-group list-group-flush">
        {contacts.map((contact) => (
          <li
            key={contact}
            className={`list-group-item ${selectedContact === contact ? 'active' : ''}`}
            onClick={() => onSelect(contact)}
            style={{ cursor: 'pointer' }}
          >
            {contact}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactSidebar;
