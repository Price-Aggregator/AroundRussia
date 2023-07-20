import React from 'react';
import PropTypes from 'prop-types';
import styles from './ActivityButton.module.css';

function ActivityButton({ handleClick, buttonName }) {
	let buttonClassName = styles.card__button;

	if (buttonName === 'Транспорт') {
		buttonClassName += ` ${styles.card__button_transport}`;
	} else if (buttonName === 'Жилье') {
		buttonClassName += ` ${styles.card__button_accommodation}`;
	} else {
		buttonClassName += ` ${styles.card__button_activity}`;
	}

	return (
		<div className={styles.card__buttonbox}>
			<button
				type="button"
				className={`${styles.card__button} ${buttonClassName}`}
				onClick={handleClick}
			>
				{buttonName}
			</button>
			<div className={styles.card__buttonTooltip_triangle} />
			<div className={styles.card__buttonTooltip}>
				<p
					className={styles.card__buttonTooltipText}
				>{`Добавьте ${buttonName[0].toLowerCase()}${buttonName.slice(1)}`}</p>
			</div>
		</div>
	);
}

export default ActivityButton;

ActivityButton.propTypes = {
	handleClick: PropTypes.func,
	buttonName: PropTypes.string,
};

ActivityButton.defaultProps = {
	handleClick: () => {},
	buttonName: 'click',
};
