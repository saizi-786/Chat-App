import './Chatnavbar.css';

function ChatNavbar() {
  return (
    <nav className="navbar navbar-dark bg-primary fixed-top">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <span className="navbar-brand mb-0 h1">LOXO</span>
        <span className="loxo-logo text-white fw-bold fs-5">
          <i className="bi bi-chat-dots-fill me-1"></i>loxo
        </span>
      </div>
    </nav>
  );
}

export default ChatNavbar;
