import React from 'react';
import Popup from './Popup';
import { useFormAndValidation } from '../hooks/useFormAndValidation';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Input from './Input';
import Form from './Form';
import { inputsData } from '../utils/constants';


function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const { values, handleChange, errors, isValid, resetForm, setValues, setIsValid } = useFormAndValidation();
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    resetForm();
    setValues(currentUser);
    setIsValid(true);
  }, [isOpen, resetForm, currentUser, setValues, setIsValid]);


  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values);
  }

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form
        onSubmit={handleSubmit}
        name="edit-profile"
        title="Редактировать профиль"
        buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
        isDisabled={!isValid}
      >
        {
          inputsData.editProfileInputs.map((input, index) =>
            (
              <Input
                key={index}
                type={input.type}
                name={input.name}
                placeholder={input.placeholder}
                minLength={input.minLength}
                maxLength={input.maxLength}
                errors={errors}
                values={values}
                handleChange={handleChange}
              />
            )
          )
        }
      </Form>
    </Popup>
  );
}

export default EditProfilePopup;
