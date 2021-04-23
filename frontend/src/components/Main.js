import Profile from './Profile';
import Cards from './Cards';

function Main(props) {
  const { onEditAvatar, onEditProfile, onAddCard, cards, onConfirmDeletionPopupOpen, onCardClick, onCardLike } = props;
  return (
    <>
      <Profile
        onEditAvatar={onEditAvatar}
        onEditProfile={onEditProfile}
        onAddCard={onAddCard}
      />
      <Cards
        cards={cards}
        onConfirmDeletionPopupOpen={onConfirmDeletionPopupOpen}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
      />
    </>
  );
}

export default Main;
