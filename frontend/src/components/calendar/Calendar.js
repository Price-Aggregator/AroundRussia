/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/react-in-jsx-scope */
import styles from './Calendar.module.css';
import Graph from './graph/Graph';
import PropTypes from 'prop-types';
import {calendarData} from '../../utils/constants';

export default function Calendar({ departureCity, arrivalCity }) {
	return (
		<section className={styles.calendar}>
			<h2 className={styles.calendar__title}>Календарь низких цен </h2>
			<div className={styles.calendar__city_group}>
				<p className={styles.calendar__city}>
					{' '}
					Откуда:
					<span className={styles.calendar__city_span}>{departureCity}</span>
				</p>
				<p className={styles.calendar__city}>
					{' '}
					Куда:
					<span className={styles.calendar__city_span}>{arrivalCity}</span>
				</p>
			</div>
			<div className={styles.calendar__graph_box}>
				<Graph tickets={calendarData} />
				<div className={styles.calendar__month_group}>
					<div className={styles.calendar__month_box}>
						<div className={styles.calendar__month_icon} />
						<span className={styles.calendar__month_text}>Май 2023</span>
						<div
							className={`${styles.calendar__month_icon} ${styles.calendar__month_icon_revert}`}
						/>
					</div>
					<div className={styles.calendar__month_box}>
						<div className={styles.calendar__month_icon} />
						<span className={styles.calendar__month_text}>Июнь 2023</span>
						<div
							className={`${styles.calendar__month_icon} ${styles.calendar__month_icon_revert}`}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

Calendar.propTypes = {
	departureCity: PropTypes.string.isRequired,
	arrivalCity: PropTypes.string.isRequired,
};
