import Card from './Card';

function Cards(props) {
  const { cards, onConfirmDeletionPopupOpen, onCardLike, onCardClick } = props;
  return (
    <section className="cards">
      <ul className="cards__list">
        {
          cards.map(card =>
            (
              <Card
                onConfirmDeletionPopupOpen={onConfirmDeletionPopupOpen}
                onCardLike={onCardLike}
                onCardClick={onCardClick}
                key={card._id.toString()}
                cardData={card}
              />
            )
          )
        }
      </ul>
    </section>
  );
}

export default Cards;
