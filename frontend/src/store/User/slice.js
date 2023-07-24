/*  eslint no-param-reassign: ["error", { "props": false }] */
import { createSlice } from '@reduxjs/toolkit';

export const userName = 'user';

const initialState = {
	isAuthenticated: false,
	token: '',
	email: '',
};
const userSlice = createSlice({
	name: userName,
	initialState,
	reducers: {
		setUserEmail(state, action) {
			state.email = action.payload.email;
		},
		setUserToken(state, action) {
			state.token = action.payload.token;
		},
		removeUser(state) {
			state.email = null;
			state.token = null;
			state.id = null;
		},
		noAuth: (state) => ({
			...state,
			isAuthenticated: false,
		}),
		yesAuth: (state) => ({
			...state,
			isAuthenticated: true,
		}),
	},
});

export const { noAuth, yesAuth, setUserEmail, setUserToken, removeUser } =
	userSlice.actions;
export const userReducer = userSlice.reducer;
