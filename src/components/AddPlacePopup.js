import {useContext, useEffect, useRef} from 'react';
import Input from "./Input";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import React from "react";

function AddPlacePopup({onClose, isOpen}) {
    return (<PopupWithForm
        name='add-card'
        title='Новое место'
        buttonText='Создать'
        onClose={onClose}
        isOpen={isOpen}>
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
    </PopupWithForm>)
}
export default AddPlacePopup