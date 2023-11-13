import React from 'react';
import PropTypes from 'prop-types';
import styles from './CustomTooltip.module.css';

export default function CustomTooltip({ active, payload }) {
	if (active && payload && payload.length) {
		return (
			<div className={styles.customTooltip}>
				<div className={styles.customTooltip__box}>
					<p
						className={styles.customTooltip__text}
					>{`от ${payload[0].value} ₽`}</p>
				</div>
			</div>
		);
	}

	return null;
}

CustomTooltip.propTypes = {
	active: PropTypes.bool.isRequired,
	payload: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.number.isRequired,
		})
	).isRequired,
};
