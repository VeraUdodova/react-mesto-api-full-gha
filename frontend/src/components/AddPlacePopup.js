import PopupWithForm from "./PopupWithForm";
import {useState, useEffect} from "react";

function AddPlacePopup(props) {
    const [name, setName] = useState('')
    const [link, setLink] = useState('')

    useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen])

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeUrl(e) {
        setLink(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        props.onAddPlace({name, link})
    }

    return (
        <PopupWithForm
            name="add"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            buttonText="Создать"
            title="Новое место">
            <div className="popup__form-field">
                <input
                    type="text"
                    id="new-photo-name"
                    name="form_place_name"
                    placeholder="Название"
                    className="popup__form-input popup__form-input_name_new-pic-title"
                    required
                    minLength="2"
                    maxLength="30"
                    value={name || ''}
                    onChange={handleChangeName}
                />
                <span className="popup__span new-photo-name-error"></span>
            </div>

            <div className="popup__form-field">
                <input
                    type="link"
                    id="new-photo-link"
                    name="form_place_url"
                    placeholder="Ссылка на картинку"
                    className="popup__form-input popup__form-input_name_new-pic-link"
                    required
                    value={link || ''}
                    onChange={handleChangeUrl}
                />
                <span className="popup__span new-photo-link-error"></span>
            </div>
        </PopupWithForm>
    )
}

export default AddPlacePopup;