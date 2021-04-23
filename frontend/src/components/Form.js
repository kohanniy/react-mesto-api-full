function Form(props) {
  const { onSubmit, name, title, children, isDisabled, buttonText, isAuth } = props;

  let classNameForm = 'form';
  let classNameButton = 'form__button';
  let classNameHeading = 'form__heading';

  if (isDisabled) classNameButton += ' form__button_disabled';
  if (isAuth) {
    classNameForm += ' authentication__form'
    classNameButton += ' form__button_auth';
    classNameHeading += ' form__heading_type_auth';
  }

  return (
    <form
      onSubmit={onSubmit}
      name={name}
      className={classNameForm}
      noValidate
    >
      <h3 className={classNameHeading}>{title}</h3>
      {children}
      <button
        type="submit"
        className={classNameButton}
        disabled={isDisabled}
      >
        {buttonText}
      </button>
    </form>
  );
}

export default Form;
