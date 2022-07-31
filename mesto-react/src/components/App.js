import logo from '../images/header/logo.svg';
import '../App.css';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import Card from "./Card";

function App() {
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  function handleEditProfileClick() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  return (
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
        />
        <Footer />
        <PopupWithForm
        name='edit-profile'
        title='Редактировать профиль'
        buttonText='Сохранить'
        isOpen={isEditProfilePopupOpen}>
          <input
              type="text"
              name="profileName"
              id="profileName-input"
              className="popup__input popup__input_type_name"
              placeholder="Имя"
              autoComplete="off"
              minLength="2"
              maxLength="40"
              required
          />
          <span className="popup__input-error profileName-input-error"></span>
          <input
              type="text"
              name="profileInfo"
              id="profileInfo-input"
              className="popup__input popup__input_type_info"
              placeholder="О себе"
              autoComplete="off"
              minLength="2"
              maxLength="200"
              required
          />
          <span className="popup__input-error profileInfo-input-error"></span>
        </PopupWithForm>
        <PopupWithForm
            name='add-card'
            title='Новое место'
            buttonText='Создать'
            isOpen={isAddPlacePopupOpen}>
              <input
                  name="name"
                  type="text"
                  className="popup__input popup__input_type_name"
                  id="placeName-input"
                  placeholder="Название"
                  autoComplete="off"
                  minLength="2"
                  maxLength="30"
                  required
              />
              <span className="popup__input-error placeName-input-error"></span>
              <input
                  name="link"
                  type="url"
                  className="popup__input popup__input_type_url"
                  id="placeUrl-input"
                  placeholder="Ссылка на картинку"
                  autoComplete="off"
                  required
              />
              <span className="popup__input-error placeUrl-input-error"></span>
        </PopupWithForm>

        <ImagePopup />
        <PopupWithForm
            name='edit-avatar'
            title='Обновить аватар'
            buttonText='Сохранить'
            isOpen={isEditAvatarPopupOpen}>
              <input
                  name="avatarLink"
                  type="url"
                  className="popup__input popup__input_type_url popup__input_type_avatarUrl"
                  id="avatarUrl-input"
                  placeholder="Ссылка на аватар"
                  autoComplete="off"
                  required
              />
              <span className="popup__input-error avatarUrl-input-error"></span>
        </PopupWithForm>
        <PopupWithForm
            name='deletion-confirmation'
            title='Вы уверены?'
            buttonText='Да'>
        </PopupWithForm>
        <Card />
      </div>
  );
}

export default App;
