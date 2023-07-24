/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './PropertyForm.module.css';
import { editTravel } from '../../../store/Travels/slice';
import { formatDate } from '../../../utils/utils';

function PropertyForm({ closeForm }) {
  const [events, setEvents] = useState([]);
  const { travelId } = useParams();
  const dispatch = useDispatch();
  const travels = useSelector((state) => state.travels.travels);

  const [propertyData, setPropertyData] = useState({
    category: 'hotel',
    eventName: '',
    address: '',
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
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

  const handleUpdate = () => {
    const options = {
      day: '2-digit',
      month: 'long',
      weekday: 'short',
      timeZone: 'UTC',
    };
    const newProperty = {
      date: propertyData.startDate.toLocaleDateString('ru-RU', options),
      events: [
        {
          category: propertyData.category,
          eventName: propertyData.eventName,
          address: propertyData.address,
          start_date: formatDate(propertyData.startDate),
          time: propertyData.startTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          end_time: propertyData.endTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          end_date: formatDate(propertyData.endDate),
          description: propertyData.description,
          price: propertyData.price,
        },
      ],
    };
    const userTravel = travels.find((card) => card.id === travelId);
    const newObj = { ...userTravel };
    setEvents([...events, newProperty]);
    newObj.travelDaysEvents = events;
    localStorage.setItem('events', JSON.stringify([...events, newProperty]));
    dispatch(editTravel({ id: travelId, data: newObj }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value)
    setPropertyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStartDateChange = (date) => {
    setPropertyData((prevData) => ({
      ...prevData,
      startDate: date,
    }));
  };

  const handleEndDateChange = (date) => {
    setPropertyData((prevData) => ({
      ...prevData,
      endDate: date,
    }));
  };

  const handleStartTimeChange = (time) => {
    setPropertyData((prevData) => ({
      ...prevData,
      startTime: time,
    }));
  };

  const handleEndTimeChange = (time) => {
    setPropertyData((prevData) => ({
      ...prevData,
      endTime: time,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdate();
    closeForm();
  };

  return (
    <form className={styles.form_active} onSubmit={handleSubmit}>
      <h2 className={styles.form__title}>Добавить жильё</h2>
      <div className={styles.form__box}>
        <div className={styles.form__inputBox}>
          <div className={styles.form__labelBox}>
            <label htmlFor="eventName" className={styles.form__labelText}>
              Название жилья*
            </label>
            <input
              className={`${styles.form__input} ${styles.form__input_title}`}
              type="text"
              id="eventName"
              name="eventName"
              value={propertyData.eventName}
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
              value={propertyData.address}
              onChange={handleInputChange}
              required
            />
          </div>{' '}
          <div className={styles.form__dateBox}>
            <div className={styles.form__labelBox}>
              <label htmlFor="startDate" className={styles.form__labelText}>
                Дата заезда* (дд.мм.гггг)
              </label>
              <div className={styles.form__dateInputContainer}>
                <DatePicker
                  className={`${styles.form__input} ${styles.form__input_date}`}
                  id="startDate"
                  selected={propertyData.startDate}
                  onChange={handleStartDateChange}
                  dateFormat="dd.MM.yyyy"
                  placeholderText=""
                  required
                />
              </div>
            </div>
            <div className={styles.form__labelBox}>
              <label htmlFor="startTime" className={styles.form__labelText}>
                Время заселения* (чч:мм)
              </label>
              <div className={styles.form__timeInputContainer}>
                <DatePicker
                  className={`${styles.form__input} ${styles.form__input_date}`}
                  id="startTime"
                  selected={propertyData.startTime}
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
          <div className={styles.form__dateBox}>
            <div className={styles.form__labelBox}>
              <label htmlFor="endDate" className={styles.form__labelText}>
                Дата выезда* (дд.мм.гггг)
              </label>
              <div className={styles.form__dateInputContainer}>
                <DatePicker
                  className={`${styles.form__input} ${styles.form__input_date}`}
                  id="endDate"
                  selected={propertyData.endDate}
                  onChange={handleEndDateChange}
                  dateFormat="dd.MM.yyyy"
                  placeholderText=""
                  required
                />
              </div>
            </div>

            <div className={styles.form__labelBox}>
              <label htmlFor="endTime" className={styles.form__labelText}>
                Время выселения* (чч:мм)
              </label>
              <div className={styles.form__timeInputContainer}>
                <DatePicker
                  className={`${styles.form__input} ${styles.form__input_date}`}
                  id="endTime"
                  selected={propertyData.endTime}
                  onChange={handleEndTimeChange}
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
          </div>
          <div className={styles.form__labelBox}>
            <label htmlFor="description" className={styles.form__labelText}>
              Описание
            </label>
            <input
              className={`${styles.form__input} ${styles.form__input_title}`}
              type="text"
              id="description"
              name="description"
              value={propertyData.description}
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
              value={propertyData.price}
              onChange={handleInputChange}
            />
          </div>{' '}
          <div className={styles.form__labelBox}>
            <label htmlFor="price" className={styles.form__labelText}>
              Прикрепите фото, документы, билеты
            </label>
            <div className={styles.form__files}>
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

export default PropertyForm;

PropertyForm.propTypes = {
  closeForm: PropTypes.func,
};

PropertyForm.defaultProps = {
  closeForm: () => { },
};
