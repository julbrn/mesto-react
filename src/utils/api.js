import {token, server} from './constants';

class Api {
  constructor({serverUrl, headers}) {
    this._headers = headers;
    this._serverUrl = serverUrl;
  }
  /**проверяем ответ сервера*/
  _checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  /**получаем карточки с сервера*/
  downloadInitialCards() {
    return fetch(`${this._serverUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(this._checkServerResponse);
  }

  /** загружаем новую карточку*/
  uploadCard(data) {
    return fetch(`${this._serverUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._checkServerResponse);
  }

  /** удаляем карточку*/
  deleteCardfromServer(id) {
    return fetch(`${this._serverUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkServerResponse);
  }

  /** передаем лайк на сервер*/
  sendCardLike(data) {
    return fetch(`${this._serverUrl}/cards/${data._id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(this._checkServerResponse);
  }

  /** убираем поставленный лайк с сервера*/
  deleteCardLike(data) {
    return fetch(`${this._serverUrl}/cards/likes/${data._id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._checkServerResponse)
  }

  /**загружаем информацию о юзере с сервера */
  downloadUserInfo() {
    return fetch(`${this._serverUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkServerResponse);
  }

  /**отправляем новую информацию о юзере на сервер */
  uploadUserInfo(userData) {
    return fetch(`${this._serverUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.profileName,
        about: userData.profileInfo
      })
    })
      .then(this._checkServerResponse);
  }

  /**меняем аватарку */
  editAvatar(data) {
    return fetch (`${this._serverUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatarLink
      })
    })
      .then(this._checkServerResponse);
  }
}

const api = new Api({
  serverUrl: server,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
});

export default api;
