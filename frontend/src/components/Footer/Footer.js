import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoWhite from '../../images/logo_white.svg';
import styles from './Footer.module.css';

function Footer() {
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<footer className={styles.footer}>
			<Link
				to="/"
				onClick={location.pathname === '/' ? () => navigate(0) : null}
			>
				<img src={logoWhite} className={styles.header__logo} alt="logo" />
			</Link>
			<p className={styles.footer__faq}>Вдохновляем на путешествия по России</p>
		</footer>
	);
}

export default Footer;
