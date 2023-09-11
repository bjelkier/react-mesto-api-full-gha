class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse = (res) => {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    };
  };

  getProfile() {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers,
      credentials: 'include',
    })
      .then(this._checkResponse);
  };

  getCards() {
    return fetch(this._baseUrl + '/cards ', {
      headers: this._headers,
      credentials: 'include',
    })
      .then(this._checkResponse);
  };

  editProfile(name, about) {
    return fetch(this._baseUrl + '/users/me', {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(this._checkResponse);
  };

  addCard(data) {
    return fetch(this._baseUrl + '/cards', {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._checkResponse);
  };

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      credentials: 'include',
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._checkResponse);
  };

  changeLikeCardStatus(CardId, isLiked) {
    return isLiked ? this.dislikeCard(CardId) : this.likeCard(CardId);
  }

  addLike(CardId) {
    return fetch(`${this._baseUrl}/cards/${CardId}/likes`, {
      method: "PUT",
      credentials: 'include',
      headers: this._headers,
    })
      .then(this._checkResponse);
  };

  deleteLike(CardId) {
    return fetch(`${this._baseUrl}/cards/${CardId}/likes`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers,
    })
      .then(this._checkResponse);
  };

  updateUserPic(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(this._checkResponse);
  };
}

export const api = new Api({
  baseUrl: 'https://api.bjelkier.nomoredomainsicu.ru',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default Api;
