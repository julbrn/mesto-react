import React, {useEffect, useState} from 'react';
import '../index.css';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import Input from "./Input";
import api from '../utils/api.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(null)
  const [cards, setCards] = React.useState([])
  const [currentUser, setCurrentUser] = React.useState({
        name: '',
        about: '',
        avatar: '',
    });
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
    }
    function handleCardDelete(card) {
        api.deleteCardfromServer(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id && c));
            })
            .catch((err) => {
                console.log(`${err}`);
            })
    }
  const isOpen = isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || selectedCard;
  useEffect(() => {
        Promise.all([api.getUserInfo(), api.downloadInitialCards()])
            .then(([userData, cardsData]) => {
                setCurrentUser(userData);
                setCards(cardsData);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

  useEffect(() => {
      function handleEscapeClose(event) {
          if (event.key === 'Escape') {
              closeAllPopups()
          }
      }
      if (isOpen) {
          document.addEventListener('keydown', handleEscapeClose);
          return () => {
              document.removeEventListener('keydown', handleEscapeClose)
          }
      }
  }, [isOpen])


  function handleEditProfileClick() {setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {setAddPlacePopupOpen(true);
  }
  function closeAllPopups() {setEditProfilePopupOpen(false);setAddPlacePopupOpen(false);setEditAvatarPopupOpen(false);setSelectedCard(null);
  }
  function handleCardClick(card) {
      setSelectedCard(card);
  }

  function handleUpdateUser(inputdata) {
      api.uploadUserInfo(inputdata)
          .then(user => {
              setCurrentUser(user);
              setEditProfilePopupOpen(false);
          })
          .catch((err) => {
              console.log(err);
          })
  }

    function handleUpdateAvatar(data) {
        api.editAvatar(data)
            .then(res => {
                setCurrentUser(res);
                setEditAvatarPopupOpen(false);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleAddPlace(data) {
        api.uploadCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                setAddPlacePopupOpen(false);
            })
            .catch((err) => {
                console.log(err);
            })
    }

  return (
      <CurrentUserContext.Provider value={currentUser}>
      <div className="page"><Header/><Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          setCards={setCards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
      /><Footer/>
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}  onUpdateAvatar={handleUpdateAvatar} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace}/>
          <PopupWithForm
          name='deletion-confirmation'
          title='Вы уверены?'
          buttonText='Да'>
      </PopupWithForm><ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}>
      </ImagePopup>
      </div>
      </CurrentUserContext.Provider>);
  }
export default App;

