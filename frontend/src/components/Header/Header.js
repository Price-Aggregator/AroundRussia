/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import logo from '../../images/logo.svg';
import styles from './Header.module.css';
import icon from '../../images/header-profile-icon.svg'
import iconActive from '../../images/header-profile-icon-active.svg'
import LoginForm from '../LoginForm/LoginForm';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [accountMenu, setAccountMenu] = useState(true);
  const [accountExitMenu, setAccountExitMenu] = useState(false);
  const [isLogged, setIsLogged] = useState(false)
  const [formActive, setFormActive] = useState(false)
  const [loginForm, setLoginForm] = useState(false)
  const [passwordForm, setPasswordForm] = useState(false)
  const [registrationForm, setRegistrationForm] = useState(false)

  const closeForms = () => {
    setLoginForm(false)
    setPasswordForm(false)
    setRegistrationForm(false)
  }

  const openPasswordForm = () => {
    closeForms()
    setPasswordForm(true)
  }

  const openRegistrationForm = () => {
    closeForms()
    setRegistrationForm(true)
  }






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
        <Link
          smooth
          to="/"
          className={styles.header__link}
        >
          Дневник путешествинника
        </Link>
        {isLogged === false && <button type='button' className={styles.header__accountButton} onClick={() => { setAccountMenu(!accountMenu); setAccountExitMenu(!accountExitMenu); setIsLogged(!isLogged) }}>
          <img src={icon} alt='Иконка аккауна' />
        </button>}
        {isLogged === true && <button type='button' className={styles.header__accountButton} onClick={() => { setAccountMenu(!accountMenu); setAccountExitMenu(!accountExitMenu); setIsLogged(!isLogged) }}>
          <img src={iconActive} alt='Иконка аккауна' />
        </button>}
        {accountMenu && <div className={styles.header__accountMenu}>
          <button type='button' className={styles.header__accountMenuButton} onClick={() => { setLoginForm(true); setFormActive(true) }}>Войти</button>
          <button type='button' className={classNames(styles.header__accountMenuButton, styles.header__accountMenuButtonDark)} onClick={() => { setRegistrationForm(true); setFormActive(true) }}>Зарегистрироваться</button>
        </div>}
        {accountExitMenu && <div className={classNames(styles.header__accountMenu, styles.header__accountExitMenu)}>
          <button type='button' className={styles.header__accountMenuButton}>Выйти</button>
        </div>}
        {formActive && <div className={styles.header__loginForm}>
          <LoginForm loginForm={loginForm} onClose={closeForms} passwordForm={passwordForm} registrationForm={registrationForm} openPasswordForm={openPasswordForm} openRegistrationForm={openRegistrationForm} />
        </div>}
      </div>


    </header>
  );

}

export default Header;
