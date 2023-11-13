import React from 'react';
import styles from './Loader.module.css';

function Loader() {
	return (
		<div className={styles.loader}>
			<div className={styles.loader__text_box}>
				<p className={styles.loader__title}>Идем за вашими билетами</p>
				<p className={styles.loader__subtitle}>Это займет несколько секунд</p>
			</div>
			<div className={styles.loader__picture} />
		</div>
	);
}

export default Loader;
