// import { urals, s7 } from '../images/avia-company';

// const BASE_URL = 'http://62.84.115.87/api/v1'
// const BASE_URL = 'http://127.0.0.1:8000/api/v1'
const BASE_URL = 'http://localhost/api/v1'

const TICKETS_ON_PAGE = 3;

const tickets = [
  {
    origin: "MOW",
    id: 1,
    destination: "LED",
    origin_airport: "SVO",
    destination_airport: "LED",
    price: 5939,
    airline: "SU",
    flight_number: "46",
    departure_at: "2023-08-15T00:50:00+03:00",
    return_at: "2023-09-05T06:00:00+03:00",
    transfers: 0,
    return_transfers: 0,
    duration: 175,
    duration_to: 80,
    duration_back: 95,
    link: "/search/MOW1508LED05091?t=SU16920498001692054600000080SVOLED16938828001693888500000095LEDVKO_0c085cf3cb7602a633cee36da1ce936b_5968&search_date=18062023&expected_price_uuid=81acb405-a41f-4f0e-976c-a80867ad7c4f&expected_price_source=share&expected_price_currency=rub&expected_price=5939"
  },
  {
    origin: "MOW",
    id: 2,
    destination: "LED",
    origin_airport: "SVO",
    destination_airport: "LED",
    price: 5939,
    airline: "SU",
    flight_number: "46",
    departure_at: "2023-08-15T00:50:00+03:00",
    return_at: "2023-09-05T06:00:00+03:00",
    transfers: 0,
    return_transfers: 0,
    duration: 175,
    duration_to: 80,
    duration_back: 95,
    link: "/search/MOW1508LED05091?t=SU16920498001692054600000080SVOLED16938828001693888500000095LEDVKO_0c085cf3cb7602a633cee36da1ce936b_5968&search_date=18062023&expected_price_uuid=81acb405-a41f-4f0e-976c-a80867ad7c4f&expected_price_source=share&expected_price_currency=rub&expected_price=5939"
  },
  {
    origin: "MOW",
    id: 3,
    destination: "LED",
    origin_airport: "SVO",
    destination_airport: "LED",
    price: 5939,
    airline: "SU",
    flight_number: "46",
    departure_at: "2023-08-15T00:50:00+03:00",
    return_at: "2023-09-05T06:00:00+03:00",
    transfers: 0,
    return_transfers: 0,
    duration: 175,
    duration_to: 80,
    duration_back: 95,
    link: "/search/MOW1508LED05091?t=SU16920498001692054600000080SVOLED16938828001693888500000095LEDVKO_0c085cf3cb7602a633cee36da1ce936b_5968&search_date=18062023&expected_price_uuid=81acb405-a41f-4f0e-976c-a80867ad7c4f&expected_price_source=share&expected_price_currency=rub&expected_price=5939"
  },
  {
    origin: "MOW",
    id: 4,
    destination: "LED",
    origin_airport: "SVO",
    destination_airport: "LED",
    price: 500,
    airline: "SU",
    flight_number: "46",
    departure_at: "2023-08-15T00:50:00+03:00",
    return_at: "2023-09-05T06:00:00+03:00",
    transfers: 0,
    return_transfers: 0,
    duration: 175,
    duration_to: 80,
    duration_back: 95,
    link: "/search/MOW1508LED05091?t=SU16920498001692054600000080SVOLED16938828001693888500000095LEDVKO_0c085cf3cb7602a633cee36da1ce936b_5968&search_date=18062023&expected_price_uuid=81acb405-a41f-4f0e-976c-a80867ad7c4f&expected_price_source=share&expected_price_currency=rub&expected_price=5939"
  },
  {
    origin: "MOW",
    id: 5,
    destination: "LED",
    origin_airport: "SVO",
    destination_airport: "LED",
    price: 200,
    airline: "SU",
    flight_number: "46",
    departure_at: "2023-08-15T00:50:00+03:00",
    return_at: "2023-09-05T06:00:00+03:00",
    transfers: 0,
    return_transfers: 0,
    duration: 175,
    duration_to: 80,
    duration_back: 95,
    link: "/search/MOW1508LED05091?t=SU16920498001692054600000080SVOLED16938828001693888500000095LEDVKO_0c085cf3cb7602a633cee36da1ce936b_5968&search_date=18062023&expected_price_uuid=81acb405-a41f-4f0e-976c-a80867ad7c4f&expected_price_source=share&expected_price_currency=rub&expected_price=5939"
  },
  {
    origin: "MOW",
    id: 6,
    destination: "LED",
    origin_airport: "SVO",
    destination_airport: "LED",
    price: 4564,
    airline: "SU",
    flight_number: "46",
    departure_at: "2023-08-15T00:50:00+03:00",
    return_at: "2023-09-05T06:00:00+03:00",
    transfers: 0,
    return_transfers: 0,
    duration: 175,
    duration_to: 80,
    duration_back: 95,
    link: "/search/MOW1508LED05091?t=SU16920498001692054600000080SVOLED16938828001693888500000095LEDVKO_0c085cf3cb7602a633cee36da1ce936b_5968&search_date=18062023&expected_price_uuid=81acb405-a41f-4f0e-976c-a80867ad7c4f&expected_price_source=share&expected_price_currency=rub&expected_price=5939"
  },
  {
    origin: "MOW",
    id: 7,
    destination: "LED",
    origin_airport: "SVO",
    destination_airport: "LED",
    price: 45645,
    airline: "SU",
    flight_number: "46",
    departure_at: "2023-08-15T00:50:00+03:00",
    return_at: "2023-09-05T06:00:00+03:00",
    transfers: 0,
    return_transfers: 0,
    duration: 175,
    duration_to: 80,
    duration_back: 95,
    link: "/search/MOW1508LED05091?t=SU16920498001692054600000080SVOLED16938828001693888500000095LEDVKO_0c085cf3cb7602a633cee36da1ce936b_5968&search_date=18062023&expected_price_uuid=81acb405-a41f-4f0e-976c-a80867ad7c4f&expected_price_source=share&expected_price_currency=rub&expected_price=5939"
  },
  {
    origin: "MOW",
    id: 8,
    destination: "LED",
    origin_airport: "SVO",
    destination_airport: "LED",
    price: 8888,
    airline: "SU",
    flight_number: "46",
    departure_at: "2023-08-15T00:50:00+03:00",
    return_at: "2023-09-05T06:00:00+03:00",
    transfers: 0,
    return_transfers: 0,
    duration: 175,
    duration_to: 80,
    duration_back: 95,
    link: "/search/MOW1508LED05091?t=SU16920498001692054600000080SVOLED16938828001693888500000095LEDVKO_0c085cf3cb7602a633cee36da1ce936b_5968&search_date=18062023&expected_price_uuid=81acb405-a41f-4f0e-976c-a80867ad7c4f&expected_price_source=share&expected_price_currency=rub&expected_price=5939"
  },
  {
    origin: "MOW",
    id: 9,
    destination: "LED",
    origin_airport: "SVO",
    destination_airport: "LED",
    price: 4563,
    airline: "SU",
    flight_number: "46",
    departure_at: "2023-08-15T00:50:00+03:00",
    return_at: "2023-09-05T06:00:00+03:00",
    transfers: 0,
    return_transfers: 0,
    duration: 175,
    duration_to: 80,
    duration_back: 95,
    link: "/search/MOW1508LED05091?t=SU16920498001692054600000080SVOLED16938828001693888500000095LEDVKO_0c085cf3cb7602a633cee36da1ce936b_5968&search_date=18062023&expected_price_uuid=81acb405-a41f-4f0e-976c-a80867ad7c4f&expected_price_source=share&expected_price_currency=rub&expected_price=5939"
  },
]

const calendarData = [
  { _id: 1346, date: '25, чт', price: 2000, from: 'moscow', to: 'tver' },
  { _id: 24555, date: '26, пт', price: 3000, from: 'moscow', to: 'tver' },
  { _id: 35666, date: '27, сб', price: 3000, from: 'moscow', to: 'tver' },
  { _id: 456666, date: '28, вс', price: 4780, from: 'moscow', to: 'tver' },
  { _id: 55543, date: '29, пн', price: 8890, from: 'moscow', to: 'tver' },
  { _id: 64444, date: '30, вт', price: 9390, from: 'moscow', to: 'tver' },
  { _id: 7344443, date: '31, ср', price: 8490, from: 'moscow', to: 'tver' },
  { _id: 83332, date: '1, чт', price: 4490, from: 'moscow', to: 'tver' },
  { _id: 934344, date: '2, пт', price: 5590, from: 'moscow', to: 'tver' },
  { _id: 103424, date: '3, сб', price: 6590, from: 'moscow', to: 'tver' },
  { _id: 11243, date: '4, вс', price: 7590, from: 'moscow', to: 'tver' },
  { _id: 132433, date: '5, пн', price: 7000, from: 'moscow', to: 'tver' },
  { _id: 14422, date: '6, вт', price: 3000, from: 'moscow', to: 'tver' },
  { _id: 14422, date: '7, ср', price: 3000, from: 'moscow', to: 'tver' },
];

const faq = [
  {
    question: 'Мне не пришел билет. Что делать?',
    answer: 'Продавец должен отправить вам билет (маршрутную квитанцию) на email. Если этого не произошло — посмотрите в папке «спам»: билеты могли случайно попасть туда. Если в «спаме» пусто, возможно, в адрес почты закралась ошибка. Чтобы получить билет, напишите или позвоните продавцу, у которого вы его оформляли. Он отправит билет на верную почту.'
  },
  {
    question: 'Я хочу вернуть билет. Что делать?',
    answer: 'Правила отмены авиабилета и возврата средств зависят от выбранной авиакомпании и/или турагентства. Обычно они представлены на сайте компании-партнёра, на который вы перенаправляетесь при выборе рейса на AroundRussia. Для возврата средств или отмены билета обратитесь напрямую в компанию, в которой вы оформляли бронирование. Если вы не помните, где было оформлено бронирование, уточните название компании в выписке по банковской карте или в письме с подтверждением.'
  },
  {
    question: 'Как добавить багаж?',
    answer: 'В разных авиакомпаниях приняты различные нормы провоза багажа и ручной клади. Пожалуйста, ознакомьтесь с правилами и нормами, принятыми в авиакомпании или у туристического агентства — у большинства авиакомпаний данная информация указана на сайте.'
  },
  {
    question: 'Рейс задержали. Что делать?',
    answer: 'Если авиакомпания уведомила пассажира об отмене рейса более чем за 24 часа до полёта, система переоформит билет на аналогичный рейс. Если пассажира не устраивает предложение авиакомпании или он не хочет лететь этим рейсом, ему оформляют вынужденный возврат. Если пассажир узнал о задержке или отмене рейса уже в аэропорту, необходимо обратиться к представителю компании-перевозчика и поставить штамп об отмене или задержке рейса в маршрутную квитанцию или посадочный талон. Такой штамп необходим, если в дальнейшем вы захотите получить компенсацию.'
  },
  {
    question: 'Куда лететь на Новый год?',
    answer: 'Великий Устюг: новогодняя сказка для больших и маленьких. Кострома: Новый год в гостях у Снегурочки. Петрозаводск (Карелия): новогодние каникулы вдали от суеты. Калининград: Новый год по‑европейски. Ярославль: мегаполис с нотками старины. Казань (Татарстан): Новый год на cтыке культур. Сочи и Красная Поляна: зимний отдых на море. Байкал: знаменитое место силы. Владимир: Новый год в русских традициях.'
  },
  {
    question: 'Как путешествовать с животными?',
    answer: 'Для путешествия с животными, пожалуйста, свяжитесь с нашим отделом обслуживания клиентов или ознакомьтесь с условиями перевозки животных на нашем веб-сайте. Мы предлагаем определенные услуги и требования, чтобы обеспечить комфорт и безопасность как для вас, так и для вашего питомца во время полета. Пожалуйста, ознакомьтесь с правилами, документами и требованиями, чтобы быть готовыми к перевозке вашего животного.'
  },
];

const dayOfWeek = {
  Mon: 'Пн',
  Tue: 'Вт',
  Wed: 'Ср',
  Thu: 'Чт',
  Fri: 'Пт',
  Sat: 'Сб',
  Sun: 'Вс'
}

const monthsInTicket = { 1: 'Января', 2: "Февраля", 3: "Марта", 4: "Апреля", 5: "Мая", 6: "Июня", 7: "Июля", 8: "Августа", 9: "Сентября", 10: "Октября", 11: "Ноября", 12: "Декабря" }

export { TICKETS_ON_PAGE, calendarData, faq, BASE_URL, tickets, dayOfWeek, monthsInTicket};
