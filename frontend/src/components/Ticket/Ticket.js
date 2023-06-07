import React from 'react';
import PropTypes from 'prop-types';
import styles from './Ticket.module.css'

function Ticket({ price }) {
  return <div className={styles.ticket}>
    <div className={styles.ticket__price}>
      <div className={styles.ticket__price_box}>
        <span>{price}
          <span>₽</span>
        </span>
        <button type='button'>Выбрать билет</button>
      </div>
    </div>
  </div>;
}

Ticket.propTypes = {
  price: PropTypes.string.isRequired
}

export default Ticket;
