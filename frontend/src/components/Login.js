import React from 'react';
import Form from './Form';
import { useFormAndValidation } from '../hooks/useFormAndValidation';
import Input from './Input';
import { inputsData } from "../utils/constants";

function Login({onLoginFormSubmit, isLoading}) {
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  React.useEffect(() => {
    resetForm();
  }, [resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onLoginFormSubmit(values.password, values.email);
  }

  return (
    <section className="authentication">
      <Form
        name="login"
        title="Вход"
        buttonText={isLoading ? 'Вход...' : 'Войти'}
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
    </section>
  );
}

export default Login;
