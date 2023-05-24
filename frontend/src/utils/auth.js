import {Api} from "./api.js";

class AuthApi extends Api {
    signIn(body) {
        return this._save('/signin', 'POST', body)
    }

    signUp(body) {
        return this._save('/signup', 'POST', body)
    }

    userInfo(token) {
        this._headers['Authorization'] = `Bearer ${token}`
        return this._get('/users/me')
    }
}

const auth = new AuthApi({
    baseUrl: 'https://vera-backend.nomoredomains.rocks',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default auth;
