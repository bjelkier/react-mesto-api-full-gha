function PopupWithForm({ title, name, isOpen, onClose, children, onSubmit, isSubmitDisabled }) {

  return (
    <div className={`popup ${name}-popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" onClick={onClose} />
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          <h2 className="popup__heading">{title}</h2>
          {children}
          <button className={`popup__submit-button ${isSubmitDisabled ? "popup__submit-button_disabled" : ""}`} type="submit" disabled={isSubmitDisabled}>
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
