export const orderStyles = {
  page: { maxWidth: "1100px", margin: "0 auto", padding: "2rem" },
  header: { marginBottom: "2rem" },
  eyebrow: {
    fontSize: "0.72rem",
    fontWeight: 700,
    letterSpacing: "3px",
    textTransform: "uppercase",
    color: "#D4621A",
    marginBottom: "0.25rem",
  },
  title: {
    fontFamily: "var(--font-display)",
    fontSize: "2rem",
    color: "#3B1F0A",
    fontWeight: 700,
  },
  meta: { color: "#9B6A3A", fontSize: "0.85rem", marginTop: "0.25rem" },
  grid: { display: "flex", flexDirection: "column", gap: "1rem" },
  card: {
    background: "#fff",
    borderRadius: "14px",
    boxShadow: "0 3px 16px rgba(59,31,10,0.08)",
    overflow: "hidden",
    animation: "fadeInUp 0.4s ease both",
  },
  cardTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem 1.25rem",
    borderBottom: "1px solid #F5E6C8",
    flexWrap: "wrap",
    gap: "0.5rem",
  },
  orderId: { fontSize: "0.75rem", color: "#9B6A3A", fontWeight: 600 },
  orderDate: { fontSize: "0.78rem", color: "#C0603A" },
  statusBadge: (status) => ({
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "0.72rem",
    fontWeight: 700,
    background:
      status === "completed"
        ? "#DCFCE7"
        : status === "cancelled"
          ? "#FEE2E2"
          : "#FEF9C3",
    color:
      status === "completed"
        ? "#16A34A"
        : status === "cancelled"
          ? "#DC2626"
          : "#CA8A04",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  }),
  cardBody: { padding: "1rem 1.25rem" },
  itemRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: "0.6rem 0",
    borderBottom: "1px dashed #F5E6C8",
    gap: "1rem",
    flexWrap: "wrap",
  },
  itemLeft: { display: "flex", gap: "0.75rem", alignItems: "flex-start" },
  itemQty: {
    background: "#F5E6C8",
    color: "#3B1F0A",
    fontWeight: 700,
    width: "28px",
    height: "28px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.85rem",
    flexShrink: 0,
  },
  itemId: { fontSize: "0.78rem", color: "#9B6A3A" },
  itemNote: { fontSize: "0.72rem", color: "#C0603A", fontStyle: "italic" },
  itemPrice: { fontWeight: 700, color: "#3B1F0A", fontSize: "0.9rem" },
  cardFooter: {
    padding: "0.75rem 1.25rem",
    background: "#FFFDF7",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "1rem",
  },
  totalLabel: { fontSize: "0.82rem", color: "#9B6A3A", fontWeight: 600 },
  total: {
    fontFamily: "var(--font-display)",
    fontSize: "1.2rem",
    color: "#D4621A",
    fontWeight: 700,
  },
};
