import React from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';
import { useFormAndValidation } from '../hooks/useFormAndValidation';
import Input from './Input';
import { inputsData } from '../utils/constants';

function Register({onRegisterFormSubmit, isLoading}) {
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  React.useEffect(() => {
    resetForm();
  }, [resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onRegisterFormSubmit(values.password, values.email);
  }

  return (
    <section className="authentication">
      <Form
        name="register"
        title="Регистрация"
        buttonText={isLoading ? 'Сохранение...' : 'Зарегистрироваться'}
        isDisabled={!isValid}
        formClasses={'authentication__form form_auth'}
        isAuth={true}
        onSubmit={handleSubmit}
      >
        {
          inputsData.authInputs.map((input, index) =>
            (
              <Input
                key={index}
                type={input.type}
                name={input.name}
                placeholder={input.placeholder}
                isAuth={input.isAuth}
                autoComplete={input.autoComplete}
                minLength={input.minLength}
                maxLength={input.maxLength}
                handleChange={handleChange}
                values={values}
                errors={errors}
              />
            )
          )
        }
      </Form>
      <p className="authentication__text">
        Уже зарегистрированы?&nbsp;
        <Link className="authentication__link" to="signin">Войти</Link>
      </p>
    </section>
  );
}

export default Register;
