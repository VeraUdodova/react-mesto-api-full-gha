function PopupWithForm(props) {
    return (
        <div className={`popup popup-${props.name}-block ${props.isOpen && 'popup_opened'}`}>
            <div className={`popup__container popup__${props.name}-container`}>
                <button
                    type="button"
                    onClick={props.onClose}
                    className={`popup__close popup__${props.name}-close`}>
                </button>
                <form
                    name={`form_${props.name}`}
                    className={`popup__form popup__${props.name}-form`}
                    onSubmit={props.onSubmit}
                    noValidate>
                    <p className={`popup__target popup__${props.name}-text`}>
                        {props.title}
                    </p>
                    {props.children}
                    <button className={`popup__form-save popup__${props.name}-button`}
                            type="submit">
                        {props.buttonText || 'Сохранить'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;