


import React, { useState, useEffect } from "react";
import axios from "axios";
import UserTable from "./UserTable";


const App = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [editingId, setEditingId] = useState(null);

  const API_URL = "http://localhost:5000/users";

  // Fetch data
  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Add a new record
  const handleAdd = async (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      try {
        await axios.post(API_URL, formData);
        setFormData({ name: "", email: "" });
        fetchData();
      } catch (error) {
        console.error("Error adding data", error);
      }
    }
  };

  // Edit a record
  const handleEdit = (id) => {
    const record = data.find((item) => item.id === id);
    setFormData(record);
    setEditingId(id);
  };

  // Update a record
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/${editingId}`, formData);
      setFormData({ name: "", email: "" });
      setEditingId(null);
      fetchData();
    } catch (error) {
      console.error("Error updating data", error);
    }
  };

  // Delete a record
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting data", error);
    }
  };

  // Patch a record
  const handlePatch = async (id) => {
    try {
      await axios.patch(`${API_URL}/${id}`, { name: "Updated Name" });
      fetchData();
    } catch (error) {
      console.error("Error patching data", error);
    }
  };


  // const App = () => {
    const [dat, setDat] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const API_UR = "https://jsonplaceholder.typicode.com/posts";
  
    const fetchData1 = async () => {
      setLoading(true);
      setError(null); // Reset error state before making a request
      try {
        const response = await axios.get(API_UR);
        setDat(response.data); // Store fetched data
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };
  
    useEffect(() => {
      fetchData1();
    }, []);
  return (
    <div style={{ padding: "20px" }}>
      <h1>React JSON-Server CRUD</h1>
      <form onSubmit={editingId ? handleUpdate : handleAdd}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <button type="submit">{editingId ? "Update" : "Add"}</button>
      </form>

      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleEdit(user.id)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
                <button onClick={() => handlePatch(user.id)}>Patch</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <div style={{ padding: "20px" }}>
      <h1>Data Fetch with Loading and Error Handling</h1>
      {loading && (
        <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
          <div className="spinner"></div>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && (
        <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
      <UserTable />
    </div>
  );
};

export default App;
