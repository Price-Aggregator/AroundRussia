import React from "react";
import PropTypes from 'prop-types';
import styles from './Ticket.module.css'
import { dayOfWeek, monthsInTicket } from "../../utils/constants";

function TicketDateContent({ date, time, city }) {

  const dayDate = new Date(date)
  const dayOnWeek = dayDate.toUTCString().slice(0, 3)
  const day = dayDate.getDate()
  const mounth = dayDate.getMonth() + 1

  console.log(mounth)

  return (
    <div className={styles.ticket__date_content}>
      <span className={styles.price_text}>{time}</span>
      <div className={styles.ticket__city_content}>
        <span className={styles.ticket__text}>{city}</span>
        <span className={styles.ticket__text}>{`${day} ${monthsInTicket[mounth]} ${dayOfWeek[dayOnWeek]}`}</span>
      </div>

    </div>
  )
}

function TicketDurationContent({ originCode, destinationCode, duration }) {
  return (
    <div className={styles.ticket__middle}>
      <div className={styles.ticket__duration}>
        <span className={styles.ticket__text}>В пути:
          <span>{duration}</span>
        </span>
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

  const { date, duration, destination, origin, originAirport, destinationAirport } = ticket

  function getTimeFromMins(mins) {
    const hours = Math.trunc(mins / 60);
    const minutes = mins % 60;
    if (minutes.toString().length < 2) {
      return `${hours}:0 ${minutes}`;
    }
    return `${hours}:${minutes}`;
  };

  const durationArr = getTimeFromMins(duration).split(':')

  const getDestinationdDate = () => {
    const millisec = Date.parse(date)
    const data = new Date(millisec + duration * 60 * 1000).toString()
    return data
  }
  const destinationDate = getDestinationdDate()

  return (
    <div className={styles.ticket__content}>
      <TicketDateContent date={date} time={date.slice(11, 16)} city={origin} />
      <TicketDurationContent originCode={originAirport} destinationCode={destinationAirport} duration={` ${durationArr[0]}ч ${durationArr[1]}м`} />
      <TicketDateContent date={destinationDate} time={destinationDate.slice(16, 21)} city={destination} />
    </div>
  )
}

TicketContent.propTypes = {
  ticket: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired
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
