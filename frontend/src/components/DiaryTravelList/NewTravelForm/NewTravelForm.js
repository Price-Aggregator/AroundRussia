/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './NewTravelForm.module.css';
import DefaultPicture from '../../../images/dairy_picture_default.png';

function NewTravelForm() {
	const [travelData, setTravelData] = useState({
		title: '',
		description: '',
		startDate: null,
		endDate: null,
	});

	const [picture, setPicture] = useState(DefaultPicture);

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
			<div className={styles.form__box}>
				<div className={styles.form__inputBox}>
					<div className={styles.form__labelBox}>
						<label htmlFor="title" className={styles.form__labelText}>
							Название путешествия
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
					<div className={styles.form__labelBox}>
						<label htmlFor="description" className={styles.form__labelText}>
							Описание путешествия
						</label>
						<textarea
							className={`${styles.form__input} ${styles.form__input_description}`}
							id="description"
							name="description"
							value={travelData.description}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div className={styles.form__dateBox}>
						<div className={styles.form__labelBox}>
							<label htmlFor="startDate" className={styles.form__labelText}>
								Дата начала (дд.мм.гггг)
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
								Дата окончания (дд.мм.гггг)
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
					</div>
				</div>
				<div className={styles.form__picBox}>
					<img
						className={styles.form__picture}
						src={picture}
						alt="здесь будет осмысленный альт"
					/>
					<button
						className={`${styles.form__button} ${styles.form__button_addPicture}`}
						type="button"
						onClick={() => console.log('click')}
					>
						Добавить фото
					</button>
				</div>
			</div>
			<div className={styles.form__buttonBox}>
				<button
					className={`${styles.form__button} ${styles.form__button_cancel}`}
					type="button"
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

export default NewTravelForm;
