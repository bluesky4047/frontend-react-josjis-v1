import React from "react";
import { Link } from "react-router";
import { paymentStyles } from "./paymentStyle";
import { useState } from "react";
import { useNavigate } from "react-router";
import PaymentsSkeleton from "./PaymentLoading";

import {
  useGetPaymentsQuery,
  useCreatePaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
} from "./PaymentApi";

export default function PaymentList() {
  const navigate = useNavigate();
  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Number(value));
  };

  const fallbackImage = "https://via.placeholder.com/300x200?text=No+Image";
  const { data: res = [], isLoading, isError } = useGetPaymentsQuery();
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
      <div style={paymentStyles.page}>
        <PaymentsSkeleton />
      </div>
    );

  const { payments, meta } = res.data;
  const totalAmount = payments.reduce((s, p) => s + Number(p.amount), 0);

  // const getProductName = (pid) => {
  //   const p = res.data.data.products.find((x) => x.id === pid);
  //   return p ? p.name : pid.substring(0, 8) + "…";
  // };

  return (
    <div style={paymentStyles.page}>
      <div style={paymentStyles.header}>
        <div style={paymentStyles.eyebrow}>✦ Keuangan</div>
        <div style={paymentStyles.title}>Daftar Pembayaran</div>
        <div
          style={{
            color: "#9B6A3A",
            fontSize: "0.85rem",
            marginTop: "0.25rem",
          }}
        >
          {meta.total} transaksi · Total {formatRupiah(totalAmount)}
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={paymentStyles.table}>
          <thead style={paymentStyles.thead}>
            <tr>
              {[
                "#ID",
                "Order ID",
                "Metode",
                "Jumlah",
                "Status",
                "Token",
                "Waktu",
              ].map((h) => (
                <th key={h} style={paymentStyles.th}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {payments.map((pay, i) => (
              <tr key={pay.id} style={i % 2 === 1 ? paymentStyles.trAlt : {}}>
                <td style={paymentStyles.td}>
                  <code style={{ fontSize: "0.72rem", color: "#9B6A3A" }}>
                    {pay.id.substring(0, 8)}
                  </code>
                </td>
                <td style={paymentStyles.td}>
                  <code style={{ fontSize: "0.72rem", color: "#9B6A3A" }}>
                    {pay.order_id.substring(0, 8)}…
                  </code>
                </td>
                <td style={paymentStyles.td}>
                  <span style={paymentStyles.methodBadge}>{pay.method}</span>
                </td>
                <td style={{ ...paymentStyles.td, ...paymentStyles.amount }}>
                  {formatRupiah(pay.amount)}
                </td>
                <td style={paymentStyles.td}>
                  <span style={paymentStyles.statusBadge(pay.status)}>
                    {pay.status}
                  </span>
                </td>
                <td style={{ ...paymentStyles.td, ...paymentStyles.tokenCell }}>
                  {pay.midtrans_token ? (
                    pay.midtrans_token
                  ) : (
                    <span style={{ color: "#C0A878" }}>—</span>
                  )}
                </td>
                <td style={paymentStyles.td}>
                  {new Date(pay.created_at).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
