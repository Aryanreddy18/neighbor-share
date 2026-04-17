import { useState } from "react";
import API from "../services/api";

export default function AddItem() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    pricePerDay: "",
    depositAmount: "",
    imageUrl: ""
  });

  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        imageUrl: reader.result
      }));
      setPreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await API.post("/items", {
        ...form,
        pricePerDay: Number(form.pricePerDay),
        depositAmount: Number(form.depositAmount)
      });

      setMessage("Item added successfully");
      setForm({
        name: "",
        description: "",
        category: "",
        pricePerDay: "",
        depositAmount: "",
        imageUrl: ""
      });
      setPreview("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to add item");
    }
  };

  return (
    <div className="card">
      <h2 className="title">List an Item</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Item Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />

        <input
          name="pricePerDay"
          type="number"
          placeholder="Price Per Day"
          value={form.pricePerDay}
          onChange={handleChange}
        />

        <input
          name="depositAmount"
          type="number"
          placeholder="Deposit Amount"
          value={form.depositAmount}
          onChange={handleChange}
        />

        <label style={{ display: "block", marginTop: "14px", fontWeight: "bold" }}>
          Upload Item Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />

        {preview && (
          <div style={{ marginTop: "15px" }}>
            <img
              src={preview}
              alt="Preview"
              style={{
                width: "100%",
                maxWidth: "300px",
                borderRadius: "12px",
                border: "1px solid #ddd"
              }}
            />
          </div>
        )}

        <button type="submit" style={{ marginTop: "15px" }}>
          Add Item
        </button>
      </form>

      {message && <p className="message">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}