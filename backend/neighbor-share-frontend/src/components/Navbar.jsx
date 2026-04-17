import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="nav-inner">

        {/* Enhanced Logo + Brand */}
        <h2
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: "bold",
            fontSize: "20px",
            cursor: "pointer"
          }}
          onClick={() => navigate("/")}
        >
          <span style={{ fontSize: "24px" }}>🏘️</span>

          <span>
            Neighbor<span style={{ color: "#60a5fa" }}>Share</span>
          </span>
        </h2>

        {/* Navigation Links */}
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/items">Browse Items</Link>
          <Link to="/add-item">List an Item</Link>
          <Link to="/my-bookings">My Rentals</Link>
          <Link to="/incoming-requests">Requests</Link>

          {!token ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Sign Up</Link>
            </>
          ) : (
            <button
              className="small-btn"
              onClick={logout}
              style={{ background: "#ef4444" }}
            >
              Logout
            </button>
          )}
        </div>

      </div>
    </div>
  );
}