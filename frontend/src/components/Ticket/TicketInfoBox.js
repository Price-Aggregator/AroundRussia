import React from "react";
import PropTypes from 'prop-types';
import TicketContent from "./TicketContent";
import styles from './Ticket.module.css'




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

TicketInfoBox.propTypes = {
  company: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  segments: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired
}

export default TicketInfoBox
