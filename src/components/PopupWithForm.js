import React from 'react';

function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`} onClick={props.onClose}>
            <div className={`popup__container popup__container_type_${props.name}`} onClick={(event) => {event.stopPropagation()}}>
                <button onClick={props.onClose} type="button" aria-label="Close"
                 className="popup__close"/>
                <form className="popup__form" name={`${props.name}-form`} noValidate>
                    <fieldset className="popup__fieldset">
                        <legend className="popup__title">{props.title}</legend>
                        {props.children}
                        <button type="submit"
                                className="popup__submit-button popup__submit-button_active">{props.buttonText}
                        </button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;