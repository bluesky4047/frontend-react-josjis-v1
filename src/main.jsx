import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { router } from "./app/router";
import { AuthProvider } from "./features/auth/authContext";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Provider Redux harus membungkus semua komponen agar bisa akses data seperti useReducer dengan useContext */}
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 6000,
            style: {
              background: "rgb(232, 169, 35)",
              color: "#fff",
              fontWeight: 1000,
              borderRadius: "12px",
              padding: "14px 16px",
            },
          }}
        />
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
);
