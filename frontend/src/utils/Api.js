class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers
    this._baseUrl = baseUrl
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      credentials: 'same-origin',
    }).then(this._getResponseData)
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      credentials: 'same-origin',
    }).then(this._getResponseData)
  }

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'same-origin',
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(this._getResponseData)
  }

  updateUserPic(avatarLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'same-origin',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink
      })
    }).then(this._getResponseData)
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    }).then(this._getResponseData)
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      credentials: 'same-origin',
      method: 'DELETE',
      headers: this._headers
    }).then(this._getResponseData)
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: this._headers
    }).then(this._getResponseData)
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      credentials: 'same-origin',
      headers: this._headers
    }).then(this._getResponseData)
  }
}

export const api = new Api({
  baseUrl: 'https://api.bjelkier.nomoredomainsicu.ru',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default Api;
