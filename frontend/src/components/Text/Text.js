import React from 'react';
import iconTicket from '../../images/icon_ticket.svg';
import iconSupport from '../../images/icon_support.svg';
import iconCircle from '../../images/icon_circle.svg';

function Text() {
	return (
		<div className="text">
			<div className="text__item">
				<img src={iconTicket} alt="ticket" />
				<p className="text__content">
					Выбирайте направление и покупайте билет парой кликов, не выходя из
					дома
				</p>
			</div>
			<div className="text__item">
				<img src={iconSupport} alt="support" />
				<p className="text__content">
					Компетентная служба поддержки всегда на связи и готова вам помочь в
					любое время
				</p>
			</div>
			<div className="text__item">
				<img src={iconCircle} alt="support" />
				<p className="text__content">
					Наша система регулярно анализирует и обновляет данные о турах и ценах
					на билеты
				</p>
			</div>
		</div>
	);
}

export default Text;
