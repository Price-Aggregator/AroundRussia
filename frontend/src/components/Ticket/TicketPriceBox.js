import React from "react";
import PropTypes from 'prop-types';
import styles from './Ticket.module.css'


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

TicketPriceBox.propTypes = {
  price: PropTypes.string.isRequired,
}

export default TicketPriceBox
