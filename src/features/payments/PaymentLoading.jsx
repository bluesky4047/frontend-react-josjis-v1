// ===================== SKELETON: PAYMENTS PAGE =====================
// Mengikuti layout PaymentPage di App.jsx
// Layout: tabel dengan thead (7 kolom) + tbody rows

const CSS = `
  @keyframes wn-shimmer {
    0%   { background-position: -700px 0; }
    100% { background-position:  700px 0; }
  }
  .wn-bone {
    background: linear-gradient(
      90deg,
      #F5E6C8 0%,
      #EDD5A3 40%,
      #F5E6C8 80%
    );
    background-size: 700px 100%;
    animation: wn-shimmer 1.4s ease-in-out infinite;
    border-radius: 6px;
    display: inline-block;
  }
  .wn-skel-pay-page {
    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem;
    animation: wn-fadeIn 0.4s ease;
  }
  @keyframes wn-fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  .wn-skel-pay-header {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 2rem;
  }
  /* Table wrapper */
  .wn-skel-table-wrap {
    overflow-x: auto;
  }
  .wn-skel-table {
    width: 100%;
    background: #fff;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(59,31,10,0.10);
    border-collapse: separate;
    border-spacing: 0;
  }
  /* Thead */
  .wn-skel-thead {
    background: linear-gradient(135deg, #3B1F0A, #5C2E10);
  }
  .wn-skel-th {
    padding: 14px 16px;
    text-align: left;
  }
  .wn-skel-thead .wn-bone {
    /* Brighter shimmer on dark bg */
    background: linear-gradient(
      90deg,
      rgba(232,169,35,0.15) 0%,
      rgba(232,169,35,0.35) 40%,
      rgba(232,169,35,0.15) 80%
    );
    background-size: 700px 100%;
    animation: wn-shimmer 1.4s ease-in-out infinite;
  }
  /* Tbody rows */
  .wn-skel-tr {
    border-bottom: 1px solid #F5E6C8;
    opacity: 0;
    animation: wn-rowIn 0.3s ease forwards;
  }
  .wn-skel-tr-alt {
    background: #FFFDF7;
  }
  @keyframes wn-rowIn {
    to { opacity: 1; }
  }
  .wn-skel-td {
    padding: 12px 16px;
    vertical-align: middle;
  }
`;

// Column config: width of the bone per column
const COL_WIDTHS = [
  { header: "60px", cell: "60px" }, // #ID
  { header: "80px", cell: "80px" }, // Order ID
  { header: "70px", cell: "60px" }, // Metode
  { header: "70px", cell: "80px" }, // Jumlah
  { header: "55px", cell: "65px" }, // Status
  { header: "90px", cell: "120px" }, // Token
  { header: "55px", cell: "65px" }, // Waktu
];

function Bone({ width = "60px", height = "12px", style = {}, delay = 0 }) {
  return (
    <div
      className="wn-bone"
      style={{
        width,
        height,
        borderRadius: "6px",
        animationDelay: `${delay}s`,
        ...style,
      }}
    />
  );
}

// ─── Main export ───
export default function PaymentsSkeleton({ rowCount = 8 }) {
  return (
    <>
      <style>{CSS}</style>
      <div className="wn-skel-pay-page">
        {/* Page header */}
        <div className="wn-skel-pay-header">
          <Bone width="80px" height="10px" style={{ marginBottom: "8px" }} />
          <Bone width="240px" height="28px" style={{ marginBottom: "6px" }} />
          <Bone width="200px" height="12px" />
        </div>

        {/* Table */}
        <div className="wn-skel-table-wrap">
          <table className="wn-skel-table">
            {/* Head */}
            <thead className="wn-skel-thead">
              <tr>
                {COL_WIDTHS.map((col, i) => (
                  <th key={i} className="wn-skel-th">
                    <Bone width={col.header} height="10px" delay={i * 0.05} />
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {Array.from({ length: rowCount }).map((_, ri) => (
                <tr
                  key={ri}
                  className={`wn-skel-tr ${ri % 2 === 1 ? "wn-skel-tr-alt" : ""}`}
                  style={{ animationDelay: `${ri * 0.05}s` }}
                >
                  {COL_WIDTHS.map((col, ci) => (
                    <td key={ci} className="wn-skel-td">
                      {/* Status and method columns: pill shape */}
                      <Bone
                        width={col.cell}
                        height={ci === 2 || ci === 4 ? "22px" : "12px"}
                        style={
                          ci === 2 || ci === 4 ? { borderRadius: "20px" } : {}
                        }
                        delay={ri * 0.04 + ci * 0.02}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
