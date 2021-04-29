import React from 'react';

function Input(props) {
  const { name, type, errors, placeholder, handleChange, values, minLength, maxLength, autoComplete, isAuth } = props;

  let classNameInput = `form__input ${errors[name] ? 'form__input_state_error' : 'form__input_state_valid'}`;

  if (isAuth) classNameInput += ' form__input_auth'

  return (
    <>
      <input
        type={type}
        name={name}
        className={classNameInput}
        placeholder={placeholder}
        onChange={handleChange}
        value={values[name] || ''}
        minLength={minLength}
        maxLength={maxLength}
        required
        autoComplete={autoComplete}
      />
      <span id={`${name}-error`} className="form__input-error">
        {errors[name] || ''}
      </span>
    </>
  );
}

export default Input;
