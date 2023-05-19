import {useState} from 'react';

const Login = ({onLogin, handleNotLoggedIn}) => {
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
        if (!formValue.email || !formValue.password){
            handleNotLoggedIn()
            return;
        }
        onLogin(formValue.email, formValue.password)
    }

    return (
        <div className="login authentication">
            <p className="login__welcome authentication__welcome">
                Вход
            </p>
            <form onSubmit={handleSubmit} className="login__form authentication__form">
                <input
                    required id="email"
                    name="email"
                    type="email"
                    className="login__form-input authentication__form-input"
                    placeholder="Email"
                    value={formValue.email}
                    onChange={handleChange}
                />
                <input
                    required id="password"
                    name="password"
                    type="password"
                    className="login__form-input authentication__form-input"
                    placeholder="Пароль"
                    value={formValue.password}
                    onChange={handleChange}
                />
                <div className="login__button-container authentication__button-container">
                    <button type="submit" className="login__link authentication__link">Войти</button>
                </div>
            </form>
        </div>
    )
}

export default Login;
