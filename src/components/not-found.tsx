import { Rocket } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden px-4">
      {/* Rocket with custom animation */}
      <div
        className="absolute bottom-10"
        style={{
          animation: "flyUp 3s linear infinite",
        }}
      >
        <Rocket className="w-16 h-16 text-indigo-400" />
      </div>

      <h1 className="text-5xl font-bold z-10 text-center">
        404 - Page Not Found
      </h1>
      <p className="mt-4 text-gray-400 text-center z-10">
        Looks like you're lost in space.
      </p>

      <Link
        to="/"
        className="mt-6 bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg z-10 shadow-md transition"
      >
        Go Home
      </Link>

      {/* 👇 Custom keyframe in global CSS */}
    </div>
  );
}
