import React from 'react';
import styles from './Search.module.css';

function SearchText() {

	return (
		<>
			<h1 className={styles.search__title}>Посмотрите на Россию по-новому!</h1>
			<p className={styles.search__subtitle}>
				Бронируйте билеты онлайн без комиссий и переплат, а мы подберем
				оптимальный маршрут
			</p>
		</>
	);
}

export default SearchText;
