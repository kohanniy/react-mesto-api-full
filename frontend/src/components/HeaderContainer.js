import logo from '../images/logo.svg';

function HeaderContainer({ menuToggleClick, loggedIn }) {
  return (
    <div className="header__container">
      <img src={logo} alt="Логотип" className="header__logo" />
      {
        loggedIn
          ? <button onClick={menuToggleClick} className="menu-toggle" type="button" aria-label="открыть/закрыть меню">
              <span className="menu-toggle__icon" />
            </button>
          : null
      }
    </div>
  );
}

export default HeaderContainer;
