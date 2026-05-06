import { useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { addMovie, updateMovie } from "./moviesSlice";

/**
 * COMPONENT: MovieForm
 *
 * Fungsi: Menampilkan form untuk menambah atau mengedit film
 *
 * Props:
 * - editTarget: Object film yang sedang diedit (jika ada), atau null jika mode tambah film baru
 * - onDone: Callback function yang dipanggil setelah form berhasil disubmit
 *
 * State yang dikelola:
 * - title: Judul film
 * - year: Tahun rilis film
 * - genre: Genre/kategori film
 */
export default function MovieForm({ editTarget, onDone }) {
  const dispatch = useDispatch();

  // Inisialisasi state dengan nilai dari editTarget jika ada, atau string kosong jika mode tambah
  const [title, setTitle] = useState(editTarget?.title ?? "");
  const [year, setYear] = useState(editTarget?.year ?? "");
  const [genre, setGenre] = useState(editTarget?.genre ?? "");

  /**
   * FUNCTION: handleSubmit
   *
   * Deskripsi: Menangani pengiriman form (submit)
   *
   * Alur:
   * 1. Cegah refresh halaman default
   * 2. Validasi input: judul dan tahun harus terisi
   * 3. Jika editTarget ada → MODE EDIT: Update film dengan data baru tapi id tetap sama
   * 4. Jika editTarget kosong → MODE TAMBAH: Buat film baru dengan id unik dari nanoid()
   * 5. Panggil callback onDone() untuk menutup form/dialog
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validasi: jika judul atau tahun kosong, hentikan proses
    if (!title.trim() || !year.trim()) return;

    if (editTarget) {
      // EDIT MODE: Update existing film  dengan id yang sama
      // Spread operator (...editTarget) menjaga data lama, kemudian override dengan nilai form baru
      dispatch(updateMovie({ ...editTarget, title, year, genre }));
    } else {
      // TAMBAH MODE: Buat film baru dengan id unik menggunakan nanoid()
      // nanoid() menghasilkan string random unik untuk setiap film baru
      dispatch(addMovie({ id: nanoid(), title, year, genre }));
    }

    // Tutup form/dialog setelah berhasil submit
    onDone();
  };

  return (
    <>
      <style>{`
        .movie-form { display: flex; flex-direction: column; gap: 14px; }
        .movie-form input {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 11px 14px;
          color: #e5e7eb;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .movie-form input:focus {
          border-color: rgba(99,102,241,0.6);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
        }
        .movie-form input::placeholder { color: #374151; }
        .form-row { display: flex; gap: 10px; }
        .form-row input { flex: 1; }
        .movie-submit-btn {
          padding: 11px;
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
        }
        .movie-submit-btn:hover { opacity: 0.9; transform: translateY(-1px); }
      `}</style>

      <form onSubmit={handleSubmit} className="movie-form">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Judul film *"
          required
        />
        <div className="form-row">
          <input
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Tahun *"
            required
          />
          <input
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="Genre"
          />
        </div>
        <button type="submit" className="movie-submit-btn">
          {editTarget ? "Simpan Perubahan" : "+ Tambah Film"}
        </button>
      </form>
    </>
  );
}
