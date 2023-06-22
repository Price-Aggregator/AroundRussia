const generateUniqueKey = () => Math.random().toString(36).substring(2, 9);

function createTicketsFetchObj({ from, to, when, whenReturn, sorting = 'price' }) {
  return {
    origin: from,
    destination: to,
    departure_at: when,
    return_at: whenReturn,
    sorting,
    direct: "false",
    unique: "false"
  }
}
// eslint-disable-next-line
const noReturn = ({ return_at, ...rest }) => rest

export { generateUniqueKey, createTicketsFetchObj, noReturn }
