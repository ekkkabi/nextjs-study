import MovieItem from '@/components/movie-item';
import movies from '@/mock/movie.json';
import style from './page.module.css';

export default function Home() {
  return (
    <div className={style.conatiner}>
      <section>
        <h2>지금 가장 추천하는 영화</h2>
        <div className={style.section_recommand}>
          {movies.slice(0, 3).map((movie) => (
            <MovieItem key={`reco-${movie.id}`} {...movie} />
          ))}
        </div>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <div className={style.section_all_movie}>
          {movies.map((movie) => (
            <MovieItem key={`all-${movie.id}`} {...movie} />
          ))}
        </div>
      </section>
    </div>
  );
}
