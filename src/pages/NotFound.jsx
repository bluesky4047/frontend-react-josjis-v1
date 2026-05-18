// NotFound.jsx
// Halaman 404 — Halaman Tidak Ditemukan
// Tema: Warung Nusantara — Dark Batik Brown + Golden + Orange accent
// CSS Module: NotFound.module.css

import styles from "./notFound.module.css";

// ── Props ──────────────────────────────────────────────────────────────────
// onGoHome    : () => void          — kembali ke beranda
// onNavigate  : (page: string) => void — navigasi ke halaman spesifik (opsional)
// ──────────────────────────────────────────────────────────────────────────

const QUICK_LINKS = [
  { icon: "🍽️", label: "Daftar Produk", page: "products" },
  { icon: "📋", label: "Daftar Pesanan", page: "orders" },
  { icon: "💳", label: "Pembayaran", page: "payments" },
  { icon: "🪑", label: "Manajemen Meja", page: "tables" },
];

export default function NotFound({ onGoHome, onNavigate }) {
  const handleLink = (page) => {
    if (onNavigate) onNavigate(page);
    else if (onGoHome) onGoHome();
  };

  return (
    <div className={styles.wrapper}>
      {/* Background layers */}
      <div className={styles.texture} />
      <div className={styles.glowTop} />
      <div className={styles.glowBottom} />
      <div className={styles.glowLeft} />

      {/* Two-column layout */}
      <div className={styles.inner}>
        {/* ── Left: Text content ── */}
        <div className={styles.left}>
          <div className={styles.eyebrow}>✦ Warung Nusantara</div>

          {/* 404 */}
          <div className={styles.codeWrap}>
            <span className={styles.codeDigit}>4</span>
            <span className={styles.codeZero}>0</span>
            <span className={styles.codeDigit}>4</span>
          </div>

          <div className={styles.title}>Halaman Tidak Ditemukan</div>

          <p className={styles.desc}>
            Seperti menu yang sudah habis terjual — halaman yang kamu cari tidak
            tersedia. Mungkin URL-nya salah, atau halaman sudah dipindahkan.
          </p>

          {/* CTA buttons */}
          <div className={styles.buttons}>
            <button className={styles.btnPrimary} onClick={onGoHome}>
              🏠 Kembali ke Beranda
            </button>
            <button
              className={styles.btnSecondary}
              onClick={() => window.history.back?.()}
            >
              ← Halaman Sebelumnya
            </button>
          </div>

          {/* Breadcrumb trail */}
          <div className={styles.trail}>
            <span>Beranda</span>
            <span className={styles.trailSep}>/</span>
            <span className={styles.trailCurrent}>404 — Tidak Ditemukan</span>
          </div>
        </div>

        {/* ── Right: Illustration + quick links ── */}
        <div className={styles.right}>
          {/* Floating bowl emoji */}
          <div className={styles.bowl}>🍛</div>

          {/* Quick navigation */}
          <div className={styles.suggestions}>
            <div className={styles.suggestTitle}>Mungkin yang kamu cari?</div>
            {QUICK_LINKS.map((link) => (
              <div
                key={link.page}
                className={styles.suggestRow}
                onClick={() => handleLink(link.page)}
              >
                <span className={styles.suggestIcon}>{link.icon}</span>
                <span className={styles.suggestLabel}>{link.label}</span>
                <span className={styles.suggestArrow}>→</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom watermark */}
      <div className={styles.bottomNote}>
        Warung Nusantara © 2026 — UMKM Kuliner Indonesia
      </div>
    </div>
  );
}
