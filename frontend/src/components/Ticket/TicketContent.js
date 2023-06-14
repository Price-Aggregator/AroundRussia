import React from "react";
import PropTypes from 'prop-types';
import styles from './Ticket.module.css'
import aviaUp from '../../images/airplane-up.svg'
import aviaDown from '../../images/airplane-down.svg'

function TicketDateContent({ date, time, city }) {
  return (
    <div className={styles.ticket__date_content}>
      <span className={styles.price_text}>{time}</span>
      <div className={styles.ticket__city_content}>
        <span className={styles.ticket__city_text}>{city}</span>
        <span className={styles.ticket__city_text}>{date}</span>
      </div>

    </div>
  )
}

function TicketDurationContent({ originCode, destinationCode, duration }) {
  return (
    <div className={styles.ticket__middle}>
      <div className={styles.ticket__duration}>
        <img src={aviaUp} alt='airplane-up' />
        <span className={styles.ticket__city_text}>В пути:
          <span> {duration}</span>
        </span>
        <img src={aviaDown} alt='aiplane-down' />
      </div>
      <div className={styles.line} />
      <div className={styles.ticket__code_block}>
        <span className={styles.code}>{originCode}</span>
        <span className={styles.code}>{destinationCode}</span>
      </div>

    </div>
  )
}

function TicketContent({ ticket }) {
  const { origin,
    originCode,
    destination,
    destinationCode,
    date,
    time,
    duration,
    dateDest,
    timeDest } = ticket

  return (
    <div className={styles.ticket__content}>
      <TicketDateContent date={date} time={time} city={origin} />
      <TicketDurationContent originCode={originCode} destinationCode={destinationCode} duration={duration} />
      <TicketDateContent date={dateDest} time={timeDest} city={destination} />
    </div>
  )
}


TicketContent.propTypes = {
  ticket: PropTypes.objectOf(PropTypes.string).isRequired
}

TicketDateContent.propTypes = {
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired
}

TicketDurationContent.propTypes = {
  originCode: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  destinationCode: PropTypes.string.isRequired
}

export default TicketContent
