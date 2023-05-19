import PopupWithForm from "./PopupWithForm";
import {useState, useEffect, useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";


function EditProfilePopup(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen])

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        props.onUpdateUser({name, about: description})
    }

    return (
        <PopupWithForm
            name="edit"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            title="Редактировать профиль">
            <div className="popup__form-field">
                <input
                    type="text"
                    id="profile-name"
                    name="form_profile_name"
                    placeholder="Введите Ваше имя"
                    className="popup__form-input popup__form-input_name_username"
                    required="required"
                    minLength="2"
                    maxLength="40"
                    value={name || ''}
                    onChange={handleChangeName}
                />
                <span className="popup__span profile-name-error"></span>
            </div>

            <div className="popup__form-field">
                <input
                    type="text"
                    id="profile-about"
                    name="form_profile_status"
                    placeholder="Введите Ваш статус"
                    className="popup__form-input popup__form-input_name_status"
                    required="required"
                    minLength="2"
                    maxLength="200"
                    value={description || ''}
                    onChange={handleChangeDescription}
                />
                <span className="popup__span profile-about-error"></span>
            </div>
        </PopupWithForm>
    )
}

export default EditProfilePopup;