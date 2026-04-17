import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const heroImage =
    "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80";

  const toolsImage =
    "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80";

  const communityImage =
    "https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=800&q=80";

  const rentalImage =
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="dashboard-page">
      {/* Hero Section */}
      <div className="hero-banner card">
        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-badge">🏘️ Community-Based Rental Platform</p>

            <h1 className="hero-title">
              Rent, Share, and Discover Useful Items Inside Your Community
            </h1>

            <p className="hero-subtitle">
              Neighbor-Share helps residents list tools, gadgets, and household
              items that are usually unused, so others in the same apartment or
              neighborhood can rent them easily instead of buying again.
            </p>

            <div className="hero-actions">
              <button onClick={() => navigate("/items")}>Browse Items</button>
              <button
                className="secondary-btn"
                onClick={() => navigate("/add-item")}
              >
                List an Item
              </button>
            </div>
          </div>

          <div className="hero-image-wrap">
            <img src={heroImage} alt="Community sharing" className="hero-image" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid">
        <div className="card stat-card">
          <h3>🔧 Tools & Gadgets</h3>
          <p>
            Share or rent useful items like drills, ladders, cameras, camping
            gear, speakers, and more.
          </p>
        </div>

        <div className="card stat-card">
          <h3>🤝 Trusted Community</h3>
          <p>
            Keep rentals hyper-local by focusing on apartment blocks, gated
            communities, and neighborhood groups.
          </p>
        </div>

        <div className="card stat-card">
          <h3>📅 Smart Booking Flow</h3>
          <p>
            Residents can request items, owners can approve or reject requests,
            and everything stays organized.
          </p>
        </div>
      </div>

      {/* Why this platform matters */}
      <div className="card info-section">
        <h2 className="title">Why Neighbor-Share Matters</h2>
        <p>
          In every community, many residents own expensive or useful items that
          stay idle most of the time. At the same time, other residents buy
          those same items for one-time use. This creates unnecessary cost and
          waste.
        </p>
        <br />
        <p>
          Neighbor-Share solves this by creating a simple rental and sharing
          platform inside the community itself, making it easier to save money,
          reduce waste, and build local trust.
        </p>
      </div>

      {/* Feature cards with images */}
      <div className="grid">
        <div className="card feature-card">
          <img src={toolsImage} alt="Tools and equipment" className="feature-image" />
          <div className="feature-body">
            <h3>📦 List Valuable Items</h3>
            <p>
              Residents can list tools, gadgets, and household equipment for
              others to rent or borrow.
            </p>
          </div>
        </div>

        <div className="card feature-card">
          <img src={communityImage} alt="Community neighbors" className="feature-image" />
          <div className="feature-body">
            <h3>🔎 Search Within the Community</h3>
            <p>
              Browse available items from nearby residents and quickly find what
              you need without leaving your locality.
            </p>
          </div>
        </div>

        <div className="card feature-card">
          <img src={rentalImage} alt="People collaborating" className="feature-image" />
          <div className="feature-body">
            <h3>✅ Booking and Approval Workflow</h3>
            <p>
              Users can request items, and item owners can manage incoming
              rental requests with approval or rejection.
            </p>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="card process-section">
        <h2 className="title">How It Works</h2>

        <div className="process-grid">
          <div className="process-step">
            <div className="step-number">1</div>
            <h3>Join the Platform</h3>
            <p>Register with your details and community information.</p>
          </div>

          <div className="process-step">
            <div className="step-number">2</div>
            <h3>List or Browse</h3>
            <p>List your unused items or browse those already available.</p>
          </div>

          <div className="process-step">
            <div className="step-number">3</div>
            <h3>Request Booking</h3>
            <p>Send a booking request for the item you want to rent.</p>
          </div>

          <div className="process-step">
            <div className="step-number">4</div>
            <h3>Get Approval</h3>
            <p>The owner approves or rejects your request directly.</p>
          </div>
        </div>
      </div>

      {/* Future scope */}
      <div className="card info-section">
        <h2 className="title">Future Scope</h2>
        <ul style={{ marginLeft: "20px", marginTop: "10px" }}>
          <li>Security deposit management</li>
          <li>Ratings and trust score system</li>
          <li>Community-only item filtering</li>
          <li>Image upload for items</li>
          <li>Online payments and notifications</li>
        </ul>
      </div>
    </div>
  );
}