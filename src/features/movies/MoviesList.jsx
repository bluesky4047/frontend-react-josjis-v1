import { useSelector } from "react-redux";
import MoviesCard from "./MoviesCard";

export default function MoviesList() {
  // Menggunakan useSelector untuk mengambil data movies.list dari Redux store
  // Komponen akan otomatis melakukan re-render setiap kali nilai movies.list berubah
  const movies = useSelector((state) => state.movies.list);

  if (!movies.length) {
    return (
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <p
          style={{
            color: "#4b5563",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
          }}
        >
          Belum ada film. Tambahkan di atas!
        </p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .movie-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
      `}</style>
      <div className="movie-list">
        {movies.map((movie) => (
          <MoviesCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
}
