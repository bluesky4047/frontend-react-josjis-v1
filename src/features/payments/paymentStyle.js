export const paymentStyles = {
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
  table: {
    width: "100%",
    background: "#fff",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(59,31,10,0.10)",
    borderCollapse: "separate",
    borderSpacing: 0,
    animation: "fadeInUp 0.4s ease",
  },
  thead: { background: "linear-gradient(135deg, #3B1F0A, #5C2E10)" },
  th: {
    padding: "14px 16px",
    textAlign: "left",
    fontSize: "0.72rem",
    fontWeight: 700,
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    color: "#E8A923",
  },
  td: {
    padding: "12px 16px",
    fontSize: "0.85rem",
    color: "#3B1F0A",
    borderBottom: "1px solid #F5E6C8",
    verticalAlign: "middle",
  },
  trAlt: { background: "#FFFDF7" },
  methodBadge: {
    background: "#F5E6C8",
    color: "#3B1F0A",
    padding: "3px 10px",
    borderRadius: "20px",
    fontSize: "0.72rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  statusBadge: (status) => ({
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "0.72rem",
    fontWeight: 700,
    background:
      status === "success"
        ? "#DCFCE7"
        : status === "failed"
          ? "#FEE2E2"
          : "#FEF9C3",
    color:
      status === "success"
        ? "#16A34A"
        : status === "failed"
          ? "#DC2626"
          : "#CA8A04",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  }),
  amount: {
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    color: "#D4621A",
  },
  tokenCell: {
    fontFamily: "monospace",
    fontSize: "0.72rem",
    color: "#9B6A3A",
    maxWidth: "160px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
};
