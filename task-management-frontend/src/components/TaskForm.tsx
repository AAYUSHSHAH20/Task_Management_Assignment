"use client";

import { useState } from "react";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function TaskForm({ refresh }: any) {
  const [title, setTitle] = useState("");

  const addTask = async (e: any) => {
    e.preventDefault();
    await api.post("/tasks", { title });
    toast.success("Task added");
    setTitle("");
    refresh();
  };

  return (
    <div className="task-form-card">
      <div className="task-form-title">New task</div>
      <form onSubmit={addTask} className="task-form-row">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task..."
          className="task-form-input"
        />
        <button type="submit" className="task-form-btn">
          Add
        </button>
      </form>
    </div>
  );
}