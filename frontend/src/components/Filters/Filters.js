/* eslint react/prop-types: 0 */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styles from './Filters.module.css';

export default function Filters() {
	return (
		<section className={styles.filters}>
			<h2 className={styles.filters__title}>Фильтры</h2>
			<section className={styles.filter__set}>
				<h3 className={styles.filter__header}>Пересадки</h3>
				<div className={styles.filter__group}>
					<label htmlFor="radio-no-transfer">
						<input
							className={styles.filter__radio}
							type="radio"
							name="transfer"
							id="radio-no-transfer"
						/>
						Без пересадок
					</label>
					<label htmlFor="radio-1-transfer">
						<input
							className={styles.filter__radio}
							type="radio"
							name="transfer"
							id="radio-1-transfer"
						/>
						1 пересадка
					</label>
				</div>
			</section>
			<section className={styles.filter__set}>
				<h3 className={styles.filter__header}>Сортировка</h3>
				<div className={styles.filter__group}>
					<label htmlFor="radio-suggested-filter">
						<input
							className={styles.filter__radio}
							type="radio"
							name="filter"
							id="radio-suggested-filter"
						/>
						Сначала рекомендуемые
					</label>
					<label htmlFor="radio-cheapest-filter">
						<input
							className={styles.filter__radio}
							type="radio"
							name="filter"
							id="radio-cheapest-filter"
						/>
						Сначала дешёвые
					</label>
					<label htmlFor="radio-time-filter">
						<input
							className={styles.filter__radio}
							type="radio"
							name="filter"
							id="radio-time-filter"
						/>
						Время вылета
					</label>
				</div>
			</section>
		</section>
	);
}
