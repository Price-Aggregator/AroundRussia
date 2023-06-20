import React from "react";
import PropTypes from 'prop-types';
import TicketContent from "./TicketContent";
import styles from './Ticket.module.css'


function TicketInfoBox({ company, image, ticket }) {
  const departureTicket = {
    date: ticket.departure_at,
    duration: ticket.duration_to,
    destination: ticket.destination,
    origin: ticket.origin,
    originAirport: ticket.origin_airport,
    destinationAirport: ticket.destination_airport
  }

  const returnTicket = {
    date: ticket.return_at,
    duration: ticket.duration_back,
    destination: ticket.origin,
    origin: ticket.destination,
    originAirport: ticket.destination_airport,
    destinationAirport: ticket.origin_airport
  }

  return (
    <div className={styles.ticket__info}>
      <div className={styles.company__box}>
        <img src={image} alt='avia-company-logo' className={styles.company__image} />
        <span className={styles.company__name}>{company}</span>
      </div>
      <div className={styles.tickets__content_box}>
        <TicketContent ticket={departureTicket} />
        <TicketContent ticket={returnTicket} />
      </div>
    </div>
  )
}

TicketInfoBox.propTypes = {
  company: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  ticket: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])).isRequired
}

export default TicketInfoBox
