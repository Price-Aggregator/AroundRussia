import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import { editTravel, fetchNewTravel, fetchTravels } from '../../../store/Travels/slice';
import styles from './NewTravelForm.module.css';
import DefaultPicture from '../../../images/dairy_picture_default.png';
import { generateUniqueKey, formatDate } from '../../../utils/utils';
import { getUserToken } from '../../../store/User/selectors';

function NewTravelForm({ closeForm }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const [travelData, setTravelData] = useState({
    name: '',
    description: '',
    start_date: null,
    end_date: null,
    images: [],
  });

  const travels = useSelector((state) => state.travels.travels);
  const token = useSelector(getUserToken)
  console.log(token)
  const isDiaryPage = () => location.pathname.includes('/diary/');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTravelData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date, field) => {
    setTravelData((prevData) => ({
      ...prevData,
      [field]: date,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const travelId = isDiaryPage()
      ? location.pathname.split('/diary/')[1]
      : generateUniqueKey();

    const newTravel = {
      id: travelId,
      name: travelData.name,
      description: travelData.description,
      start_date: formatDate(travelData.start_date),
      end_date: formatDate(travelData.end_date),
      images: travelData.images,
      travelDaysEvents: [],
    };

    if (location.pathname === '/diary') {
      // dispatch(addTravel(newTravel));
      dispatch(fetchNewTravel({ newTravel, token }))
      dispatch(fetchTravels(token))
    } else if (isDiaryPage()) {
      const existingTravel = travels.find((travel) => travel.id === travelId);
      if (existingTravel) {
        const changedTravel = {
          id: travelId,
          name: travelData.name,
          description: travelData.description,
          start_date: formatDate(travelData.start_date),
          end_date: formatDate(travelData.end_date),
          images: travelData.images,
        };
        const updatedTravel = {
          ...existingTravel,
          ...changedTravel,
        };
        dispatch(editTravel({ id: travelId, data: updatedTravel }));
      }
    }
    closeForm();
  };

  const handleAddPhoto = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.style.display = 'none';
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setTravelData((prevData) => ({
            ...prevData,
            images: [e.target.result],
          }));
        };
        reader.readAsDataURL(file);
      }
    };
    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  };

  useEffect(() => {
    if (isDiaryPage()) {
      const travelId = location.pathname.split('/diary/')[1];
      const existingTravel = travels.find((travel) => travel.id === travelId);
      const images =
        existingTravel && existingTravel.images.length
          ? existingTravel.images
          : [];

      setTravelData((prevData) => ({
        ...prevData,
        images,
      }));
    }
  }, [location.pathname, travels]);

  return (
    <form
      className={`${styles.form_active} ${isDiaryPage() ? styles.form_withBorder : ''
        }`}
      onSubmit={handleSubmit}
    >
      <div className={styles.form__box}>
        <div className={styles.form__inputBox}>
          <div className={styles.form__labelBox}>
            <label htmlFor="name" className={styles.form__labelText}>
              Название путешествия
            </label>
            <input
              className={`${styles.form__input} ${styles.form__input_title}`}
              type="text"
              id="name"
              name="name"
              value={travelData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.form__labelBox}>
            <label htmlFor="description" className={styles.form__labelText}>
              Описание путешествия
            </label>
            <textarea
              className={`${styles.form__input} ${styles.form__input_description}`}
              id="description"
              name="description"
              value={travelData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.form__dateBox}>
            <div className={styles.form__labelBox}>
              <label htmlFor="startDate" className={styles.form__labelText}>
                Дата начала (дд.мм.гггг)
              </label>
              <div className={styles.form__dateInputContainer}>
                <DatePicker
                  className={`${styles.form__input} ${styles.form__input_date}`}
                  id="startDate"
                  selected={travelData.start_date}
                  onChange={(date) => handleDateChange(date, 'start_date')}
                  dateFormat="dd.MM.yyyy"
                  placeholderText=""
                  required
                />
              </div>
            </div>
            <div className={styles.form__labelBox}>
              <label htmlFor="endDate" className={styles.form__labelText}>
                Дата окончания (дд.мм.гггг)
              </label>
              <div className={styles.form__dateInputContainer}>
                <DatePicker
                  className={`${styles.form__input} ${styles.form__input_date}`}
                  id="endDate"
                  selected={travelData.end_date}
                  onChange={(date) => handleDateChange(date, 'end_date')}
                  dateFormat="dd.MM.yyyy"
                  placeholderText=""
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.form__picBox}>
          <img
            className={styles.form__picture}
            src={travelData.images[0] ? travelData.images[0] : DefaultPicture}
            alt="здесь будет осмысленный альт"
          />
          <button
            className={`${styles.form__button} ${styles.form__button_addPicture}`}
            type="button"
            onClick={handleAddPhoto}
          >
            Добавить фото
          </button>
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

export default NewTravelForm;

NewTravelForm.propTypes = {
  closeForm: PropTypes.func,
};

NewTravelForm.defaultProps = {
  closeForm: () => { },
};
