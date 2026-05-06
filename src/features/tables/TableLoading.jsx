// ===================== SKELETON: TABLES PAGE =====================
// Mengikuti layout TablePage di App.jsx
// Grid: repeat(auto-fill, minmax(240px, 1fr)), gap 1.25rem
// Tiap card: accent bar atas + icon + nama + capacity + status + meta + id

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
  .wn-skel-table-page {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
  }
  .wn-skel-table-header {
    margin-bottom: 2rem;
  }
  /* Grid */
  .wn-skel-table-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1.25rem;
  }
  /* Card */
  .wn-skel-table-card {
    background: #fff;
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 4px 20px rgba(59,31,10,0.10);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: relative;
    overflow: hidden;
    opacity: 0;
    animation: wn-cardIn 0.35s ease forwards;
  }
  @keyframes wn-cardIn {
    to { opacity: 1; }
  }
  /* Accent bar — also shimmer */
  .wn-skel-accent {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 4px;
    background: linear-gradient(
      90deg,
      #F5E6C8 0%,
      #EDD5A3 40%,
      #F5E6C8 80%
    );
    background-size: 600px 100%;
    animation: wn-shimmer 1.4s ease-in-out infinite;
  }
  /* Icon placeholder */
  .wn-skel-table-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
  }
  /* Badge row */
  .wn-skel-badge-row {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    align-items: center;
  }
  /* Dates block */
  .wn-skel-dates {
    display: flex;
    flex-direction: column;
    gap: 5px;
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

// Single skeleton table card
function SkeletonTableCard({ delay = 0 }) {
  return (
    <div className="wn-skel-table-card" style={{ animationDelay: `${delay}s` }}>
      {/* Top accent bar */}
      <div className="wn-skel-accent" style={{ animationDelay: `${delay}s` }} />

      {/* Icon */}
      <Bone
        width="48px"
        height="48px"
        style={{ borderRadius: "12px" }}
        delay={delay}
      />

      {/* Table name + capacity */}
      <div>
        <Bone
          width="100px"
          height="22px"
          style={{ marginBottom: "8px" }}
          delay={delay}
        />
        <Bone width="140px" height="13px" delay={delay} />
      </div>

      {/* Status badge */}
      <div className="wn-skel-badge-row">
        <Bone
          width="72px"
          height="24px"
          style={{ borderRadius: "20px" }}
          delay={delay}
        />
      </div>

      {/* Created / updated dates */}
      <div className="wn-skel-dates">
        <Bone width="200px" height="12px" delay={delay} />
        <Bone width="190px" height="12px" delay={delay} />
      </div>

      {/* ID — monospace tiny */}
      <Bone
        width="220px"
        height="10px"
        delay={delay}
        style={{ marginTop: "auto" }}
      />
    </div>
  );
}

// ─── Main export ───
export default function TablesSkeleton({ count = 4 }) {
  return (
    <>
      <style>{CSS}</style>
      <div className="wn-skel-table-page">
        {/* Page header */}
        <div className="wn-skel-table-header">
          <Bone width="80px" height="10px" style={{ marginBottom: "8px" }} />
          <Bone width="200px" height="28px" style={{ marginBottom: "6px" }} />
          <Bone width="130px" height="12px" />
        </div>

        {/* Table grid */}
        <div className="wn-skel-table-grid">
          {Array.from({ length: count }).map((_, i) => (
            <SkeletonTableCard key={i} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </>
  );
}
