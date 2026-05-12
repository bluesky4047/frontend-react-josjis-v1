// AdminTables.jsx
// Admin panel: Tables — Tambah, Edit, Hapus
// CSS Module: AdminTables.module.css

import { useState, useMemo } from "react";
import styles from "./table.module.css";
import { QRCode } from "react-qr-code";
import { toPng } from "html-to-image";
import {
  useGetTablesQuery,
  useCreateTableMutation,
  useUpdateTableMutation,
  useDeleteTableMutation,
} from "./TablesApi";

// ── Helpers ───────────────────────────────────────────────────────────────
const uid = () => crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);
const now = () => new Date().toISOString();
const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const EMPTY_FORM = { name: "", capacity: "2", is_active: true };

// ── Form Modal ────────────────────────────────────────────────────────────
function TableFormModal({ table, onClose, onSave }) {
  const isEdit = Boolean(table?.id);
  const [form, setForm] = useState(
    isEdit
      ? {
          name: table.name,
          capacity: String(table.capacity),
          is_active: table.is_active,
        }
      : { ...EMPTY_FORM },
  );
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Nama meja wajib diisi";
    const cap = Number(form.capacity);
    if (!form.capacity || isNaN(cap) || cap < 1 || cap > 50)
      e.capacity = "Kapasitas harus antara 1–50";
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    onSave({
      ...(isEdit
        ? { ...table, updated_at: now() }
        : { id: uid(), created_at: now(), updated_at: now() }),
      name: form.name.trim(),
      capacity: Number(form.capacity),
      is_active: form.is_active,
    });
  };

  return (
    <div
      className={styles.overlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>
            {isEdit ? "✏️ Edit Meja" : "➕ Tambah Meja"}
          </div>
          <button className={styles.modalClose} onClick={onClose}>
            ✕
          </button>
        </div>
        <div className={styles.modalBody}>
          {/* Name */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Nama Meja *</label>
            <input
              className={styles.input}
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="mis. Meja 3, Meja VIP, Teras A"
            />
            {errors.name && (
              <div className={styles.errorText}>{errors.name}</div>
            )}
          </div>

          {/* Capacity */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Kapasitas (orang) *</label>
            <input
              className={styles.input}
              type="number"
              min="1"
              max="50"
              value={form.capacity}
              onChange={(e) => set("capacity", e.target.value)}
              placeholder="2"
            />
            {errors.capacity && (
              <div className={styles.errorText}>{errors.capacity}</div>
            )}
          </div>

          {/* Status */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Status Meja</label>
            <div className={styles.checkRow}>
              <input
                type="checkbox"
                id="tbl_active"
                checked={form.is_active}
                onChange={(e) => set("is_active", e.target.checked)}
              />
              <label className={styles.checkLabel} htmlFor="tbl_active">
                {form.is_active
                  ? "✅ Aktif — tersedia untuk pesanan"
                  : "❌ Nonaktif — tidak tersedia"}
              </label>
            </div>
          </div>

          <div className={styles.modalFooter}>
            <button className={styles.cancelBtn} onClick={onClose}>
              Batal
            </button>
            <button className={styles.submitBtn} onClick={handleSave}>
              {isEdit ? "💾 Simpan Perubahan" : "➕ Tambah Meja"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Delete Modal ──────────────────────────────────────────────────────────
function DeleteModal({ table, onClose, onConfirm }) {
  return (
    <div
      className={styles.overlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.deleteModal}>
        <div className={styles.deleteIcon}>🗑️</div>
        <div className={styles.deleteTitle}>Hapus Meja?</div>
        <div className={styles.deleteDesc}>
          Apakah kamu yakin ingin menghapus <strong>"{table.name}"</strong>{" "}
          (kapasitas {table.capacity} orang)? Tindakan ini tidak dapat
          dibatalkan.
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

function QRCodeModal({ table, onClose }) {
  const createQRValue = () => {
    return `${window.location.origin}/menu/${table.id}?t=${Date.now()}`;
  };

  const [qrValue, setQrValue] = useState(createQRValue());

  // refresh QR
  const refreshQR = () => {
    setQrValue(createQRValue());
  };

  // download PNG
  const downloadQR = async () => {
    try {
      const element = document.getElementById("qr-wrapper");

      const dataUrl = await toPng(element);

      const link = document.createElement("a");

      link.download = `${table.name}-qr.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={styles.overlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>📱 QR Code {table.name}</div>

          <button className={styles.modalClose} onClick={onClose}>
            ✕
          </button>
        </div>

        <div
          className={styles.modalBody}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          {/* QR */}
          <div
            id="qr-wrapper"
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "16px",
              textAlign: "center",
            }}
          >
            <QRCode value={qrValue} size={220} level="H" includeMargin />

            <div
              style={{
                textAlign: "center",
                marginTop: "12px",
              }}
            >
              <strong>{table.name}</strong>
              <br />
              ID: {table.id}
            </div>
          </div>

          {/* URL */}
          <div
            style={{
              fontSize: "12px",
              wordBreak: "break-all",
              textAlign: "center",
              opacity: 0.7,
            }}
          >
            {qrValue}
          </div>

          {/* Actions */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <button className={styles.submitBtn} onClick={refreshQR}>
              🔄 Refresh QR
            </button>

            <button className={styles.submitBtn} onClick={downloadQR}>
              ⬇️ Download PNG
            </button>

            {/* <button className={styles.submitBtn} onClick={() => window.print()}>
              🖨️ Print QR
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────
export default function AdminTables() {
  const { data: res = [], isLoading, isError } = useGetTablesQuery();
  const tables = res?.data || [];
  const [search, setSearch] = useState("");
  const [modalType, setModalType] = useState(null); // "add" | "edit" | "delete"
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState("");
  const [qrTable, setQrTable] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2800);
  };

  // Filter
  const filtered = useMemo(
    () =>
      tables.filter((t) => t.name.toLowerCase().includes(search.toLowerCase())),
    [tables, search],
  );

  // Handlers
  const handleSave = (data) => {
    if (modalType === "add") {
      setTables((prev) => [...prev, data]);
      showToast(`Meja "${data.name}" berhasil ditambahkan`);
    } else {
      setTables((prev) => prev.map((t) => (t.id === data.id ? data : t)));
      showToast(`Meja "${data.name}" berhasil diperbarui`);
    }
    setModalType(null);
    setSelected(null);
  };

  const handleDelete = () => {
    setTables((prev) => prev.filter((t) => t.id !== selected.id));
    showToast(`Meja "${selected.name}" berhasil dihapus`);
    setModalType(null);
    setSelected(null);
  };

  const openEdit = (t) => {
    setSelected(t);
    setModalType("edit");
  };
  const openDelete = (t) => {
    setSelected(t);
    setModalType("delete");
  };
  const closeModal = () => {
    setModalType(null);
    setSelected(null);
  };

  // Quick toggle active
  const toggleActive = (id) => {
    setTables((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, is_active: !t.is_active, updated_at: now() } : t,
      ),
    );
    const t = tables.find((x) => x.id === id);
    showToast(`${t?.name} ${t?.is_active ? "dinonaktifkan" : "diaktifkan"}`);
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <div className={styles.eyebrow}>✦ Manajemen</div>
          <div className={styles.title}>Daftar Meja</div>
          <div className={styles.meta}>
            {tables.length} meja terdaftar ·{" "}
            {tables.filter((t) => t.is_active).length} aktif
          </div>
        </div>
        <button className={styles.addBtn} onClick={() => setModalType("add")}>
          ＋ Tambah Meja
        </button>
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            className={styles.searchInput}
            placeholder="Cari nama meja..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🪑</div>
          <div className={styles.emptyText}>Tidak ada meja ditemukan</div>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map((tbl, i) => (
            <div
              key={tbl.id}
              className={styles.card}
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className={styles.cardAccent} />

              <div className={styles.cardBody}>
                {/* Icon + Name */}
                <div className={styles.cardIconRow}>
                  <span className={styles.cardIcon}>🪑</span>
                  <span className={styles.cardName}>{tbl.name}</span>
                </div>

                {/* Capacity */}
                <div className={styles.capacityRow}>
                  👥 Kapasitas:{" "}
                  <span className={styles.capacityNum}>
                    {tbl.capacity} orang
                  </span>
                </div>

                {/* Status — clickable toggle */}
                <span
                  className={`${styles.statusBadge} ${tbl.is_active ? styles.statusActive : styles.statusInactive}`}
                  onClick={() => toggleActive(tbl.id)}
                  style={{ cursor: "pointer" }}
                  title="Klik untuk ubah status"
                >
                  {tbl.is_active ? "● Aktif" : "● Nonaktif"}
                </span>

                {/* Dates */}
                <div className={styles.dateText}>
                  Dibuat: {formatDate(tbl.created_at)}
                  <br />
                  Diperbarui: {formatDate(tbl.updated_at)}
                </div>

                {/* ID */}
                <div className={styles.idText}>ID: {tbl.id}</div>
              </div>

              {/* Actions */}
              <div className={styles.cardActions}>
                <button
                  className={styles.editBtn}
                  onClick={() => openEdit(tbl)}
                >
                  ✏️ Edit
                </button>
                <button
                  className={styles.qrBtn}
                  onClick={() => setQrTable(tbl)}
                >
                  📱 QR Code
                </button>
                <div className={styles.dividerV} />
                <button
                  className={styles.deleteBtn}
                  onClick={() => openDelete(tbl)}
                >
                  🗑️ Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      {(modalType === "add" || modalType === "edit") && (
        <TableFormModal
          table={selected}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}
      {modalType === "delete" && (
        <DeleteModal
          table={selected}
          onClose={closeModal}
          onConfirm={handleDelete}
        />
      )}
      {qrTable && (
        <QRCodeModal table={qrTable} onClose={() => setQrTable(null)} />
      )}

      {/* Toast */}
      {toast && <div className={styles.toast}>✅ {toast}</div>}
    </div>
  );
}
