// ===================== SKELETON: PRODUCT DETAIL PAGE =====================
// Mengikuti layout ProductDetailPage di App.jsx
// Grid 2-kolom: kiri = gambar utama + thumbnails, kanan = info produk

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
  .wn-skel-detail-page {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
    animation: wn-fadeIn 0.4s ease;
  }
  @keyframes wn-fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  /* Back button */
  .wn-skel-back {
    margin-bottom: 1.5rem;
  }
  /* Two-column grid */
  .wn-skel-detail-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  /* Image column */
  .wn-skel-img-main {
    height: 320px;
    border-radius: 16px;
    overflow: hidden;
  }
  .wn-skel-img-main.wn-bone {
    border-radius: 16px;
  }
  .wn-skel-thumbs {
    display: flex;
    gap: 8px;
    margin-top: 10px;
    flex-wrap: wrap;
  }
  .wn-skel-thumb {
    width: 60px;
    height: 60px;
    border-radius: 10px;
    flex-shrink: 0;
  }
  /* Info column */
  .wn-skel-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .wn-skel-meta-row {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
  }
  .wn-skel-meta-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  /* Responsive */
  @media (max-width: 640px) {
    .wn-skel-detail-grid {
      grid-template-columns: 1fr;
    }
  }
`;

function Bone({ width = "100%", height = "14px", style = {} }) {
  return (
    <div
      className="wn-bone"
      style={{ width, height, borderRadius: "6px", flexShrink: 0, ...style }}
    />
  );
}

// ─── Main export ───
export default function ProductDetailSkeleton({ thumbCount = 3 }) {
  return (
    <>
      <style>{CSS}</style>
      <div className="wn-skel-detail-page">
        {/* Back button */}
        <div className="wn-skel-back">
          <Bone width="150px" height="34px" style={{ borderRadius: "8px" }} />
        </div>

        <div className="wn-skel-detail-grid">
          {/* ── Left: Images ── */}
          <div>
            {/* Main image */}
            <div className="wn-skel-img-main wn-bone" />

            {/* Thumbnails */}
            <div className="wn-skel-thumbs">
              {Array.from({ length: thumbCount }).map((_, i) => (
                <div
                  key={i}
                  className="wn-skel-thumb wn-bone"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>

          {/* ── Right: Info ── */}
          <div className="wn-skel-info">
            {/* Category badge */}
            <Bone width="90px" height="24px" style={{ borderRadius: "20px" }} />

            {/* Product name — 2 lines */}
            <div>
              <Bone width="85%" height="32px" style={{ marginBottom: "8px" }} />
              <Bone width="60%" height="28px" />
            </div>

            {/* Description — 3 lines */}
            <div>
              <Bone
                width="100%"
                height="13px"
                style={{ marginBottom: "6px" }}
              />
              <Bone width="95%" height="13px" style={{ marginBottom: "6px" }} />
              <Bone width="75%" height="13px" />
            </div>

            {/* Price */}
            <Bone width="140px" height="36px" />

            {/* Status + foto count */}
            <div className="wn-skel-meta-row">
              <div className="wn-skel-meta-item">
                <Bone width="50px" height="10px" />
                <Bone
                  width="70px"
                  height="22px"
                  style={{ borderRadius: "20px" }}
                />
              </div>
              <div className="wn-skel-meta-item">
                <Bone width="40px" height="10px" />
                <Bone width="55px" height="14px" />
              </div>
            </div>

            {/* Created at */}
            <div className="wn-skel-meta-item">
              <Bone
                width="70px"
                height="10px"
                style={{ marginBottom: "4px" }}
              />
              <Bone width="180px" height="13px" />
            </div>

            {/* Updated at */}
            <div className="wn-skel-meta-item">
              <Bone
                width="70px"
                height="10px"
                style={{ marginBottom: "4px" }}
              />
              <Bone width="180px" height="13px" />
            </div>

            {/* ID */}
            <Bone width="260px" height="11px" style={{ marginTop: "auto" }} />
          </div>
        </div>
      </div>
    </>
  );
}
