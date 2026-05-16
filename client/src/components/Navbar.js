function Navbar({ user, logout }) {
  return (
    <div className="navbar">
      <h2>Team Task Manager</h2>

      <div>
        <span className="role">{user?.role}</span>

        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;