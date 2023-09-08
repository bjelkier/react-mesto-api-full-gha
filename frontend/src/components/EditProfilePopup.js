import { useState, useEffect, useContext } from 'react';
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onUpdateProfile, onClose }) {
  const currentUser = useContext(CurrentUserContext);
  const [about, setAbout] = useState('');
  const [name, setName] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setAbout(currentUser.about);
    }
  }, [currentUser, isOpen]);

  useEffect(() => {
    setIsSubmitDisabled(!name || !about);
  }, [name, about]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateProfile({
      name: name,
      about: about,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeAbout(e) {
    setAbout(e.target.value);
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={isSubmitDisabled}
    >
      <fieldset className="popup__input-block">
        <input
          placeholder="Представьтесь"
          type="text"
          id="name-input"
          name="name"
          value={name || ''}
          required=""
          minLength={2}
          maxLength={40}
          className="popup__input popup__input_name-input"
          onChange={handleChangeName}
        />
        <span className="name-input-error popup__input-error" />
        <input
          placeholder="Расскажите о себе"
          type="text"
          id="about-input"
          name="about"
          value={about || ''}
          required=""
          minLength={2}
          maxLength={200}
          className="popup__input popup__input_about-input"
          onChange={handleChangeAbout}
        />
        <span className="about-input-error popup__input-error" />
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
