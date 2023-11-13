import React from 'react';
import iconTicket from '../../images/icon_ticket.svg';
import iconSupport from '../../images/icon_support.svg';
import iconCircle from '../../images/icon_circle.svg';
import styles from './Text.module.css';
import TextItem from './TextItem';

function Text() {
	return (
		<div className={styles.text}>
			<TextItem
				image={iconTicket}
				alt="ticket"
				text="Выбирайте направление и покупайте билет парой кликов, не выходя из дома"
			/>
			<TextItem
				image={iconSupport}
				alt="support"
				text="Компетентная служба поддержки всегда на связи и готова вам помочь в
        любое время"
			/>
			<TextItem
				image={iconCircle}
				alt="system"
				text="Наша система регулярно анализирует и обновляет данные о турах и ценах
        на билеты"
			/>
		</div>
	);
}

export default Text;
