import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Redux Toolkit (RTK) adalah library yang menyederhanakan penggunaan Redux dengan menyediakan utilitas seperti createSlice, configureStore, dan RTK Query.
// RTK Query adalah bagian dari RTK yang memungkinkan pengelolaan data server-side dengan caching otomatis, invalidation, dan hooks siap pakai.
// File ini mendefinisikan API slice untuk mengelola data products menggunakan RTK Query.

export const paymentsApi = createApi({
  // reducerPath: Nama unik untuk slice ini di Redux store. Digunakan untuk menyimpan cache dan state RTK Query.
  reducerPath: "paymentsApi",

  baseQuery: fetchBaseQuery({
    // baseUrl: URL dasar untuk semua request API. Diambil dari environment variable VITE_SERVER_URL dan ditambahkan "/api".
    baseUrl: import.meta.env.VITE_SERVER_URL,
    // credentials: "include" memastikan cookie dikirim dengan setiap request, berguna untuk autentikasi berbasis session.
    credentials: "include",
  }),

  // tagTypes: Array dari string yang mendefinisikan tag untuk invalidasi cache. Ketika data berubah, cache dengan tag tertentu dapat dihapus otomatis.
  tagTypes: ["Payments"],

  endpoints: (builder) => ({
    // Endpoint untuk GET /payments - Menggunakan query untuk operasi read-only. Data akan dicache dan dapat diakses ulang tanpa request baru.
    getPayments: builder.query({
      query: () => "/payments",
      //   transformResponse: (response) => {
      //     return response.data.orders;
      //   },
      // providesTags: Menandai cache ini dengan tag "Order". Jika ada mutation yang invalidates "Order", cache ini akan dihapus dan refetch.
      providesTags: ["Payments"],
    }),

    getPaymentById: builder.query({
      query: (id) => `/payments/${id}`,
      providesTags: (result, error, id) => [{ type: "Payments", id }],
    }),

    // Endpoint untuk POST /payments - Menggunakan mutation untuk operasi yang mengubah data (create).
    createPayment: builder.mutation({
      query: (data) => ({
        url: "/payments",
        method: "POST",
        body: data, // Data yang dikirim dalam body request.
      }),
      // invalidatesTags: Setelah mutation berhasil, hapus cache dengan tag "Payment" agar query getPayments refetch data terbaru.
      invalidatesTags: ["Payments"],
    }),

    // Endpoint untuk PUT /payments/:id - Mutation untuk update payment berdasarkan ID.
    updatePayment: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/payments/${id}`,
        method: "PUT",
        body, // Body berisi data update, id sudah diekstrak.
      }),
      invalidatesTags: ["Payments"], // Invalidasi cache setelah update.
    }),

    // Endpoint untuk DELETE /payments/:id - Mutation untuk menghapus payment.
    deletePayment: builder.mutation({
      query: (id) => ({
        url: `/payments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Payments"], // Invalidasi cache setelah delete.
    }),
  }),
});

// Export hooks yang dihasilkan secara otomatis oleh RTK Query. Hooks ini dapat digunakan di komponen React untuk mengakses data dan melakukan mutations.
// Contoh: useGetPaymentsQuery() untuk fetch payments, useCreatePaymentMutation() untuk membuat payment baru.
export const {
  useGetPaymentsQuery,
  useGetPaymentByIdQuery,
  useCreatePaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
} = paymentsApi;
