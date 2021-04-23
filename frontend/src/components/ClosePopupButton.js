function ClosePopupButton({ onClose }) {
  return (
    <button
      onClick={onClose}
      type="button"
      aria-label="Закрыть" className="popup__close-btn"
    />
  );
}

export default ClosePopupButton;
