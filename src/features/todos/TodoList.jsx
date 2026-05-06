import { useState } from "react";
import {
  useGetTodosQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "./todoApi";
import ConfirmDialog from "./ConfirmDialog";
import EditDialog from "./EditDialog";

export default function TodoList() {
  // ── Fetch data todos dari server ──────────────────────────────
  // useGetTodosQuery: Hook RTK Query untuk mengambil data todos
  // - Otomatis fetch saat komponen mount (componentDidMount)
  // - Otomatis refetch setelah mutasi berhasil (invalidatesTags)
  // - data: array todos dari server (default: [])
  // - isLoading: true saat sedang fetch data pertama kali
  // - isError: true jika fetch gagal
  const { data: todos = [], isLoading, isError } = useGetTodosQuery();

  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editTarget, setEditTarget] = useState(null);

  const toggle = async (todo) => {
    try {
      await updateTodo({ id: todo.id, completed: !todo.completed }).unwrap();
    } catch (err) {
      alert(err?.data?.error || "Gagal mengubah status");
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteTodo(deleteTarget.id).unwrap();
    } catch (err) {
      alert(err?.data?.error || "Gagal menghapus tugas");
    } finally {
      setDeleteTarget(null);
    }
  };

  const handleEditConfirm = async (newTitle) => {
    try {
      await updateTodo({ id: editTarget.id, title: newTitle }).unwrap();
    } catch (err) {
      alert(err?.data?.error || "Gagal mengubah tugas");
    } finally {
      setEditTarget(null);
    }
  };

  // ── Render states ──────────────────────────────────────────────
  if (isLoading)
    return (
      <p
        style={{
          textAlign: "center",
          color: "#4b5563",
          padding: "32px 0",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
        }}
      >
        Memuat...
      </p>
    );

  if (isError)
    return (
      <p
        style={{
          textAlign: "center",
          color: "#f87171",
          padding: "16px 0",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
        }}
      >
        Gagal memuat data. Coba refresh halaman.
      </p>
    );

  if (!todos.length)
    return (
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <p
          style={{
            color: "#4b5563",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
          }}
        >
          Belum ada tugas. Tambahkan di atas!
        </p>
      </div>
    );

  return (
    <>
      <style>{`
        .todo-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .todo-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 11px;
          padding: 13px 16px;
          transition: background 0.2s, border-color 0.2s;
          animation: fadeUp 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .todo-item:hover {
          background: rgba(99,102,241,0.05);
          border-color: rgba(99,102,241,0.2);
        }
        .todo-check-label {
          display: flex; align-items: center; gap: 12px;
          cursor: pointer; flex: 1; min-width: 0;
        }
        .todo-checkbox { width: 16px; height: 16px; accent-color: #6366f1; flex-shrink: 0; }
        .todo-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; color: #d1d5db;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .todo-text.done { text-decoration: line-through; color: #4b5563; }
        .todo-actions {
          display: flex; align-items: center; gap: 4px;
          margin-left: 12px; opacity: 0; transition: opacity 0.2s;
        }
        .todo-item:hover .todo-actions { opacity: 1; }
        .action-btn {
          background: none; border: none; cursor: pointer;
          padding: 7px; border-radius: 8px; color: #4b5563;
          transition: color 0.2s, background 0.2s;
          display: flex; align-items: center;
        }
        .action-btn.edit:hover   { color: #818cf8; background: rgba(99,102,241,0.1); }
        .action-btn.delete:hover { color: #f87171; background: rgba(239,68,68,0.1); }
      `}</style>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <label className="todo-check-label">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggle(todo)}
                className="todo-checkbox"
              />
              <span className={`todo-text${todo.completed ? " done" : ""}`}>
                {todo.title}
              </span>
            </label>

            <div className="todo-actions">
              <button
                className="action-btn edit"
                onClick={() => setEditTarget(todo)}
                title="Edit"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
              <button
                className="action-btn delete"
                onClick={() => setDeleteTarget(todo)}
                title="Hapus"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14H6L5 6" />
                  <path d="M10 11v6M14 11v6" />
                  <path d="M9 6V4h6v2" />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Hapus Tugas"
        message={`Hapus "${deleteTarget?.title}"? Tindakan ini tidak dapat dibatalkan.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />

      <EditDialog
        isOpen={!!editTarget}
        todo={editTarget}
        onConfirm={handleEditConfirm}
        onCancel={() => setEditTarget(null)}
      />
    </>
  );
}
