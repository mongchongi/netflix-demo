import { Link, Outlet, useLocation } from 'react-router';
import './AppLayout.css';
import netflixLogo from '../../assets/netflix-logo.png';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';

const AppLayout = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [selectedPath, setSelectedPath] = useState('');

  const location = useLocation();

  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

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
    setSelectedPath(location.pathname);
  }, [location]);

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

  return (
    <>
      <nav className='nav'>
        <div className='nav__logo'>
          <Link to={'/'}>
            <img src={netflixLogo} alt='logo' className='nav__logo-image' />
          </Link>
        </div>
        <ul className='nav__path-list'>
          {paths.map((path) => (
            <li key={path.name}>
              <Link
                to={path.url}
                className={`nav__path-link ${selectedPath === path.url ? 'nav__path-link--active' : undefined}`}
              >
                {path.name}
              </Link>
            </li>
          ))}
        </ul>
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
      </nav>
      <Outlet />
    </>
  );
};

export default AppLayout;
