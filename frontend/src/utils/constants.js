export const inputsData = {
  editAvatarInputs: [
    {
      type: 'url',
      name: 'avatar',
      placeholder: 'Ссылка на аватар',
    }
  ],
  editProfileInputs: [
    {
      type: 'text',
      name: 'name',
      placeholder: 'Валентин Петров',
      minLength: '2',
      maxLength: '40'
    },
    {
      type: 'text',
      name: 'about',
      placeholder: 'Род занятий. Например, программист',
      minLength: '2',
      maxLength: '200'
    }
  ],
  addPlaceInputs: [
    {
      type: 'text',
      name: 'name',
      placeholder: 'Название',
      minLength: '1',
      maxLength: '30'
    },
    {
      type: 'url',
      name: 'link',
      placeholder: 'Ссылка на картинку',
    }
  ],
  authInputs: [
    {
      type: 'email',
      name: 'email',
      placeholder: 'Email',
      isAuth: true,
      autoComplete: 'email'
    },
    {
      type: 'password',
      name: 'password',
      placeholder: 'Пароль',
      isAuth: true,
      autoComplete: 'off',
      minLength: '6',
      maxLength: '200'
    },
  ]
}
