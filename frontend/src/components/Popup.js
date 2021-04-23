import ClosePopupButton from './ClosePopupButton';
import { handleStopPropagation } from '../utils/utils';

function Popup(props) {
  const { isOpen, onClose, isImagePopup, children } = props;
  let classNamePopupContainer = 'popup__container';

  if (!isImagePopup) classNamePopupContainer += ' popup__container_form-tooltip'

  return (
    <div onClick={onClose} className={`popup ${isOpen ? 'popup_opened' : 'popup_closed'}`}>
      <div onClick={handleStopPropagation} className={classNamePopupContainer}>
        {children}
        <ClosePopupButton onClose={onClose} />
      </div>
    </div>
  );
}

export default Popup;
