/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
export class Api {
  constructor(settings) {
    this._address = settings.baseUrl;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getCities() {
    return fetch(`http://127.0.0.1:8000/api/v1/cities/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => this._getResponseData(res));
  }

  addDataTicket(from, to, when, whenReturn) {
    return fetch(`http://127.0.0.1:8000/api/v1/airline/`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        origin: from,
        destination:to,
        departure_at:when,
        return_at:whenReturn,
        sorting: "price",
        direct: "false",
        unique: "false"
      }),
    }).then((res) =>
       this._getResponseData(res));
  }


}

const api = new Api({
  baseUrl: "http://127.0.0.1:8000/api/v1",
});

export { api };
