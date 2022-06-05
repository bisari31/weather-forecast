import { Outlet, Link, useLocation } from 'react-router-dom'

import styles from './header.module.scss'
import { LeftArrowIcon, SearchIcon } from 'assets/svgs'

const Header = () => {
  const location = useLocation()

  return (
    <div className={styles.wrapper}>
      <header>
        {location.pathname === '/location' ? (
          <button className={styles.leftBtn} type='button'>
            <Link to='/'>
              <LeftArrowIcon className={styles.leftArrow} />
            </Link>
          </button>
        ) : (
          <button className={styles.searchBtn} type='button'>
            <Link to='/location'>
              <SearchIcon className={styles.search} />
            </Link>
          </button>
        )}
      </header>
      <Outlet />
    </div>
  )
}

export default Header
