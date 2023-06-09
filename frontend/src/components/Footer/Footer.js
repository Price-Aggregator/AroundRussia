import React from 'react';
import logoWhite from '../../images/logo_white.svg';
import styles from './Footer.module.css';

function Footer() {
	return (
		<footer className={styles.footer}>
			<img src={logoWhite} className={styles.header__logo} alt="logo" />
			<a className={styles.footer__faq} href="faq">
				Вопросы и ответы
			</a>
		</footer>
	);
}

export default Footer;
