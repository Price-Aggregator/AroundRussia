import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styles from './Ticket.module.css'
import TicketPriceBox from './TicketPriceBox';
import TicketInfoBox from './TicketInfoBox';
import getTickets from '../../store/Tickets/selectors';
import { urals, s7, aeroflot, defaultIcon, nordStar, orenburg, pobeda, redWings, russia, smartAvia, utair, yakutia, yamal } from '../../images/avia-company/index'



function Ticket({ bestPrice, id, oneTransfer }) {

  const ticket = useSelector(getTickets).find(item => item.link === id)

  let airlinesLogo;
  let airlinesName;
  switch (ticket.airline) {
    case 'S7':
      airlinesLogo = s7;
      airlinesName = 'Победа'
      break;
    case 'SU':
      airlinesLogo = aeroflot;
      airlinesName = 'Аэрофлот'
      break;
    case 'U6':
      airlinesLogo = urals;
      airlinesName = 'Уральские авиалинии'
      break;
    case 'Y7':
      airlinesLogo = nordStar;
      airlinesName = 'Nord Star'
      break;
    case 'R2':
      airlinesLogo = orenburg;
      airlinesName = 'Оренбургские авиалинии'
      break;
    case 'DP':
      airlinesLogo = pobeda;
      airlinesName = 'Победа'
      break;
    case 'WZ':
      airlinesLogo = redWings;
      airlinesName = 'Red Wings'
      break;
    case 'FV':
      airlinesLogo = russia;
      airlinesName = 'Россия '
      break;
    case '5N':
      airlinesLogo = smartAvia;
      airlinesName = 'Smart Avia'
      break;
    case 'UT':
      airlinesLogo = utair;
      airlinesName = 'Utair'
      break;
    case 'R3':
      airlinesLogo = yakutia;
      airlinesName = 'Якутия'
      break;
    case 'YL':
      airlinesLogo = yamal;
      airlinesName = 'Ямал'
      break;
    default:
      airlinesLogo = defaultIcon;
      break;
  }

  return <article className={styles.ticket}>
    {bestPrice && <div className={styles.ticket__best_price}>Самый дешевый</div>}
    {oneTransfer && <div className={styles.ticket__one_transfer}>c 1 пересадкой</div>}
    {ticket && <TicketPriceBox price={ticket.price} link={ticket.link} />}
    {ticket && <TicketInfoBox company={airlinesName} image={airlinesLogo} ticket={ticket} />}
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
