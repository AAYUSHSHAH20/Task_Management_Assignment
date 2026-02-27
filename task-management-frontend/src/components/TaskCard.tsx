"use client";

import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function TaskCard({ task, refresh }: any) {
  const toggleStatus = async () => {
    await api.patch(`/tasks/${task.id}/toggle`);
    toast.success("Task updated");
    refresh();
  };

  const deleteTask = async () => {
    await api.delete(`/tasks/${task.id}`);
    toast.success("Task deleted");
    refresh();
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
      <h3 className="font-semibold text-lg">{task.title}</h3>
      <p className="text-sm text-gray-500">{task.description}</p>

      <div className="flex justify-between mt-4">
        <button
          onClick={toggleStatus}
          className="text-sm text-indigo-600"
        >
          {task.status}
        </button>

        <button
          onClick={deleteTask}
          className="text-sm text-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
}