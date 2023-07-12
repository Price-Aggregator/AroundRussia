import React, { useState } from "react";
import PropTypes from 'prop-types';
import styles from './TravelPlan.module.css'
import travelTicket from '../../images/travel-plan/ticket.png'
import { hotel, event, plane } from "../../images/travel-plan";

function EventBox({ type }) {
  const image = {
    plane,
    hotel,
    event
  }

  return (
    <div className={styles.eventBox}>
      <div className={styles.eventTimeAndIconBox}>
        <div className={styles.eventTimeBox}>
          {/* <span className={styles.eventTime}>14:00</span> */}
          <span className={styles.eventTime}>14:00</span>
        </div>
        <img src={image[type]} alt="icon" className={styles.eventIcon} />
      </div>
      <div>
        <h3>Перелёт</h3>
      </div>
      <div>
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
    {wrap &&
      <EventBox type="hotel" />
    }
  </div>
}

EventBox.propTypes = {
  type: PropTypes.string.isRequired
}

export default TravelPlanBox
