import { footerStyles } from "./layoutStyle";
import { useNavigate } from "react-router";

const menuItems = [
  { key: "/", label: "Produk" },
  { key: "/orders", label: "Pesanan" },
  { key: "/payments", label: "Pembayaran" },
  { key: "/tables", label: "Meja" },
];

function Footer() {
  const navigate = useNavigate();

  return (
    <footer style={footerStyles.footer}>
      <div style={footerStyles.grid}>
        <div>
          <div style={footerStyles.title}>🔥 Warung Pak Eko</div>
          <p style={footerStyles.desc}>
            Sistem manajemen warung kuliner khas Indonesia. Memudahkan
            pengelolaan produk, pesanan, pembayaran, dan meja secara digital.
          </p>
        </div>
        <div>
          <div style={footerStyles.colTitle}>Menu</div>
          {menuItems.map((m) => (
            <div
              key={m.key}
              style={footerStyles.colItem}
              onClick={() => navigate(m.key)}
            >
              🌿 {m.label}
            </div>
          ))}
        </div>
        <div>
          <div style={footerStyles.colTitle}>Kontak</div>
          <div style={footerStyles.colItem}>📍 Surabaya, Jawa Timur</div>
          <div style={footerStyles.colItem}>📞 +62 812-3456-7890</div>
          <div style={footerStyles.colItem}>✉️ info@warungnusantara.id</div>
          <div style={footerStyles.colItem}>⏰ Buka 07.00 – 22.00</div>
        </div>
      </div>
      <div style={footerStyles.bottom}>
        <span>
          © {new Date().getFullYear()} Warung Pak Eko. Dibuat dengan ❤️ untuk
          UMKM Indonesia.
        </span>
        <span style={footerStyles.badge}>UMKM 🇮🇩</span>
      </div>
    </footer>
  );
}

export default Footer;
