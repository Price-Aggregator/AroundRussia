/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../images/logo.svg';
import styles from './Header.module.css';

function Header() {
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<header className={styles.header}>
			<Link
				to="/"
				onClick={location.pathname === '/' ? () => navigate(0) : null}
			>
				<img src={logo} className={styles.header__logo} alt="logo" />
			</Link>
			<Link
				smooth
				to={location.pathname === '/' ? '#faq' : '/#faq'}
				className={styles.header__faq}
			>
				Вопросы и ответы
			</Link>
		</header>
	);
}

export default Header;
