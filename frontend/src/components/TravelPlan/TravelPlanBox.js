import React, { useState } from "react";
import PropTypes from 'prop-types';
import styles from './TravelPlan.module.css'
import travelTicket from '../../images/travel-plan/ticket.png'
import { hotel, event, plane } from "../../images/travel-plan";

function EventBox({ type, time, price, description, adress }) {
  const image = {
    plane,
    hotel,
    event
  }

  return (
    <div className={styles.eventBox}>
      <div className={styles.eventTimeAndIconBox}>
        <div className={styles.eventTimeBox}>
          {/* <span className={styles.eventTime}>14:00</span>  */}
          <span className={styles.eventTime}>{time}</span>
        </div>
        <img src={image[type]} alt="icon" className={styles.eventIcon} />
      </div>
      <div className={styles.eventSecondBox}>
        <div className={styles.eventButtonBox}>
          <h3 className={styles.eventHeaderText}>Перелёт</h3>
          <button type="button" className={styles.eventButton}> </button>
          <button type="button" className={styles.eventButtonTrash}> </button>
        </div>
        <div className={styles.eventDescriptionBox}>
          <p className={styles.eventSmallText}>{adress}</p>
          <p className={styles.eventSmallText}>{description}</p>
          {price && <p className={styles.eventPriceText}>{price}
            <span className={styles.eventPriceText}> ₽</span>
          </p>}
        </div>
      </div>
      <div className={styles.eventImageBox}>
        <img src={travelTicket} alt="Ticket" className={styles.eventImage} />
      </div>
    </div>
  )
}

function TravelPlanBox() {
  const [wrap, setWrap] = useState(false)

  return <div className={styles.box}>
    <div className={styles.dateBox}>
      <h2 className={styles.date}>21 июля, Пн</h2>
      <button type="button" className={wrap ? styles.triangle : styles.triangleClose} onClick={() => setWrap(!wrap)}> </button>
    </ div>
    {wrap && <div style={{ width: '100%' }}>
      <EventBox type="hotel" time='14:00' adress="Аэропорт Шереметьево, терминал B" description="Заселение в 14:00. Спросить про вид на сад" price="18 000" />
      <EventBox type="plane" time='14:00' />
    </div>
    }
  </div>
}

EventBox.propTypes = {
  type: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  adress: PropTypes.string,
  price: PropTypes.string,
  description: PropTypes.string
}

EventBox.defaultProps = {
  adress: '',
  price: '',
  description: ''
}

export default TravelPlanBox
