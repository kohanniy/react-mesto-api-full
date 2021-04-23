import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ cardData, onCardClick, onCardLike, onConfirmDeletionPopupOpen }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = cardData.owner._id === currentUser._id;
  const isLiked = cardData.likes.some(like => like._id === currentUser._id)

  const cardDeleteButtonClassName = (`cards__delete-btn ${isOwn ? 'cards__delete-btn_visible' : 'cards__delete-btn_hidden'}`);
  const cardLikeButtonClassName = (`cards__heart ${isLiked && 'cards__heart_active'}`);

  function handleClick() {
    onCardClick(cardData);
  }

  function handleLikeClick() {
    onCardLike(cardData);
  }

  function handleDeleteIconClick() {
    onConfirmDeletionPopupOpen(cardData);
  }

  return (
    <li className="cards__item">
      <img
        onClick={handleClick}
        className="cards__image"
        src={cardData.link}
        alt={cardData.name}
      />
      <button
        onClick={handleDeleteIconClick}
        type="button"
        aria-label="Удалить"
        className={cardDeleteButtonClassName}
      />
      <div className="cards__rating">
        <h2 className="cards__title">{cardData.name}</h2>
        <div className="cards__heart-container">
          <button
            onClick={handleLikeClick}
            type="button"
            aria-label="Поставить лайк"
            className={cardLikeButtonClassName}
          />
          <p className="cards__hearts-number">{cardData.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;
