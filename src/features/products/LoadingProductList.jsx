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
  .wn-skel-page {
    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem;
  }
  /* Header block */
  .wn-skel-header {
    margin-bottom: 2rem;
  }
  /* Grid */
  .wn-skel-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }
  /* Card */
  .wn-skel-card {
    background: #fff;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(59,31,10,0.08);
    opacity: 0;
    animation: wn-cardFadeIn 0.4s ease forwards;
  }
  @keyframes wn-cardFadeIn {
    to { opacity: 1; }
  }
  .wn-skel-img {
    height: 180px;
    background: #F5E6C8;
  }
  .wn-skel-img.wn-bone {
    border-radius: 0;
  }
  .wn-skel-body {
    padding: 1.25rem;
  }
  .wn-skel-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #F5E6C8;
    padding-top: 0.75rem;
    margin-top: 1rem;
  }
`;

// Reusable bone element
function Bone({ width = "100%", height = "14px", style = {} }) {
  return (
    <div
      className="wn-bone"
      style={{ width, height, borderRadius: "6px", flexShrink: 0, ...style }}
    />
  );
}

// Single skeleton card
function SkeletonCard({ delay = 0 }) {
  return (
    <div className="wn-skel-card" style={{ animationDelay: `${delay}s` }}>
      {/* Image area */}
      <div className="wn-skel-img wn-bone" />

      {/* Body */}
      <div className="wn-skel-body">
        {/* Title */}
        <Bone width="65%" height="18px" style={{ marginBottom: "10px" }} />
        {/* Description — 2 lines */}
        <Bone width="100%" height="12px" style={{ marginBottom: "6px" }} />
        <Bone width="80%" height="12px" style={{ marginBottom: "0" }} />

        {/* Footer: price + button */}
        <div className="wn-skel-footer">
          <Bone width="90px" height="20px" />
          <Bone width="80px" height="28px" style={{ borderRadius: "8px" }} />
        </div>
      </div>
    </div>
  );
}

// ─── Main export ───
export default function ProductsSkeleton({ count = 6 }) {
  return (
    <>
      <style>{CSS}</style>
      <div className="wn-skel-page">
        {/* Page header */}
        <div className="wn-skel-header">
          <Bone width="80px" height="10px" style={{ marginBottom: "8px" }} />
          <Bone width="220px" height="28px" style={{ marginBottom: "6px" }} />
          <Bone width="160px" height="12px" />
        </div>

        {/* Product grid */}
        <div className="wn-skel-grid">
          {Array.from({ length: count }).map((_, i) => (
            <SkeletonCard key={i} delay={i * 0.07} />
          ))}
        </div>
      </div>
    </>
  );
}
