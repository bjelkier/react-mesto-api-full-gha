import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onCreateCard }) {
  const [location, setLocation] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setLocation('');
    setLink('');
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onCreateCard({
      name: location,
      link: link,
    });
  }

  function handleChangeLocation(e) {
    setLocation(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }


  return (
    <PopupWithForm
      title="Новое место"
      name="edit-place"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__input-block">
        <input
          placeholder="Название"
          type="text"
          id="destination-input"
          name="destination-input"
          required=""
          minLength={2}
          maxLength={30}
          className="popup__input"
          value={location}
          onChange={handleChangeLocation}
        />
        <span className="destination-input-error popup__input-error" />
        <input
          placeholder="Ссылка на картинку"
          type="url"
          id="url-input"
          name="url-input"
          required=""
          className="popup__input"
          value={link}
          onChange={handleChangeLink}
        />
        <span className="url-input-error popup__input-error" />
      </fieldset>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
