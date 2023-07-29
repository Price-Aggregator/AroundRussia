import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';
import logo from '../../images/logo_white.svg';

export default function NotFound() {
	return (
		<div className={styles.notFound}>
			<Link to="/" className={styles.notFoundLogo}>
				<img src={logo} alt="Логотип" />
			</Link>

			<div className={styles.notFoundContainer}>
				<h2 className={styles.notFoundTitle}>404</h2>
				<p className={styles.notFoundSubtitle}>
					Такой страницы нет, но на главной ещё много дешёвых билетов!
				</p>
				<Link to="/" className={styles.notFoundLink}>
					<button type="button" className={styles.notFoundButton}>
						Вернуться к поиску
					</button>
				</Link>
			</div>
		</div>
	);
}
