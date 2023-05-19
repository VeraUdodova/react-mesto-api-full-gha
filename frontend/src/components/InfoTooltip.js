function InfoTooltip(props) {
    const classContainer = props.success ? 'popup__success' : 'popup__failure';
    return (
        <div className={`popup popup-${props.name}-block ${props.isOpen && 'popup_opened'}`}>
            <div className={`popup__container popup__${props.name}-container`}>
                <button
                    type="button"
                    onClick={props.onClose}
                    className={`popup__close popup__${props.name}-close`}>
                </button>
                <div className={classContainer}>
                    <div className={`${classContainer}-image`}></div>
                    <p className='popup__auth-text'>
                        {
                            props.success ?
                            'Вы успешно зарегистрировались' :
                            'Что-то пошло не так! Попробуйте еще раз'
                        }
                    </p>
                </div>
            </div>
        </div>
    )
}

export default InfoTooltip;