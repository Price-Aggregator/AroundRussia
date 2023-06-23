/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './Calendar.module.css';
import Graph from './graph/Graph';
import { getAllCities } from '../../store/Cities/selectors';
import getSearchFormState from '../../store/SearchForm/selectors';
import getCalendare from '../../store/Calendar/selectors';

export default function Calendar() {
  const cities = useSelector(getAllCities);
  const form = useSelector(getSearchFormState);
  const arrival = cities.find((item) => item.code === form.to);
  const departure = cities.find((item) => item.code === form.from);
  const calendare = useSelector(getCalendare);

  const [firstMonth, setFirstMonth] = useState('');
  const [secondMonth, setSecondMonth] = useState('');

  useEffect(() => {
    /* сюда прокинуть вместо calendarData данные от бека */
    if (calendare.length > 0) {
      const formatMonth = (date) =>
        date.toLocaleString('ru-RU', { month: 'long' });
      const getYear = (dateString) => new Date(dateString).getFullYear();

      const [firstHalf, secondHalf] = [
        /* в две строчки ниже тоже прокинуть вместо calendarData данные от бека */
        calendare.slice(0, Math.ceil(calendare.length / 2)),
        calendare.slice(Math.ceil(calendare.length / 2)),
      ];

      const [firstMonths, secondMonths] = [
        [...new Set(firstHalf.map((item) => formatMonth(new Date(item.date))))],
        [
          ...new Set(
            secondHalf.map((item) => formatMonth(new Date(item.date)))
          ),
        ],
      ];

      const [firstYear, secondYear] = [
        getYear(firstHalf[firstHalf.length - 1]?.date),
        getYear(secondHalf[secondHalf.length - 1]?.date),
      ];

      const capitalizeFirstLetter = (string) =>
        string.charAt(0).toUpperCase() + string.slice(1);

      const capitalizedStringFirstMonth = capitalizeFirstLetter(
        firstMonths.join(', ')
      );
      const capitalizedStringSecondMonth = capitalizeFirstLetter(
        secondMonths.join(', ')
      );

      setFirstMonth(`${capitalizedStringFirstMonth} ${firstYear}`);
      setSecondMonth(`${capitalizedStringSecondMonth} ${secondYear}`);
    }
  }, [calendare]);

  return (
    <section className={styles.calendar}>
      <h2 className={styles.calendar__title}>Календарь низких цен</h2>
      <div className={styles.calendar__city_group}>
        <p className={styles.calendar__city}>
          {' '}
          Откуда:{' '}
          <span className={styles.calendar__city_span}>{departure?.name}</span>
        </p>
        <p className={styles.calendar__city}>
          {' '}
          Куда:{' '}
          <span className={styles.calendar__city_span}>{arrival?.name}</span>
        </p>
      </div>
      <div className={styles.calendar__graph_box}>
        {/* сюда прокинуть вместо calendarData данные от бека */}
        <Graph tickets={calendare} />
        <div className={styles.calendar__month_group}>
          <div className={styles.calendar__month_box}>
            <div className={styles.calendar__month_icon} />
            <span className={styles.calendar__month_text}>{firstMonth}</span>
            <div
              className={`${styles.calendar__month_icon} ${styles.calendar__month_icon_revert}`}
            />
          </div>
          <div className={styles.calendar__month_box}>
            <div className={styles.calendar__month_icon} />
            <span className={styles.calendar__month_text}>{secondMonth}</span>
            <div
              className={`${styles.calendar__month_icon} ${styles.calendar__month_icon_revert}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

