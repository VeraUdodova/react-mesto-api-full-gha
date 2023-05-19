function ImagePopup(props) {
    return (
        <div
            className={`popup popup-fullsize-pic-block ${props.card._id && 'popup_opened'}`}>
            <div className="popup__fullsize-pic-container">
                <button
                    type="button"
                    onClick={props.onClose}
                    className="popup__fullsize-pic-close popup__close"></button>
                <img
                    className="popup__fullsize-pic-image"
                    src={props.card?.link}
                    alt={props.card?.name} />
                <h2 className="popup__fullsize-pic-title">
                    {props.card?.name}
                </h2>
            </div>
        </div>
    )
}

export default ImagePopup;