import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteMovie } from "./moviesSlice";
import MoviesForm from "./MoviesForm";

export default function MoviesCard({ movie }) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);

  return (
    <>
      <style>{`
        .movie-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          padding: 16px;
          transition: border-color 0.2s, background 0.2s;
        }
        .movie-card:hover {
          background: rgba(99,102,241,0.04);
          border-color: rgba(99,102,241,0.2);
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 8px;
        }
        .card-title {
          font-size: 15px;
          font-weight: 600;
          color: #f1f0ff;
          font-family: 'DM Sans', sans-serif;
        }
        .card-meta {
          display: flex;
          gap: 6px;
          margin-top: 6px;
          flex-wrap: wrap;
        }
        .card-badge {
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 20px;
          font-family: 'DM Sans', sans-serif;
        }
        .badge-year  { background: rgba(99,102,241,0.15); color: #818cf8; }
        .badge-genre { background: rgba(168,85,247,0.15); color: #c084fc; }
        .card-actions { display: flex; gap: 4px; flex-shrink: 0; }
        .card-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          border-radius: 7px;
          color: #4b5563;
          transition: color 0.2s, background 0.2s;
          display: flex;
          align-items: center;
        }
        .card-btn.edit:hover   { color: #818cf8; background: rgba(99,102,241,0.1); }
        .card-btn.delete:hover { color: #f87171; background: rgba(239,68,68,0.1); }
        .edit-area { margin-top: 14px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.06); }
      `}</style>

      <div className="movie-card">
        <div className="card-header">
          <div>
            <p className="card-title">{movie.title}</p>
            <div className="card-meta">
              {movie.year && (
                <span className="card-badge badge-year">{movie.year}</span>
              )}
              {movie.genre && (
                <span className="card-badge badge-genre">{movie.genre}</span>
              )}
            </div>
          </div>
          <div className="card-actions">
            <button
              className="card-btn edit"
              onClick={() => setEditing((v) => !v)}
              title="Edit"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
            <button
              className="card-btn delete"
              onClick={() => dispatch(deleteMovie(movie.id))}
              title="Hapus"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14H6L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4h6v2" />
              </svg>
            </button>
          </div>
        </div>

        {editing && (
          <div className="edit-area">
            <MoviesForm editTarget={movie} onDone={() => setEditing(false)} />
          </div>
        )}
      </div>
    </>
  );
}
