// AdminPayments.jsx
// Admin panel: Payments — Update Status, Hapus
// CSS Module: AdminPayments.module.css

import { useState, useMemo } from "react";
import styles from "./payments.module.css";
import {
  useGetPaymentsQuery,
  useCreatePaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
} from "./PaymentApi";

const STATUS_OPTIONS = ["pending", "success", "failed"];

// ── Helpers ───────────────────────────────────────────────────────────────
const formatRupiah = (v) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(v));

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

const statusClass = (s) => {
  if (s === "success") return styles.statusSuccess;
  if (s === "failed") return styles.statusFailed;
  return styles.statusPending;
};

// ── Stats ─────────────────────────────────────────────────────────────────
function StatsRow({ payments }) {
  const count = (s) => payments.filter((p) => p.status === s).length;
  const sumOf = (s) =>
    payments
      .filter((p) => p.status === s)
      .reduce((acc, p) => acc + Number(p.amount), 0);
  return (
    <div className={styles.statsRow}>
      <div className={`${styles.statCard} ${styles.success}`}>
        <span className={styles.statIcon}>✅</span>
        <span className={styles.statValue}>{count("success")}</span>
        <span className={styles.statLabel}>Berhasil</span>
      </div>
      <div className={`${styles.statCard} ${styles.pending}`}>
        <span className={styles.statIcon}>⏳</span>
        <span className={styles.statValue}>{count("pending")}</span>
        <span className={styles.statLabel}>Pending</span>
      </div>
      <div className={`${styles.statCard} ${styles.failed}`}>
        <span className={styles.statIcon}>❌</span>
        <span className={styles.statValue}>{count("failed")}</span>
        <span className={styles.statLabel}>Gagal</span>
      </div>
      <div className={`${styles.statCard} ${styles.total}`}>
        <span className={styles.statIcon}>💰</span>
        <span className={styles.statValue} style={{ fontSize: "1.1rem" }}>
          {formatRupiah(sumOf("success"))}
        </span>
        <span className={styles.statLabel}>Total Masuk</span>
      </div>
    </div>
  );
}

// ── Delete modal ──────────────────────────────────────────────────────────
function DeleteModal({ payment, onClose, onConfirm }) {
  return (
    <div
      className={styles.overlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.deleteModal}>
        <div className={styles.deleteIcon}>🗑️</div>
        <div className={styles.deleteTitle}>Hapus Pembayaran?</div>
        <div className={styles.deleteDesc}>
          Hapus data pembayaran{" "}
          <strong>#{payment.id.substring(0, 8).toUpperCase()}</strong> senilai{" "}
          <strong>{formatRupiah(payment.amount)}</strong>? Tindakan ini tidak
          dapat dibatalkan.
        </div>
        <div className={styles.deleteActions}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Batal
          </button>
          <button className={styles.confirmDeleteBtn} onClick={onConfirm}>
            🗑️ Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────
export default function AdminPayments() {
  const { data: res = [], isLoading, isError } = useGetPaymentsQuery();
  const payments = res?.data?.payments || [];
  const meta = res?.data?.meta || {};
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterMethod, setFilterMethod] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState("");
  const [page, setPage] = useState(1);
  const PER_PAGE = 8;

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2800);
  };

  // Filter
  const filtered = useMemo(() => {
    return payments.filter((p) => {
      const q = search.toLowerCase();
      const matchSearch =
        p.id.includes(q) ||
        p.order_id.includes(q) ||
        p.midtrans_token.includes(q);
      const matchStatus = filterStatus === "" || p.status === filterStatus;
      const matchMethod = filterMethod === "" || p.method === filterMethod;
      return matchSearch && matchStatus && matchMethod;
    });
  }, [payments, search, filterStatus, filterMethod]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // Update status
  const handleStatusChange = (id, newStatus) => {
    setPayments((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status: newStatus,
              paid_at:
                newStatus === "success" ? new Date().toISOString() : null,
            }
          : p,
      ),
    );
    showToast(`Status pembayaran diperbarui ke "${newStatus}"`);
  };

  // Delete
  const handleDelete = () => {
    setPayments((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    showToast(
      `Pembayaran #${deleteTarget.id.substring(0, 8).toUpperCase()} berhasil dihapus`,
    );
    setDeleteTarget(null);
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <div className={styles.eyebrow}>✦ Keuangan</div>
          <div className={styles.title}>Pembayaran</div>
          <div className={styles.meta}>
            {payments.length} transaksi · {filtered.length} ditampilkan
          </div>
        </div>
      </div>

      {/* Stats */}
      <StatsRow payments={payments} />

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            className={styles.searchInput}
            placeholder="Cari ID, Order ID, atau token..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <select
          className={styles.filterSelect}
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setPage(1);
          }}
        >
          <option value="">Semua Status</option>
          <option value="pending">Pending</option>
          <option value="success">Success</option>
          <option value="failed">Failed</option>
        </select>
        <select
          className={styles.filterSelect}
          value={filterMethod}
          onChange={(e) => {
            setFilterMethod(e.target.value);
            setPage(1);
          }}
        >
          <option value="">Semua Metode</option>
          <option value="midtrans">Midtrans</option>
          <option value="cash">Cash</option>
        </select>
      </div>

      {/* Table */}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.th}>#ID</th>
              <th className={styles.th}>Order ID</th>
              <th className={styles.th}>Metode</th>
              <th className={styles.th}>Jumlah</th>
              <th className={styles.th}>Status</th>
              <th className={styles.th}>Ubah Status</th>
              <th className={styles.th}>Dibayar</th>
              <th className={styles.th}>Waktu</th>
              <th className={styles.th}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={9} className={styles.td}>
                  <div className={styles.empty}>
                    <div className={styles.emptyIcon}>💳</div>
                    <div className={styles.emptyText}>
                      Tidak ada pembayaran ditemukan
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              paginated.map((pay, i) => (
                <tr
                  key={pay.id}
                  className={`${styles.tr} ${i % 2 === 1 ? styles.trAlt : ""}`}
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  <td className={styles.td}>
                    <span className={styles.idCode}>
                      {pay.id.substring(0, 8)}
                    </span>
                  </td>
                  <td className={styles.td}>
                    <span className={styles.idCode}>
                      {pay.order_id.substring(0, 8)}…
                    </span>
                  </td>
                  <td className={styles.td}>
                    <span className={styles.methodBadge}>{pay.method}</span>
                  </td>
                  <td className={styles.td}>
                    <span className={styles.amount}>
                      {formatRupiah(pay.amount)}
                    </span>
                  </td>
                  <td className={styles.td}>
                    <span
                      className={`${styles.statusBadge} ${statusClass(pay.status)}`}
                    >
                      {pay.status}
                    </span>
                  </td>
                  <td className={styles.td}>
                    <select
                      className={styles.statusSelect}
                      value={pay.status}
                      onChange={(e) =>
                        handleStatusChange(pay.id, e.target.value)
                      }
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className={styles.td}>
                    {pay.paid_at ? (
                      <span className={styles.paidBadge}>
                        ✓ {formatDate(pay.paid_at)}
                      </span>
                    ) : (
                      <span className={styles.notPaid}>Belum</span>
                    )}
                  </td>
                  <td className={styles.td}>{formatDate(pay.created_at)}</td>
                  <td className={styles.td}>
                    <div className={styles.actions}>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => setDeleteTarget(pay)}
                      >
                        🗑️ Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <span className={styles.pageMeta}>
            Halaman {page} dari {totalPages}
          </span>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`${styles.pageBtn} ${page === i + 1 ? styles.pageBtnActive : ""}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Delete modal */}
      {deleteTarget && (
        <DeleteModal
          payment={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      )}

      {/* Toast */}
      {toast && <div className={styles.toast}>✅ {toast}</div>}
    </div>
  );
}
