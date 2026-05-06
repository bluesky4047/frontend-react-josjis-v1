import React from "react";
import { Link } from "react-router";
import { orderStyles } from "./orderStyle";
import { useState } from "react";
import { useNavigate } from "react-router";

import {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} from "./OrdersApi";

export default function OrderList() {
  const navigate = useNavigate();
  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Number(value));
  };

  const fallbackImage = "https://via.placeholder.com/300x200?text=No+Image";
  const { data: res = [], isLoading, isError } = useGetOrdersQuery();
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
      <div style={orderStyles.page}>
        {/* <Spinner /> */}
        <p>Loading...</p>
      </div>
    );

  const { orders, meta } = res.data;

  // const getProductName = (pid) => {
  //   const p = res.data.data.products.find((x) => x.id === pid);
  //   return p ? p.name : pid.substring(0, 8) + "…";
  // };

  return (
    <div style={orderStyles.page}>
      <div style={orderStyles.header}>
        <div style={orderStyles.eyebrow}>✦ Transaksi</div>
        <div style={orderStyles.title}>Daftar Pesanan</div>
        <div style={orderStyles.meta}>
          {meta.total} pesanan · Halaman {meta.page} dari {meta.totalPages}
        </div>
      </div>

      <div style={orderStyles.grid}>
        {orders.map((order, i) => (
          <div
            key={order.id}
            style={{ ...orderStyles.card, animationDelay: `${i * 0.08}s` }}
          >
            <div style={orderStyles.cardTop}>
              <div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "0.88rem",
                    color: "#3B1F0A",
                    marginBottom: "2px",
                  }}
                >
                  🛒 Pesanan #{order.id.substring(0, 8).toUpperCase()}
                </div>
                <div style={orderStyles.orderId}>
                  Meja ID: {order.table_id.substring(0, 8)}…
                </div>
                <div style={orderStyles.orderDate}>
                  {formatDate(order.created_at)}
                </div>
              </div>
              <span style={orderStyles.statusBadge(order.status)}>
                {order.status}
              </span>
            </div>

            <div style={orderStyles.cardBody}>
              {order.order_items.map((item) => (
                <div key={item.id} style={orderStyles.itemRow}>
                  <div style={orderStyles.itemLeft}>
                    <div style={orderStyles.itemQty}>{item.qty}×</div>
                    <div>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: "0.88rem",
                          color: "#3B1F0A",
                        }}
                      >
                        {/* {getProductName(item.product_id)} */}
                      </div>
                      <div style={orderStyles.itemId}>
                        @{formatRupiah(item.price)}
                      </div>
                      {item.notes && (
                        <div style={orderStyles.itemNote}>📝 {item.notes}</div>
                      )}
                    </div>
                  </div>
                  <div style={orderStyles.itemPrice}>
                    {formatRupiah(item.subtotal)}
                  </div>
                </div>
              ))}
            </div>

            <div style={orderStyles.cardFooter}>
              <span style={orderStyles.totalLabel}>Total Pesanan</span>
              <span style={orderStyles.total}>
                {formatRupiah(order.total_amount)}
              </span>
            </div>
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
