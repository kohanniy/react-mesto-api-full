import Popup from './Popup';
import Form from './Form';

function ConfirmDeletionPopup({ isOpen, onClose, cardDelete, isLoading }) {
  function handleSubmit(e) {
    e.preventDefault();
    cardDelete(isOpen);
  }

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form
        onSubmit={handleSubmit}
        name="confirm-deletion"
        title="Вы уверены?"
        buttonText={isLoading ? 'Удаление...' : 'Да'}
      />
    </Popup>
  );
}

export default ConfirmDeletionPopup;
