import React from 'react';

function Card() {
    return (
        <template className="card-template">
            <li className="card">
                <img src="src/components/App#" className="card__photo" alt="#"/>
                <div className="card__info-container">
                    <h2 className="card__title"></h2>
                    <div className="card__like-container">
                        <button
                            type="button"
                            className="card__like-button"
                            aria-label="like"
                        ></button>
                        <p className="card__like-counter"></p>
                    </div>
                    <button className="card__delete-button" aria-label="delete"></button>
                </div>
            </li>
        </template>
    );
}

export default Card;