class Api {
  constructor(params) {
    this._url = params.url;
    this._headers = params.headers;
  }

  _parseResponseFromServer(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
    .then(this._parseResponseFromServer)
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
    .then(this._parseResponseFromServer)
  }

  getDataForRendered() {
    return Promise.all([ this.getInitialCards(), this.getUserInfo() ])
  }

  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(data)
    })
    .then(this._parseResponseFromServer)
  }

  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(data)
    })
    .then(this._parseResponseFromServer)
  }

  setAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(data)
    })
    .then(this._parseResponseFromServer)
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    })
    .then(this._parseResponseFromServer)
  }

  changeLikeCardStatus(id, like) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: like ? 'PUT' : 'DELETE',
      headers: this._headers,
      credentials: 'include',
    })
    .then(this._parseResponseFromServer)
  }

  register(password, email) {
    return fetch (`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({password, email})
    })
    .then(this._parseResponseFromServer)
  }

  authorize(password, email) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ password, email })
    })
    .then(this._parseResponseFromServer)
  }

  signout() {
    return fetch(`${this._url}/signout`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
  }
}

const api = new Api({
  url: 'http://api.mesto.kohanniy.nomoredomains.club',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

export default api;
