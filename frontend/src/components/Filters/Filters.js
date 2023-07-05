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
	const [direct, setDirect] = useState('');
	const [isDirectChecked, setIsDirectChecked] = useState(false);
	const [isIndirectChecked, setIsIndirectChecked] = useState(false);

	const updateState = () => {
		if (isDirectChecked && isIndirectChecked) {
			setDirect('');
			/* eslint-disable-next-line no-else-return */
		} else if (!isDirectChecked && !isIndirectChecked) {
			setDirect('');
		} else if (isDirectChecked) {
			setDirect('true');
		} else {
			setDirect('false');
		}
	};

	function handleDirectClick() {
		if (isDirectChecked && isIndirectChecked) {
			setDirect('');
			/* eslint-disable-next-line no-else-return */
		} else if (!isDirectChecked && !isIndirectChecked) {
			setDirect('');
		} else if (isDirectChecked) {
			setDirect('true');
		} else {
			setDirect('false');
		}
		setIsDirectChecked(!isDirectChecked);
	}

	function handleIndirectClick() {
		if (isDirectChecked && isIndirectChecked) {
			console.log('0');
			setDirect('');
			/* eslint-disable-next-line no-else-return */
		} else if (!isDirectChecked && !isIndirectChecked) {
			setDirect('');
		} else if (isDirectChecked) {
			setDirect('true');
		} else {
			setDirect('false');
		}
		setIsIndirectChecked(!isIndirectChecked);
	}

	useEffect(() => {
		setDirect(updateState());
		updateState();
		const filterinfo = { direct, sorting };
		dispatch(setFilters(filterinfo));
	}, [isDirectChecked, isIndirectChecked]);

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
					<input
						className={styles.filter__checkbox}
						type="checkbox"
						name="direct"
						id="checkbox-direct"
						value={isDirectChecked}
						checked={isDirectChecked}
						onChange={handleDirectClick}
					/>
					{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
					<label className={styles.filter__control} htmlFor="checkbox-direct">
						Без пересадок
					</label>

					<input
						className={styles.filter__checkbox}
						type="checkbox"
						name="direct"
						id="checkbox-not-direct"
						value={isIndirectChecked}
						checked={isIndirectChecked}
						onChange={handleIndirectClick}
					/>
					{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
					<label
						className={styles.filter__control}
						htmlFor="checkbox-not-direct"
					>
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
