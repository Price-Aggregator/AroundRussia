import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NewTravelForm from './NewTravelForm/NewTravelForm';
import styles from './DiaryTravelList.module.css';
import DiaryCardPreview from '../DiaryCardPreview/DiaryCardPreview';
import { setTravels } from '../../store/Travels/slice';
import getTravels from '../../store/Travels/selectors';

function DiaryTravelList() {
  const dispatch = useDispatch();
  const travels = useSelector(getTravels);
  const [IsActiveForm, setIsActiveForm] = useState(false);

  const openForm = () => {
    setIsActiveForm(true);
  };

  const closeForm = () => {
    setIsActiveForm(false);
  };

  useEffect(() => {
    const savedTravels = JSON.parse(localStorage.getItem('travels'));
    if (savedTravels) {
      dispatch(setTravels(savedTravels));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('travels', JSON.stringify(travels));
  }, [travels]);

  return (
    <section className={styles.diary}>
      <div className={styles.diary__background}>
        <h2 className={styles.diary__title}>Дневник путешественника</h2>
        {travels.length < 1 ? (
          <div className={styles.diary__textbox}>
            <p className={styles.diary__subtitle}>
              У вас пока нет ни одного запланированного путешествия.
            </p>
            <p className={styles.diary__subtitle}>Давайте исправим это!</p>
          </div>
        ) : null}
        <button
          className={`${styles.diary__button} ${travels.length < 1
              ? styles.diary__button_withoutCards
              : styles.diary__button_withCards
            } ${IsActiveForm ? styles.diary__button_grey : null}`}
          type="button"
          onClick={openForm}
        >
          Добавить путешествие
        </button>
      </div>

      {IsActiveForm && <NewTravelForm closeForm={closeForm} />}
      <div
        className={`${styles.dairy__travels} ${!IsActiveForm && travels.length !== 0
            ? styles.dairy__travels_relative
            : null
          } ${IsActiveForm && travels.length > 0
            ? styles.dairy__travels_margin
            : null
          }`}
      >
        {travels.map((card) => (
          <DiaryCardPreview card={card} key={card.id} />
        ))}
      </div>
    </section>
  );
}

export default DiaryTravelList;
