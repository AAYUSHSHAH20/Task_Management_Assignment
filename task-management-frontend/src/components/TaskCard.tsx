"use client";

import { useState } from "react";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function TaskCard({ task, refresh }: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const toggleStatus = async () => {
    await api.patch(`/tasks/${task.id}/toggle`);
    toast.success("Task status updated");
    refresh();
  };

  const deleteTask = async () => {
    await api.delete(`/tasks/${task.id}`);
    toast.success("Task deleted");
    refresh();
  };

  const saveEdit = async () => {
    if (!title.trim()) return;
    await api.patch(`/tasks/${task.id}`, { title });
    toast.success("Task updated");
    setIsEditing(false);
    refresh();
  };

  const isCompleted = !!task.status;

  return (
    <div className="task-card">
      <div className="task-card-top">
        {isEditing ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="task-form-input"
          />
        ) : (
          <h3
            className={`task-card-title ${
              isCompleted ? "completed" : ""
            }`}
          >
            {task.title}
          </h3>
        )}

        <span className={`task-badge ${isCompleted ? "completed" : "pending"}`}>
          <span className="task-badge-dot" />
          {isCompleted ? "Completed" : "Pending"}
        </span>
      </div>

      <p className="task-card-desc">
        Keep track of this task by marking it done when you finish.
      </p>

      <div className="task-card-footer">
        <div className="task-card-actions">
          {isEditing ? (
            <>
              <button onClick={saveEdit} className="task-card-btn">
                Save
              </button>
              <button
                onClick={() => {
                  setTitle(task.title);
                  setIsEditing(false);
                }}
                className="task-card-btn"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="task-card-btn"
            >
              Edit
            </button>
          )}

          <button
            onClick={toggleStatus}
            className="task-card-btn"
          >
            Mark {isCompleted ? "pending" : "completed"}
          </button>

          <button
            onClick={deleteTask}
            className="task-card-btn danger"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}