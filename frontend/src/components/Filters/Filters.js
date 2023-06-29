/* eslint react/prop-types: 0 */
/* eslint-disable react/jsx-props-no-spreading */
// import React, { useState, useEffect } from 'react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Accordion, AccordionItem as Item } from '@szhsin/react-accordion';
import styles from './Filters.module.css';
import chevron from '../../images/chevron-down.svg';
import { setFilters } from '../../store/Filter/slice';
/**
 * @type {React.ExoticComponent<import('@szhsin/react-accordion').AccordionItemProps>}
 */
function AccordionItem({ header, ...rest }) {
	return (
		<Item
			{...rest}
			header={
				<>
					<h3 className={styles.filter__header}>{header}</h3>
					<img
						className={styles.filtersChevron}
						src={chevron}
						alt="Chevron Down"
					/>
				</>
			}
			className={styles.filtersItem}
			buttonProps={{
				className: ({ isEnter }) =>
					`${styles.filtersItemBtn} ${
						isEnter && styles.filtersitemBtnExpanded
					}`,
			}}
			panelProps={{ className: styles.filterstemPanel }}
		/>
	);
}

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
			{/* `transitionTimeout` prop should be equal to the transition duration in CSS */}
			<Accordion transition transitionTimeout={250}>
				<AccordionItem header="Пересадки">
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
				</AccordionItem>
			</Accordion>
			<Accordion transition transitionTimeout={250}>
				<AccordionItem header="Сортировка">
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
				</AccordionItem>
			</Accordion>
		</section>
	);
}
