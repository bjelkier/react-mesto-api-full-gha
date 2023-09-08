import React, { useContext } from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({ onEditProfile, onAddPlace, onEditAvatar, cards, onCardClick, onCardDelete, onCardLike, onCardDislike }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__userpic-container">
          <img
            className="profile__userpic"
            src={currentUser && currentUser.avatar}
            alt="Ваше лучшее фото"
          />
          <button className="profile__userpic-button" type="button" onClick={onEditAvatar} />
        </div>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__name">{currentUser && currentUser.name}</h1>
            <button type="button" className="profile__edit-button" onClick={onEditProfile} />
          </div>
          <p className="profile__description">{currentUser && currentUser.about}</p>
        </div>
        <button type="button" className="profile__add-button" onClick={onAddPlace} />
      </section>
      <section className="places">
        <ul className="places__gallery">
          {cards.map(card => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDislike={onCardDislike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
