import Link from "next/link";

export default function Home() {
  return (
    <div className="home-page">
      <div className="home-inner">

        {/* Logo */}
        <div className="home-logo">
          <div className="home-logo-icon">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="6" height="6" rx="1.5" />
              <rect x="12" y="2" width="6" height="6" rx="1.5" />
              <rect x="2" y="12" width="6" height="6" rx="1.5" />
              <path d="M12 15h6M15 12v6" />
            </svg>
          </div>
          <span className="home-logo-name">TaskFlow</span>
        </div>

        {/* Status badge */}
        <div className="home-badge">
          <span className="home-badge-dot" />
          All systems operational
        </div>

        {/* Heading */}
        <h1 className="home-heading">
          Manage your tasks,<br />
          <em>effortlessly.</em>
        </h1>

        <p className="home-subheading">
          A clean, focused space to organise your work and get things done.
        </p>

        {/* CTA Buttons */}
        <div className="home-actions">
          <Link href="/login" className="home-btn-primary">
            Sign in
          </Link>
          <Link href="/register" className="home-btn-secondary">
            Create account
          </Link>
        </div>

      </div>
    </div>
  );
}