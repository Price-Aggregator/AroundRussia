/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import {
  fetchNewTravel,
  fetchTravels,
  fetchEditTravel,
} from '../../../store/Travels/slice';
import styles from './NewTravelForm.module.css';
import DefaultPicture from '../../../images/dairy_picture_default.png';
import { generateUniqueKey, formatDate } from '../../../utils/utils';
import { getUserToken } from '../../../store/User/selectors';
import { MEDIA_URL } from '../../../utils/constants';

function NewTravelForm({ closeForm }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const [travelData, setTravelData] = useState({
    name: '',
    description: '',
    start_date: null,
    end_date: null,
    images: [],
    id: 0,
  });

  const travels = useSelector((state) => state.travels.travels);
  const token = useSelector(getUserToken);
  const isDiaryPage = () => location.pathname.includes('/diary/');
  const { travelId } = useParams();
  const userTravel = travels.find((card) => card.id.toString() === travelId);

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

  const handleSubmitNewTravel = async (event) => {
    event.preventDefault();
    const someId = generateUniqueKey();
    const newTravel = {
      id: someId,
      name: travelData.name,
      description: travelData.description,
      start_date: formatDate(travelData.start_date),
      end_date: formatDate(travelData.end_date),
      images: travelData.images,
      travelDaysEvents: [],
    };
    await dispatch(fetchNewTravel({ newTravel, token })).then(() => {
      dispatch(fetchTravels(token));
    })
    closeForm();
  };

  const handleSubmitEditTravel = async (event) => {
    event.preventDefault();
    const someId = +location.pathname.split('/diary/')[1];
    const existingTravel = travels.find((travel) => travel.id === someId);
    if (existingTravel) {
      const changedTravel = {
        id: someId,
        name: travelData.name,
        description: travelData.description,
        start_date: formatDate(travelData.start_date),
        end_date: formatDate(travelData.end_date),
        // images: travelData.images,
      };
      const updatedTravel = {
        ...existingTravel,
        ...changedTravel,
      };
      await dispatch(fetchEditTravel({ cardId: someId, data: updatedTravel, token })).then(() => {
        dispatch(fetchTravels(token));

      })
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
            images: [...travelData.images, e.target.result],
          }));
        };
        reader.readAsDataURL(file);
      }
    };
    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  };

  /* useEffect(() => {
    if (isDiaryPage()) {
      const someId = +location.pathname.split('/diary/')[1];
      const existingTravel = travels.find((travel) => travel.id === someId);
      const images =
        existingTravel && existingTravel.images.length
          ? [`${MEDIA_URL}/${existingTravel.images[0]}`]
          : [];


      setTravelData((prevData) => ({
        ...prevData,
        images,
      }));
    }
  }, [location.pathname, travels]);

  /* useEffect(() => {
    const isEditPage = isDiaryPage();
    if (isEditPage) {
      const someId = +location.pathname.split('/diary/')[1];
      const existingTravel = travels.find((travel) => travel.id === someId);
      if (existingTravel) {
        const images = existingTravel.images.length
          ? [`${MEDIA_URL}/${existingTravel.images[0]}`]
          : [];

        setTravelData({
          name: existingTravel.name,
          description: existingTravel.description,
          start_date: new Date(existingTravel.start_date),
          end_date: new Date(existingTravel.end_date),
          images,
        });
      }
    }
  }, [travels]);

  /* useEffect(() => {
    if (isDiaryPage() && userTravel) {
      setTravelData({
        name: userTravel.name,
        description: userTravel.description,
        start_date: new Date(userTravel.start_date),
        end_date: new Date(userTravel.end_date),
        images: userTravel.images,
      });
    }
  }, [isDiaryPage, userTravel]); */

  useEffect(() => {
    const isEditPage = isDiaryPage();
    if (isEditPage) {
      if (userTravel) {
        const images = userTravel.images.length
          ? [`${MEDIA_URL}/${userTravel.images[0]}`]
          : [];

        setTravelData({
          name: userTravel.name,
          description: userTravel.description,
          start_date: new Date(userTravel.start_date),
          end_date: new Date(userTravel.end_date),
          id: userTravel.id,
          images,
        });
      }
    }
  }, [travels]);

  return (
    <form
      className={`${styles.form_active} ${isDiaryPage() ? styles.form_withBorder : ''
        }`}
      onSubmit={isDiaryPage() ? handleSubmitEditTravel : handleSubmitNewTravel}
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
