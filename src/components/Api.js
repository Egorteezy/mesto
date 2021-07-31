export default class Api {
    constructor({url, headers}) {
        this._url = url
        this._headers = headers;
    }

    _checkPromiseStatus(res) {
        if(res.ok) {
            return res.json()
        } else {
        return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, { headers:this._headers })
        .then((res) => this._checkPromiseStatus(res))
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, { headers:this._headers })
    .then(res => this._checkPromiseStatus(res))
    }

    patchUserInfo({name, about}) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify ({name, about})
        })
        .then((res) => this._checkPromiseStatus(res))
    }

    postNewCard({name, link}) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({name, link})
        })
        .then((res) => this._checkPromiseStatus(res))
    }

    putLikeCards(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: "PUT",
            headers: this._headers})
            .then((res) => this._checkPromiseStatus(res))
        }

    removeLikeCards(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: "DELETE",
            headers: this._headers})
            .then((res) => this._checkPromiseStatus(res))
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers})
            .then((res) => this._checkPromiseStatus(res))
    }

    changeAvatar({link}) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify ({avatar: link})
        })
            .then((res) => this._checkPromiseStatus(res))
    }
}
