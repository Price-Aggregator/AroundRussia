// import { urals, s7 } from '../images/avia-company';

// const BASE_URL = 'http://62.84.115.87/api/v1'
// const BASE_URL = 'http://127.0.0.1:8000/api/v1'
const BASE_URL = 'http://localhost/api/v1';

const TICKETS_ON_PAGE = 3;

// const tickets = [
//   {
//     origin: "MOW",
//     id: 1,
//     destination: "LED",
//     origin_airport: "SVO",
//     destination_airport: "LED",
//     price: 5939,
//     airline: "SU",
//     flight_number: "46",
//     departure_at: "2023-08-15T00:50:00+03:00",
//     return_at: "2023-09-05T06:00:00+03:00",
//     transfers: 0,
//     return_transfers: 0,
//     duration: 175,
//     duration_to: 80,
//     duration_back: 95,
//     link: "/search/MOW1508LED05091?t=SU16920498001692054600000080SVOLED16938828001693888500000095LEDVKO_0c085cf3cb7602a633cee36da1ce936b_5968&search_date=18062023&expected_price_uuid=81acb405-a41f-4f0e-976c-a80867ad7c4f&expected_price_source=share&expected_price_currency=rub&expected_price=5939"
//   },
//   {
//     origin: "MOW",
//     id: 2,
//     destination: "LED",
//     origin_airport: "SVO",
//     destination_airport: "LED",
//     price: 5939,
//     airline: "SU",
//     flight_number: "46",
//     departure_at: "2023-08-15T00:50:00+03:00",
//     return_at: "2023-09-05T06:00:00+03:00",
//     transfers: 0,
//     return_transfers: 0,
//     duration: 175,
//     duration_to: 80,
//     duration_back: 95,
//     link: "/search/MOW1508LED05091?t=SU16920498001692054600000080SVOLED16938828001693888500000095LEDVKO_0c085cf3cb7602a633cee36da1ce936b_5968&search_date=18062023&expected_price_uuid=81acb405-a41f-4f0e-976c-a80867ad7c4f&expected_price_source=share&expected_price_currency=rub&expected_price=5939"
//   },
//   {
//     origin: "MOW",
//     id: 3,
//     destination: "LED",
//     origin_airport: "SVO",
//     destination_airport: "LED",
//     price: 5939,
//     airline: "SU",
//     flight_number: "46",
//     departure_at: "2023-08-15T00:50:00+03:00",
//     return_at: "2023-09-05T06:00:00+03:00",
//     transfers: 0,
//     return_transfers: 0,
//     duration: 175,
//     duration_to: 80,
//     duration_back: 95,
//     link: "/search/MOW1508LED05091?t=SU16920498001692054600000080SVOLED16938828001693888500000095LEDVKO_0c085cf3cb7602a633cee36da1ce936b_5968&search_date=18062023&expected_price_uuid=81acb405-a41f-4f0e-976c-a80867ad7c4f&expected_price_source=share&expected_price_currency=rub&expected_price=5939"
//   },
//   {
//     origin: "MOW",
//     id: 4,
//     destination: "LED",
//     origin_airport: "SVO",
//     destination_airport: "LED",
//     price: 500,
//     airline: "SU",
//     flight_number: "46",
//     departure_at: "2023-08-15T00:50:00+03:00",
//     return_at: "2023-09-05T06:00:00+03:00",
//     transfers: 0,
//     return_transfers: 0,
//     duration: 175,
//     duration_to: 80,
//     duration_back: 95,
//     link: "/search/MOW1508LED05091?t=SU16920498001692054600000080SVOLED16938828001693888500000095LEDVKO_0c085cf3cb7602a633cee36da1ce936b_5968&search_date=18062023&expected_price_uuid=81acb405-a41f-4f0e-976c-a80867ad7c4f&expected_price_source=share&expected_price_currency=rub&expected_price=5939"
//   },
//   {
//     origin: "MOW",
//     id: 5,
//     destination: "LED",
//     origin_airport: "SVO",
//     destination_airport: "LED",
//     price: 200,
//     airline: "SU",
//     flight_number: "46",
//     departure_at: "2023-08-15T00:50:00+03:00",
//     return_at: "2023-09-05T06:00:00+03:00",
//     transfers: 0,
//     return_transfers: 0,
//     duration: 175,
//     duration_to: 80,
//     duration_back: 95,
//     link: "/search/MOW1508LED05091?t=SU16920498001692054600000080SVOLED16938828001693888500000095LEDVKO_0c085cf3cb7602a633cee36da1ce936b_5968&search_date=18062023&expected_price_uuid=81acb405-a41f-4f0e-976c-a80867ad7c4f&expected_price_source=share&expected_price_currency=rub&expected_price=5939"
//   },
//   {
//     origin: "MOW",
//     id: 6,
//     destination: "LED",
//     origin_airport: "SVO",
//     destination_airport: "LED",
//     price: 4564,
//     airline: "SU",
//     flight_number: "46",
//     departure_at: "2023-08-15T00:50:00+03:00",
//     return_at: "2023-09-05T06:00:00+03:00",
//     transfers: 0,
//     return_transfers: 0,
//     duration: 175,
//     duration_to: 80,
//     duration_back: 95,
//     link: "/search/MOW1508LED05091?t=SU16920498001692054600000080SVOLED16938828001693888500000095LEDVKO_0c085cf3cb7602a633cee36da1ce936b_5968&search_date=18062023&expected_price_uuid=81acb405-a41f-4f0e-976c-a80867ad7c4f&expected_price_source=share&expected_price_currency=rub&expected_price=5939"
//   },
//   {
//     origin: "MOW",
//     id: 7,
//     destination: "LED",
//     origin_airport: "SVO",
//     destination_airport: "LED",
//     price: 45645,
//     airline: "SU",
//     flight_number: "46",
//     departure_at: "2023-08-15T00:50:00+03:00",
//     return_at: "2023-09-05T06:00:00+03:00",
//     transfers: 0,
//     return_transfers: 0,
//     duration: 175,
//     duration_to: 80,
//     duration_back: 95,
//     link: "/search/MOW1508LED05091?t=SU16920498001692054600000080SVOLED16938828001693888500000095LEDVKO_0c085cf3cb7602a633cee36da1ce936b_5968&search_date=18062023&expected_price_uuid=81acb405-a41f-4f0e-976c-a80867ad7c4f&expected_price_source=share&expected_price_currency=rub&expected_price=5939"
//   },
//   {
//     origin: "MOW",
//     id: 8,
//     destination: "LED",
//     origin_airport: "SVO",
//     destination_airport: "LED",
//     price: 8888,
//     airline: "SU",
//     flight_number: "46",
//     departure_at: "2023-08-15T00:50:00+03:00",
//     return_at: "2023-09-05T06:00:00+03:00",
//     transfers: 0,
//     return_transfers: 0,
//     duration: 175,
//     duration_to: 80,
//     duration_back: 95,
//     link: "/search/MOW1508LED05091?t=SU16920498001692054600000080SVOLED16938828001693888500000095LEDVKO_0c085cf3cb7602a633cee36da1ce936b_5968&search_date=18062023&expected_price_uuid=81acb405-a41f-4f0e-976c-a80867ad7c4f&expected_price_source=share&expected_price_currency=rub&expected_price=5939"
//   },
//   {
//     origin: "MOW",
//     id: 9,
//     destination: "LED",
//     origin_airport: "SVO",
//     destination_airport: "LED",
//     price: 4563,
//     airline: "SU",
//     flight_number: "46",
//     departure_at: "2023-08-15T00:50:00+03:00",
//     return_at: "2023-09-05T06:00:00+03:00",
//     transfers: 0,
//     return_transfers: 0,
//     duration: 175,
//     duration_to: 80,
//     duration_back: 95,
//     link: "/search/MOW1508LED05091?t=SU16920498001692054600000080SVOLED16938828001693888500000095LEDVKO_0c085cf3cb7602a633cee36da1ce936b_5968&search_date=18062023&expected_price_uuid=81acb405-a41f-4f0e-976c-a80867ad7c4f&expected_price_source=share&expected_price_currency=rub&expected_price=5939"
//   },
// ]

const calendarData = [
	{ date: '2022-06-29', price: 2000 },
	{ date: '2022-06-30', price: 3000 },
	{ date: '2022-06-31', price: 3000 },
	{ date: '2023-07-01', price: 4780 },
	{ date: '2023-07-02', price: 8890 },
	{ date: '2023-07-03', price: 9390 },
	{ date: '2023-07-04', price: 8490 },
	{ date: '2023-07-05', price: 4490 },
	{ date: '2023-07-06', price: 5590 },
	{ date: '2023-07-07', price: 6590 },
	{ date: '2023-07-08', price: 7590 },
	{ date: '2023-07-09', price: 7000 },
	{ date: '2023-07-10', price: 3000 },
	{ date: '2023-07-11', price: 3000 },
	{ date: '2023-07-12', price: 3000 },
];

const faq = [
	{
		question: 'Мне не пришел билет. Что делать?',
		answer:
			'Продавец должен отправить вам билет (маршрутную квитанцию) на email. Если этого не произошло — посмотрите в папке «спам»: билеты могли случайно попасть туда. Если в «спаме» пусто, возможно, в адрес почты закралась ошибка. Чтобы получить билет, напишите или позвоните продавцу, у которого вы его оформляли. Он отправит билет на верную почту.',
	},
	{
		question: 'Я хочу вернуть билет. Что делать?',
		answer:
			'Правила отмены авиабилета и возврата средств зависят от выбранной авиакомпании и/или турагентства. Обычно они представлены на сайте компании-партнёра, на который вы перенаправляетесь при выборе рейса на AroundRussia. Для возврата средств или отмены билета обратитесь напрямую в компанию, в которой вы оформляли бронирование. Если вы не помните, где было оформлено бронирование, уточните название компании в выписке по банковской карте или в письме с подтверждением.',
	},
	{
		question: 'Как добавить багаж?',
		answer:
			'В разных авиакомпаниях приняты различные нормы провоза багажа и ручной клади. Пожалуйста, ознакомьтесь с правилами и нормами, принятыми в авиакомпании или у туристического агентства — у большинства авиакомпаний данная информация указана на сайте.',
	},
	{
		question: 'Рейс задержали. Что делать?',
		answer:
			'Если авиакомпания уведомила пассажира об отмене рейса более чем за 24 часа до полёта, система переоформит билет на аналогичный рейс. Если пассажира не устраивает предложение авиакомпании или он не хочет лететь этим рейсом, ему оформляют вынужденный возврат. Если пассажир узнал о задержке или отмене рейса уже в аэропорту, необходимо обратиться к представителю компании-перевозчика и поставить штамп об отмене или задержке рейса в маршрутную квитанцию или посадочный талон. Такой штамп необходим, если в дальнейшем вы захотите получить компенсацию.',
	},
	{
		question: 'Куда лететь на Новый год?',
		answer:
			'Великий Устюг: новогодняя сказка для больших и маленьких. Кострома: Новый год в гостях у Снегурочки. Петрозаводск (Карелия): новогодние каникулы вдали от суеты. Калининград: Новый год по‑европейски. Ярославль: мегаполис с нотками старины. Казань (Татарстан): Новый год на cтыке культур. Сочи и Красная Поляна: зимний отдых на море. Байкал: знаменитое место силы. Владимир: Новый год в русских традициях.',
	},
	{
		question: 'Как путешествовать с животными?',
		answer:
			'Для путешествия с животными, пожалуйста, свяжитесь с нашим отделом обслуживания клиентов или ознакомьтесь с условиями перевозки животных на нашем веб-сайте. Мы предлагаем определенные услуги и требования, чтобы обеспечить комфорт и безопасность как для вас, так и для вашего питомца во время полета. Пожалуйста, ознакомьтесь с правилами, документами и требованиями, чтобы быть готовыми к перевозке вашего животного.',
	},
];

const dayOfWeek = {
	Mon: 'Пн',
	Tue: 'Вт',
	Wed: 'Ср',
	Thu: 'Чт',
	Fri: 'Пт',
	Sat: 'Сб',
	Sun: 'Вс',
};

const monthsInTicket = {
	1: 'Января',
	2: 'Февраля',
	3: 'Марта',
	4: 'Апреля',
	5: 'Мая',
	6: 'Июня',
	7: 'Июля',
	8: 'Августа',
	9: 'Сентября',
	10: 'Октября',
	11: 'Ноября',
	12: 'Декабря',
};

export {
	TICKETS_ON_PAGE,
	calendarData,
	faq,
	BASE_URL,
	dayOfWeek,
	monthsInTicket,
};
