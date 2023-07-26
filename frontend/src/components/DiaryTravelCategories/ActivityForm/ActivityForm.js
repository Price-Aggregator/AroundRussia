/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './ActivityForm.module.css';
import { editTravel, fetchAddEvent, fetchTravels } from '../../../store/Travels/slice';
import { getUserToken } from '../../../store/User/selectors';
import { formatDate } from '../../../utils/utils';

function ActivityForm({ closeForm, actionName }) {
  const [events, setEvents] = useState([]);
  const { travelId } = useParams();
  const dispatch = useDispatch();
  const travels = useSelector((state) => state.travels.travels);
  const token = useSelector(getUserToken)

  const [eventData, setЕventData] = useState({
    category: 'activity',
    eventName: '',
    address: '',
    startDate: null,
    startTime: null,
    description: '',
    price: '',
  });

  useEffect(() => {
    let storedEvents;
    try {
      storedEvents = JSON.parse(localStorage.getItem('events'));
    } catch (error) {
      console.error('Error parsing stored events:', error);
      storedEvents = undefined;
    }
    if (storedEvents) {
      setEvents(storedEvents);
    }
  }, []);

  // const handleUpdate = () => {
  // 	const options = {
  // 		day: '2-digit',
  // 		month: 'long',
  // 		weekday: 'short',
  // 		timeZone: 'UTC',
  // 	};
  // 	const newEvent = {
  // 		date: eventData.startDate.toLocaleDateString('ru-RU', options),
  // 		events: [
  // 			{
  // 				category: eventData.category,
  // 				time: eventData.startTime.toLocaleTimeString([], {
  // 					hour: '2-digit',
  // 					minute: '2-digit',
  // 				}),
  // 				address: eventData.address,
  // 				description: eventData.description,
  // 				price: eventData.price,
  // 				eventName: eventData.eventName,
  // 			},
  // 		],
  // 	};
  // 	const userTravel = travels.find((card) => card.id === travelId);
  // 	const newObj = { ...userTravel };
  // 	setEvents([...events, newEvent]);
  // 	newObj.travelDaysEvents = events;
  // 	localStorage.setItem('events', JSON.stringify([...events, newEvent]));
  // 	dispatch(editTravel({ id: travelId, data: newObj }));
  // };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setЕventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStartDateChange = (startDate) => {
    setЕventData((prevData) => ({
      ...prevData,
      startDate,
    }));
  };

  const handleStartTimeChange = (startTime) => {
    setЕventData((prevData) => ({
      ...prevData,
      startTime,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // handleUpdate();

    const newEvent = {
      startDate: formatDate(eventData.startDate),
      category: eventData.category,
      startTime: eventData.startTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      address: eventData.address,
      description: eventData.description,
      price: eventData.price,
      eventName: eventData.eventName,
    };

    await dispatch(fetchAddEvent({ travelId, token, data: newEvent })).then(() => {
      dispatch(fetchTravels(token))
    })
    closeForm();
  };

  return (
    <form className={styles.form_active} onSubmit={handleSubmit}>
      <h2 className={styles.form__title}>{`${actionName} активность`}</h2>
      <div className={styles.form__box}>
        <div className={styles.form__inputBox}>
          <div className={styles.form__labelBox}>
            <label htmlFor="eventName" className={styles.form__labelText}>
              Название активности*
            </label>
            <input
              className={`${styles.form__input} ${styles.form__input_title}`}
              type="text"
              id="eventName"
              name="eventName"
              value={eventData.title}
              onChange={handleInputChange}
              required
            />
          </div>{' '}
          <div className={styles.form__labelBox}>
            <label htmlFor="address" className={styles.form__labelText}>
              Адрес*
            </label>
            <input
              className={`${styles.form__input} ${styles.form__input_title}`}
              type="text"
              id="address"
              name="address"
              value={eventData.title}
              onChange={handleInputChange}
              required
            />
          </div>{' '}
          <div className={styles.form__dateBox}>
            <div className={styles.form__labelBox}>
              <label htmlFor="startDate" className={styles.form__labelText}>
                Дата начала* (гггг.мм.дд)
              </label>
              <div className={styles.form__dateInputContainer}>
                <DatePicker
                  className={`${styles.form__input} ${styles.form__input_date}`}
                  id="startDate"
                  selected={eventData.startDate}
                  onChange={handleStartDateChange}
                  dateFormat="yyyy.MM.dd"
                  placeholderText=""
                  required
                />
              </div>
            </div>
            <div className={styles.form__labelBox}>
              <label htmlFor="startTime" className={styles.form__labelText}>
                Время начала* (чч:мм)
              </label>
              <div className={styles.form__timeInputContainer}>
                <DatePicker
                  className={`${styles.form__input} ${styles.form__input_date}`}
                  id="startTime"
                  selected={eventData.startTime}
                  onChange={handleStartTimeChange}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  timeFormat="HH:mm"
                  dateFormat="HH:mm"
                  placeholderText=""
                  required
                />
              </div>
            </div>
          </div>{' '}
          <div className={styles.form__labelBox}>
            <label htmlFor="description" className={styles.form__labelText}>
              Описание
            </label>
            <input
              className={`${styles.form__input} ${styles.form__input_title}`}
              type="text"
              id="description"
              name="description"
              value={eventData.description}
              onChange={handleInputChange}
            />
          </div>{' '}
          <div className={styles.form__labelBox}>
            <label htmlFor="price" className={styles.form__labelText}>
              Стоимость
            </label>
            <input
              className={`${styles.form__input} ${styles.form__input_title}`}
              type="text"
              id="price"
              name="price"
              value={eventData.price}
              onChange={handleInputChange}
            />
          </div>{' '}
          <div className={styles.form__labelBox}>
            <label htmlFor="media" className={styles.form__labelText}>
              Прикрепите фото, документы, билеты
            </label>
            <div className={styles.form__files} id="media">
              <div className={styles.form__fileBox}>
                <button
                  className={`${styles.form__button} ${styles.form__button_addFile}`}
                  type="button"
                  onClick={() => console.log('click')}
                >
                  + Файл
                </button>
              </div>{' '}
              <div className={styles.form__fileBox}>
                <button
                  className={`${styles.form__button} ${styles.form__button_addFile}`}
                  type="button"
                  onClick={() => console.log('click')}
                >
                  + Файл
                </button>
              </div>{' '}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.form__buttonBox}>
        <button
          className={`${styles.form__button} ${styles.form__button_cancel}`}
          type="button"
          onClick={closeForm}
        >
          Отменить
        </button>
        <button
          className={`${styles.form__button} ${styles.form__button_save}`}
          type="submit"
        >
          Сохранить
        </button>
      </div>
    </form>
  );
}

export default ActivityForm;

ActivityForm.propTypes = {
  closeForm: PropTypes.func,
  actionName: PropTypes.string

};

ActivityForm.defaultProps = {
  closeForm: () => { },
  actionName: 'Добавить'
};
