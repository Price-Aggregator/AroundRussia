import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styles from './Ticket.module.css'
import TicketPriceBox from './TicketPriceBox';
import TicketInfoBox from './TicketInfoBox';
import getTickets from '../../store/Tickets/selectors';



function Ticket({ bestPrice, id }) {

  const ticket = useSelector(getTickets).find(item => item.id === id)

  return <div className={styles.ticket}>
    {bestPrice && <div className={styles.ticket__best_price}>Самый дешевый</div>}
    <TicketPriceBox price={ticket.price} />
    <TicketInfoBox company={ticket.company} image={ticket.image} segments={ticket.segments} />
  </div>;
}

Ticket.propTypes = {
  bestPrice: PropTypes.bool,
  id: PropTypes.number.isRequired
}

Ticket.defaultProps = {
  bestPrice: false
}

export default Ticket;
