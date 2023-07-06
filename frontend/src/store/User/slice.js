import { createSlice } from '@reduxjs/toolkit';

export const userName = 'user'

const initialState = {
  isAuthenticated: false,
  user: '',
  token: '',
  email: ''
}

const userSlice = createSlice({
  name: userName,
  initialState,
  reducers: {
    // dev
    noAuth: (state) => ({
      ...state,
      isAuthenticated: false
    }),
    // dev
    yesAuth: (state) => ({
      ...state,
      isAuthenticated: true
    })
  }
})

export const { noAuth, yesAuth } = userSlice.actions
export const userReducer = userSlice.reducer
