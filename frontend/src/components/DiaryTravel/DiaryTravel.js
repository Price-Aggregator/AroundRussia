/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './DiaryTravel.module.css';
import { generateUniqueKey } from '../../utils/utils';
import TransportForm from '../DiaryTravelCategories/TransportForm/TransportForm';
import PropertyForm from '../DiaryTravelCategories/PropertyForm/PropertyForm';
import ActivityForm from '../DiaryTravelCategories/ActivityForm/ActivityForm';
import TravelPlan from '../TravelPlan/TravelPlan';

function DiaryTravel({ card }) {
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (card && card.travelDaysEvents.length > 1) {
      setIsEmpty(false)
    } else {
      setIsEmpty(true)
    }
  }, [card])

  const [IsActiveTransportForm, setIsActiveTransportForm] = useState(false);
  const [IsActivePropertyForm, setIsActivePropertyForm] = useState(false);
  const [IsActiveActivityForm, setIsActiveActivityForm] = useState(false);

  const openTransportForm = () => {
    setIsActivePropertyForm(false);
    setIsActiveActivityForm(false);
    setIsActiveTransportForm(true);
  };

  const closeTransportForm = () => {
    setIsActiveTransportForm(false);
  };

  const openPropertyForm = () => {
    setIsActiveTransportForm(false);
    setIsActiveActivityForm(false);
    setIsActivePropertyForm(true);
  };

  const closePropertyForm = () => {
    setIsActivePropertyForm(false);
  };

  const openActivityForm = () => {
    setIsActiveTransportForm(false);
    setIsActivePropertyForm(false);
    setIsActiveActivityForm(true);
  };

  const closeActivityForm = () => {
    setIsActiveActivityForm(false);
  };

  return (
    <div className={styles.card__box}>
      <Link to="/diary" className={styles.card__link}>
        Назад к путешествиям
      </Link>
      <article className={styles.card}>
        <div className={styles.card__textContentBox}>
          <div className={styles.card__textBox}>
            <h3 className={styles.card__title}>{card.title}</h3>
            <div className={styles.card__titleButtonBox}>
              <button
                type="button"
                className={`${styles.card__titleButton} ${styles.card__titleButton_edit}`}
              />
              <button
                type="button"
                className={`${styles.card__titleButton} ${styles.card__titleButton_delete}`}
              />
            </div>
          </div>
          <p
            className={styles.card__dates}
          >{`${card.startDate} — ${card.finishDate}`}</p>
          <div className={styles.card__buttonBox}>
            <button
              type="button"
              className={`${styles.card__button} ${styles.card__button_transport}`}
              onClick={openTransportForm}
            >
              Транспорт
            </button>
            <button
              type="button"
              className={`${styles.card__button} ${styles.card__button_accommodation}`}
              onClick={openPropertyForm}
            >
              Жилье
            </button>
            <button
              type="button"
              className={`${styles.card__button} ${styles.card__button_activity}`}
              onClick={openActivityForm}
            >
              Активности
            </button>
          </div>
        </div>
        <div className={styles.card__pictureBox}>
          <img
            className={styles.card__mainPicture}
            src={card.pictures[0]}
            alt={card.title}
          />
          <div className={styles.card__pictureList}>
            {card.pictures.slice([1], [4]).map((picture) => (
              <img
                className={styles.card__picture}
                src={picture}
                alt={picture}
                key={generateUniqueKey()}
              />
            ))}
            {card.pictures.length > 4 ? (
              <div className={styles.card__countBox}>
                <p className={styles.card__countNumber}>
                  +{card.pictures.length - 4}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </article>
      {IsActiveTransportForm && (
        <TransportForm closeForm={closeTransportForm} />
      )}
      {IsActivePropertyForm && <PropertyForm closeForm={closePropertyForm} />}
      {IsActiveActivityForm && <ActivityForm closeForm={closeActivityForm} />}
      {isEmpty &&
        !IsActiveTransportForm &&
        !IsActivePropertyForm &&
        !IsActiveActivityForm && (
          <div className={styles.card__emptyBunner}>
            <p className={styles.card__emptyText}>
              Здесь пока пусто. Давайте начнём планировать путешествие!
            </p>
          </div>
        )}
      {!isEmpty && <TravelPlan travelPlan={card.travelDaysEvents} />}
    </div>
  );
}

export default DiaryTravel;

DiaryTravel.propTypes = {
  card: PropTypes.shape({
    title: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    finishDate: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
    travelDaysEvents: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.array,
      PropTypes.object
    ]))
  }).isRequired,
};
