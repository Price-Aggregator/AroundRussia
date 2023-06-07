import React from 'react';
import logo from '../../images/logo.svg';

function Header() {
	return (
		<header className="header">
			<img src={logo} className="header__logo" alt="logo" />
			<a className="header__faq" href="faq">
				Вопросы и ответы
			</a>
		</header>
	);
}

export default Header;
