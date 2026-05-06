import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Redux Toolkit (RTK) adalah library yang menyederhanakan penggunaan Redux dengan menyediakan utilitas seperti createSlice, configureStore, dan RTK Query.
// RTK Query adalah bagian dari RTK yang memungkinkan pengelolaan data server-side dengan caching otomatis, invalidation, dan hooks siap pakai.
// File ini mendefinisikan API slice untuk mengelola data todos menggunakan RTK Query.

export const todoApi = createApi({
  // reducerPath: Nama unik untuk slice ini di Redux store. Digunakan untuk menyimpan cache dan state RTK Query.
  reducerPath: "todosApi",

  baseQuery: fetchBaseQuery({
    // baseUrl: URL dasar untuk semua request API. Diambil dari environment variable VITE_SERVER_URL dan ditambahkan "/api".
    baseUrl: import.meta.env.VITE_SERVER_URL,
    // credentials: "include" memastikan cookie dikirim dengan setiap request, berguna untuk autentikasi berbasis session.
    credentials: "include",
  }),

  // tagTypes: Array dari string yang mendefinisikan tag untuk invalidasi cache. Ketika data berubah, cache dengan tag tertentu dapat dihapus otomatis.
  tagTypes: ["Todo"],

  endpoints: (builder) => ({
    // Endpoint untuk GET /todos - Menggunakan query untuk operasi read-only. Data akan dicache dan dapat diakses ulang tanpa request baru.
    getTodos: builder.query({
      query: () => "/todos",
      // providesTags: Menandai cache ini dengan tag "Todo". Jika ada mutation yang invalidates "Todo", cache ini akan dihapus dan refetch.
      providesTags: ["Todo"],
    }),

    // Endpoint untuk POST /todos - Menggunakan mutation untuk operasi yang mengubah data (create).
    createTodo: builder.mutation({
      query: (data) => ({
        url: "/todos",
        method: "POST",
        body: data, // Data yang dikirim dalam body request.
      }),
      // invalidatesTags: Setelah mutation berhasil, hapus cache dengan tag "Todo" agar query getTodos refetch data terbaru.
      invalidatesTags: ["Todo"],
    }),

    // Endpoint untuk PUT /todos/:id - Mutation untuk update todo berdasarkan ID.
    updateTodo: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/todos/${id}`,
        method: "PUT",
        body, // Body berisi data update, id sudah diekstrak.
      }),
      invalidatesTags: ["Todo"], // Invalidasi cache setelah update.
    }),

    // Endpoint untuk DELETE /todos/:id - Mutation untuk menghapus todo.
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"], // Invalidasi cache setelah delete.
    }),
  }),
});

// Export hooks yang dihasilkan secara otomatis oleh RTK Query. Hooks ini dapat digunakan di komponen React untuk mengakses data dan melakukan mutations.
// Contoh: useGetTodosQuery() untuk fetch todos, useCreateTodoMutation() untuk membuat todo baru.
export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
