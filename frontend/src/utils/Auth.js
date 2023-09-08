class Auth {
  constructor() {
    this._baseUrl = 'http://localhost:5000';
    this._headers = {
      'Content-Type': 'application/json'
    }
  }

  _checkResponse = (res) => {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка.....: ${res.status}`)
    };
  };

  register(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        "password": password,
        "email": email,
      })
    }).then(this._checkResponse);
  }

  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        "password": password,
        "email": email,
      })
    }).then(this._checkResponse);
  }

  checkToken() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: { ...this._headers, },
      credentials: 'include'
    }).then(this._checkResponse);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Auth();
