import PopupWithForm from "./PopupWithForm";
import {useRef} from "react";

function EditAvatarPopup(props) {
    const avatarRef = useRef()

    function handleSubmit(e) {
        e.preventDefault()
        props.onUpdateAvatar({avatar: avatarRef.current.value})
    }

    return (
        <PopupWithForm
            name="avatar"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            title="Обновить аватар">
            <div className="popup__form-field">
                <input
                    type="link"
                    id="new-avatar-link"
                    name="form_avatar_url"
                    placeholder="Ссылка на новую аватарку"
                    className="popup__form-input popup__form-input_new-avatar-link"
                    required
                    ref={avatarRef}
                />
                <span className="popup__span new-avatar-link-error"></span>
            </div>
        </PopupWithForm>

    )
}

export default EditAvatarPopup;