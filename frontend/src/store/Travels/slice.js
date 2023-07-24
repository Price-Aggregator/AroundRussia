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
        "price": data.price,
        "media": null,
        "address": data.address,
        "origin": null,
        "destination": null
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

/*
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const travelsName = 'travels';

const initialState = {
  travels: JSON.parse(localStorage.getItem('travels')) || [],
};

const AUTH_TOKEN = 'Bearer 74425849ec7ecfbe3bd0cc02980f81a9ac3a6873';

// Асинхронный action creator для получения списка путешествий с сервера
export const fetchTravels = createAsyncThunk('travels/fetchTravels', async () => {
  const response = await fetch('/api/v1/travels/', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': AUTH_TOKEN,
    },
  });

  const data = await response.json();
  return data;
});

// Асинхронный action creator для добавления нового путешествия на сервер
export const addTravel = createAsyncThunk('travels/addTravel', async (newTravel) => {
  const response = await fetch('/api/v1/travels/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': AUTH_TOKEN,
    },
    body: JSON.stringify(newTravel),
  });

  const data = await response.json();
  return data;
});

// Асинхронный action creator для редактирования путешествия на сервере
export const editTravel = createAsyncThunk('travels/editTravel', async ({ id, data }) => {
  const response = await fetch(`/api/v1/travels/${id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': AUTH_TOKEN,
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();
  return { id, data: responseData };
});

// Асинхронный action creator для удаления путешествия на сервере
export const removeTravel = createAsyncThunk('travels/removeTravel', async (travelId) => {
  await fetch(`/api/v1/travels/${travelId}/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': AUTH_TOKEN,
    },
  });

  return travelId;
});

const travelsSlice = createSlice({
  name: travelsName,
  initialState,
  reducers: {
    setTravels: (state, action) => {
      state.travels = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Обработка успешного получения списка путешествий
    builder.addCase(fetchTravels.fulfilled, (state, action) => {
      state.travels = action.payload;
    });

    // Обработка успешного добавления нового путешествия
    builder.addCase(addTravel.fulfilled, (state, action) => {
      state.travels = [action.payload, ...state.travels];
    });

    // Обработка успешного редактирования путешествия
    builder.addCase(editTravel.fulfilled, (state, action) => {
      const { id, data } = action.payload;
      state.travels = state.travels.map((travel) => (travel.id === id ? { ...travel, ...data } : travel));
    });

    // Обработка успешного удаления путешествия
    builder.addCase(removeTravel.fulfilled, (state, action) => {
      const travelId = action.payload;
      state.travels = state.travels.filter((travel) => travel.id !== travelId);
    });
  },
});

export const { setTravels } = travelsSlice.actions;
export const travelsReducer = travelsSlice.reducer;
*/
