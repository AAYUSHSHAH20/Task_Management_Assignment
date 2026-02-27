"use client";

import { useState } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/register", { name, email, password });
      toast.success("Account created successfully");
      router.push("/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Registration failed");
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
            Create your <em>account</em>
          </h1>
          <p className="auth-subheading">Start managing your tasks in seconds</p>
        </div>

        {/* Form */}
        <form className="auth-form" onSubmit={handleRegister}>

          <div className="auth-field">
            <label htmlFor="name" className="auth-label">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="auth-input"
              autoComplete="name"
            />
          </div>

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
              placeholder="Min. 6 characters"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
              autoComplete="new-password"
            />
          </div>

          <button type="submit" disabled={loading} className="auth-btn">
            {loading ? "Creating account…" : "Create account"}
          </button>

        </form>

        {/* Divider */}
        <div className="auth-divider">
          <div className="auth-divider-line" />
          <span className="auth-divider-text">or</span>
          <div className="auth-divider-line" />
        </div>

        {/* Login link */}
        <p className="auth-footer">
          Already have an account?{" "}
          <Link href="/login">Sign in</Link>
        </p>

        {/* Terms */}
        <p className="auth-terms">
          By creating an account you agree to our{" "}
          <a href="#">Terms of Service</a> and{" "}
          <a href="#">Privacy Policy</a>.
        </p>

      </div>
    </div>
  );
}