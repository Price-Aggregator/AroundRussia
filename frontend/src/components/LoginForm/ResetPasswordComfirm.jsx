/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router';
import classNames from 'classnames';
import styles from './LoginForm.module.css';
import { resetPasswordConfirm } from '../../utils/authApi';

export default function ResetPasswordComfirm() {
	const location = useLocation();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isValid },
	} = useForm({ mode: 'onChange' });

	const onSubmit = (data) => {
		const newPassword = data.password;
		const sections = location.pathname.split('/');
		const id = sections[2];
		const token = sections[3];
		console.log(newPassword);
		console.log(id);
		console.log(token);

		resetPasswordConfirm(id, token, newPassword).then(
			alert('Пароль успешно изменен')
		);
	};

	return (
		<div className={styles.form__reset_password_confirm}>
			<form
				className={classNames(styles.form, styles.form__zIndex_1)}
				onSubmit={handleSubmit(onSubmit)}
			>
				<h2 className={styles.form__title}>Обновление пароля</h2>
				<div className={styles.form__inputContainer}>
					<label htmlFor="registration-password" className={styles.form__label}>
						Новый пароль
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
						Повторить новый пароль
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
				<button
					type="submit"
					className={styles.form__button}
					disabled={!isValid}
				>
					Сохранить
				</button>
			</form>
		</div>
	);
}
