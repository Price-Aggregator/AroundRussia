import React from 'react';
import styles from './Search.module.css';
import calendar from '../../images/calendar.svg';

function Search() {
	function handleSubmit(e) {
		e.preventDefault();
	}
	return (
		<div className={styles.search}>
			<h1 className={styles.search__title}>Посмотрите на Россию по-новому!</h1>
			<p className={styles.search__subtitle}>
				Бронируйте туры онлайн без комиссий и переплат, а мы подберем
				оптимальный маршрут
			</p>
			<p className={styles.search__label}>Авиабилеты</p>
			<form className={styles.search__form} onSubmit={handleSubmit}>
				<button className={styles.search__button} type="submit">
					Найти
				</button>
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
			</form>
		</div>
	);
}

export default Search;
