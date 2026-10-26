import { useState } from "react";
import { api, setToken } from "./api.js";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isRegister) await api("/auth/register", { method: "POST", body: { username, password } });
      const data = await api("/auth/login", { method: "POST", form: { username, password } });
      setToken(data.access_token);
      onLogin();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="card login" onSubmit={submit}>
      <h1>TindaMate</h1>
      <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {error && <p className="error">{error}</p>}
      <button className="primary">{isRegister ? "Create account" : "Log in"}</button>
      <button type="button" className="link" onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Have an account? Log in" : "No account? Register"}
      </button>
    </form>
  );
}
