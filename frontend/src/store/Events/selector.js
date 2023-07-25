import { eventsName } from "./slice";

const getEvents = (store) => store[eventsName]

export default getEvents
