import React from "react";
import PropTypes from 'prop-types';
import styles from './Ticket.module.css'


function TicketPriceBox({ price, link }) {
  const priceString = price.toString().split('')
  priceString.splice(-3, 0, ' ')

  return (
    <div className={styles.ticket__price}>
      <div className={styles.ticket__price_box}>
        <span className={styles.price_text}>{priceString.join('')}
          <span className={styles.price_text}> ₽</span>
        </span>
        <button type='button' className={styles.button}>
          <a href={link} target='_blank' rel="noreferrer" className={styles.ticket__link}>Выбрать билет</a>
        </button>
      </div>
    </div>
  )
}

TicketPriceBox.propTypes = {
  price: PropTypes.number.isRequired,
  link: PropTypes.string
}

TicketPriceBox.defaultProps = {
  link: ''
}

export default TicketPriceBox
