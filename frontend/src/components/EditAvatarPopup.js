import React from 'react';
import Popup from './Popup';
import { useFormAndValidation } from '../hooks/useFormAndValidation';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Form from './Form';
import Input from './Input';
import { inputsData } from '../utils/constants';

function EditAvatarPopup({ isOpen, onUpdateAvatar, onClose, isLoading }) {
  const { values, handleChange, errors, isValid, resetForm, setValues, setIsValid } = useFormAndValidation();
  const currentUser = React.useContext(CurrentUserContext);


  React.useEffect(() => {
    resetForm();
    setValues(currentUser);
    setIsValid(true);
  }, [isOpen, resetForm, currentUser, setValues, setIsValid]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: values.avatar || ''
    });
  }

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form
        onSubmit={handleSubmit}
        name="edit-avatar"
        title="Обновить аватар"
        buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
        isDisabled={!isValid}
      >
        {
          inputsData.editAvatarInputs.map((input, index) =>
            (
              <Input
                key={index}
                type={input.type}
                name={input.name}
                placeholder={input.placeholder}
                errors={errors}
                handleChange={handleChange}
                values={values}
                isAuth={false}
              />
            )
          )
        }
      </Form>
    </Popup>
  );
}

export default EditAvatarPopup;
