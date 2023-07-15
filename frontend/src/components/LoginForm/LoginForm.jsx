import React from 'react'
import PropTypes from 'prop-types';
import styles from './LoginForm.module.css';
import cross from '../../images/form-cross.svg'


export default function LoginForm({ loginForm, onClose, passwordForm, registrationForm, openPasswordForm, openRegistrationForm }) {


  return (
    <>
      {loginForm && <div className={styles.form}>
        <button type='button' className={styles.form__cross} onClick={onClose}><img src={cross} alt="Крестик закрытия" /></button>
        <h2 className={styles.form__title}>Вход</h2>
        <div className={styles.form__inputContainer}>
          <label htmlFor="login-email" className={styles.form__label}>Электронный адрес</label>
          <input type="email" id='login-email' className={styles.form__input} />
          <label htmlFor="login-password" className={styles.form__label}>Пароль</label>
          <input type="password" id='login-password' className={styles.form__input} />
        </div>
        <button type='submit' className={styles.form__button}>Войти</button>
        <div className={styles.form__linkContainer}>
          <button className={styles.form__link} type='submit' onClick={openRegistrationForm}>Зарегистрироваться</button>
          <button className={styles.form__link} type='submit' onClick={openPasswordForm}>Забыли пароль?</button>
        </div>
      </div >
      }
      {passwordForm && <div className={styles.form}>
        <button type='button' className={styles.form__cross} onClick={onClose}><img src={cross} alt="Крестик закрытия" /></button>
        <h2 className={styles.form__title}>Забыли пароль?</h2>
        <div className={styles.form__inputContainer}>
          <label htmlFor="login-email" className={styles.form__label}>Электронный адрес</label>
          <input type="email" id='login-email' className={styles.form__input} />
        </div>
        <button type='submit' className={styles.form__button}>Отправить ссылку для сброса</button>
      </div >
      }
      {registrationForm && <div className={styles.form}>
        <button type='button' className={styles.form__cross} onClick={onClose}><img src={cross} alt="Крестик закрытия" /></button>
        <h2 className={styles.form__title}>Регистрация</h2>
        <div className={styles.form__inputContainer}>
          <label htmlFor="login-email" className={styles.form__label}>Электронный адрес</label>
          <input type="email" id='login-email' className={styles.form__input} />
          <label htmlFor="login-email" className={styles.form__label}>Пароль</label>
          <input type="email" id='login-email' className={styles.form__input} />
          <label htmlFor="login-email" className={styles.form__label}>Повторить пароль</label>
          <input type="email" id='login-email' className={styles.form__input} />
        </div>
        <button type='submit' className={styles.form__button}>Зарегистрироваться</button>
      </div >
      }
    </>
  )


}

LoginForm.propTypes = {
  loginForm: PropTypes.string.isRequired,
  passwordForm: PropTypes.string.isRequired,
  registrationForm: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  openPasswordForm: PropTypes.func.isRequired,
  openRegistrationForm: PropTypes.func.isRequired,

}
