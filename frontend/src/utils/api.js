const BASE_URL = 'http://api.mesto.kohanniy.nomoredomains.club';

class Api {
  constructor(url) {
    this._url = url;
  }

  _parseResponseFromServer(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards(token) {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(this._parseResponseFromServer)
  }

  getUserInfo(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
    .then(this._parseResponseFromServer)
  }

  getDataForRendered(token) {
    return Promise.all([ this.getInitialCards(token), this.getUserInfo(token) ])
  }

  addCard(data, token) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(this._parseResponseFromServer)
  }

  setUserInfo(data, token) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(this._parseResponseFromServer)
  }

  setAvatar(data, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(this._parseResponseFromServer)
  }

  deleteCard(id, token) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(this._parseResponseFromServer)
  }

  changeLikeCardStatus(id, like, token) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: like ? 'PUT' : 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    .then(this._parseResponseFromServer)
  }
}

const api = new Api(BASE_URL);

export default api;
