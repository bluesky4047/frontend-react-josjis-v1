import { useState, useMemo } from "react";
import styles from "./products.module.css";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "./ProductsApi";

// ── Helpers ───────────────────────────────────────────────────────────────
const formatRupiah = (val) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(val));

const uid = () => crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);

const EMPTY_FORM = {
  name: "",
  description: "",
  category: "",
  price: "",
  is_active: true,
  image: [],
};

// ── Sub-components ────────────────────────────────────────────────────────

function Toast({ message }) {
  if (!message) return null;
  return <div className={styles.toast}>✅ {message}</div>;
}

function ProductFormModal({ product, onClose, onSave }) {
  const isEdit = Boolean(product?.id);
  const [form, setForm] = useState(
    isEdit
      ? {
          name: product.name,
          description: product.description,
          category: product.category ?? "",
          price: product.price,
          is_active: product.is_active,
        }
      : { ...EMPTY_FORM },
  );
  const [previews, setPreviews] = useState(
    isEdit && product?.img_urls ? product.img_urls : [],
  );
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleImage = (e) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    // simpan file asli
    set("images", files);

    // buat preview URLs
    const urls = files.map((file) => URL.createObjectURL(file));

    setPreviews(urls);
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Nama produk wajib diisi";
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0)
      e.price = "Harga harus berupa angka positif";
    return e;
  };

  // const { addProduct, editProduct } = useProducts();

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    onSave({
      ...(isEdit
        ? product
        : { id: uid(), img_urls: [], created_at: new Date().toISOString() }),
      ...form,
      image: form.image,
      price: String(Number(form.price)),
      category: form.category.trim() || null,
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
            {isEdit ? "✏️ Edit Produk" : "➕ Tambah Produk"}
          </div>
          <button className={styles.modalClose} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.modalBody}>
          {/* Name */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Nama Produk *</label>
            <input
              className={styles.input}
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="mis. Ayam Bakar"
            />
            {errors.name && (
              <div
                style={{ color: "#DC2626", fontSize: "0.75rem", marginTop: 4 }}
              >
                {errors.name}
              </div>
            )}
          </div>

          {/* Description */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Deskripsi</label>
            <textarea
              className={styles.textarea}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Deskripsi singkat produk..."
            />
          </div>

          {/* Price + Category */}
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Harga (Rp) *</label>
              <input
                className={styles.input}
                type="number"
                min="0"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                placeholder="25000"
              />
              {errors.price && (
                <div
                  style={{
                    color: "#DC2626",
                    fontSize: "0.75rem",
                    marginTop: 4,
                  }}
                >
                  {errors.price}
                </div>
              )}
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Kategori</label>
              <select
                className={styles.select}
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
              >
                <option value="">— Tidak ada —</option>
                <option value="makanan">Makanan</option>
                <option value="minuman">Minuman</option>
                <option value="snack">Snack</option>
                <option value="dessert">Dessert</option>
              </select>
            </div>
          </div>

          {/* Upload Image */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Foto Produk</label>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImage}
              className={styles.fileInput}
            />

            {previews.length > 0 && (
              <div className={styles.previewGrid}>
                {previews.map((src, i) => (
                  <div key={i} className={styles.previewCard}>
                    <img
                      src={src}
                      alt={`preview-${i}`}
                      className={styles.previewImage}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Status */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Status Produk</label>
            <div className={styles.checkRow}>
              <input
                type="checkbox"
                id="is_active"
                checked={form.is_active}
                onChange={(e) => set("is_active", e.target.checked)}
              />
              <label className={styles.checkLabel} htmlFor="is_active">
                {form.is_active
                  ? "✅ Aktif — tampil di menu"
                  : "❌ Nonaktif — disembunyikan"}
              </label>
            </div>
          </div>

          <div className={styles.modalFooter}>
            <button className={styles.cancelBtn} onClick={onClose}>
              Batal
            </button>
            <button className={styles.submitBtn} onClick={handleSave}>
              {isEdit ? "💾 Simpan Perubahan" : "➕ Tambah Produk"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeleteConfirmModal({ product, onClose, onConfirm }) {
  return (
    <div
      className={styles.overlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.deleteModal}>
        <div className={styles.deleteIcon}>🗑️</div>
        <div className={styles.deleteTitle}>Hapus Produk?</div>
        <div className={styles.deleteDesc}>
          Apakah kamu yakin ingin menghapus <strong>"{product.name}"</strong>?
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

// ── Main Component ─────────────────────────────────────────────────────────
export default function AdminProducts() {
  const { data: res = [], isLoading, isError } = useGetProductsQuery();
  const products = res.data?.products || [];
  const meta = res.data?.meta || {};
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("");
  const [modalType, setModalType] = useState(null); // "add" | "edit" | "delete"
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState("");
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2800);
  };

  // ── Filtered list ──────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.description ?? "").toLowerCase().includes(search.toLowerCase());
      const matchCat = filterCat === "" || (p.category ?? "") === filterCat;
      return matchSearch && matchCat;
    });
  }, [products, search, filterCat]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // ── CRUD handlers ──────────────────────────────────────────────────────
  const handleSave = (data) => {
    if (modalType === "add") {
      // setProducts((prev) => [data, ...prev]);
      showToast(`Produk "${data.name}" berhasil ditambahkan`);
    } else {
      // setProducts((prev) => prev.map((p) => (p.id === data.id ? data : p)));
      showToast(`Produk "${data.name}" berhasil diperbarui`);
    }
    setModalType(null);
    setSelected(null);
  };

  const handleDelete = () => {
    // setProducts((prev) => prev.filter((p) => p.id !== selected.id));
    showToast(`Produk "${selected.name}" berhasil dihapus`);
    setModalType(null);
    setSelected(null);
  };

  const openEdit = (p) => {
    setSelected(p);
    setModalType("edit");
  };
  const openDelete = (p) => {
    setSelected(p);
    setModalType("delete");
  };
  const closeModal = () => {
    setModalType(null);
    setSelected(null);
  };

  return (
    <div className={styles.page}>
      {/* ── Header ── */}
      <div className={styles.pageHeader}>
        <div className={styles.titleGroup}>
          <div className={styles.eyebrow}>✦ Manajemen Menu</div>
          <div className={styles.title}>Produk</div>
          <div className={styles.meta}>
            Halaman {meta.page} dari {meta.totalPages}, menampilkan{" "}
            {meta.total < meta.limit ? meta.total : meta.limit} data dari total{" "}
            {meta.total} produk
          </div>
        </div>
        <button className={styles.addBtn} onClick={() => setModalType("add")}>
          ＋ Tambah Produk
        </button>
      </div>

      {/* ── Toolbar ── */}
      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            className={styles.searchInput}
            placeholder="Cari nama atau deskripsi..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <select
          className={styles.filterSelect}
          value={filterCat}
          onChange={(e) => {
            setFilterCat(e.target.value);
            setPage(1);
          }}
        >
          <option value="">Semua Kategori</option>
          <option value="">Tanpa Kategori</option>
          <option value="makanan">Makanan</option>
          <option value="minuman">Minuman</option>
          <option value="snack">Snack</option>
          <option value="dessert">Dessert</option>
        </select>
      </div>

      {/* ── Table ── */}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.th}>Produk</th>
              <th className={styles.th}>Kategori</th>
              <th className={styles.th}>Harga</th>
              <th className={styles.th}>Status</th>
              <th className={styles.th}>Dibuat</th>
              <th className={styles.th}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={6} className={styles.td}>
                  <div className={styles.empty}>
                    <div className={styles.emptyIcon}>🍽️</div>
                    <div className={styles.emptyText}>
                      Tidak ada produk ditemukan
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              paginated.map((p, i) => (
                <tr
                  key={p.id}
                  className={`${styles.tr} ${i % 2 === 1 ? styles.trAlt : ""}`}
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  {/* Product cell */}
                  <td className={styles.td}>
                    <div className={styles.productCell}>
                      <img
                        className={styles.productThumb}
                        src={
                          p.img_urls[0] ||
                          "https://placehold.co/52x52/F5E6C8/3B1F0A?text=📷"
                        }
                        alt={p.name}
                        onError={(e) => {
                          e.target.src =
                            "https://placehold.co/52x52/F5E6C8/3B1F0A?text=?";
                        }}
                      />
                      <div>
                        <div className={styles.productName}>{p.name}</div>
                        <div className={styles.productDesc}>
                          {p.description}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className={styles.td}>
                    {p.category ? (
                      <span className={styles.categoryBadge}>{p.category}</span>
                    ) : (
                      <span className={styles.categoryNone}>Null</span>
                    )}
                  </td>

                  {/* Price */}
                  <td className={styles.td}>
                    <span className={styles.price}>
                      {formatRupiah(p.price)}
                    </span>
                  </td>

                  {/* Status */}
                  <td className={styles.td}>
                    <span
                      className={`${styles.statusBadge} ${p.is_active ? styles.statusActive : styles.statusInactive}`}
                    >
                      {p.is_active ? "● Aktif" : "● Nonaktif"}
                    </span>
                  </td>

                  {/* Created */}
                  <td className={styles.td}>
                    {new Date(p.created_at).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  {/* Actions */}
                  <td className={styles.td}>
                    <div className={styles.actions}>
                      <button
                        className={styles.editBtn}
                        onClick={() => openEdit(p)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => openDelete(p)}
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

      {/* ── Pagination ── */}
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

      {/* ── Modals ── */}
      {(modalType === "add" || modalType === "edit") && (
        <ProductFormModal
          product={selected}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}
      {modalType === "delete" && (
        <DeleteConfirmModal
          product={selected}
          onClose={closeModal}
          onConfirm={handleDelete}
        />
      )}

      {/* ── Toast ── */}
      <Toast message={toast} />
    </div>
  );
}
