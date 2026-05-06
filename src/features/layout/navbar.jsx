import { navbarStyles } from "./layoutStyle";
import { useAuth } from "../auth/authContext";

function Navbar() {
  const { user, logout } = useAuth();

  const navItems = [
    { key: "products", label: "Produk", icon: "🍽️" },
    { key: "orders", label: "Pesanan", icon: "📋" },
    { key: "payments", label: "Pembayaran", icon: "💳" },
    { key: "tables", label: "Meja", icon: "🪑" },
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
              onClick={() => setPage(item.key)}
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
