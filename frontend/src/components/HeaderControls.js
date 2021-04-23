function HeaderControls({ userEmail, signOut }) {
  return (
    <div className="header__controls">
      <p className="header__user-email">{userEmail}</p>
      <button className="header__signout-btn" onClick={signOut} type="button">Выйти</button>
    </div>
  );
}

export default HeaderControls;
