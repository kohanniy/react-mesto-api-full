import Popup from './Popup';

function InfoTooltip({ isOpen, onClose, result }) {
  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className={`popup__tooltip-icon ${result.success ? 'popup__tooltip-icon_result_success' : 'popup__tooltip-icon_result_fail'}`}></div>
      <h3 className="popup__heading">{result.message}</h3>
    </Popup>
  );
}

export default InfoTooltip;
