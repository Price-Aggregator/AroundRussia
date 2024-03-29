import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styles from './Ticket.module.css'
import TicketPriceBox from './TicketPriceBox';
import TicketInfoBox from './TicketInfoBox';
import getTickets from '../../store/Tickets/selectors';
import { airlines } from '../../utils/constants';
import { defaultIcon } from '../../images/avia-company';


function Ticket({ bestPrice, id, oneTransfer }) {

  const ticket = useSelector(getTickets).find(item => item.link === id)

  return <article className={styles.ticket}>
    {bestPrice && <div className={styles.ticket__best_price}>Самый дешевый</div>}
    {oneTransfer && <div className={styles.ticket__one_transfer}>c 1 пересадкой</div>}
    {ticket && <TicketPriceBox price={ticket.price} link={ticket.link} />}
    {ticket && <TicketInfoBox company={airlines[ticket.airline] ? airlines[ticket.airline].airlinesName : 'Авиакомпания '}
      image={airlines[ticket.airline] ? airlines[ticket.airline].airlinesLogo : defaultIcon} ticket={ticket} />}
  </article>;
}

Ticket.propTypes = {
  bestPrice: PropTypes.bool,
  id: PropTypes.string.isRequired,
  oneTransfer: PropTypes.bool
}

Ticket.defaultProps = {
  bestPrice: false,
  oneTransfer: false
}

export default Ticket;
