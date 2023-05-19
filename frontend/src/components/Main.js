import {useContext} from 'react';
import Card from './Card.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function Main(props) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <>
            <section className="profile">
                <div
                    className="profile__photo-block"
                    onClick={props.onEditAvatar}>
                    <img
                        className="profile__photo"
                        src={currentUser.avatar}
                        alt={currentUser.name}/>
                </div>
                <div className="profile__info">
                    <div className="profile__edit">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button
                            className="profile__edit-button"
                            type="button"
                            onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile__subtitle">{currentUser.about}</p>
                </div>
                <button
                    className="profile__add-photo-button"
                    type="button"
                    onClick={props.onAddPlace}></button>
            </section>

            {/*Загруженные фотографии -> делается через JS*/}
            <section className="elements">
                {props.cards.map((card, i) => (
                    <Card
                        key={card._id}
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}
                        card={card}/>
                ))}
            </section>
        </>
    )
}

export default Main;