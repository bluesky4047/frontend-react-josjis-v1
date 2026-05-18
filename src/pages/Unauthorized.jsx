// Unauthorized.jsx
// Halaman 401 — Akses Ditolak
// Tema: Warung Nusantara — Batik Brown + Warm Orange + Golden
// CSS Module: Unauthorized.module.css

import styles from "./unauthorized.module.css";

// ── Props ──────────────────────────────────────────────────────────────────
// onGoLogin   : () => void  — arahkan ke halaman login
// onGoHome    : () => void  — arahkan ke beranda (opsional)
// ──────────────────────────────────────────────────────────────────────────

export default function Unauthorized({ onGoLogin, onGoHome }) {
  return (
    <div className={styles.wrapper}>
      {/* Background layers */}
      <div className={styles.texture} />
      <div className={styles.glowOrange} />
      <div className={styles.glowGold} />

      {/* Card */}
      <div className={styles.card}>
        {/* Animated top band */}
        <div className={styles.band} />

        <div className={styles.body}>
          {/* Lock icon */}
          <div className={styles.lockWrap}>
            <div className={styles.lockCircle}>🔐</div>
            <div className={styles.lockBadge}>!</div>
          </div>

          {/* 401 code */}
          <div className={styles.code}>
            4<span className={styles.codeAccent}>0</span>1
          </div>

          {/* Title */}
          <div className={styles.titleRow}>
            <div className={styles.title}>Akses Ditolak</div>
          </div>

          {/* Description */}
          <p className={styles.desc}>
            Maaf, kamu tidak memiliki izin untuk mengakses halaman ini. Silakan
            masuk terlebih dahulu dengan akun yang valid untuk melanjutkan.
          </p>

          {/* Divider */}
          <div className={styles.divider}>
            <div className={styles.dividerLine} />
            <span className={styles.dividerIcon}>🌿</span>
            <div className={`${styles.dividerLine} ${styles.right}`} />
          </div>

          {/* Buttons */}
          <div className={styles.buttons}>
            <button className={styles.btnPrimary} onClick={onGoLogin}>
              🔑 Masuk ke Akun
            </button>
            {onGoHome && (
              <button className={styles.btnSecondary} onClick={onGoHome}>
                ← Kembali ke Beranda
              </button>
            )}
          </div>

          {/* Footer note */}
          <div className={styles.note}>
            Butuh akses? Hubungi administrator warung.{" "}
            <span className={styles.noteLink} onClick={onGoLogin}>
              Login di sini
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
