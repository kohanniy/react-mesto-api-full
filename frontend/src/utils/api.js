class Api {
  constructor({ url, token, groupId }) {
    this._url = url;
    this._token = token;
    this._groupId = groupId;
  }

  _parseResponseFromServer(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._url}/${this._groupId}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
    .then(this._parseResponseFromServer)
  }

  getUserInfo() {
    return fetch(`${this._url}/${this._groupId}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
    .then(this._parseResponseFromServer)
  }

  getDataForRendered() {
    return Promise.all([ this.getInitialCards(), this.getUserInfo() ])
  }

  addCard(data) {
    return fetch(`${this._url}/${this._groupId}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(this._parseResponseFromServer)
  }

  setUserInfo(data) {
    return fetch(`${this._url}/${this._groupId}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(this._parseResponseFromServer)
  }

  setAvatar(data) {
    return fetch(`${this._url}/${this._groupId}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(this._parseResponseFromServer)
  }

  deleteCard(id) {
    return fetch(`${this._url}/${this._groupId}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(this._parseResponseFromServer)
  }

  changeLikeCardStatus(id, like) {
    return fetch(`${this._url}/${this._groupId}/cards/likes/${id}`, {
      method: like ? 'PUT' : 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(this._parseResponseFromServer)
  }
}

const api = new Api({
  url: `https://mesto.nomoreparties.co/v1`,
  token: `1282f84b-7da3-48cb-b9e7-a66ba2d4bc54`,
  groupId: `cohort-16`
});

export default api;
