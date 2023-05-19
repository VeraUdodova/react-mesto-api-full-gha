import {useState} from 'react';
import {Link} from 'react-router-dom';

const Register = ({onRegister, handleRegistration}) => {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formValue.password && formValue.email){
            onRegister(formValue.email, formValue.password)
        } else {
            handleRegistration(false)
        }
    }

    return (
        <div className="register authentication">
            <p className="register__welcome authentication__welcome">
                Регистрация
            </p>
            <form onSubmit={handleSubmit} className="register__form authentication__form">
                <input
                    id="email"
                    name="email"
                    type="email"
                    className="register__form-input authentication__form-input"
                    placeholder="Email"
                    value={formValue.email}
                    onChange={handleChange}
                />
                <input
                    id="password"
                    name="password"
                    type="password"
                    className="register__form-input authentication__form-input"
                    placeholder="Пароль"
                    value={formValue.password}
                    onChange={handleChange}
                />
                <div className="register__button-container authentication__button-container">
                    <button type="submit" className="register__link authentication__link">Зарегистрироваться</button>
                </div>
            </form>
            <div className="register__signin authentication__signin">
                Уже зарегистрированы?
                <Link to="/sign-in" className="register__login-link">Войти</Link>
            </div>
        </div>
    );
}

export default Register;