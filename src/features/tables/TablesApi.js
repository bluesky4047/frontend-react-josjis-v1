import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Redux Toolkit (RTK) adalah library yang menyederhanakan penggunaan Redux dengan menyediakan utilitas seperti createSlice, configureStore, dan RTK Query.
// RTK Query adalah bagian dari RTK yang memungkinkan pengelolaan data server-side dengan caching otomatis, invalidation, dan hooks siap pakai.
// File ini mendefinisikan API slice untuk mengelola data products menggunakan RTK Query.

export const tablesApi = createApi({
  // reducerPath: Nama unik untuk slice ini di Redux store. Digunakan untuk menyimpan cache dan state RTK Query.
  reducerPath: "tablesApi",

  baseQuery: fetchBaseQuery({
    // baseUrl: URL dasar untuk semua request API. Diambil dari environment variable VITE_SERVER_URL dan ditambahkan "/api".
    baseUrl: import.meta.env.VITE_SERVER_URL,
    // credentials: "include" memastikan cookie dikirim dengan setiap request, berguna untuk autentikasi berbasis session.
    credentials: "include",
  }),

  // tagTypes: Array dari string yang mendefinisikan tag untuk invalidasi cache. Ketika data berubah, cache dengan tag tertentu dapat dihapus otomatis.
  tagTypes: ["Tables"],

  endpoints: (builder) => ({
    // Endpoint untuk GET /tables - Menggunakan query untuk operasi read-only. Data akan dicache dan dapat diakses ulang tanpa request baru.
    getTables: builder.query({
      query: () => "/tables",
      //   transformResponse: (response) => {
      //     return response.data.orders;
      //   },
      // providesTags: Menandai cache ini dengan tag "Order". Jika ada mutation yang invalidates "Order", cache ini akan dihapus dan refetch.
      providesTags: ["Tables"],
    }),

    getTableById: builder.query({
      query: (id) => `/tables/${id}`,
      providesTags: (result, error, id) => [{ type: "Tables", id }],
    }),

    // Endpoint untuk POST /tables - Menggunakan mutation untuk operasi yang mengubah data (create).
    createTable: builder.mutation({
      query: (data) => ({
        url: "/tables",
        method: "POST",
        body: data, // Data yang dikirim dalam body request.
      }),
      // invalidatesTags: Setelah mutation berhasil, hapus cache dengan tag "Table" agar query getTables refetch data terbaru.
      invalidatesTags: ["Tables"],
    }),

    // Endpoint untuk PUT /tables/:id - Mutation untuk update table berdasarkan ID.
    updateTable: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/tables/${id}`,
        method: "PUT",
        body, // Body berisi data update, id sudah diekstrak.
      }),
      invalidatesTags: ["Tables"], // Invalidasi cache setelah update.
    }),

    // Endpoint untuk DELETE /tables/:id - Mutation untuk menghapus table.
    deleteTable: builder.mutation({
      query: (id) => ({
        url: `/tables/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tables"], // Invalidasi cache setelah delete.
    }),
  }),
});

// Export hooks yang dihasilkan secara otomatis oleh RTK Query. Hooks ini dapat digunakan di komponen React untuk mengakses data dan melakukan mutations.
// Contoh: useGetTablesQuery() untuk fetch tables, useCreateTableMutation() untuk membuat table baru.
export const {
  useGetTablesQuery,
  useGetTableByIdQuery,
  useCreateTableMutation,
  useUpdateTableMutation,
  useDeleteTableMutation,
} = tablesApi;
