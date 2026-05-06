import { navbarStyles } from "./layoutStyle";
import { useAuth } from "../auth/authContext";
import { useNavigate } from "react-router";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { key: "/", label: "Produk", icon: "🍽️" },
    { key: "/orders", label: "Pesanan", icon: "📋" },
    { key: "/payments", label: "Pembayaran", icon: "💳" },
    { key: "/tables", label: "Meja", icon: "🪑" },
  ];

  return (
    <nav style={navbarStyles.nav}>
      <div
        style={navbarStyles.brand}
        onClick={() => setPage("products")}
        role="button"
      >
        <span style={navbarStyles.brandIcon}>🔥</span>
        <div>
          <span style={navbarStyles.brandText}>Warung Nusantara</span>
          <span style={navbarStyles.brandSub}>Kuliner Khas Indonesia</span>
        </div>
      </div>

      {user && (
        <div style={navbarStyles.links}>
          {navItems.map((item) => (
            <button
              key={item.key}
              style={navbarStyles.link(false)}
              onClick={() => navigate(item.key)}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
          <button style={navbarStyles.logoutBtn} onClick={logout}>
            Keluar ↩
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
