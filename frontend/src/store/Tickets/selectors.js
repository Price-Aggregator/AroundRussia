import { ticketsName } from "./slice";

const getTickets = (store) => store[ticketsName].tickets

export default getTickets
