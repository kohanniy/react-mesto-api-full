import { Link, useLocation } from 'react-router-dom';
import HeaderContainer from './HeaderContainer';
import HeaderControls from './HeaderControls';


function Header({signOut, loggedIn, userEmail, menuToggleClick, menuOpened }) {
  const location = useLocation();
  let classNameHeader = 'header'

  if (menuOpened) {
    classNameHeader += ' menu-opened';
  }

  return (
    <header className={classNameHeader}>
      <HeaderContainer
        menuToggleClick={menuToggleClick}
        loggedIn={loggedIn}
      />
      {
        loggedIn
          ? <HeaderControls
              signOut={signOut}
              userEmail={userEmail}
            />
          : location.pathname === '/signin'
              ? <Link className="header__link" to="/signup">Регистрация</Link>
              : <Link className="header__link" to="/signin">Войти</Link>
      }

    </header>
  );
}

export default Header;
