/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import styles from './LoginForm.module.css';
import cross from '../../images/form-cross.svg';
import { regexEmail } from '../../utils/constants';

export default function ResetPassword({ handleClick, onClose }) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm({ mode: 'onChange' });

	const onSubmit = (data) => {
		handleClick(data.email);
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
			<h2 className={styles.form__title}>Забыли пароль?</h2>
			<div className={styles.form__inputContainer}>
				<label htmlFor="forgot-password-email" className={styles.form__label}>
					Электронный адрес
				</label>
				<input
					type="email"
					id="forgot-password-email"
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
			</div>
			<button type="submit" className={styles.form__button} disabled={!isValid}>
				Отправить ссылку для сброса
			</button>
		</form>
	);
}

ResetPassword.propTypes = {
	onClose: PropTypes.func.isRequired,
	handleClick: PropTypes.func.isRequired,
};
