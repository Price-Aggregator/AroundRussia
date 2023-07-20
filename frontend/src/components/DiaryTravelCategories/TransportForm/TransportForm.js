/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import styles from './TransportForm.module.css';

function TransportForm({ closeForm }) {
	const [travelData, setTravelData] = useState({
		title: '',
		description: '',
		startDate: null,
		endDate: null,
	});

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setTravelData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleStartDateChange = (date) => {
		setTravelData((prevData) => ({
			...prevData,
			startDate: date,
		}));
	};

	const handleEndDateChange = (date) => {
		setTravelData((prevData) => ({
			...prevData,
			endDate: date,
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(travelData);
	};

	return (
		<form className={styles.form_active} onSubmit={handleSubmit}>
			<h2 className={styles.form__title}>Добавить транспорт</h2>
			<div className={styles.form__box}>
				<div className={styles.form__inputBox}>
					<div className={styles.form__labelBox}>
						<label htmlFor="title" className={styles.form__labelText}>
							Название транспорта*
						</label>
						<input
							className={`${styles.form__input} ${styles.form__input_title}`}
							type="text"
							id="title"
							name="title"
							value={travelData.title}
							onChange={handleInputChange}
							required
						/>
					</div>{' '}
					<div className={styles.form__labelBox}>
						<label htmlFor="title" className={styles.form__labelText}>
							Адрес отправления*
						</label>
						<input
							className={`${styles.form__input} ${styles.form__input_title}`}
							type="text"
							id="title"
							name="title"
							value={travelData.title}
							onChange={handleInputChange}
							required
						/>
					</div>{' '}
					<div className={styles.form__labelBox}>
						<label htmlFor="title" className={styles.form__labelText}>
							Адрес прибытия*
						</label>
						<input
							className={`${styles.form__input} ${styles.form__input_title}`}
							type="text"
							id="title"
							name="title"
							value={travelData.title}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div className={styles.form__dateBox}>
						<div className={styles.form__labelBox}>
							<label htmlFor="startDate" className={styles.form__labelText}>
								Дата начала* (дд.мм.гггг)
							</label>
							<div className={styles.form__dateInputContainer}>
								<DatePicker
									className={`${styles.form__input} ${styles.form__input_date}`}
									id="startDate"
									selected={travelData.startDate}
									onChange={handleStartDateChange}
									dateFormat="dd.MM.yyyy"
									placeholderText=""
									required
								/>
							</div>
						</div>
						<div className={styles.form__labelBox}>
							<label htmlFor="endDate" className={styles.form__labelText}>
								Время начала* (чч:мм)
							</label>
							<div className={styles.form__timeInputContainer}>
								<DatePicker
									className={`${styles.form__input} ${styles.form__input_date}`}
									id="startTime"
									selected={travelData.endDate}
									onChange={handleEndDateChange}
									dateFormat="dd.MM.yyyy"
									placeholderText=""
									required
								/>
							</div>
						</div>
					</div>{' '}
					<div className={styles.form__dateBox}>
						<div className={styles.form__labelBox}>
							<label htmlFor="endDate" className={styles.form__labelText}>
								Дата окончания* (дд.мм.гггг)
							</label>
							<div className={styles.form__dateInputContainer}>
								<DatePicker
									className={`${styles.form__input} ${styles.form__input_date}`}
									id="endDate"
									selected={travelData.endDate}
									onChange={handleEndDateChange}
									dateFormat="dd.MM.yyyy"
									placeholderText=""
									required
								/>
							</div>
						</div>

						<div className={styles.form__labelBox}>
							<label htmlFor="startDate" className={styles.form__labelText}>
								Время окончания* (чч:мм)
							</label>
							<div className={styles.form__timeInputContainer}>
								<DatePicker
									className={`${styles.form__input} ${styles.form__input_date}`}
									id="startDate"
									selected={travelData.startDate}
									onChange={handleStartDateChange}
									dateFormat="dd.MM.yyyy"
									placeholderText=""
									required
								/>
							</div>
						</div>
					</div>
					<div className={styles.form__labelBox}>
						<label htmlFor="title" className={styles.form__labelText}>
							Описание
						</label>
						<input
							className={`${styles.form__input} ${styles.form__input_title}`}
							type="text"
							id="title"
							name="title"
							value={travelData.title}
							onChange={handleInputChange}
							required
						/>
					</div>{' '}
					<div className={styles.form__labelBox}>
						<label htmlFor="title" className={styles.form__labelText}>
							Стоимость
						</label>
						<input
							className={`${styles.form__input} ${styles.form__input_title}`}
							type="text"
							id="title"
							name="title"
							value={travelData.title}
							onChange={handleInputChange}
							required
						/>
					</div>{' '}
					<div className={styles.form__labelBox}>
						<label htmlFor="title" className={styles.form__labelText}>
							Прикрепите фото, документы, билеты
						</label>
						<div className={styles.form__files}>
							<div className={styles.form__fileBox}>
								<button
									className={`${styles.form__button} ${styles.form__button_addFile}`}
									type="button"
									onClick={() => console.log('click')}
								>
									+ Файл
								</button>
							</div>{' '}
							<div className={styles.form__fileBox}>
								<button
									className={`${styles.form__button} ${styles.form__button_addFile}`}
									type="button"
									onClick={() => console.log('click')}
								>
									+ Файл
								</button>
							</div>{' '}
						</div>
					</div>
				</div>
			</div>
			<div className={styles.form__buttonBox}>
				<button
					className={`${styles.form__button} ${styles.form__button_cancel}`}
					type="button"
					onClick={closeForm}
				>
					Отменить
				</button>
				<button
					className={`${styles.form__button} ${styles.form__button_save}`}
					type="submit"
				>
					Сохранить
				</button>
			</div>
		</form>
	);
}

export default TransportForm;

TransportForm.propTypes = {
	closeForm: PropTypes.func,
};

TransportForm.defaultProps = {
	closeForm: () => {},
};