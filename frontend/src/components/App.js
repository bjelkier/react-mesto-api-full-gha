import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { api } from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from './InfoTooltip';
import ProtectedRouteElement from "./ProtectedRoute";
import auth from '../utils/Auth'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [registrationResult, setRegistrationResult] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('')
  const navigate = useNavigate();


  useEffect(() => {
    api.getProfile()
      .then(data => {
        setCurrentUser(data);
      })
      .catch(error => {
        console.log('Ошибка.....:', error);
      });

    api.getCards()
      .then(data => {
        setCards(data);
      })
      .catch(error => {
        console.log('Ошибка.....:', error);
      });
    handleTokenCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleUpdateProfile({ name, about }) {
    api.editProfile(name, about)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(error => {
        console.log('Ошибка.....:', error);
      });
  }

  const handleInfoTooltipOpen = () => {
    setIsInfoTooltipOpen(true);
  }

  function onEditProfile() {
    setIsEditProfilePopupOpen(true);
  }

  function onAddPlace() {
    setIsAddPlacePopupOpen(true);
  }

  function onEditAvatar() {
    setIsEditAvatarPopupOpen(true);
  }

  function onConfirmation() {
    setIsConfirmationPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    api.addLike(card._id)
      .then(updatedCard => {
        const updatedCards = cards.map(c => (c._id === card._id ? updatedCard : c));
        setCards(updatedCards);
      })
      .catch(error => {
        console.log('Ошибка.....:', error);
      });
  }

  function handleCardDislike(card) {
    api.deleteLike(card._id)
      .then(updatedCard => {
        const updatedCards = cards.map(c => (c._id === card._id ? updatedCard : c));
        setCards(updatedCards);
      })
      .catch(error => {
        console.log('Ошибка.....:', error);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(item => item._id !== card._id));
      })
      .catch(error => {
        console.log('Ошибка.....:', error);
      });
  }

  function handleUpdateAvatar(newAvatar) {
    api.updateUserPic(newAvatar.avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => {
        console.log('Ошибка.....:', error);
      });
  }

  function handleAddPlaceSubmit(data) {
    api.addCard(data.name, data.link)
      .then(newCard => {
        setCards((prevCards) => [newCard, ...prevCards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch(error => {
        console.log('Ошибка.....:', error);
      });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  function handleRegistration(registerData) {
    auth.register(registerData.email, registerData.password)
      .then((res) => {
        navigate('/sign-in', { replace: true })
        setRegistrationResult(true);
        handleInfoTooltipOpen();
      })
      .catch((err) => {
        console.log('Ошибка.....:', err);
        setRegistrationResult(false);
        handleInfoTooltipOpen()
      })
  };

  function handleLogin(loginData) {
    auth.login(loginData.email, loginData.password).then((res) => {
      handleTokenCheck();
    })
      .catch((err) => {
        console.log('Ошибка.....:', err);
        setRegistrationResult(false);
        handleInfoTooltipOpen()
      })
  }

  function handleTokenCheck() {
    auth.checkToken().then((res) => {
      navigate('/', { replace: true });
      setLoggedIn(true);
      setEmail(res.email)
    })
      .catch((err) => {
        console.log('Ошибка.....:', err);
      })
  }

  function handleExit() {
    setEmail('');
    setLoggedIn(false)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          email={email}
          onExit={handleExit}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                loggedIn={loggedIn}
                onEditProfile={onEditProfile}
                isEditProfilePopupOpen={isEditProfilePopupOpen}
                onAddPlace={onAddPlace}
                isAddPlacePopupOpen={isAddPlacePopupOpen}
                onEditAvatar={onEditAvatar}
                isEditAvatarPopupOpen={isEditAvatarPopupOpen}
                onConfirmation={onConfirmation}
                onCardClick={handleCardClick}
                onCardDelete={handleCardDelete}
                onCardLike={handleCardLike}
                onCardDislike={handleCardDislike}
                cards={cards}
              />
            }
          />
          <Route path='/sign-up' element={
            <Register
              onSubmit={handleRegistration} />
          } />
          <Route path='/sign-in' element={
            <Login
              onSubmit={handleLogin} />
          } />
        </Routes>
        {loggedIn && <Footer />}
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          result={registrationResult}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateProfile={handleUpdateProfile}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onCreateCard={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupWithForm
          title="Вы уверены?"
          name="confirmation"
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
        />
      </div>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;
