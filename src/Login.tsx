import { useState } from "react";

function Login({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:8000/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) onLogin();
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
      <button
        onClick={handleSubmit}
        style={{
          padding: "15px",
          borderRadius: "12px",
          border: "none",
          backgroundColor: "#1e1e1e",
          color: "#fff",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        Login
      </button>
    </div>
  );
}

export default Login;