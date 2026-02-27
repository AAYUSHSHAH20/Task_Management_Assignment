"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import TaskCard from "@/components/TaskCard";
import TaskForm from "@/components/TaskForm";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks", {
        params: { search, status, page: 1, limit: 10 },
      });
      setTasks(res.data.tasks);
    } catch {
      toast.error("Failed to load tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [search, status]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.push("/login");
  };

  return (
    <div className="dashboard-page">

      {/* Navbar */}
      <nav className="dashboard-nav">
        <Link href="/" className="dashboard-nav-logo">
          <div className="dashboard-nav-logo-icon">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="6" height="6" rx="1.5" />
              <rect x="12" y="2" width="6" height="6" rx="1.5" />
              <rect x="2" y="12" width="6" height="6" rx="1.5" />
              <path d="M12 15h6M15 12v6" />
            </svg>
          </div>
          <span className="dashboard-nav-logo-name">TaskFlow</span>
        </Link>

        <div className="dashboard-nav-right">
          <button className="dashboard-nav-logout" onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </nav>

      {/* Body */}
      <div className="dashboard-body">

        {/* Page Header */}
        <div className="dashboard-header">
          <h1 className="dashboard-heading">
            Your <em>tasks</em>
          </h1>
          <p className="dashboard-subheading">
            {tasks.length > 0 ? `${tasks.length} task${tasks.length !== 1 ? "s" : ""} total` : "No tasks yet — add one below"}
          </p>
        </div>

        {/* Task Form */}
        <TaskForm refresh={fetchTasks} />

        {/* Toolbar */}
        <div className="dashboard-toolbar">
          <div className="dashboard-search-wrap">
            <svg className="dashboard-search-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="6.5" cy="6.5" r="4" />
              <path d="M10 10l3 3" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search tasks…"
              className="dashboard-search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="dashboard-select"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {/* Task Grid */}
        <div className="dashboard-grid">
          {tasks.length === 0 ? (
            <div className="dashboard-empty">
              <svg className="dashboard-empty-icon" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="6" y="6" width="28" height="28" rx="4" />
                <path d="M13 20h14M13 14h8M13 26h6" strokeLinecap="round" />
              </svg>
              No tasks found. Add one above to get started.
            </div>
          ) : (
            tasks.map((task: any) => (
              <TaskCard key={task.id} task={task} refresh={fetchTasks} />
            ))
          )}
        </div>

      </div>
    </div>
  );
}