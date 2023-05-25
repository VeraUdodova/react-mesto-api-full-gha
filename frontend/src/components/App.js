import {useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import Header from './Header.js'
import Footer from './Footer.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import {api} from '../utils/api.js';
import auth from '../utils/auth.js'
import {catchError} from '../utils/utils.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ProtectedRouteElement from './ProtectedRoute.js';
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";


function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [successOperation, setSuccessOperation] = useState(false)
    const [selectedCard, setSelectedCard] = useState({})
    const [currentUser, setCurrentUser] = useState({})
    const [cards, setCards] = useState([])
    const [email, setEmail] = useState('')

    const navigate = useNavigate()

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
    }

    function handleCardClick(card) {
        setSelectedCard(card)
    }

    function addNewCard(newCard) {
        setCards(cards.map(card => card._id === newCard._id ? newCard : card))
    }

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(like => like._id === currentUser._id)

        if (isLiked) {
            api.deleteLike(card._id).then((newCard) => {
                addNewCard(newCard)
            }).catch(catchError)
        } else {
            api.addLike(card._id).then((newCard) => {
                addNewCard(newCard)
            }).catch(catchError)
        }
    }

    function handleCardDelete(card) {
        const isOwn = card.owner._id === currentUser._id;

        if (isOwn) {
            api.deleteCard(card._id).then(() => {
                setCards(cards.filter(c => c._id !== card._id))
            }).catch(catchError)
        }
    }

    function handleUpdateUser(user) {
        api.editUserInfo(user).then((newUser) => {
            setCurrentUser(newUser)
            closeAllPopups()
        }).catch(catchError)
    }

    function handleUpdateAvatar(avatar) {
        api.editAvatar(avatar).then((newUser) => {
            setCurrentUser(newUser)
            closeAllPopups()
        }).catch(catchError)
    }

    function handleAddPlaceSubmit(card) {
        api.addNewCard(card).then((newCard) => {
            setCards([newCard, ...cards])
            closeAllPopups()
        }).catch(catchError)
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsEditProfilePopupOpen(false)
        setIsInfoTooltipOpen(false)
        setSelectedCard({})
    }

    const handleTokenCheck = () => {
        const token = localStorage.getItem('token')
        if (token) {
            auth.userInfo(token).then((user) => {
                if (user.data._id) {
                    setEmail(user.data.email)
                    setLoggedIn(true)
                    loadInitialData()
                    navigate('/', {replace: true})
                } else {
                    handleLogOut()
                }
            }).catch((err) => {
                handleLogOut()
                catchError(err)
            })
        }
    }

    function loadInitialData() {
        api.getUserInfo()
            .then((user) => {
                setCurrentUser(user)
                api.getInitialCards().then((_cards) => {
                    setCards(_cards)
                }).catch(catchError)
            }).catch(catchError)
    }

    useEffect(() => {
        handleTokenCheck();
    }, [])

    function handleRegistration(result) {
        setSuccessOperation(result)
        setIsInfoTooltipOpen(true)
    }

    const handleLogin = (token, email) => {
        localStorage.setItem('token', token)
        setEmail(email)
        setLoggedIn(true)
        navigate('/', {replace: true})
        handleTokenCheck()
    }

    const handleNotLoggedIn = () => {
        setSuccessOperation(false)
        setIsInfoTooltipOpen(true)
    }

    function handleLogOut() {
        localStorage.removeItem('token')
        setEmail('')
        setLoggedIn(false)
        setEmail('')
        navigate('/sign-in', {replace: true})
    }

    const onLogin = (email, password) => {
        auth.signIn({email: email, password: password})
            .then((data) => {
                data.token ?
                    handleLogin(data.token, email) :
                    handleNotLoggedIn()
            })
            .catch((err) => {
                catchError(err)
                handleNotLoggedIn()
            });
    }

    const onRegister = (email, password) => {
        auth.signUp({email: email, password: password}).then((data) => {
            handleRegistration(!!data)
        }).catch((err) => {
            catchError(err)
            handleRegistration(false)
        })
    }

    return (
        <div className="App">
            <CurrentUserContext.Provider value={currentUser}>
                <Header loggedIn={loggedIn} email={email} handleLogOut={handleLogOut}/>
                <Routes>
                    <Route path="/" element={
                        <ProtectedRouteElement
                            element={Main}
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onEditAvatar={handleEditAvatarClick}
                            onCardClick={handleCardClick}
                            onCardLike={handleCardLike}
                            onCardDelete={handleCardDelete}
                            cards={cards}
                            loggedIn={loggedIn}
                        />
                    }

                    />
                    <Route path="/sign-in" element={<Login onLogin={onLogin} handleNotLoggedIn={handleNotLoggedIn}/>}/>
                    <Route path="/sign-up" element={<Register onRegister={onRegister} handleRegistration={handleRegistration}/>}/>
                </Routes>
                <Footer/>

                <InfoTooltip
                    isOpen={isInfoTooltipOpen}
                    onClose={closeAllPopups}
                    name="info"
                    success={successOperation}
                />

                {/*Попап для редактирования профиля*/}
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />

                {/*Попап для добавления фото*/}
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />

                {/*Попап предупреждения удаления карточки*/}
                <PopupWithForm
                    name="warning"
                    onClose={closeAllPopups}
                    buttonText="Да"
                    title="Вы уверены?"/>

                {/*Обновление аватарки*/}
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />

                {/*Попап для просмотра увеличенных фото*/}
                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
