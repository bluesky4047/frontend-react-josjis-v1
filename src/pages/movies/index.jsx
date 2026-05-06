import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../features/auth/authContext";
import MoviesForm from "../../features/movies/MoviesForm";
import MovieList from "../../features/movies/MoviesList";

export default function MoviesPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showForm, setShowForm] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.error(e);
    } finally {
      navigate("/signin");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .movies-page {
          min-height: 100vh;
          background: #0a0a14;
          font-family: 'DM Sans', sans-serif;
          padding: 40px 24px;
          position: relative;
          overflow: hidden;
        }
        .movies-page::before {
          content: '';
          position: absolute;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 70%);
          top: -100px; right: -100px;
          pointer-events: none;
        }
        .movies-card {
          width: 100%;
          max-width: 560px;
          margin: 0 auto;
          background: rgba(15,15,28,0.95);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 36px;
          box-shadow: 0 24px 64px rgba(0,0,0,0.5);
          position: relative;
          z-index: 1;
        }
        .movies-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .movies-title {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 500;
          color: #f1f0ff;
        }
        .header-actions { display: flex; gap: 8px; }
        .add-btn {
          padding: 8px 14px;
          background: linear-gradient(135deg, #6366f1, #7c3aed);
          color: #fff;
          border: none;
          border-radius: 9px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .add-btn:hover { opacity: 0.9; }
        .logout-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 9px;
          color: #fca5a5;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }
        .logout-btn:hover { background: rgba(239,68,68,0.15); }
        .divider { height: 1px; background: rgba(255,255,255,0.06); margin: 20px 0; }
        .form-section {
          margin-bottom: 20px;
          padding: 20px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
        }
        .form-section-title {
          font-size: 13px;
          color: #818cf8;
          font-weight: 500;
          margin-bottom: 14px;
        }
      `}</style>

      <div className="movies-page">
        <div className="movies-card">
          <div className="movies-header">
            <span className="movies-title">🎬 My Movies</span>
            <div className="header-actions">
              <button
                className="add-btn"
                onClick={() => setShowForm((v) => !v)}
              >
                {showForm ? "Tutup" : "+ Tambah Film"}
              </button>
              <button className="logout-btn" onClick={handleLogout}>
                Keluar
              </button>
            </div>
          </div>

          <div className="divider" />

          {showForm && (
            <div className="form-section">
              <p className="form-section-title">Film Baru</p>
              <MoviesForm onDone={() => setShowForm(false)} />
            </div>
          )}

          <MovieList />
        </div>
      </div>
    </>
  );
}
