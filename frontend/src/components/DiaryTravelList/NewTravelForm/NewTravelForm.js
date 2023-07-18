/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import { addTravel } from '../../../store/Travels/slice';
import styles from './NewTravelForm.module.css';
import DefaultPicture from '../../../images/dairy_picture_default.png';
import { generateUniqueKey, formatDate } from '../../../utils/utils';

function NewTravelForm({ closeForm }) {
	const dispatch = useDispatch();
	const [picture, setPicture] = useState(DefaultPicture);
	const [travelData, setTravelData] = useState({
		name: '',
		description: '',
		start_date: null,
		end_date: null,
		pictures: [picture],
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
			start_date: date,
		}));
	};

	const handleEndDateChange = (date) => {
		setTravelData((prevData) => ({
			...prevData,
			end_date: date,
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const newTravel = {
			id: generateUniqueKey(),
			travelDaysEvents: [],
			name: travelData.name,
			description: travelData.description,
			start_date: formatDate(travelData.start_date),
			end_date: formatDate(travelData.end_date),
			pictures: travelData.pictures,
		};
		dispatch(addTravel(newTravel));
		closeForm();
		console.log(newTravel);
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
							id="name"
							name="name"
							value={travelData.name}
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
									selected={travelData.start_date}
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
									selected={travelData.end_date}
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

export default NewTravelForm;

NewTravelForm.propTypes = {
	closeForm: PropTypes.func,
};

NewTravelForm.defaultProps = {
	closeForm: () => {},
};
