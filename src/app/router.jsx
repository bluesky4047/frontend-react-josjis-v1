import React from "react";
import { createBrowserRouter } from "react-router";
import PrivateAuth from "../features/auth/PrivateAuth";
import PublicAuth from "../features/auth/PublicAuth";
import AllowRole from "../features/auth/AllowRole";
import Layout from "../features/layout/layout";
const ProductsPage = React.lazy(() => import("../pages/products"));
const ProductDetailPage = React.lazy(() => import("../pages/products/detail"));
const OrdersPage = React.lazy(() => import("../pages/order/index"));
const PaymentsPage = React.lazy(() => import("../pages/payments"));
const TablesPage = React.lazy(() => import("../pages/tables"));
const SigninPage = React.lazy(() => import("../pages/auth/Signin"));
const AdminPage = React.lazy(() => import("../pages/Admin"));
const Unauthorized = React.lazy(() => import("../pages/Unauthorized"));
const NotFound = React.lazy(() => import("../pages/NotFound"));
import { ProductProvider } from "../features/products/productContext";

export const router = createBrowserRouter([
  // PUBLIC
  {
    path: "/signin",
    element: (
      <PublicAuth>
        <SigninPage />
      </PublicAuth>
    ),
  },

  // PRIVATE
  {
    element: (
      <PrivateAuth>
        <Layout />
      </PrivateAuth>
    ),
    children: [
      {
        path: "/",
        element: (
          <ProductProvider>
            <ProductsPage />
          </ProductProvider>
        ),
      },
      {
        path: "/products/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "/orders",
        element: <OrdersPage />,
      },
      {
        path: "/payments",
        element: <PaymentsPage />,
      },
      {
        path: "/tables",
        element: <TablesPage />,
      },

      // ROLE BASED
      {
        path: "/admin",
        element: (
          <AllowRole allowedRoles={["admin"]}>
            <AdminPage />
          </AllowRole>
        ),
      },
    ],
  },

  // ROLE BASED
  {
    path: "/admin",
    element: (
      <PrivateAuth>
        <AllowRole allowedRoles={["admin"]}>
          <AdminPage />
        </AllowRole>
      </PrivateAuth>
    ),
  },

  {
    path: "/unauthorized",
    element: (
      <Unauthorized
        onGoHome={() => {
          router.navigate("/");
        }}
        onGoLogin={() => {
          router.navigate("/signin");
        }}
      />
    ),
  },
  { path: "*", element: <NotFound /> },
]);
