import successImage from "../images/success.svg";
import failImage from "../images/fail.svg";

function InfoTooltip({ isOpen, onClose, result }) {

  return (
    <div className={`popup popup_info-tooltip ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
        <div className="popup__result" style={result ? { backgroundImage: `url(${successImage})` } : { backgroundImage: `url(${failImage})` }} />
        <h3 className="popup__heading popup__heading_type_info-tooltip">{result ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h3>
      </div>
    </div>
  )
}

export default InfoTooltip;
