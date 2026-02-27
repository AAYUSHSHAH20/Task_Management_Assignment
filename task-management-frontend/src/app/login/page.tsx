"use client";

import { useState } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("accessToken", res.data.accessToken);
      toast.success("Login successful");
      router.push("/dashboard");
    } catch {
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* Logo */}
        <Link href="/" className="auth-logo">
          <div className="auth-logo-icon">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="6" height="6" rx="1.5" />
              <rect x="12" y="2" width="6" height="6" rx="1.5" />
              <rect x="2" y="12" width="6" height="6" rx="1.5" />
              <path d="M12 15h6M15 12v6" />
            </svg>
          </div>
          <span className="auth-logo-name">TaskFlow</span>
        </Link>

        {/* Header */}
        <div className="auth-header">
          <h1 className="auth-heading">
            Welcome <em>back</em>
          </h1>
          <p className="auth-subheading">Sign in to continue to your dashboard</p>
        </div>

        {/* Form */}
        <form className="auth-form" onSubmit={handleLogin}>

          <div className="auth-field">
            <label htmlFor="email" className="auth-label">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="john@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              autoComplete="email"
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password" className="auth-label">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
              autoComplete="current-password"
            />
          </div>

          <button type="submit" disabled={loading} className="auth-btn">
            {loading ? "Signing in…" : "Sign in"}
          </button>

        </form>

        {/* Divider */}
        <div className="auth-divider">
          <div className="auth-divider-line" />
          <span className="auth-divider-text">or</span>
          <div className="auth-divider-line" />
        </div>

        {/* Register link */}
        <p className="auth-footer">
          Don&apos;t have an account?{" "}
          <Link href="/register">Create one</Link>
        </p>

      </div>
    </div>
  );
}