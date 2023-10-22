/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useRef, useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import logo from '../../images/logo.svg';
import styles from './Header.module.css';
import LoginForm from '../LoginForm/LoginForm';
import useClickOutside from '../../hooks/UseOutsideClick';
import {
	setUserToken,
	setUserEmail,
	yesAuth,
	removeUser,
	noAuth,
} from '../../store/User/slice';

import * as api from '../../utils/authApi';
import ResetPassword from '../LoginForm/ResetPassword';
import Registration from '../LoginForm/Registration';

function Header() {
	const location = useLocation();
	const navigate = useNavigate();
	const [accountMenu, setAccountMenu] = useState(false);

	const [loginForm, setLoginForm] = useState(false);
	const [resetPasswordForm, setResetPasswordForm] = useState(false);
	const [registrationForm, setRegistrationForm] = useState(false);
	const dispatch = useDispatch();
	const [isAuth, setIsAuth] = useState(false);

	const accountMenuRef = useRef(null);
	const formsRef = useRef(null);
	useClickOutside(accountMenuRef, () => {
		setAccountMenu(false);
	});

	const closeForms = () => {
		setLoginForm(false);
		setResetPasswordForm(false);
		setRegistrationForm(false);
	};
	useClickOutside(formsRef, () => {
		closeForms();
	});
	const openPasswordForm = () => {
		closeForms();
		setResetPasswordForm(true);
	};

	const openRegistrationForm = () => {
		closeForms();
		setRegistrationForm(true);
	};
	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			setIsAuth(true);
			dispatch(yesAuth());
			dispatch(setUserToken({ token }));
		}
	}, []);

	const handleAuthorize = (data) => {
		api
			.authorize(data.email, data.password)
			.then((token) => {
				if (token) {
					dispatch(
						setUserToken({
							token: token.auth_token,
						})
					);
					dispatch(
						setUserEmail({
							email: data.email,
						})
					);
					dispatch(yesAuth());
					localStorage.setItem('token', token.auth_token);
				}
				setIsAuth(true);
				closeForms();
			})
			.catch((err) => {
				alert(err);
			});
	};

	const handleRegister = (email, password) => {
		api
			.register(email, password)
			.then((user) => {
				console.log(user);
				dispatch(
					setUserEmail({
						email: user.email,
					})
				);
				handleAuthorize({ email, password });
				closeForms();
			})
			.catch((err) => {
				alert(err);
			});
	};

	const handleSignOut = () => {
		localStorage.removeItem('token');
		dispatch(removeUser());
		dispatch(noAuth());
		setIsAuth(false);
	};

	const handleResetPassword = (email) => {
		api
			.resetPassword(email)
			.then(alert('Ссылка для восстановления отправлена на почту'))
			.catch((err) => {
				alert(err);
			})
			.finally(closeForms());
	};

	return (
		<header className={styles.header}>
			<Link
				to="/"
				onClick={location.pathname === '/' ? () => navigate(0) : null}
			>
				<img src={logo} className={styles.header__logo} alt="logo" />
			</Link>
			<div className={styles.header__linkContainer}>
				<Link
					smooth
					to={location.pathname === '/' ? '#faq' : '/#faq'}
					className={styles.header__link}
				>
					Вопросы и ответы
				</Link>
				<Link smooth to="/diary" className={styles.header__link}>
					Дневник путешественника
				</Link>

				<button
					type="button"
					className={styles.header__accountButton}
					onClick={() => {
						setAccountMenu(!accountMenu);
						// setIsLogged(!isLogged);
					}}
				>
					<div
						className={
							isAuth
								? classNames(
										styles.header__accountLogo,
										styles.header__accountLogo_active
								  )
								: styles.header__accountLogo
						}
					/>
				</button>

				{accountMenu &&
					(!isAuth ? (
						<div className={styles.header__accountMenu} ref={accountMenuRef}>
							<button
								type="button"
								className={styles.header__accountMenuButton}
								onClick={() => {
									setLoginForm(true);
									setAccountMenu(false);
								}}
							>
								Войти
							</button>
							<button
								type="button"
								className={classNames(
									styles.header__accountMenuButton,
									styles.header__accountMenuButtonDark
								)}
								onClick={() => {
									setRegistrationForm(true);
									setAccountMenu(false);
								}}
							>
								Зарегистрироваться
							</button>
						</div>
					) : (
						<div
							className={classNames(
								styles.header__accountMenu,
								styles.header__accountExitMenu
							)}
							ref={accountMenuRef}
						>
							<button
								type="button"
								className={styles.header__accountMenuButton}
								onClick={() => {
									handleSignOut();
									setAccountMenu(false);
								}}
							>
								Выйти
							</button>
						</div>
					))}

				<div className={styles.header__loginForm} ref={formsRef}>
					{loginForm && (
						<LoginForm
							onClose={closeForms}
							openPasswordForm={openPasswordForm}
							openRegistrationForm={openRegistrationForm}
							handleClick={handleAuthorize}
						/>
					)}
					{resetPasswordForm && (
						<ResetPassword
							onClose={closeForms}
							handleClick={handleResetPassword}
						/>
					)}
					{registrationForm && (
						<Registration
							onClose={closeForms}
							openPasswordForm={openPasswordForm}
							handleClick={handleRegister}
						/>
					)}
				</div>
			</div>
		</header>
	);
}

export default Header;
