function ContactSidebar({ contacts, onSelect, selectedId, isCollapsed, toggleSidebar }) {
  return (
    <div className="bg-light border-end h-100 sidebar" style={{ width: '250px' }}>
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
            className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
              selectedId === contact.id ? 'active' : ''
            }`}
            onClick={() => onSelect(contact.id)}
          >
            <div>
              <span
                className="me-2 rounded-circle d-inline-block"
                style={{
                  width: '10px',
                  height: '10px',
                  backgroundColor: contact.online ? 'green' : 'gray'
                }}
                title={contact.online ? 'Online' : 'Offline'}
              ></span>
              {contact.name}
            </div>
            <small className="text-muted">{contact.online ? 'Online' : 'Offline'}</small>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ContactSidebar;
