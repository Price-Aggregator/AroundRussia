import React from 'react';
import logo from '../../images/logo.svg';
import styles from './Header.module.css';

function Header() {
	return (
		<header className={styles.header}>
			<img src={logo} className={styles.header__logo} alt="logo" />
			<a className={styles.header__faq} href="faq">
				Вопросы и ответы
			</a>
		</header>
	);
}

export default Header;
