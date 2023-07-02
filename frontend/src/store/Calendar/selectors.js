import { calendareName } from "./slice";

const getCalendare = (store) => store[calendareName].calendar

export default getCalendare
