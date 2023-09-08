import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef(null);

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="edit-userpic"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        placeholder="Ссылка на ваш будущий юзерпик"
        type="url"
        id="userpic-input"
        name="avatar"
        required=""
        className="popup__input"
        ref={avatarRef}
      />
      <span className="userpic-input-error popup__input-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
