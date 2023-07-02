/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import { BASE_URL } from './constants';

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
		return fetch(`${this._address}/cities`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((res) => this._getResponseData(res));
	}

	addDataTicket(from, to, when, whenReturn, sortingMode, isDirect) {
		return fetch(`${this._address}/airline`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				origin: from,
				destination: to,
				departure_at: when,
				return_at: whenReturn,
				sorting: sortingMode,
				direct: isDirect,
				unique: 'false',
			}),
		}).then((res) => this._getResponseData(res));
	}

	getCitiesId(value) {
		return fetch(`${this._address}/cities/?search=${value}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((res) => this._getResponseData(res));
	}
}
const api = new Api({
	baseUrl: BASE_URL,
});

export { api };
