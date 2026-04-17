import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddItem from "./pages/AddItem";
import Items from "./pages/Items";
import MyBookings from "./pages/MyBookings";
import IncomingRequests from "./pages/IncomingRequests";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/items" element={<Items />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/incoming-requests" element={<IncomingRequests />} />
        </Routes>
      </div>
    </>
  );
}