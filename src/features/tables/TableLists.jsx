import React from "react";
import { Link } from "react-router";
import { tablePageStyles } from "./tablesStyle";
import { useState } from "react";
import { useNavigate } from "react-router";
import TablesSkeleton from "./TableLoading";

import {
  useGetTablesQuery,
  useCreateTableMutation,
  useUpdateTableMutation,
  useDeleteTableMutation,
} from "./TablesApi";

export default function TableLists() {
  const navigate = useNavigate();
  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Number(value));
  };

  const fallbackImage = "https://via.placeholder.com/300x200?text=No+Image";
  const { data: res = [], isLoading, isError } = useGetTablesQuery();
  const [hoveredId, setHoveredId] = useState(null);
  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  if (isLoading)
    return (
      <div style={tablePageStyles.page}>
        <TablesSkeleton count={6} />
      </div>
    );

  const tables = res?.data ?? [];

  return (
    <div style={tablePageStyles.page}>
      <div style={tablePageStyles.header}>
        <div style={tablePageStyles.eyebrow}>✦ Manajemen</div>
        <div style={tablePageStyles.title}>Daftar Meja</div>
        <div
          style={{
            color: "#9B6A3A",
            fontSize: "0.85rem",
            marginTop: "0.25rem",
          }}
        >
          {/* {tables.length} meja terdaftar */}
        </div>
      </div>

      <div style={tablePageStyles.grid}>
        {tables.map((tbl, i) => (
          <div
            key={tbl.id}
            style={{ ...tablePageStyles.card, animationDelay: `${i * 0.1}s` }}
          >
            <div style={tablePageStyles.accent} />
            <div style={tablePageStyles.icon}>🪑</div>
            <div>
              <div style={tablePageStyles.name}>{tbl.name}</div>
              <div style={tablePageStyles.capacity}>
                👥 Kapasitas: <strong>{tbl.capacity} orang</strong>
              </div>
            </div>

            <div style={tablePageStyles.metaRow}>
              <span style={tablePageStyles.statusBadge(tbl.is_active)}>
                {tbl.is_active ? "● Aktif" : "● Nonaktif"}
              </span>
            </div>

            <div>
              <div
                style={{
                  fontSize: "0.78rem",
                  color: "#9B6A3A",
                  marginBottom: "2px",
                }}
              >
                Dibuat: {formatDate(tbl.created_at)}
              </div>
              <div style={{ fontSize: "0.78rem", color: "#9B6A3A" }}>
                Diperbarui: {formatDate(tbl.updated_at)}
              </div>
            </div>

            <div style={tablePageStyles.idText}>ID: {tbl.id}</div>
          </div>
        ))}
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
