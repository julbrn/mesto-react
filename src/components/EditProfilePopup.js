import React, {useContext, useState, useEffect} from 'react';
import Input from "./Input";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [props.isOpen, currentUser]);

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name: name,
            about: description,
        });
    };

    const handleNameChange = (evt) => {
        setName(evt.target.value);
    };

    const handleDescriptionChange = (evt) => {
        setDescription(evt.target.value);
    }
    return (
        <PopupWithForm
            name='edit-profile'
            title='Редактировать профиль'
            buttonText='Сохранить'
            onClose={props.onClose}
            onSubmit={handleSubmit}
            isOpen={props.isOpen}>
            <Input
                type="text"
                placeholder="Имя"
                minLength="2"
                maxLength="40"
                name="name"
                id="profileName-input"
                onChange={handleNameChange}
            />
            <Input
                type="text"
                placeholder="О себе"
                minLength="2"
                maxLength="200"
                name="about"
                id="profileInfo-input"
                onChange={handleDescriptionChange}
            />
        </PopupWithForm>
    );
}

export default EditProfilePopup;