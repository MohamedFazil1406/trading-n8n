import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiSignin } from "@/lib/https";

export default function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleLogin() {
    try {
      await apiSignin({
        username,
        password,
      });

      navigate("/dashboard");
    } catch {
      alert("Login failed");
    }
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-80 space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white p-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
