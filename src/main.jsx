import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { router } from "./app/router";
import { AuthProvider } from "./features/auth/authContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Provider Redux harus membungkus semua komponen agar bisa akses data seperti useReducer dengan useContext */}
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
);
