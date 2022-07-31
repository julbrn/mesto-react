import React from 'react';

function ImagePopup() {
    return (
        <div className="popup popup_type_zoom-image">
            <div className="popup__figure-container">
                <button type="button" aria-label="Close" className="popup__close"></button>
                <figure className="popup__figure">
                    <img src="src/components/App#" className="popup__image" alt="#"/>
                    <figcaption className="popup__caption"></figcaption>
                </figure>
            </div>
        </div>
    );
}

export default ImagePopup;