import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Profile({ onEditAvatar, onEditProfile, onAddCard }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <section className="profile">
      <div className="profile__img-container">
        <img
          className="profile__img"
          src={currentUser.avatar}
          alt="аватар пользователя"
        />
        <button
          onClick={onEditAvatar}
          className="profile__avatar-btn"
          type="button"
          aria-label="Редактировать аватар"
        />
      </div>
      <div className="profile__data">
        <h1 className="profile__name">{currentUser.name}</h1>
        <p className="profile__description">{currentUser.about}</p>
        <button
          onClick={onEditProfile}
          type="button"
          aria-label="Изменить информацию о себе"
          className="profile__edit-btn"
        />
      </div>
      <button
        onClick={onAddCard}
        type="button"
        aria-label="Добавить фото"
        className="profile__add-btn"
      />
    </section>
  );
}

export default Profile;
