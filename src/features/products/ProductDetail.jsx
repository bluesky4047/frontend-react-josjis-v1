import React from "react";
import { Link } from "react-router";
import { productDetailStyles } from "./productsStyle";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "./ProductsApi";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Number(value));
  };

  const fallbackImage = "https://via.placeholder.com/300x200?text=No+Image";
  const { data: res = [], isLoading, isError } = useGetProductByIdQuery(id);
  const [activeImg, setActiveImg] = useState(0);

  if (isLoading)
    return (
      <div>
        {/* <Spinner /> */}
        <p>Loading...</p>
      </div>
    );

  const p = res?.data;

  return (
    <div style={productDetailStyles.page}>
      <button style={productDetailStyles.backBtn} onClick={() => navigate("/")}>
        ← Kembali ke Produk
      </button>

      <div style={productDetailStyles.grid}>
        {/* Images */}
        <div>
          <div style={productDetailStyles.imgMain}>
            <img
              src={p.img_urls[activeImg]}
              alt={p.name}
              style={productDetailStyles.img}
              onError={(e) => {
                e.target.src =
                  "https://placehold.co/600x320/F5E6C8/3B1F0A?text=Foto";
              }}
            />
          </div>
          <div style={productDetailStyles.thumbs}>
            {p.img_urls.map((url, i) => (
              <div
                key={i}
                style={productDetailStyles.thumb(activeImg === i)}
                onClick={() => setActiveImg(i)}
              >
                <img
                  src={url}
                  alt=""
                  style={productDetailStyles.thumbImg}
                  onError={(e) => {
                    e.target.src =
                      "https://placehold.co/60x60/F5E6C8/3B1F0A?text=?";
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div style={productDetailStyles.info}>
          {p.category && (
            <span style={productDetailStyles.category}>{p.category}</span>
          )}
          <div style={productDetailStyles.name}>{p.name}</div>
          <div style={productDetailStyles.desc}>{p.description}</div>
          <div style={productDetailStyles.price}>{formatRupiah(p.price)}</div>

          <div style={productDetailStyles.metaRow}>
            <div style={productDetailStyles.metaItem}>
              <span style={productDetailStyles.metaLabel}>Status</span>
              <span style={productDetailStyles.statusBadge(p.is_active)}>
                {p.is_active ? "✓ Aktif" : "✗ Nonaktif"}
              </span>
            </div>
            <div style={productDetailStyles.metaItem}>
              <span style={productDetailStyles.metaLabel}>Foto</span>
              {p.img_urls.length} gambar
            </div>
          </div>

          <div style={productDetailStyles.metaItem}>
            <span style={productDetailStyles.metaLabel}>Ditambahkan</span>
            {formatDate(p.created_at)}
          </div>
          <div style={productDetailStyles.metaItem}>
            <span style={productDetailStyles.metaLabel}>Diperbarui</span>
            {formatDate(p.updated_at)}
          </div>
          <div
            style={{
              ...productDetailStyles.metaItem,
              fontSize: "0.68rem",
              color: "#C0A878",
              fontFamily: "monospace",
            }}
          >
            ID: {p.id}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
    padding: "20px",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
  },
  image: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
  },
  content: {
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  title: {
    fontSize: "16px",
    fontWeight: "bold",
    margin: 0,
  },
  desc: {
    fontSize: "13px",
    color: "#666",
    margin: 0,
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "8px",
    fontSize: "12px",
  },
  category: {
    background: "#eee",
    padding: "2px 6px",
    borderRadius: "6px",
  },
  price: {
    fontWeight: "bold",
    color: "#e63946",
  },
  button: {
    marginTop: "10px",
    padding: "8px",
    border: "none",
    borderRadius: "8px",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
  },
};
