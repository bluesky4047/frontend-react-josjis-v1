import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../features/movies/moviesSlice";
import { todoApi } from "../features/todos/todoApi";
import { productsApi } from "../features/products/ProductsApi";
import { ordersApi } from "../features/order/OrdersApi";
import { paymentsApi } from "../features/payments/PaymentApi";
import { tablesApi } from "../features/tables/TablesApi";

export const store = configureStore({
  reducer: {
    // Movies CRUD — state data lokal TIDAK DISIMPAN DI BACKEND, hanya di frontend saja
    movies: moviesReducer,

    // RTK Query — reducer & cache untuk todos
    [todoApi.reducerPath]: todoApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [paymentsApi.reducerPath]: paymentsApi.reducer,
    [tablesApi.reducerPath]: tablesApi.reducer,
  },

  // WAJIB menambahkan: middleware RTK Query untuk caching, invalidasi, polling
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      todoApi.middleware,
      productsApi.middleware,
      ordersApi.middleware,
      paymentsApi.middleware,
      tablesApi.middleware,
    ),
});
