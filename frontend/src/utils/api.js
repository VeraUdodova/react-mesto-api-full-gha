export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl
        this._headers = options.headers
    }

    _statusCheck(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }


    _get(link) {
        return fetch(`${this._baseUrl}${link}`, {
            headers: this._headers,
        })
            .then(this._statusCheck)
    }

    _save(link, method, body = []) {
        return fetch(`${this._baseUrl}${link}`, {
            method: method,
            headers: this._headers,
            body: JSON.stringify(body)
        })
            .then(this._statusCheck)
    }

    getInitialCards() {
        return this._get('/cards')
    }

    getUserInfo() {
        return this._get('/users/me')
    }

    editUserInfo(body) {
        return this._save('/users/me', 'PATCH', body)
    }

    addNewCard(body) {
        return this._save('/cards', 'POST', body)
    }

    deleteCard(cardId) {
        return this._save(`/cards/${cardId}`, 'DELETE')
    }

    addLike(cardId) {
        return this._save(`/cards/${cardId}/likes`, 'PUT')
    }

    deleteLike(cardId) {
        return this._save(`/cards/${cardId}/likes`, 'DELETE')
    }

    editAvatar(body) {
        return this._save('/users/me/avatar', 'PATCH', body)
    }
}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
    headers: {
        authorization: '9c0d462a-ebab-4e58-8ffe-ae1eb4d8348f',
        'Content-Type': 'application/json'
    }
});
