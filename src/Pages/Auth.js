import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { firestore } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import "./Login.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [adminData, setAdminData] = useState(null);
  const [b2bUsers, setB2bUsers] = useState([]);
  const [isSignup, setIsSignup] = useState(false);
  const [isB2BLogin, setIsB2BLogin] = useState(false); // New state for B2B login toggle
  const [b2bSignupData, setB2bSignupData] = useState({
    companyName: "",
    email: "",
    b2bUsername: "",
    b2bPassword: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Admin data
        const adminCollection = collection(firestore, "Admin");
        const adminSnapshot = await getDocs(adminCollection);
        const adminDocs = adminSnapshot.docs;
        if (adminDocs.length > 0) {
          setAdminData(adminDocs[0].data());
        } else {
          console.error("No admin credentials found.");
        }

        // Fetch B2B Users data
        const b2bCollection = collection(firestore, "B2BUsers");
        const b2bSnapshot = await getDocs(b2bCollection);
        const b2bData = b2bSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setB2bUsers(b2bData);
      } catch (error) {
        console.error("Error fetching credentials:", error);
      }
    };

    fetchData();
  }, []);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminData) {
      if (username === adminData.username && password === adminData.password) {
        localStorage.setItem("isAdmin", "true");
        localStorage.setItem("isB2B", "false");
        navigate("/admin");
      } else {
        alert("Invalid admin credentials");
      }
    } else {
      alert("Error fetching admin credentials");
    }
  };

  const handleB2BLogin = (e) => {
    e.preventDefault();
    const b2bUser = b2bUsers.find(
      user => user.b2bUsername === username && 
              user.b2bPassword === password && 
              user.status === "approved"
    );
    
    if (b2bUser) {
      localStorage.setItem("isB2B", "true");
      localStorage.setItem("isAdmin", "false");
      localStorage.setItem("b2bUserId", b2bUser.id);
      navigate("/b2b");
    } else {
      alert("Invalid B2B credentials or account not approved");
    }
  };

  const handleB2BSignup = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(firestore, "B2BUsers"), {
        ...b2bSignupData,
        createdAt: new Date().toISOString(),
        status: "pending",
      });
      alert("Your request is pending for approval. You'll be notified once approved.");
      setB2bSignupData({
        companyName: "",
        email: "",
        b2bUsername: "",
        b2bPassword: "",
      });
      setIsSignup(false);
    } catch (error) {
      console.error("Error during B2B signup:", error);
      alert("Error during signup. Please try again.");
    }
  };

  const toggleSignup = () => {
    setIsSignup(!isSignup);
    setIsB2BLogin(false);
  };

  const toggleB2BLogin = () => {
    setIsB2BLogin(!isB2BLogin);
    setIsSignup(false);
  };

  return (
    <div className="login-container">
      {!isSignup && !isB2BLogin ? (
        <form className="login" onSubmit={handleAdminLogin}>
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
          <div className="links">
            <a href="#" onClick={toggleSignup}>
              B2B Signup
            </a>
            <a href="#" onClick={toggleB2BLogin}>
              B2B Login
            </a>
          </div>
        </form>
      ) : isSignup ? (
        <form className="login" onSubmit={handleB2BSignup}>
          <h2>B2B Signup</h2>
          <p>Register your company</p>
          <input
            type="text"
            placeholder="Company Name"
            value={b2bSignupData.companyName}
            onChange={(e) =>
              setB2bSignupData({ ...b2bSignupData, companyName: e.target.value })
            }
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={b2bSignupData.email}
            onChange={(e) =>
              setB2bSignupData({ ...b2bSignupData, email: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Username"
            value={b2bSignupData.b2bUsername}
            onChange={(e) =>
              setB2bSignupData({ ...b2bSignupData, b2bUsername: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={b2bSignupData.b2bPassword}
            onChange={(e) =>
              setB2bSignupData({ ...b2bSignupData, b2bPassword: e.target.value })
            }
            required
          />
          <input type="submit" value="Sign Up" />
          <div className="links">
            <a href="#" onClick={toggleSignup}>
              Back to Admin Login
            </a>
          </div>
        </form>
      ) : (
        <form className="login" onSubmit={handleB2BLogin}>
          <h2>B2B Login</h2>
          <p>Please log in with your B2B credentials</p>
          <input
            type="text"
            placeholder="B2B Username"
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
          <div className="links">
            <a href="#" onClick={toggleB2BLogin}>
              Back to Admin Login
            </a>
            <a href="#" onClick={toggleSignup}>
              B2B Signup
            </a>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginPage;