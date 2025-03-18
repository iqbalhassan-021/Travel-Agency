import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { firestore } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import "./Login.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [adminData, setAdminData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const adminCollection = collection(firestore, "Admin");
        const adminSnapshot = await getDocs(adminCollection);
        const adminDocs = adminSnapshot.docs;

        if (adminDocs.length > 0) {
          const adminInfo = adminDocs[0].data();
          setAdminData(adminInfo);
        } else {
          console.error("No admin credentials found.");
        }
      } catch (error) {
        console.error("Error fetching admin credentials:", error);
      }
    };

    fetchAdminData();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (adminData) {
      if (username === adminData.username && password === adminData.password) {
        localStorage.setItem("isAdmin", "true");
        navigate("/admin");
      } else {
        alert("Invalid credentials");
      }
    } else {
      alert("Error fetching admin credentials");
    }
  };

  return (
    <form className="login" onSubmit={handleLogin}>
      <h2>Welcome, Admin!</h2>
      <p>Please log in</p>
      <input
        type="text"
        placeholder="User Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input type="submit" value="Log In" />
    </form>
  );
};

export default LoginPage;