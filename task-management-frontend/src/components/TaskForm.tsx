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
    <form onSubmit={addTask} className="flex gap-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task..."
        className="flex-1 p-3 border rounded-lg"
      />
      <button className="bg-indigo-600 text-white px-6 rounded-lg">
        Add
      </button>
    </form>
  );
}