import { Navigate } from "react-router";
import { useAuth } from "./authContext";

const PrivateAuth = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/signin" replace />;
  return children;
};

function LoadingScreen() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Nunito:wght@400;600&display=swap');
 
        .wn-loading-screen {
          min-height: 100vh;
          background: #FDF6E3;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0;
          font-family: 'Nunito', sans-serif;
          position: relative;
          overflow: hidden;
        }
 
        /* Batik grid texture */
        .wn-loading-screen::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: repeating-linear-gradient(
            45deg,
            rgba(59,31,10,0.04) 0,
            rgba(59,31,10,0.04) 1px,
            transparent 0,
            transparent 50%
          );
          background-size: 20px 20px;
          pointer-events: none;
        }
 
        /* Warm glow bottom-left */
        .wn-loading-screen::after {
          content: '';
          position: fixed;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(212,98,26,0.10) 0%, transparent 70%);
          bottom: -120px;
          left: -120px;
          pointer-events: none;
        }
 
        /* Golden glow top-right */
        .wn-loading-glow {
          position: fixed;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(232,169,35,0.09) 0%, transparent 70%);
          top: -150px;
          right: -150px;
          pointer-events: none;
        }
 
        /* Brand block */
        .wn-loading-brand {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          margin-bottom: 40px;
          animation: wn-fadeInDown 0.6s ease both;
        }
 
        .wn-loading-brand-icon {
          font-size: 3rem;
          line-height: 1;
          filter: drop-shadow(0 4px 12px rgba(212,98,26,0.3));
          animation: wn-pulse 2s ease-in-out infinite;
        }
 
        .wn-loading-brand-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.75rem;
          font-weight: 700;
          color: #3B1F0A;
          letter-spacing: -0.5px;
          line-height: 1;
        }
 
        .wn-loading-brand-name span {
          color: #D4621A;
        }
 
        .wn-loading-brand-sub {
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #C0A878;
        }
 
        /* Ring spinner — double layer */
        .wn-loading-spinner-wrap {
          position: relative;
          width: 56px;
          height: 56px;
          margin-bottom: 24px;
          animation: wn-fadeIn 0.5s ease 0.2s both;
        }
 
        .wn-loading-ring-outer {
          position: absolute;
          inset: 0;
          border: 3px solid rgba(232,169,35,0.18);
          border-top-color: #E8A923;
          border-radius: 50%;
          animation: wn-spin 1s linear infinite;
        }
 
        .wn-loading-ring-inner {
          position: absolute;
          inset: 8px;
          border: 2px solid rgba(212,98,26,0.15);
          border-bottom-color: #D4621A;
          border-radius: 50%;
          animation: wn-spin 0.65s linear infinite reverse;
        }
 
        .wn-loading-ring-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          background: #3B1F0A;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
 
        /* Text */
        .wn-loading-text {
          font-size: 0.82rem;
          font-weight: 600;
          color: #9B6A3A;
          letter-spacing: 0.5px;
          animation: wn-fadeIn 0.5s ease 0.35s both;
        }
 
        /* Dot pulse after text */
        .wn-loading-dots span {
          display: inline-block;
          animation: wn-dotBounce 1.2s ease-in-out infinite both;
          color: #D4621A;
        }
        .wn-loading-dots span:nth-child(2) { animation-delay: 0.2s; }
        .wn-loading-dots span:nth-child(3) { animation-delay: 0.4s; }
 
        /* Progress bar */
        .wn-loading-bar-track {
          width: 160px;
          height: 3px;
          background: rgba(59,31,10,0.08);
          border-radius: 99px;
          overflow: hidden;
          margin-top: 16px;
          animation: wn-fadeIn 0.5s ease 0.4s both;
        }
 
        .wn-loading-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #D4621A, #E8A923);
          border-radius: 99px;
          animation: wn-barSlide 1.6s ease-in-out infinite;
        }
 
        /* Decorative divider */
        .wn-loading-divider {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 28px 0 0;
          animation: wn-fadeIn 0.5s ease 0.5s both;
        }
 
        .wn-loading-divider-line {
          width: 40px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(59,31,10,0.15));
        }
 
        .wn-loading-divider-line.right {
          background: linear-gradient(90deg, rgba(59,31,10,0.15), transparent);
        }
 
        .wn-loading-divider-icon {
          font-size: 0.85rem;
          opacity: 0.5;
        }
 
        /* ─── Keyframes ─── */
        @keyframes wn-spin {
          to { transform: rotate(360deg); }
        }
 
        @keyframes wn-fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
 
        @keyframes wn-fadeInDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
 
        @keyframes wn-pulse {
          0%, 100% { transform: scale(1);    filter: drop-shadow(0 4px 12px rgba(212,98,26,0.3)); }
          50%       { transform: scale(1.08); filter: drop-shadow(0 6px 20px rgba(212,98,26,0.5)); }
        }
 
        @keyframes wn-dotBounce {
          0%, 80%, 100% { transform: translateY(0);    opacity: 0.4; }
          40%            { transform: translateY(-4px); opacity: 1;   }
        }
 
        @keyframes wn-barSlide {
          0%   { width: 0%;    margin-left: 0%;    }
          40%  { width: 70%;   margin-left: 0%;    }
          60%  { width: 30%;   margin-left: 70%;   }
          100% { width: 0%;    margin-left: 160px; }
        }
      `}</style>

      <div className="wn-loading-screen">
        {/* Top-right glow */}
        <div className="wn-loading-glow" />

        {/* Brand */}
        <div className="wn-loading-brand">
          <span className="wn-loading-brand-icon">🔥</span>
          <div className="wn-loading-brand-name">
            Warung <span>Nusantara</span>
          </div>
          <div className="wn-loading-brand-sub">Kuliner Khas Indonesia</div>
        </div>

        {/* Spinner */}
        <div className="wn-loading-spinner-wrap">
          <div className="wn-loading-ring-outer" />
          <div className="wn-loading-ring-inner" />
          <div className="wn-loading-ring-dot" />
        </div>

        {/* Text + dots */}
        <div className="wn-loading-text">
          Memuat...
          <span className="wn-loading-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </div>

        {/* Progress bar */}
        <div className="wn-loading-bar-track">
          <div className="wn-loading-bar-fill" />
        </div>

        {/* Decorative divider */}
        <div className="wn-loading-divider">
          <div className="wn-loading-divider-line" />
          <span className="wn-loading-divider-icon">🌿</span>
          <div className="wn-loading-divider-line right" />
        </div>
      </div>
    </>
  );
}

export default PrivateAuth;
