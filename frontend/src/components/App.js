import React from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Register from './Register';
import Login from './Login';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { rejectPromise, setToken, getToken, removeToken } from '../utils/utils';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletionPopup from './ConfirmDeletionPopup';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';

function App() {
  const [ isEditProfilePopupOpen, setIsEditProfilePopupOpen ] = React.useState(false);
  const [ isAddCardPopupOpen, setIsAddCardPopupOpen ] = React.useState(false);
  const [ isEditAvatarPopupOpen, setIsEditAvatarPopupOpen ] = React.useState(false);
  const [ isConfirmDeletionPopup, setIsConfirmDeletionPopup ] = React.useState(false);
  const [ isImagePopupOpen, setIsImagePopupOpen ] = React.useState(false);
  const [ isInfoTooltipOpen, setInfoTooltipOpen ] = React.useState(false);
  const [ resultRegistration, setResultRegistration ] = React.useState({});
  const [ selectedCard, setSelectedCard ] = React.useState(false);
  const [ currentUser, setCurrentUser ] = React.useState({});
  const [ cards, setCards ] = React.useState([]);
  const [ isLoading, setIsLoading ] = React.useState(false);
  const [ loggedIn, setLoggedIn ] = React.useState(false);
  const [ userEmail, setUserEmail ] = React.useState('');
  const [ menuOpened, setMenuOpened ] = React.useState(false);
  const history = useHistory();

  function handleRegisterFormSubmit(password, email) {
    setIsLoading(!isLoading);
    api.register(password, email)
      .then((data) => {
        setInfoTooltipOpen(true);
        setResultRegistration({...resultRegistration, message: 'Вы успешно зарегистрировались! Войдите в систему.', success: true});
        history.push('/signin');
      })
      .catch((err) => {
        if (err.status === 400) {
          setResultRegistration({...resultRegistration, message: 'Неправильно заполнено одно из полей.', success: false});
        } else if (err.status === 409) {
          setResultRegistration({...resultRegistration, message: 'Пользователь с таким email уже зарегистрирован.', success: false});
        } else {
          setResultRegistration({...resultRegistration, message: 'Что-то пошло не так! Попробуйте еще раз', success: false});
        }
        setInfoTooltipOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleLoginFormSubmit(password, email) {
    setIsLoading(true);
    api.authorize(password, email)
      .then((data) => {
        if (data) {
          setToken(data.token);
          setLoggedIn(true);
          setUserEmail(email);
          history.push('/');
        }
      })
      .catch((err) => {
        if (err.status === 401) {
          setResultRegistration({...resultRegistration, message: 'Вы ввели неверный email или пароль! Попробуйте еще раз', success: false});
        } else if (err.status === 400) {
            setResultRegistration({...resultRegistration, message: 'Не передано одно из полей', success: false});
        } else {
          setResultRegistration({...resultRegistration, message: 'Что-то пошло не так! Попробуйте еще раз', success: false});
        }
        setInfoTooltipOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleMenuToggleClick() {
    setMenuOpened(!menuOpened);
  }

  function handleSignOut() {
    removeToken();
    history.push('/signin');
    setLoggedIn(false);
  }

  function handleCardClick(cardData) {
    setSelectedCard(cardData);
    setIsImagePopupOpen(!isImagePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddCardClick() {
    setIsAddCardPopupOpen(!isAddCardPopupOpen);
  }

  const closeAllPopups = React.useCallback(() => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmDeletionPopup(false);
    setInfoTooltipOpen(false);
  }, [])

  function handleUpdateUser({name, about}) {
    const token = getToken();
    setIsLoading(!isLoading);
    api.setUserInfo({name, about}, token)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => {
        rejectPromise(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleUpdateAvatar({ avatar }) {
    const token = getToken();
    setIsLoading(!isLoading);
    api.setAvatar({avatar}, token)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        rejectPromise(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleCardLike(card) {
    const token = getToken();
    const isLiked = card.likes.some(like => like === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked, token)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((err) => {
        rejectPromise(err);
      })
  }

  function confirmDeletionPopupOpen(cardData) {
    setIsConfirmDeletionPopup(cardData);
  }

  function handleCardDelete(card) {
    const token = getToken();
    setIsLoading(!isLoading);
    api.deleteCard(card._id, token)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
        setIsConfirmDeletionPopup(false);
      })
      .catch((err) => {
        rejectPromise(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleAddPlaceSubmit({name, link}) {
    const token = getToken();
    setIsLoading(!isLoading);
    api.addCard({name, link}, token)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        rejectPromise(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  //закрытие по Esc
  React.useEffect(() => {
    function handlePopupsEscClose(e) {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', handlePopupsEscClose);

    return () => document.removeEventListener('keydown', handlePopupsEscClose);
  }, [closeAllPopups]);

  //Проверка токена
  React.useEffect(() => {
    const token = getToken();
    if (token) {
      api.getUserInfo(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.email);
            history.push('/');
          }
        })
        .catch((err) => {
          if (err.status === 401) {
            setResultRegistration({...resultRegistration, message: 'Токен не передан или передан не в том формате', success: false});
          } else {
            setResultRegistration({...resultRegistration, message: 'Что-то пошло не так! Попробуйте еще раз', success: false});
          }
          setInfoTooltipOpen(true);
        })
      }
  }, [history]);

  //получение и отрисовка данных при загрузке страницы
  React.useEffect(() => {
    if (loggedIn) {
      const token = getToken();
      api.getDataForRendered(token)
      .then(([ cardsData, userData ]) => {
        setCards(cardsData);
        setCurrentUser(userData);
      })
      .catch((err) => {
        rejectPromise(err);
      })
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        signOut={handleSignOut}
        loggedIn={loggedIn}
        userEmail={userEmail}
        menuToggleClick={handleMenuToggleClick}
        menuOpened={menuOpened}
      />
      <main className="main-content">
        <ProtectedRoute
          exact path="/"
          loggedIn={loggedIn}
          component={Main}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddCard={handleAddCardClick}
          cards={cards}
          onConfirmDeletionPopupOpen={confirmDeletionPopupOpen}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
        />
        <Route path='/signup'>
          <Register
            onRegisterFormSubmit={handleRegisterFormSubmit}
            isLoading={isLoading}
          />
        </Route>
        <Route path='/signin'>
          <Login
            onLoginFormSubmit={handleLoginFormSubmit}
            isLoading={isLoading}
          />
        </Route>
        <Route path="/">
          {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
        </Route>
      </main>
      <Footer />
      {
        loggedIn &&
        <>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />
          <AddPlacePopup
            isOpen={isAddCardPopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />
          <ConfirmDeletionPopup
            isOpen={isConfirmDeletionPopup}
            onClose={closeAllPopups}
            cardDelete={handleCardDelete}
            isLoading={isLoading}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            isOpen={isImagePopupOpen}
          />
        </>
      }
      {
        isInfoTooltipOpen &&
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          result={resultRegistration}
        />
      }
    </CurrentUserContext.Provider>
  );
}

export default App;
