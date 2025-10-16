"use client";

import React, { useState } from "react";
import { useAuth } from "./AuthContext";

export default function AuthGate({ children }: { children: React.ReactNode }) { //to do: delete for prod
  const { isAuthenticated, login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isAuthenticated) return <>{children}</>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (!success) {
      setError("Неверный логин или пароль");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        fontFamily: "sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#111",
          padding: "2rem",
          borderRadius: "8px",
          color: "white",
          minWidth: "300px",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>Авторизация</h2>
        <input
          type="text"
          placeholder="Login"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "1rem" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "1rem" }}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "gold",
            border: "none",
            cursor: "pointer",
            width: "100%",
            fontWeight: "bold",
          }}
        >
          Войти
        </button>
      </form>
    </div>
  );
}
