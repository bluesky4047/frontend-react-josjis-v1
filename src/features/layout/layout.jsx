import Navbar from "./navbar";
import Footer from "./footer";
import { Outlet } from "react-router";
import { useAuth } from "../auth/authContext";

export default function Layout() {
  const { user } = useAuth();

  return (
    <>
      {user && <Navbar />}

      <main style={{ minHeight: "80vh" }}>
        <Outlet />
      </main>

      {user && <Footer />}
    </>
  );
}
