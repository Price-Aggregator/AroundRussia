/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/react-in-jsx-scope */
import styles from './Calendar.module.css';
import Graph from './graph/Graph';
import PropTypes from 'prop-types';

export default function Calendar({ departureCity, arrivalCity }) {
	const tickets = [
		{ _id: 1346, date: '25, чт', price: 2000, from: 'moscow', to: 'tver' },
		{ _id: 24555, date: '26, пт', price: 3000, from: 'moscow', to: 'tver' },
		{ _id: 35666, date: '27, сб', price: 3000, from: 'moscow', to: 'tver' },
		{ _id: 456666, date: '28, вс', price: 4780, from: 'moscow', to: 'tver' },
		{ _id: 55543, date: '29, пн', price: 8890, from: 'moscow', to: 'tver' },
		{ _id: 64444, date: '30, вт', price: 9390, from: 'moscow', to: 'tver' },
		{ _id: 7344443, date: '31, ср', price: 8490, from: 'moscow', to: 'tver' },
		{ _id: 83332, date: '1, чт', price: 4490, from: 'moscow', to: 'tver' },
		{ _id: 934344, date: '2, пт', price: 5590, from: 'moscow', to: 'tver' },
		{ _id: 103424, date: '3, сб', price: 6590, from: 'moscow', to: 'tver' },
		{ _id: 11243, date: '4, вс', price: 7590, from: 'moscow', to: 'tver' },
		{ _id: 132433, date: '5, пн', price: 7000, from: 'moscow', to: 'tver' },
		{ _id: 14422, date: '6, вт', price: 3000, from: 'moscow', to: 'tver' },
		{ _id: 14422, date: '7, ср', price: 3000, from: 'moscow', to: 'tver' },
	];

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
				<Graph tickets={tickets} />
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
