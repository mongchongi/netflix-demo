import { Link, Outlet, useLocation } from 'react-router';
import './AppLayout.css';
import netflixLogo from '../../assets/netflix-logo.png';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '../../hooks/useIsMobile';

const AppLayout = () => {
  const [showSearch, setShowSearch] = useState(false);

  const location = useLocation();

  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  const isMobile = useIsMobile();

  const paths = [
    {
      name: '홈',
      url: '/',
    },
    {
      name: '영화',
      url: '/movies',
    },
    {
      name: '내가 찜한 리스트',
      url: '/favorites',
    },
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (showSearch) {
        searchInputRef.current.focus();
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [showSearch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchRef]);

  const renderLogo = () => {
    return (
      <div className='nav__logo'>
        <Link to={'/'}>
          <img src={netflixLogo} alt='logo' className='nav__logo-image' />
        </Link>
      </div>
    );
  };

  const renderPaths = () => {
    return (
      <ul className='nav__path-list'>
        {paths.map((path) => (
          <li key={path.name} className='nav__path-item'>
            <Link
              to={path.url}
              className={`nav__path-link ${location.pathname === path.url ? 'nav__path-link--active' : undefined}`}
            >
              {path.name}
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  const renderSearch = () => {
    return (
      <div
        className={`nav__search ${showSearch ? 'nav__search--active' : undefined}`}
        style={{ transition: `${showSearch ? 'width 0.3s' : 'none'}` }}
        ref={searchRef}
      >
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          size='xl'
          className='nav__search-icon'
          onClick={() => setShowSearch((prev) => !prev)}
        />
        <input type='text' className='nav__search-input' placeholder='제목, 장르' ref={searchInputRef} />
      </div>
    );
  };

  return (
    <>
      <nav className='nav'>
        {isMobile ? (
          <>
            <div className='nav__top'>
              {renderLogo()}
              {renderSearch()}
            </div>
            {renderPaths()}
          </>
        ) : (
          <>
            {renderLogo()}
            {renderPaths()}
            {renderSearch()}
          </>
        )}
      </nav>
      <Outlet />
    </>
  );
};

export default AppLayout;
