// import { urals, s7 } from '../images/avia-company';
import {
	urals,
	s7,
	aeroflot,
	defaultIcon,
	nordStar,
	orenburg,
	pobeda,
	redWings,
	russia,
	smartAvia,
	utair,
	yakutia,
	yamal,
} from '../images/avia-company/index';
import { flight, hotel, activity, defaultImage } from '../images/travel-plan';
import defaultPicture from '../images/picture_travellist_default.png';

// const URL = 'http://localhost';
const URL = 'http://aroundrussia.acceleratorpracticum.ru'

const BASE_URL = `${URL}/api/v1`;
const MEDIA_URL = `${URL}/media`;

const TICKETS_ON_PAGE = 3;

const regexEmail =
	/^[A-Za-z0-9_-]+(?:\.[A-Za-z0-9_-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

const regexPassword = /((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[\w-_.])(?=.*[\S])/;

const eventImages = {
	flight,
	hotel,
	activity,
	defaultImage,
};

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
		question: 'Правила и нормы провоза багажа',
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
			'Питомца можно взять в салон самолёта, отправить в отапливаемом грузовом отсеке или как карго (это перевозка отдельным грузовым самолётом — подходит для крупных собак весом больше 50 кг). Провоз животного оплачивается дополнительно, цена зависит от веса питомца и размера переноски. Правила и условия транспортировки питомцев зависят от авиакомпании. Перед бронированием свяжитесь с авиакомпанией или турагентом, чтобы уточнить их.',
	},
];

const dayOfWeek = {
	Mon: 'пн',
	Tue: 'вт',
	Wed: 'ср',
	Thu: 'чт',
	Fri: 'пт',
	Sat: 'сб',
	Sun: 'вс',
};

const monthsInTicket = {
	1: 'января',
	2: 'февраля',
	3: 'марта',
	4: 'апреля',
	5: 'мая',
	6: 'июня',
	7: 'июля',
	8: 'августа',
	9: 'сентября',
	10: 'октября',
	11: 'ноября',
	12: 'декабря',
};

const airlines = {
	S7: {
		airlinesLogo: s7,
		airlinesName: 'S7 Airlines',
	},
	SU: {
		airlinesLogo: aeroflot,
		airlinesName: 'Аэрофлот',
	},
	U6: {
		airlinesLogo: urals,
		airlinesName: 'Уральские авиалинии',
	},
	Y7: {
		airlinesLogo: nordStar,
		airlinesName: 'Nord Star',
	},
	R2: {
		airlinesLogo: orenburg,
		airlinesName: 'Оренбургские авиалинии',
	},
	DP: {
		airlinesLogo: pobeda,
		airlinesName: 'Победа',
	},
	WZ: {
		airlinesLogo: redWings,
		airlinesName: 'Red Wings',
	},
	FV: {
		airlinesLogo: russia,
		airlinesName: 'Россия ',
	},
	'5N': {
		airlinesLogo: smartAvia,
		airlinesName: 'Smart Avia',
	},
	UT: {
		airlinesLogo: utair,
		airlinesName: 'Utair',
	},
	R3: {
		airlinesLogo: yakutia,
		airlinesName: 'Якутия',
	},
	YL: {
		airlinesLogo: yamal,
		airlinesName: 'Ямал',
	},
	default: {
		airlinesLogo: defaultIcon,
	},
	A4: {
		airlinesLogo: defaultIcon,
		airlinesName: 'Азимут',
	},
	N4: {
		airlinesLogo: defaultIcon,
		airlinesName: 'Северный ветер',
	},
};

const TRAVEL_DAIRY = [
	{
		date: '09 июля, Вс',
		events: [
			{
				time: '13:00',
				type: 'plane',
				adress: 'Аэропорт Шереметьево, терминал B',
				description: 'Заселение в 14:00. Спросить про вид на сад',
				price: '18 000',
				eventName: 'Перелёт',
			},
			{
				time: '14:00',
				type: 'hotel',
				adress: 'Аэропорт Шереметьево, терминал B',
				description: 'Заселение в 14:00. Спросить про вид на сад',
				price: '18 000',
				eventName: 'Перелёт',
			},
			{
				time: '15:00',
				type: 'event',
				adress: 'Аэропорт Шереметьево, терминал B',
				description: 'Заселение в 14:00. Спросить про вид на сад',
				price: '18 000',
				eventName: 'Перелёт',
			},
			{
				time: '16:00',
				type: 'hotel',
				adress: 'Аэропорт Шереметьево, терминал B',
				description: 'Заселение в 14:00. Спросить про вид на сад',
				price: '18 000',
				eventName: 'Перелёт',
			},
		],
	},
	{
		date: '10 июля, Пн',
		events: [
			{
				time: '12:00',
				type: 'hotel',
				adress: 'Аэропорт Шереметьево, терминал B',
				description: 'Заселение в 14:00. Спросить про вид на сад',
				price: '18 000',
				eventName: 'Перелёт',
			},
			{
				time: '14:00',
				type: 'hotel',
				adress: 'Аэропорт Шереметьево, терминал B',
				description: 'Заселение в 14:00. Спросить про вид на сад',
				price: '18 000',
				eventName: 'Перелёт',
			},
			{
				time: '14:00',
				type: 'hotel',
				adress: 'Аэропорт Шереметьево, терминал B',
				description: 'Заселение в 14:00. Спросить про вид на сад',
				price: '18 000',
				eventName: 'Перелёт',
			},
			{
				time: '14:00',
				type: 'event',
				adress: 'Аэропорт Шереметьево, терминал B',
				description: 'Заселение в 14:00. Спросить про вид на сад',
				price: '18 000',
				eventName: 'Перелёт',
			},
		],
	},
	{
		date: '11 июля, Вт',
		events: [
			{
				time: '14:00',
				type: 'hotel',
				adress: 'Аэропорт Шереметьево, терминал B',
				description: 'Заселение в 14:00. Спросить про вид на сад',
				price: '18 000',
				eventName: 'Перелёт',
			},
			{
				time: '14:00',
				type: 'hotel',
				adress: 'Аэропорт Шереметьево, терминал B',
				description: 'Заселение в 14:00. Спросить про вид на сад',
				price: '18 000',
				eventName: 'Перелёт',
			},
			{
				time: '14:00',
				type: 'event',
				adress: 'Аэропорт Шереметьево, терминал B',
				description: 'Заселение в 14:00. Спросить про вид на сад',
				price: '18 000',
				eventName: 'Перелёт',
			},
			{
				time: '14:00',
				type: 'plane',
				adress: 'Аэропорт Шереметьево, терминал B',
				description: 'Заселение в 14:00. Спросить про вид на сад',
				price: '18 000',
				eventName: 'Перелёт',
			},
		],
	},
];

const TRAVEL_LIST_DATA = [
	{
		id: '1',
		name: 'Алтай',
		description:
			'Путешествие на авто по Алтаю. Всего 15 локаций. Обязательно нужно купить сувениры и побывать около Белухи.',
		start_date: '2023-07-09',
		end_date: '2023-07-11',
		total_price: 1286,
		image: [
			defaultPicture,
			defaultPicture,
			defaultPicture,
			defaultPicture,
			defaultPicture,
			defaultPicture,
		],
		travelDaysEvents: TRAVEL_DAIRY,
	},
	{
		id: '2',
		name: 'Санкт-Петербург',
		description:
			'Едем на белые ночи.Взять напрокат лодку на развод мостов.Встретиться с друзьями.',
		start_date: '2023-07-12',
		end_date: '2023-07-16',
		total_price: 1286,
		image: [defaultPicture],
		travelDaysEvents: [],
	},
];

const TRAVEL_EVENT_EDIT = 'Редактировать';

export {
	TICKETS_ON_PAGE,
	calendarData,
	faq,
	BASE_URL,
	dayOfWeek,
	monthsInTicket,
	airlines,
	TRAVEL_LIST_DATA,
	TRAVEL_DAIRY,
	MEDIA_URL,
	regexEmail,
	regexPassword,
	eventImages,
	TRAVEL_EVENT_EDIT,
};
