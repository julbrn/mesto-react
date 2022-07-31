import React from 'react';

function Main(props) {
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container">
                    <button onClick={props.onEditAvatar} className="profile__edit-avatar-button" aria-label="Редактировать аватар"
                            type="button"></button>
                    <img
                        className="profile__avatar"
                        src="https://images.unsplash.com/photo-1580560400778-5d9fafd7fe18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        alt="Аватар"
                    />
                </div>
                <h1 className="profile__title"></h1>
                <p className="profile__subtitle"></p>
                <button
                    className="profile__edit-button"
                    onClick={props.onEditProfile}
                    aria-label="Редактировать информацию профиля"
                    type="button"
                ></button>
                <button
                    className="profile__add-button"
                    onClick={props.onAddPlace}
                    aria-label="Add"
                    type="button"
                ></button>
            </section>
            <section className="elements">
                <ul className="elements__cards"></ul>
            </section>
        </main>
    );
}

export default Main;