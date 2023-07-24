import checkResponse from './check-response';
import { BASE_URL } from './constants';

export const register = (email, password) =>
	fetch(`${BASE_URL}/users/`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	}).then((res) => checkResponse(res));

export const authorize = (email, password) =>
	fetch(`${BASE_URL}/auth/token/login/`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	}).then((res) => checkResponse(res));

export const resetPassword = (email) =>
	fetch(`${BASE_URL}/users/reset_password/`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email }),
	}).then((res) => checkResponse(res));

export const resetPasswordConfirm = (id, userToken, newPassword) =>
	fetch(`${BASE_URL}/users/reset_password_confirm/`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			uid: id,
			token: userToken,
			new_password: newPassword,
		}),
	}).then((res) => checkResponse(res));
