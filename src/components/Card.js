import React from 'react';

function Card({card, name, link, likes}) {
    return (
            <li className="card">
                <img src={link} className="card__photo" alt="{name}"/>
                <div className="card__info-container">
                    <h2 className="card__title">{name}</h2>
                    <div className="card__like-container">
                        <button
                            type="button"
                            className="card__like-button"
                            aria-label="like"
                        ></button>
                        <p className="card__like-counter">{likes}</p>
                    </div>
                    <button className="card__delete-button" aria-label="delete"></button>
                </div>
            </li>
    );
}

export default Card;