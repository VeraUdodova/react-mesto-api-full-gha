import {Link, useNavigate, Routes, Route} from 'react-router-dom';

function Header(props) {
    const navigate = useNavigate();

    function logOut() {
        props.handleLogOut()
        navigate('/sign-in', {replace: true})
    }

    return (
        <header className="header">
            <div className="logo"></div>
            <div className="header__menu">
                {props.loggedIn ?
                    <>
                        <div className="header__email">{props.email}</div>
                        <button onClick={logOut} className="header__button">Выйти</button>
                    </>
                 :
                 <>
                     <Routes>
                         <Route path="/sign-up" element={<Link to="/sign-in" className="header__link">Войти</Link>} />
                         <Route path="/sign-in" element={<Link to="/sign-up" className="header__link">Регистрация</Link>} />
                     </Routes>
                 </>
                }
            </div>
        </header>
    )
}

export default Header;