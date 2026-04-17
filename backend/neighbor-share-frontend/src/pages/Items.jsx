import { useEffect, useState } from "react";
import API from "../services/api";

export default function Items() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const fetchItems = async () => {
    try {
      const res = await API.get("/items");
      setItems(res.data);
    } catch (err) {
      console.error("Failed to fetch items", err);
    }
  };

  const handleBook = async (itemId) => {
    try {
      await API.post("/bookings", {
        itemId,
        startDate: "2026-04-20",
        endDate: "2026-04-22"
      });
      setMessage("Booking request sent successfully");
    } catch (err) {
      setMessage("Booking failed");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.category?.toLowerCase().includes(search.toLowerCase()) ||
    item.description?.toLowerCase().includes(search.toLowerCase()) ||
    item.ownerName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="title">Community Items</h2>

      <input
        type="text"
        placeholder="Search by item name, category, description, or owner..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "20px" }}
      />

      {message && (
        <div
          style={{
            background: "#d1fae5",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "15px",
            fontWeight: "500"
          }}
        >
          {message}
        </div>
      )}

      <div className="grid">
        {filteredItems.length === 0 ? (
          <div className="card">
            <p>No matching items found.</p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div className="card" key={item.id}>
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    marginBottom: "12px"
                  }}
                />
              )}

              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#1e3a8a",
                  marginBottom: "6px"
                }}
              >
                🔧 {item.name}
              </h3>

              <p style={{ color: "#555" }}>{item.description}</p>

              <p><strong>Category:</strong> {item.category}</p>
              <p><strong>Price:</strong> ₹{item.pricePerDay} / day</p>
              <p><strong>Deposit:</strong> ₹{item.depositAmount}</p>

              <p
                style={{
                  marginTop: "8px",
                  fontSize: "14px",
                  color: "#666"
                }}
              >
                👤 Owner: {item.ownerName}
              </p>

              <button
                onClick={() => handleBook(item.id)}
                style={{
                  marginTop: "12px",
                  background: "#10b981"
                }}
              >
                Request Booking
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}