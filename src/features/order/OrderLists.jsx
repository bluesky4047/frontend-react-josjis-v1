// AdminOrders.jsx
// Admin panel: Orders — Update Status, Hapus
// CSS Module: AdminOrders.module.css

import { useState, useMemo } from "react";
import styles from "./orders.module.css";
import {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} from "./OrdersApi";

// ── Helpers ───────────────────────────────────────────────────────────────
const formatRupiah = (v) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(v));

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const STATUS_OPTIONS = ["pending", "served", "completed", "cancelled"];

const statusClass = (s) => {
  if (s === "pending") return styles.statusPending;
  if (s === "completed") return styles.statusCompleted;
  if (s === "cancelled") return styles.statusCancelled;
  if (s === "served") return styles.statusServed;
  return styles.statusPending;
};

// ── Stats ─────────────────────────────────────────────────────────────────
function StatsRow({ orders }) {
  const count = (s) => orders.filter((o) => o.status === s).length;
  const stats = [
    {
      key: "pending",
      label: "Pending",
      icon: "⏳",
      value: count("pending"),
      cls: "pending",
    },
    {
      key: "served",
      label: "Disajikan",
      icon: "🍽️",
      value: count("served"),
      cls: "completed",
    },
    {
      key: "completed",
      label: "Selesai",
      icon: "✅",
      value: count("completed"),
      cls: "completed",
    },
    {
      key: "cancelled",
      label: "Dibatalkan",
      icon: "❌",
      value: count("cancelled"),
      cls: "cancelled",
    },
    {
      key: "total",
      label: "Total",
      icon: "📋",
      value: orders.length,
      cls: "total",
    },
  ];
  return (
    <div className={styles.statsRow}>
      {stats.map((s) => (
        <div key={s.key} className={`${styles.statCard} ${styles[s.cls]}`}>
          <span className={styles.statIcon}>{s.icon}</span>
          <span className={styles.statValue}>{s.value}</span>
          <span className={styles.statLabel}>{s.label}</span>
        </div>
      ))}
    </div>
  );
}

// ── Delete modal ──────────────────────────────────────────────────────────
function DeleteOrderModal({ order, onClose, onConfirm }) {
  return (
    <div
      className={styles.overlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.deleteModal}>
        <div className={styles.deleteIcon}>🗑️</div>
        <div className={styles.deleteTitle}>Hapus Pesanan?</div>
        <div className={styles.deleteDesc}>
          Hapus pesanan{" "}
          <strong>#{order.id.substring(0, 8).toUpperCase()}</strong> dari{" "}
          <strong>{order.table_name}</strong>?<br />
          Tindakan ini tidak dapat dibatalkan.
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
export default function AdminOrders() {
  const { data: res = [], isLoading, isError } = useGetOrdersQuery();
  const orders = res?.data?.orders || [];
  const meta = res?.data?.meta || {};
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2800);
  };

  // ── Filter ────────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchSearch =
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        (o.table_name ?? "").toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === "" || o.status === filterStatus;
      return matchSearch && matchStatus;
    });
  }, [orders, search, filterStatus]);

  // ── Status update ─────────────────────────────────────────────────────
  const handleStatusChange = (orderId, newStatus) => {
    // setOrders((prev) =>
    //   prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
    // );
    showToast(`Status pesanan diperbarui ke "${newStatus}"`);
  };

  // ── Delete ────────────────────────────────────────────────────────────
  const handleDelete = () => {
    // setOrders((prev) => prev.filter((o) => o.id !== deleteTarget.id));
    showToast(
      `Pesanan #${deleteTarget.id.substring(0, 8).toUpperCase()} berhasil dihapus`,
    );
    setDeleteTarget(null);
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <div className={styles.eyebrow}>✦ Transaksi</div>
          <div className={styles.title}>Pesanan</div>
          <div className={styles.meta}>
            Halaman {meta.page} dari {meta.totalPages}, menampilkan{" "}
            {meta.total < meta.limit ? meta.total : meta.limit} data dari total{" "}
            {meta.total} pesanan
          </div>
        </div>
      </div>

      {/* Stats */}
      <StatsRow orders={orders} />

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            className={styles.searchInput}
            placeholder="Cari ID pesanan atau nama meja..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className={styles.filterSelect}
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">Semua Status</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Order list */}
      <div className={styles.orderList}>
        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>📋</div>
            <div className={styles.emptyText}>Tidak ada pesanan ditemukan</div>
          </div>
        ) : (
          filtered.map((order, i) => (
            <div
              key={order.id}
              className={styles.orderCard}
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              {/* Top */}
              <div className={styles.cardTop}>
                <div className={styles.cardTopLeft}>
                  <div className={styles.orderId}>
                    🛒 #{order.id.substring(0, 8).toUpperCase()}
                  </div>
                  <div className={styles.orderSub}>
                    📍 {order.table_name} &nbsp;·&nbsp; 🕐{" "}
                    {formatDate(order.created_at)}
                  </div>
                </div>
                <div className={styles.cardTopRight}>
                  {/* Current status badge */}
                  <span
                    className={`${styles.statusBadge} ${statusClass(order.status)}`}
                  >
                    {order.status}
                  </span>

                  {/* Change status */}
                  <select
                    className={styles.statusSelect}
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </option>
                    ))}
                  </select>

                  {/* Delete */}
                  <button
                    className={styles.deleteOrderBtn}
                    onClick={() => setDeleteTarget(order)}
                  >
                    🗑️ Hapus
                  </button>
                </div>
              </div>

              {/* Items */}
              <div className={styles.cardBody}>
                {order.order_items.map((item) => (
                  <div key={item.id} className={styles.itemRow}>
                    <div className={styles.itemLeft}>
                      <div className={styles.itemQty}>{item.qty}×</div>
                      <div className={styles.itemInfo}>
                        <div className={styles.itemName}>
                          {item?.products?.name}
                        </div>
                        <div className={styles.itemPriceUnit}>
                          @{formatRupiah(item.price)}
                        </div>
                        {item.notes && (
                          <div className={styles.itemNote}>📝 {item.notes}</div>
                        )}
                      </div>
                    </div>
                    <div className={styles.itemSubtotal}>
                      {formatRupiah(item.subtotal)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className={styles.cardFooter}>
                <span className={styles.totalLabel}>Total Pesanan</span>
                <span className={styles.total}>
                  {formatRupiah(order.total_amount)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete modal */}
      {deleteTarget && (
        <DeleteOrderModal
          order={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      )}

      {/* Toast */}
      {toast && <div className={styles.toast}>✅ {toast}</div>}
    </div>
  );
}
