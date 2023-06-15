import { urals, s7 } from '../images/avia-company';

const numberOfTicketsOnPage = 3;

const ticketsInfo = [
  {
    price: '4580',
    company: 'Уральские авиалинии',
    image: urals,
    id: 1,
    transfer: 2,
    segments: [
      {
        origin: 'Москва',
        originCode: 'DME',
        destination: 'Калининград',
        destinationCode: 'KGD',
        date: '27 мая, сб',
        time: '19:15',
        duration: '2:45',
        dateDest: '27 мая, сб',
        timeDest: '22:45'
      },
      {
        origin: 'Калининград',
        originCode: 'KGD',
        destination: 'Москва',
        destinationCode: 'DME',
        date: '3 июня, сб',
        time: '19:15',
        duration: '2:45',
        dateDest: '3 июня, сб',
        timeDest: '22:45'
      }
    ]
  },
  {
    price: '4570',
    company: 'S7 Airlines',
    image: s7,
    id: 2,
    transfer: 1,
    segments: [
      {
        origin: 'Москва',
        originCode: 'DME',
        destination: 'Калининград',
        destinationCode: 'KGD',
        date: '27 мая, сб',
        time: '19:15',
        duration: '2:45',
        dateDest: '27 мая, сб',
        timeDest: '22:45'
      },
      {
        origin: 'Калининград',
        originCode: 'KGD',
        destination: 'Москва',
        destinationCode: 'DME',
        date: '3 июня, сб',
        time: '19:15',
        duration: '2:45',
        dateDest: '3 июня, сб',
        timeDest: '22:45'
      }
    ]
  },
  {
    price: '3570',
    company: 'S7 Airlines',
    image: s7,
    id: 3,
    transfer: 1,
    segments: [
      {
        origin: 'Москва',
        originCode: 'DME',
        destination: 'Калининград',
        destinationCode: 'KGD',
        date: '27 мая, сб',
        time: '19:15',
        duration: '2:45',
        dateDest: '27 мая, сб',
        timeDest: '22:45'
      },
      {
        origin: 'Калининград',
        originCode: 'KGD',
        destination: 'Москва',
        destinationCode: 'DME',
        date: '3 июня, сб',
        time: '19:15',
        duration: '2:45',
        dateDest: '3 июня, сб',
        timeDest: '22:45'
      }
    ]
  },
  {
    price: '5570',
    company: 'S7 Airlines',
    image: s7,
    id: 4,
    transfer: 3,
    segments: [
      {
        origin: 'Москва',
        originCode: 'DME',
        destination: 'Калининград',
        destinationCode: 'KGD',
        date: '27 мая, сб',
        time: '19:15',
        duration: '2:45',
        dateDest: '27 мая, сб',
        timeDest: '22:45'
      },
      {
        origin: 'Калининград',
        originCode: 'KGD',
        destination: 'Москва',
        destinationCode: 'DME',
        date: '3 июня, сб',
        time: '19:15',
        duration: '2:45',
        dateDest: '3 июня, сб',
        timeDest: '22:45'
      }
    ]
  },
  {
    price: '45500',
    company: 'Уральские авиалинии',
    image: urals,
    id: 5,
    transfer: 1,
    segments: [
      {
        origin: 'Москва',
        originCode: 'DME',
        destination: 'Калининград',
        destinationCode: 'KGD',
        date: '27 мая, сб',
        time: '19:15',
        duration: '2:45',
        dateDest: '27 мая, сб',
        timeDest: '22:45'
      },
      {
        origin: 'Калининград',
        originCode: 'KGD',
        destination: 'Москва',
        destinationCode: 'DME',
        date: '3 июня, сб',
        time: '19:15',
        duration: '2:45',
        dateDest: '3 июня, сб',
        timeDest: '22:45'
      }
    ]
  },
  {
    price: '4370',
    company: 'Уральские авиалинии',
    image: urals,
    id: 6,
    transfer: 1,
    segments: [
      {
        origin: 'Москва',
        originCode: 'DME',
        destination: 'Калининград',
        destinationCode: 'KGD',
        date: '27 мая, сб',
        time: '19:15',
        duration: '2:45',
        dateDest: '27 мая, сб',
        timeDest: '22:45'
      },
      {
        origin: 'Калининград',
        originCode: 'KGD',
        destination: 'Москва',
        destinationCode: 'DME',
        date: '3 июня, сб',
        time: '19:15',
        duration: '2:45',
        dateDest: '3 июня, сб',
        timeDest: '22:45'
      }
    ]
  },
  {
    price: '2000',
    company: 'Уральские авиалинии',
    image: urals,
    id: 7,
    transfer: 1,
    segments: [
      {
        origin: 'Москва',
        originCode: 'DME',
        destination: 'Калининград',
        destinationCode: 'KGD',
        date: '27 мая, сб',
        time: '19:15',
        duration: '2:45',
        dateDest: '27 мая, сб',
        timeDest: '22:45'
      },
      {
        origin: 'Калининград',
        originCode: 'KGD',
        destination: 'Москва',
        destinationCode: 'DME',
        date: '3 июня, сб',
        time: '19:15',
        duration: '2:45',
        dateDest: '3 июня, сб',
        timeDest: '22:45'
      }
    ]
  },
  {
    price: '3000',
    company: 'Уральские авиалинии',
    image: urals,
    id: 8,
    transfer: 5,
    segments: [
      {
        origin: 'Москва',
        originCode: 'DME',
        destination: 'Калининград',
        destinationCode: 'KGD',
        date: '27 мая, сб',
        time: '19:15',
        duration: '2:45',
        dateDest: '27 мая, сб',
        timeDest: '22:45'
      },
      {
        origin: 'Калининград',
        originCode: 'KGD',
        destination: 'Москва',
        destinationCode: 'DME',
        date: '3 июня, сб',
        time: '19:15',
        duration: '2:45',
        dateDest: '3 июня, сб',
        timeDest: '22:45'
      }
    ]
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

export { numberOfTicketsOnPage, ticketsInfo, calendarData, faq };
