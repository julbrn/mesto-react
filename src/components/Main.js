import React, {useEffect} from 'react';
import api from '../utils/api.js';
import Card from "./Card";

function Main(props) {
    const [userName, setUserName] = React.useState('')
    const [userDescription, setUserDescription] = React.useState('')
    const [userAvatar, setUserAvatar] = React.useState('')
    const [cards, setCards] = React.useState([]);
    useEffect(() => {
        Promise.all([api.downloadUserInfo(), api.downloadInitialCards()])
            .then(([me, card]) => {
                setUserName(me.name)
                setUserDescription(me.about);
                setUserAvatar(me.avatar);
                setCards(card);
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container">
                    <button onClick={props.onEditAvatar} className="profile__edit-avatar-button" aria-label="Редактировать аватар"
                            type="button"/>
                    <img
                        className="profile__avatar"
                        src={userAvatar}
                        alt="Аватар"
                    />
                </div>
                <h1 className="profile__title">{userName}</h1>
                <p className="profile__subtitle">{userDescription}</p>
                <button
                    className="profile__edit-button"
                    onClick={props.onEditProfile}
                    aria-label="Редактировать информацию профиля"
                    type="button"
                />
                <button
                    className="profile__add-button"
                    onClick={props.onAddPlace}
                    aria-label="Add"
                    type="button"
                />
            </section>
            <section className="elements">
                <ul className="elements__cards">
                        {cards.map((card) => (
                                <Card
                                    card = {card}
                                    name = {card.name}
                                    link = {card.link}
                                    likes = {card.likes.length}
                                    onCardClick={props.onCardClick}
                                    key = {card._id}
                                />
                            ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;