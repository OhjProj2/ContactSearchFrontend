import { Button } from "@heroui/react";
import "../styles/HeroUITheme.css"

import { useState } from "react";

function Login({ onLogin }: { onLogin: () => void }) {

  const API_URL = `${import.meta.env.VITE_BACKEND_URL}/login/`;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      setError("");
      onLogin();
    } else {
      setError("Username or password is incorrect");
      setTimeout(() => setError(""), 2000);
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      width: "400px",
      margin: "100px auto",
    }}>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        style={{
          backgroundColor: "#1e1e1e",
          color: "#fff",
          border: "2px solid #fff",
          padding: "15px",
          borderRadius: "12px",
          fontSize: "18px",
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{
          backgroundColor: "#1e1e1e",
          color: "#fff",
          border: "2px solid #fff",
          padding: "15px",
          borderRadius: "12px",
          fontSize: "18px",
        }}
      />

      <Button
        onClick={handleSubmit}
        className="w-full"
        style={{ padding: "16px" }}
      >
        Login
      </Button>
      
      <Button
        onClick={() => window.location.href = "/coming_soon"}
        className="w-full"
        style={{ padding: "16px" }}
      >
        Login
      </Button>
      {error && (
        <div style={{ color: "white", fontSize: "16px", textAlign: "center" }}>
          {error}
        </div>
      )}
    </div>
  );
}

export default Login;