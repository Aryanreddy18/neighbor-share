import { useEffect, useState } from "react";
import API from "../services/api";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings/my");
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div>
      <h2 className="title">My Bookings</h2>

      <div className="grid">
        {bookings.map((booking) => (
          <div className="card" key={booking.id}>
            <h3>{booking.itemName}</h3>
            <p>
              <strong>Borrower:</strong> {booking.borrowerEmail}
            </p>
            <p>
              <strong>Owner:</strong> {booking.ownerEmail}
            </p>
            <p>
              <strong>Start:</strong> {booking.startDate}
            </p>
            <p>
              <strong>End:</strong> {booking.endDate}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color:
                    booking.status === "APPROVED"
                      ? "green"
                      : booking.status === "REJECTED"
                      ? "red"
                      : "orange",
                  fontWeight: "bold",
                }}
              >
                {booking.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}