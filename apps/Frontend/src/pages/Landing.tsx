import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold">Trading n8n</h1>

      <Link to="/signup" className="mt-6 px-4 py-2 bg-black text-white rounded">
        Get Started
      </Link>
    </div>
  );
}
