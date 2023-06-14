import React from 'react';
import styles from './Search.module.css';
import calendar from '../../images/calendar.svg';

function SearchForm() {
	function handleSubmit(e) {
		e.preventDefault();
	}
	return (
		<>
			<p className={styles.search__label}>Авиабилеты</p>
			<form className={styles.search__form} onSubmit={handleSubmit}>
				<input
					type="text"
					className={styles.search__input_left}
					placeholder="Откуда"
					name="from"
					required
				/>
				<input
					type="text"
					className={styles.search__input}
					placeholder="Куда"
					name="to"
					required
				/>
				<div className={styles.search__wrapper}>
					<input
						type="text"
						className={styles.search__input}
						placeholder="Куда"
						name="to"
						required
					/>
					<img className={styles.search__image} alt="calendar" src={calendar} />
				</div>
				<div className={styles.search__wrapper}>
					<input
						type="text"
						className={styles.search__input_right}
						placeholder="Куда"
						name="to"
						required
					/>
					<img className={styles.search__image} alt="calendar" src={calendar} />
				</div>
        <button className={styles.search__button} type="submit">
					Найти
				</button>
			</form>
		</>
	);
}

export default SearchForm;
