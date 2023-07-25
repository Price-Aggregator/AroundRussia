const generateUniqueKey = () => Math.random().toString(36).substring(2, 9);

function createTicketsFetchObj({
	from,
	to,
	when,
	whenReturn,
	sortingMode,
	isDirect,
}) {
	return {
		origin: from,
		destination: to,
		departure_at: when,
		return_at: whenReturn,
		sorting: sortingMode,
		direct: isDirect,
		unique: 'false',
	};
}
// eslint-disable-next-line
const noReturn = ({ return_at, ...rest }) => rest;

// функция для трансформации date в нужный беку формат
function formatDate(date) {
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
	const formattedDay = day < 10 ? `0${day}` : day;
	const formattedMonth = month < 10 ? `0${month}` : month;
	return `${year}-${formattedMonth}-${formattedDay}`;
}



export { generateUniqueKey, createTicketsFetchObj, noReturn, formatDate };
