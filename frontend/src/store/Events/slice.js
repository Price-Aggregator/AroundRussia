import { createSlice } from '@reduxjs/toolkit';

export const eventsName = 'events';

const initialState = {
	events: JSON.parse(localStorage.getItem('events')),
};


const eventsSlice = createSlice({
	name: eventsName,
	initialState,
	reducers: {
		setEvents: (state, action) => ({
			...state,
			events: action.payload,
		}),
		addEvent: (state, action) => ({
			...state,
			events: [action.payload, ...state.events],
		}),
		// editEvent: (state, action) => {
		// 	const { id, data } = action.payload;
		// 	events = state.map((event) =>
		// 		event.id === id ? { ...event, ...data } : event
		// 	);
		// },
		// removeEvent: (state, action) => {
		// 	const eventId = action.payload;
		// 	events = state.filter((event) => event.id !== eventId);
		// },
	},
});

export const { setEvents, addEvent } = eventsSlice.actions;
export const eventsReducer = eventsSlice.reducer;
