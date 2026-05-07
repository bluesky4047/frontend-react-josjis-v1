import React from "react";
import { Link } from "react-router";
import { productStyles } from "./productsStyle";
import { useState } from "react";
import { useNavigate } from "react-router";
import ProductsSkeleton from "./LoadingProductList";

import {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "./ProductsApi";

export default function ProductList() {
  const navigate = useNavigate();
  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Number(value));
  };

  const fallbackImage = "https://via.placeholder.com/300x200?text=No+Image";
  const { data: res = [], isLoading, isError } = useGetProductsQuery();
  const [hoveredId, setHoveredId] = useState(null);

  if (isLoading)
    return (
      <div style={productStyles.page}>
        <ProductsSkeleton count={6} />
      </div>
    );

  const { products, meta } = res.data;

  return (
    <div style={productStyles.page}>
      <div style={productStyles.header}>
        <div style={productStyles.titleGroup}>
          <div style={productStyles.eyebrow}>✦ Menu Kuliner</div>
          <div style={productStyles.title}>Daftar Produk</div>
          <div style={productStyles.meta}>
            {meta.total} produk tersedia · Halaman {meta.page} dari{" "}
            {meta.totalPages}
          </div>
        </div>
      </div>

      <div style={productStyles.grid}>
        {products.map((p, i) => {
          const isDeleted = p.is_deleted;
          const isInactive = !p.is_active;
          const isDisabled = isDeleted || isInactive;

          return (
            <div
              key={p.id}
              style={{
                ...productStyles.card,
                ...(isDisabled ? productStyles.disabledCard : {}),
                animationDelay: `${i * 0.1}s`,
                transform:
                  hoveredId === p.id && !isDisabled
                    ? "translateY(-6px)"
                    : "translateY(0)",
                boxShadow:
                  hoveredId === p.id && !isDisabled
                    ? "0 12px 40px rgba(59,31,10,0.18)"
                    : "0 4px 20px rgba(59,31,10,0.10)",
              }}
              onMouseEnter={() => !isDisabled && setHoveredId(p.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => {
                if (!isDisabled) {
                  navigate(`/products/${p.id}`);
                }
              }}
            >
              {isDisabled && (
                <div style={productStyles.disabledOverlay}>
                  <span style={productStyles.disabledBadge}>
                    {isDeleted ? "Deleted" : "Inactive"}
                  </span>
                </div>
              )}
              <div style={productStyles.imgWrap}>
                <img
                  src={p.img_urls[0]}
                  alt={p.name}
                  style={{
                    ...productStyles.img,
                    transform: hoveredId === p.id ? "scale(1.08)" : "scale(1)",
                  }}
                  onError={(e) => {
                    e.target.src =
                      "https://placehold.co/400x240/F5E6C8/3B1F0A?text=Foto";
                  }}
                />
                {p.category && (
                  <span style={productStyles.badge}>{p.category}</span>
                )}
              </div>
              <div style={productStyles.cardBody}>
                <div style={productStyles.cardName}>{p.name}</div>
                <div style={productStyles.cardDesc}>{p.description}</div>
                <div style={productStyles.cardFooter}>
                  <span style={productStyles.price}>
                    {formatRupiah(p.price)}
                  </span>
                  <button
                    style={productStyles.detailBtn}
                    onClick={() => navigate(`/products/${p.id}`)}
                  >
                    Lihat Detail →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
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
