import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiSignup } from "@/lib/https";

export default function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup() {
    try {
      await apiSignup({
        username,
        password,
      });

      alert("Signup successful!");
      navigate("/auth");
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-96 border rounded-lg p-6 shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>

        <div className="space-y-4">
          <input
            className="w-full border p-2 rounded"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className="w-full border p-2 rounded"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleSignup}
            className="w-full bg-black text-white p-2 rounded"
          >
            Sign Up
          </button>
        </div>

        <div className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/auth" className="text-blue-600 underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
