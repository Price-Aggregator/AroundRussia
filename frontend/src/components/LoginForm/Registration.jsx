/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import styles from './LoginForm.module.css';
import cross from '../../images/form-cross.svg';
import { regexEmail } from '../../utils/constants';

export default function Registration({ handleClick, onClose }) {
	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors, isValid },
	} = useForm({ mode: 'onChange' });

	const onSubmit = (data) => {
		handleClick(data.email, data.password);
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
			<h2 className={styles.form__title}>Регистрация</h2>
			<div className={styles.form__inputContainer}>
				<label htmlFor="registration-email" className={styles.form__label}>
					Электронный адрес
				</label>
				<input
					type="email"
					id="registration-email"
					className={
						errors?.email
							? classNames(styles.form__input, styles.form__input_error)
							: styles.form__input
					}
					{...register('email', {
						required: 'Поле обязательно к заполнению',
						minLength: { value: 3, message: 'Введите минимум 3 символа' },
						pattern: {
							value: regexEmail,
							message: 'Введите корректный email',
						},
					})}
				/>
				{errors?.email && (
					<span className={styles.form__error}>{errors?.email?.message}</span>
				)}
				<label htmlFor="registration-password" className={styles.form__label}>
					Пароль
				</label>
				<input
					type="password"
					id="registration-password"
					className={
						errors?.password
							? classNames(styles.form__input, styles.form__input_error)
							: styles.form__input
					}
					{...register('password', {
						required: 'Поле обязательно к заполнению',
						minLength: { value: 3, message: 'Введите минимум 3 символа' },
					})}
				/>
				{errors?.password && (
					<span className={styles.form__error}>
						{errors?.password?.message}
					</span>
				)}
				<label
					htmlFor="registration-password-repeat"
					className={styles.form__label}
				>
					Повторить пароль
				</label>
				<input
					type="password"
					id="registration-password-repeat"
					className={
						errors?.password
							? classNames(styles.form__input, styles.form__input_error)
							: styles.form__input
					}
					{...register('repeatPassword', {
						required: 'Поле обязательно к заполнению',
						minLength: { value: 3, message: 'Введите минимум 3 символа' },
						validate: (value) =>
							value === watch('password') || 'Пароли не совпадают',
					})}
				/>
				{errors?.repeatPassword && (
					<span className={styles.form__error}>
						{errors?.repeatPassword?.message}
					</span>
				)}
			</div>
			<button type="submit" className={styles.form__button} disabled={!isValid}>
				Зарегистрироваться
			</button>
		</form>
	);
}

Registration.propTypes = {
	onClose: PropTypes.func.isRequired,
	handleClick: PropTypes.func.isRequired,
};
