class Api {
  constructor({ url }) {
    this._url = url;
  }

  _parseResponseFromServer(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res);
  }

  getInitialCards(token) {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    .then(this._parseResponseFromServer)
  }

  getUserInfo(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`
      }
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
        authorization: `Bearer ${token}`,
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
        authorization: `Bearer ${token}`,
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
        authorization: `Bearer ${token}`,
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
        authorization: `Bearer ${token}`
      }
    })
    .then(this._parseResponseFromServer)
  }

  changeLikeCardStatus(id, like, token) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: like ? 'PUT' : 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(this._parseResponseFromServer)
  }

  register(password, email) {
    return fetch (`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password, email})
    })
    .then(this._parseResponseFromServer)
  };

  authorize(password, email) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password, email })
    })
    .then(this._parseResponseFromServer)
  }

  getContent(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      }
    })
    .then(this._parseResponseFromServer)
  }
}

const api = new Api({
  url: `https://api.mesto.kohanniy.nomoredomains.club`,
});

export default api;
