// ===================== SKELETON: ORDERS PAGE =====================
// Mengikuti layout OrderPage di App.jsx
// Layout: flex column, tiap order = card dengan header + item rows + footer total

const CSS = `
  @keyframes wn-shimmer {
    0%   { background-position: -600px 0; }
    100% { background-position:  600px 0; }
  }
  .wn-bone {
    background: linear-gradient(
      90deg,
      #F5E6C8 0%,
      #EDD5A3 40%,
      #F5E6C8 80%
    );
    background-size: 600px 100%;
    animation: wn-shimmer 1.4s ease-in-out infinite;
    border-radius: 6px;
  }
  .wn-skel-order-page {
    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem;
  }
  .wn-skel-order-header {
    margin-bottom: 2rem;
  }
  .wn-skel-order-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  /* Card shell */
  .wn-skel-order-card {
    background: #fff;
    border-radius: 14px;
    box-shadow: 0 3px 16px rgba(59,31,10,0.08);
    overflow: hidden;
    opacity: 0;
    animation: wn-cardIn 0.35s ease forwards;
  }
  @keyframes wn-cardIn {
    to { opacity: 1; }
  }
  /* Card top row */
  .wn-skel-card-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid #F5E6C8;
    gap: 1rem;
  }
  .wn-skel-card-top-left {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  /* Item rows */
  .wn-skel-card-body {
    padding: 1rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .wn-skel-item-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.6rem 0;
    border-bottom: 1px dashed #F5E6C8;
    gap: 1rem;
  }
  .wn-skel-item-left {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex: 1;
  }
  .wn-skel-qty-box {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    flex-shrink: 0;
  }
  .wn-skel-item-info {
    display: flex;
    flex-direction: column;
    gap: 5px;
    flex: 1;
  }
  /* Card footer */
  .wn-skel-card-footer {
    padding: 0.75rem 1.25rem;
    background: #FFFDF7;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;
  }
`;

function Bone({ width = "100%", height = "14px", style = {}, delay = 0 }) {
  return (
    <div
      className="wn-bone"
      style={{
        width,
        height,
        borderRadius: "6px",
        flexShrink: 0,
        animationDelay: `${delay}s`,
        ...style,
      }}
    />
  );
}

// Single skeleton order card
function SkeletonOrderCard({ delay = 0, itemCount = 1 }) {
  return (
    <div className="wn-skel-order-card" style={{ animationDelay: `${delay}s` }}>
      {/* Top: order id + date (left) / status badge (right) */}
      <div className="wn-skel-card-top">
        <div className="wn-skel-card-top-left">
          <Bone width="200px" height="14px" />
          <Bone width="130px" height="11px" />
          <Bone width="110px" height="11px" />
        </div>
        <Bone
          width="72px"
          height="24px"
          style={{ borderRadius: "20px", flexShrink: 0 }}
        />
      </div>

      {/* Item rows */}
      <div className="wn-skel-card-body">
        {Array.from({ length: itemCount }).map((_, i) => (
          <div className="wn-skel-item-row" key={i}>
            {/* qty box + name/price */}
            <div className="wn-skel-item-left">
              <Bone
                width="28px"
                height="28px"
                style={{ borderRadius: "8px", flexShrink: 0 }}
              />
              <div className="wn-skel-item-info">
                <Bone width="140px" height="13px" />
                <Bone width="90px" height="10px" />
              </div>
            </div>
            {/* subtotal */}
            <Bone width="70px" height="14px" style={{ flexShrink: 0 }} />
          </div>
        ))}
      </div>

      {/* Footer: total label + amount */}
      <div className="wn-skel-card-footer">
        <Bone width="80px" height="12px" />
        <Bone width="100px" height="22px" />
      </div>
    </div>
  );
}

// ─── Main export ───
export default function OrdersSkeleton({ count = 3 }) {
  // Vary item count per card to look realistic
  const itemCounts = [1, 1, 2, 1, 2];

  return (
    <>
      <style>{CSS}</style>
      <div className="wn-skel-order-page">
        {/* Page header */}
        <div className="wn-skel-order-header">
          <Bone width="80px" height="10px" style={{ marginBottom: "8px" }} />
          <Bone width="200px" height="28px" style={{ marginBottom: "6px" }} />
          <Bone width="140px" height="12px" />
        </div>

        {/* Order cards */}
        <div className="wn-skel-order-list">
          {Array.from({ length: count }).map((_, i) => (
            <SkeletonOrderCard
              key={i}
              delay={i * 0.08}
              itemCount={itemCounts[i % itemCounts.length]}
            />
          ))}
        </div>
      </div>
    </>
  );
}
