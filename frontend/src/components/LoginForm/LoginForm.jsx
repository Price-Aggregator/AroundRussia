/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import styles from './LoginForm.module.css';
import cross from '../../images/form-cross.svg';
import { regexEmail, regexPassword } from '../../utils/constants';

export default function LoginForm({
	onClose,
	openPasswordForm,
	openRegistrationForm,
	handleClick,
}) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm({ mode: 'onChange' });

	const onSubmit = (data) => {
		console.log(data);
		handleClick(data);
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<button
				type="button"
				className={styles.form__cross}
				onClick={() => {
					onClose();
					reset();
				}}
			>
				<img src={cross} alt="Крестик закрытия" />
			</button>
			<h2 className={styles.form__title}>Вход</h2>
			<div className={styles.form__inputContainer}>
				<label htmlFor="login-email" className={styles.form__label}>
					Электронный адрес
				</label>
				<input
					type="email"
					id="login-email"
					className={
						errors?.email
							? classNames(styles.form__input, styles.form__input_error)
							: styles.form__input
					}
					{...register('email', {
						required: 'Поле обязательно к заполнению',
						minLength: { value: 5, message: 'Введите минимум 5 символов' },
						maxLength: {
							value: 32,
							message: 'Максимальная длина email - 32 символа',
						},
						pattern: {
							value: regexEmail,
							message: 'Некорректно введён адрес эл. почты.',
						},
					})}
				/>
				{errors?.email && (
					<span className={styles.form__error}>{errors?.email?.message}</span>
				)}

				<label htmlFor="login-password" className={styles.form__label}>
					Пароль
				</label>
				<input
					type="password"
					id="login-password"
					className={
						errors?.password
							? classNames(styles.form__input, styles.form__input_error)
							: styles.form__input
					}
					{...register('password', {
						required: 'Поле обязательно к заполнению',
						minLength: { value: 8, message: 'Введите минимум 8 символов' },
						pattern: {
							value: regexPassword,
							message: ' Используйте заглавные, строчные буквы и цифры.',
						},
					})}
				/>
				{errors?.password && (
					<span className={styles.form__error}>
						{errors?.password?.message}
					</span>
				)}
			</div>
			<button type="submit" className={styles.form__button} disabled={!isValid}>
				Войти
			</button>
			<div className={styles.form__linkContainer}>
				<button
					className={styles.form__link}
					type="submit"
					onClick={openRegistrationForm}
				>
					Зарегистрироваться
				</button>
				<button
					className={styles.form__link}
					type="submit"
					onClick={openPasswordForm}
				>
					Забыли пароль?
				</button>
			</div>
		</form>
	);
}

LoginForm.propTypes = {
	onClose: PropTypes.func.isRequired,
	handleClick: PropTypes.func.isRequired,
	openPasswordForm: PropTypes.func.isRequired,
	openRegistrationForm: PropTypes.func.isRequired,
};
