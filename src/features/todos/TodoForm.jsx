import { useState } from "react";
import { useCreateTodoMutation } from "./todoApi";

export default function TodoForm() {
  const [title, setTitle] = useState("");

  // useCreateTodoMutation() mengembalikan sebuah tuple:
  // 1) triggerFn: fungsi untuk mengirim request pembuatan todo ke server.
  // 2) objek status: berisi informasi tentang proses request,
  //    misalnya isLoading, isError, isSuccess, dan lainnya.
  // Dengan cara ini kita bisa memicu action secara manual dan
  // menyesuaikan tampilan UI saat request sedang berlangsung.
  const [createTodo, { isLoading }] = useCreateTodoMutation();

  // Tangani submit form untuk menambahkan todo baru.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      // Panggil createTodo dengan data yang dikirim ke API.
      // .unwrap() digunakan agar error dari request dibuang sebagai exception,
      // sehingga bisa ditangani dalam blok try/catch.
      await createTodo({ title }).unwrap();
      setTitle("");
    } catch (err) {
      // Tampilkan pesan error jika request gagal.
      alert(err?.data?.error || "Gagal menambahkan tugas");
    }
  };

  return (
    <>
      <style>{`
        .todo-form { display: flex; gap: 10px; margin-bottom: 20px; }
        .todo-input {
          flex: 1;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 12px 16px;
          color: #e5e7eb;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .todo-input::placeholder { color: #374151; }
        .todo-input:focus {
          border-color: rgba(99,102,241,0.6);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
        }
        .todo-add-btn {
          padding: 12px 18px;
          background: linear-gradient(135deg, #6366f1, #7c3aed);
          color: #fff;
          border: none;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(99,102,241,0.35);
          transition: opacity 0.2s, transform 0.15s;
          white-space: nowrap;
        }
        .todo-add-btn:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        .todo-add-btn:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>

      <form onSubmit={handleSubmit} className="todo-form">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="todo-input"
          placeholder="Tambah tugas baru..."
        />
        <button type="submit" disabled={isLoading} className="todo-add-btn">
          {isLoading ? "..." : "+ Tambah"}
        </button>
      </form>
    </>
  );
}
