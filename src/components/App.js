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


function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(null)
  const [cards, setCards] = React.useState([])
  const [currentUser, setCurrentUser] = React.useState({
        name: 'Preliminary User',
        about: 'Preliminary Info',
        avatar: 'Preliminary Avatar',
    });
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
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
  return (
      <CurrentUserContext.Provider value={currentUser}>
      <div className="page"><Header/><Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
      /><Footer/><PopupWithForm
          name='edit-profile'
          title='Редактировать профиль'
          buttonText='Сохранить'
          onClose={closeAllPopups}
          isOpen={isEditProfilePopupOpen}>
          <Input
              type="text"
              placeholder="Имя"
              minLength="2"
              maxLength="40"
              name="profileName"
              id="profileName-input"
          />
          <Input
              type="text"
              placeholder="О себе"
              minLength="2"
              maxLength="200"
              name="profileInfo"
              id="profileInfo-input"
          />
      </PopupWithForm><PopupWithForm
          name='add-card'
          title='Новое место'
          buttonText='Создать'
          onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}>
          <Input
              type="text"
              placeholder="Название"
              minLength="2"
              maxLength="30"
              name="name"
              id="placeName-input"
          />
          <Input
              type="url"
              placeholder="Ссылка на картинку"
              name="link"
              id="placeUrl-input"
          />
      </PopupWithForm><PopupWithForm
          name='edit-avatar'
          title='Обновить аватар'
          buttonText='Сохранить'
          onClose = {closeAllPopups}
          isOpen={isEditAvatarPopupOpen}>
          <Input
              type="url"
              placeholder="Ссылка на аватар"
              name="avatarLink"
              id="avatarUrl-input"
          />
      </PopupWithForm><PopupWithForm
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

