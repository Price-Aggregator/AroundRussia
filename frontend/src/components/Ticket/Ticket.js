import React from 'react';
import PropTypes from 'prop-types';
import styles from './Ticket.module.css'
import aviaUp from '../../images/airplane-up.svg'
import aviaDown from '../../images/airplane-down.svg'


function TicketPriceBox({ price }) {
  return (
    <div className={styles.ticket__price}>
      <div className={styles.ticket__price_box}>
        <span className={styles.price_text}>{price}
          <span className={styles.price_text}> ₽</span>
        </span>
        <button type='button' className={styles.button}>Выбрать билет</button>
      </div>
    </div>
  )
}

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

function TicketInfoBox({ company, image, segments }) {
  return (
    <div className={styles.ticket__info}>
      <div className={styles.company__box}>
        <img src={image} alt='avia-company-logo' className={styles.company__image} />
        <span className={styles.company__name}>{company}</span>
      </div>
      <div className={styles.tickets__content_box}>
        {segments && segments.map((item, index) =>
          // eslint-disable-next-line
          <TicketContent ticket={item} key={index} />
        )}
      </div>
    </div>
  )
}

function Ticket({ price, company, image, segments, bestPrice }) {
  return <div className={styles.ticket}>
    {bestPrice && <div className={styles.ticket__best_price}>Самый дешевый</div>}
    <TicketPriceBox price={price} />
    <TicketInfoBox company={company} image={image} segments={segments} />
  </div>;
}

TicketPriceBox.propTypes = {
  price: PropTypes.string.isRequired,
}

TicketInfoBox.propTypes = {
  company: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  segments: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired
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

Ticket.propTypes = {
  price: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  segments: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  bestPrice: PropTypes.bool
}

Ticket.defaultProps = {
  bestPrice: false
}

export default Ticket;
