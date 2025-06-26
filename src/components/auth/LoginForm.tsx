"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/AuthContext";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login(username, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      {error && (
        <div className="bg-red-50 p-4 rounded text-red-500 text-sm">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          id="username"
          type="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-[#a8cd89]"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-[#a8cd89]"
        />
      </div>

      {/* <div className="flex items-center justify-between">
  
        <a
          href="#"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          Forgot your password?
        </a>
      </div> */}

      <div className="">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md text-white bg-[#A8CD89] hover:bg-[#A8CD89] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a8cd89] disabled:opacity-50 font-bold"
        >
          {isLoading ? "Signing in..." : "IAM TEA"}
        </button>
      </div>
    </form>
  );
}
