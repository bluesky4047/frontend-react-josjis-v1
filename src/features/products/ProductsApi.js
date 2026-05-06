import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Redux Toolkit (RTK) adalah library yang menyederhanakan penggunaan Redux dengan menyediakan utilitas seperti createSlice, configureStore, dan RTK Query.
// RTK Query adalah bagian dari RTK yang memungkinkan pengelolaan data server-side dengan caching otomatis, invalidation, dan hooks siap pakai.
// File ini mendefinisikan API slice untuk mengelola data products menggunakan RTK Query.

export const productsApi = createApi({
  // reducerPath: Nama unik untuk slice ini di Redux store. Digunakan untuk menyimpan cache dan state RTK Query.
  reducerPath: "productsApi",

  baseQuery: fetchBaseQuery({
    // baseUrl: URL dasar untuk semua request API. Diambil dari environment variable VITE_SERVER_URL dan ditambahkan "/api".
    baseUrl: import.meta.env.VITE_SERVER_URL,
    // credentials: "include" memastikan cookie dikirim dengan setiap request, berguna untuk autentikasi berbasis session.
    credentials: "include",
  }),

  // tagTypes: Array dari string yang mendefinisikan tag untuk invalidasi cache. Ketika data berubah, cache dengan tag tertentu dapat dihapus otomatis.
  tagTypes: ["Product"],

  endpoints: (builder) => ({
    // Endpoint untuk GET /products - Menggunakan query untuk operasi read-only. Data akan dicache dan dapat diakses ulang tanpa request baru.
    getProducts: builder.query({
      query: () => "/products",
      //   transformResponse: (response) => {
      //     return response.data.products;
      //   },
      // providesTags: Menandai cache ini dengan tag "Product". Jika ada mutation yang invalidates "Product", cache ini akan dihapus dan refetch.
      providesTags: ["Product"],
    }),

    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    // Endpoint untuk POST /products - Menggunakan mutation untuk operasi yang mengubah data (create).
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data, // Data yang dikirim dalam body request.
      }),
      // invalidatesTags: Setelah mutation berhasil, hapus cache dengan tag "Product" agar query getProducts refetch data terbaru.
      invalidatesTags: ["Product"],
    }),

    // Endpoint untuk PUT /products/:id - Mutation untuk update product berdasarkan ID.
    updateProduct: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body, // Body berisi data update, id sudah diekstrak.
      }),
      invalidatesTags: ["Product"], // Invalidasi cache setelah update.
    }),

    // Endpoint untuk DELETE /products/:id - Mutation untuk menghapus product.
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"], // Invalidasi cache setelah delete.
    }),
  }),
});

// Export hooks yang dihasilkan secara otomatis oleh RTK Query. Hooks ini dapat digunakan di komponen React untuk mengakses data dan melakukan mutations.
// Contoh: useGetProductsQuery() untuk fetch products, useCreateProductMutation() untuk membuat product baru.
export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
