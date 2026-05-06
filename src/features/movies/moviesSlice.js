import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

// State awal — data dummy bawaan
const initialState = {
  list: [
    { id: nanoid(), title: "Interstellar", year: "2014", genre: "Sci-Fi" },
    { id: nanoid(), title: "The Dark Knight", year: "2008", genre: "Action" },
    { id: nanoid(), title: "Inception", year: "2010", genre: "Sci-Fi" },
  ],
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    // Tambah film baru
    // action.payload berisi objek film baru yang berisi id, title, year, dan genre.
    // Karena Redux Toolkit menggunakan Immer di balik layar, kita dapat menulis kode seperti
    // mutasi langsung (push ke array), sementara Immer yang menangani pembuatan state
    // baru secara imutabel.
    addMovie: (state, action) => {
      state.list.push(action.payload);
    },

    // Update film berdasarkan id
    // Cari indeks film yang id-nya sama dengan action.payload.id.
    // Jika ada, ganti item di posisi tersebut dengan data film baru dari payload.
    updateMovie: (state, action) => {
      const index = state.list.findIndex((m) => m.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },

    // Hapus film berdasarkan id
    // Filter list film agar hanya tersisa film-film dengan id berbeda dari payload.
    deleteMovie: (state, action) => {
      state.list = state.list.filter((m) => m.id !== action.payload);
    },
  },
});

// Export action creators (di-generate otomatis oleh createSlice)
export const { addMovie, updateMovie, deleteMovie } = moviesSlice.actions;

// Export reducer untuk didaftarkan ke store
export default moviesSlice.reducer;
