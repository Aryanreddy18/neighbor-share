import { useEffect, useState } from "react";
import API from "../services/api";

export default function IncomingRequests() {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");

  const fetchRequests = async () => {
    try {
      const res = await API.get("/bookings/incoming");
      setRequests(res.data);
    } catch (err) {
      console.error("Failed to fetch incoming requests", err);
      setMessage("Failed to load incoming requests");
    }
  };

  const handleApprove = async (id) => {
    try {
      await API.put(`/bookings/approve/${id}`);
      setMessage("Booking approved successfully");
      fetchRequests();
    } catch (err) {
      console.error("Approve failed", err);
      setMessage("Failed to approve booking");
    }
  };

  const handleReject = async (id) => {
    try {
      await API.put(`/bookings/reject/${id}`);
      setMessage("Booking rejected successfully");
      fetchRequests();
    } catch (err) {
      console.error("Reject failed", err);
      setMessage("Failed to reject booking");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div>
      <h2 className="title">Incoming Requests</h2>

      {message && (
        <div
          style={{
            background: "#eef2ff",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "15px"
          }}
        >
          {message}
        </div>
      )}

      <div className="grid">
        {requests.length === 0 ? (
          <div className="card">
            <p>No incoming requests found.</p>
          </div>
        ) : (
          requests.map((booking) => (
            <div className="card" key={booking.id}>
              <h3>{booking.itemName}</h3>
              <p><strong>Borrower:</strong> {booking.borrowerEmail}</p>
              <p><strong>Owner:</strong> {booking.ownerEmail}</p>
              <p><strong>Start:</strong> {booking.startDate}</p>
              <p><strong>End:</strong> {booking.endDate}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  style={{
                    fontWeight: "bold",
                    color:
                      booking.status === "APPROVED"
                        ? "green"
                        : booking.status === "REJECTED"
                        ? "red"
                        : "orange"
                  }}
                >
                  {booking.status}
                </span>
              </p>

              {booking.status === "PENDING" && (
                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                  <button
                    onClick={() => handleApprove(booking.id)}
                    style={{ background: "green" }}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(booking.id)}
                    style={{ background: "crimson" }}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}