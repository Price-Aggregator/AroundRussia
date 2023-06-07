/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import styles from './CustomTooltip.module.css';

function CustomTooltip({ active, payload, label }) {
	if (active && payload && payload.length) {
		return (
			<div className={styles.customTooltip}>
				<div className={styles.customTooltip__box}>
					<p className={styles.customTooltip__text}>{`Дата: ${label}`}</p>
					<p
						className={styles.customTooltip__text}
					>{`Цена: от ${payload[0].value} руб.`}</p>
				</div>
			</div>
		);
	}

	return null;
}

export default CustomTooltip;
