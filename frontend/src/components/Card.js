import React, { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardDelete, onCardLike, onCardDislike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = card.likes.some(user => user._id === currentUser._id);
  const isOwner = card._id === currentUser._id;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    if (isLiked) {
      onCardDislike(card);
    } else {
      onCardLike(card);
    }
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  const cardLikeButtonClassName = `places__like ${isLiked ? 'places__like_active' : ''}`;

  return (
    <li className="places__card">
      <img className="places__image" src={card.link} alt={card.name} onClick={handleClick} />
      <div className="places__block">
        <h2 className="places__place">{card.name}</h2>
        <div className="places__likescontainer">
          <button className={cardLikeButtonClassName} type="button" aria-label="Лайк" onClick={handleLikeClick} />
          <span className="places__likescounter">{card.likes.length}</span>
        </div>
      </div>
      {isOwner && (
        <button className="places__delete-button" type="button" aria-label="Удалить" onClick={handleDeleteClick} />
      )}
    </li>
  );
}

export default Card;
