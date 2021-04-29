import React from 'react';
import Popup from './Popup';
import { useFormAndValidation } from '../hooks/useFormAndValidation';
import Form from './Form';
import Input from './Input';
import { inputsData } from '../utils/constants';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();


  React.useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(values);
  }

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form
        onSubmit={handleSubmit}
        name="add-card"
        title="Новое место"
        buttonText={isLoading ? 'Сохранение...' : 'Создать'}
        isDisabled={!isValid}
      >
        {
          inputsData.addPlaceInputs.map((input, index) =>
            (
              <Input
                key={index}
                name={input.name}
                type={input.type}
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

export default AddPlacePopup;
