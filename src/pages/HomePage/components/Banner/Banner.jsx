import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
import './Banner.css';
import { faCircleExclamation, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useIsMobile } from '../../../../hooks/useIsMobile';
import { Link } from 'react-router';

const Banner = () => {
  const { isLoading, error, data } = usePopularMoviesQuery();

  const randomIndex = Math.trunc(Math.random() * data?.results.length);

  const isMobile = useIsMobile();

  if (isLoading) {
    return <div className='loading' style={{ width: '100%', height: `${isMobile ? '80vh' : '100vh'}` }}></div>;
  }

  if (error) {
    return (
      <div className='error' style={{ width: '100%', height: `${isMobile ? '80vh' : '100vh'}` }}>
        <FontAwesomeIcon icon={faTriangleExclamation} className='error__icon' />
        <div className='error__text'>ERROR</div>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundImage: `url(https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${data?.results[randomIndex].backdrop_path})`,
      }}
      className='banner'
    >
      <div className='banner__info'>
        <h1 className='banner__title'>{data?.results[randomIndex].title}</h1>
        {!isMobile && <p className='banner__overview'>{data?.results[randomIndex].overview}</p>}
        <div className='banner__controls'>
          <div className='banner__average'>평점 : {data?.results[randomIndex].vote_average}</div>
          <Link to={`/movies/${data?.results[randomIndex].id}`} className='banner__detail-link'>
            <FontAwesomeIcon icon={faCircleExclamation} size='xl' />
            <span>상세 정보</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
