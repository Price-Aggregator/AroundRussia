import React from 'react';
import iconTicket from '../../images/icon_ticket.svg';
import iconSupport from '../../images/icon_support.svg';
import iconCircle from '../../images/icon_circle.svg';
import styles from './Text.module.css';

function Text() {
	return (
		<div className={styles.text}>
			<div className={styles.text__item}>
				<img src={iconTicket} alt="ticket" />
				<p className={styles.text__content}>
					Выбирайте направление и покупайте билет парой кликов, не выходя из
					дома
				</p>
			</div>
			<div className={styles.text__item}>
				<img src={iconSupport} alt="support" />
				<p className={styles.text__content}>
					Компетентная служба поддержки всегда на связи и готова вам помочь в
					любое время
				</p>
			</div>
			<div className={styles.text__item}>
				<img src={iconCircle} alt="support" />
				<p className={styles.text__content}>
					Наша система регулярно анализирует и обновляет данные о турах и ценах
					на билеты
				</p>
			</div>
		</div>
	);
}

export default Text;
