import React from 'react';
import logoWhite from '../../images/logo_white.svg';

function Footer() {
	return (
		<footer className="footer">
			<img src={logoWhite} className="header__logo" alt="logo" />
			<a className="footer__faq" href="faq">
				Вопросы и ответы
			</a>
		</footer>
	);
}

export default Footer;
