import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../../features/auth/authContext";
import { loginStyles } from "../../features/auth/authStyle";
export default function Signin() {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");

    if (!form.email || !form.password) {
      return setError("Email dan password wajib diisi");
    }

    setLoading(true);
    try {
      await signin(form);
      navigate("/");
    } catch (err) {
      setError("Login gagal. Cek kembali akun kamu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={loginStyles.wrapper}>
      <div style={loginStyles.bg} />
      <div style={loginStyles.card}>
        <div style={loginStyles.header}>
          <div style={loginStyles.headerIcon}>🔥</div>
          <div style={loginStyles.headerTitle}>Warung Pak Eko</div>
          <div style={loginStyles.headerSub}>Masuk ke panel manajemen</div>
        </div>
        <div style={loginStyles.body}>
          {error && <div style={loginStyles.error}>⚠️ {error}</div>}

          <label style={loginStyles.label}>Email Pengguna</label>
          <div style={loginStyles.inputWrap}>
            <span style={loginStyles.inputIcon}>👤</span>
            <input
              style={loginStyles.input}
              type="email"
              placeholder="Masukkan email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>

          <label style={loginStyles.label}>Kata Sandi</label>
          <div style={loginStyles.inputWrap}>
            <span style={loginStyles.inputIcon}>🔒</span>
            <input
              style={loginStyles.input}
              type="password"
              placeholder="Masukkan kata sandi"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>

          <button
            style={{ ...loginStyles.btn, opacity: loading ? 0.7 : 1 }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Memproses..." : "🚀 Masuk Sekarang"}
          </button>

          {/* <div style={loginStyles.hintBox}>
            <strong>Demo:</strong> nama: <code>admin</code> / sandi:{" "}
            <code>admin123</code>
          </div> */}
          <div style={loginStyles.hint}>
            Warung Pak Eko © {new Date().getFullYear()} — UMKM Digital Indonesia
          </div>
        </div>
      </div>
    </div>
  );
}
