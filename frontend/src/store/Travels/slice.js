/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../utils/constants';
import checkResponse from '../../utils/check-response';

export const travelsName = 'travels';

const initialState = {
  travels: [],
};

// Асинхронный action creator для добавления нового путешествия на сервер
export const fetchNewTravel = createAsyncThunk(
  `${travelsName}/newTravels`,
  async ({ newTravel, token }) => {
    const images = newTravel.images.length > 0 ? newTravel.images : [];
    const res = await fetch(`${BASE_URL}/travels/`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newTravel.name,
        description: newTravel.description,
        start_date: newTravel.start_date,
        end_date: newTravel.end_date,
        images,
      }),
    }).then(checkResponse);
    return res;
  }
);

// Асинхронный action creator для получения списка путешествий с сервера
export const fetchTravels = createAsyncThunk(
  `${travelsName}/allTravels`,
  async (token) => {
    const res = await fetch(`${BASE_URL}/travels`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(checkResponse);
    return res;
  }
);

// Асинхронный action creator для удаления путешествия на сервере
export const fetchRemoveTravel = createAsyncThunk(
  `${travelsName}/removeTravel`,
  async ({ cardId, token }) => {
    const del = await fetch(`${BASE_URL}/travels/${cardId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.ok) {
        return cardId;
      }
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    });
    return del;
  }
);

export const fetchEditTravel = createAsyncThunk(
  `${travelsName}/changeTravel`,
  async ({ cardId, data, token }) => {
    const editedTravel = await fetch(`${BASE_URL}/travels/${cardId}/`, {
      method: 'PATCH',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        description: data.description,
        start_date: data.start_date,
        end_date: data.end_date,
        // images: travelData.images,
      }),
    }).then((res) => {
      if (res.ok) {
        return cardId;
      }
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    });
    return editedTravel;
  }
);

export const fetchRemoveEvent = createAsyncThunk(
  `${travelsName}/removeEvent`,
  async ({ eventId, token }) => {
    const deleted = await fetch(`${BASE_URL}/activity/${eventId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.ok) {
        return eventId;
      }
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    });
    return deleted;
  }
);

export const fetchAddEvent = createAsyncThunk(
  `${travelsName}/addEvent`,
  async ({ travelId, token, data }) => {
    const event = await fetch(`${BASE_URL}/activity/`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "travel": travelId,
        "name": data.eventName,
        "category": data.category,
        "date": data.startDate,
        "time": data.startTime,
        "price": data.price || 0,
        "medias": [],
        "address": data.address,
        "origin": data.origin || null,
        "destination": data.destination || null,
        "description": data.description
      })
    }).then((res) => {
      if (res.ok) {
        return travelId;
      }
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    });
    return event
  }
)

export const fetchPatchEvent = createAsyncThunk(
  `${travelsName}/editEvent`,
  async ({ travelId, token, data, eventId }) => {
    const event = await fetch(`${BASE_URL}/activity/${eventId}/`, {
      method: 'PUT',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "travel": travelId,
        "name": data.eventName,
        "category": data.category,
        "date": data.startDate,
        "time": data.startTime,
        "price": data.price,
        "medias": [],
        "address": data.address,
        "origin": data.origin || null,
        "destination": data.destination || null,
        "description": data.description
      })
    })
      .then((res) => {
        if (res.ok) {
          return travelId;
        }
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
      });
    return event
  }
)

const travelsSlice = createSlice({
  name: travelsName,
  initialState,
  reducers: {
    setTravels: (state, action) => ({
      ...state,
      travels: action.payload,
    }),
    addTravel: (state, action) => ({
      ...state,
      travels: [action.payload, ...state.travels],
    }),
    /* editTravel: (state, action) => {
      const { id, data } = action.payload;
      state.travels = state.travels.map((travel) =>
        travel.id === id ? { ...travel, ...data } : travel
      );
    }, */
    removeTravel: (state, action) => {
      const travelId = action.payload;
      state.travels = state.travels.filter((travel) => travel.id !== travelId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewTravel.fulfilled, (state, action) => ({
        ...state,
        travels: [...state.travels, action.payload],
      }))
      .addCase(fetchTravels.fulfilled, (state, action) => ({
        ...state,
        travels: action.payload,
      }))
      .addCase(fetchRemoveTravel.fulfilled, (state, action) => ({
        ...state,
        travels: [...state.travels].filter(
          (travel) => travel.id !== action.payload
        ),
      }))
      .addCase(fetchEditTravel.fulfilled, (state, action) => {
        const editedTravel = action.payload;
        state.travels = state.travels.map((travel) =>
          travel.id === editedTravel.id ? editedTravel : travel
        );
      });
  },
});

export const { setTravels, addTravel, editTravel, removeTravel } =
  travelsSlice.actions;
export const travelsReducer = travelsSlice.reducer;

