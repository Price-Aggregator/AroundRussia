/* eslint react/prop-types: 0 */
/* eslint-disable react/jsx-props-no-spreading */
// import React, { useState, useEffect } from 'react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Filters.module.css';
import { setFilters } from '../../store/Filter/slice';

export default function Filters() {
	const dispatch = useDispatch();
	const [sorting, setSorting] = useState('price');
	const [direct, setDirect] = useState('false');

	useEffect(() => {
		const filterinfo = { direct, sorting };
		dispatch(setFilters(filterinfo));
	}, [direct, sorting]);

	return (
		<section className={styles.filters}>
			<h2 className={styles.filters__title}>Фильтры</h2>
			<section className={styles.filter__set}>
				<h3 className={styles.filter__header}>Пересадки</h3>
					<div className={styles.filter__group}>
						<label htmlFor="radio-direct">
							<input
								className={styles.filter__radio}
								type="radio"
								name="direct"
								id="radio-direct"
								value="true"
								checked={direct === 'true'}
								onChange={(e) => setDirect(e.target.value)}
							/>
							Без пересадок
						</label>
						<label htmlFor="radio-not-direct">
							<input
								className={styles.filter__radio}
								type="radio"
								name="direct"
								id="radio-not-direct"
								value="false"
								checked={direct === 'false'}
								onChange={(e) => setDirect(e.target.value)}
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
								value="route"
								checked={sorting === 'route'}
								onChange={(e) => setSorting(e.target.value)}
							/>
							Сначала рекомендуемые
						</label>
						<label htmlFor="radio-cheapest-filter">
							<input
								className={styles.filter__radio}
								type="radio"
								name="filter"
								id="radio-cheapest-filter"
								value="price"
								checked={sorting === 'price'}
								onChange={(e) => setSorting(e.target.value)}
							/>
							Сначала дешёвые
						</label>
						<label htmlFor="radio-time-filter">
							<input
								className={styles.filter__radio}
								type="radio"
								name="filter"
								id="radio-time-filter"
								value="time"
								checked={sorting === 'time'}
								onChange={(e) => setSorting(e.target.value)}
							/>
							Время вылета
						</label>
					</div>
          </section>
		</section>
	);
}

