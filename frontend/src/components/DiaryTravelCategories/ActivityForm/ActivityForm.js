/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './ActivityForm.module.css';
import { editTravel } from '../../../store/Travels/slice';

function ActivityForm({ closeForm }) {
	const [events, setEvents] = useState([]);
	const { travelId } = useParams();
	const dispatch = useDispatch();
	const travels = useSelector((state) => state.travels.travels);

	const [eventData, setЕventData] = useState({
		category: 'activity',
		eventName: '',
		address: '',
		date: null,
		time: null,
		description: '',
		price: '',
	});

	useEffect(() => {
		let storedEvents;
		try {
			storedEvents = JSON.parse(localStorage.getItem('events'));
		} catch (error) {
			console.error('Error parsing stored events:', error);
			storedEvents = undefined;
		}
		if (storedEvents) {
			setEvents(storedEvents);
		}
	}, []);

	const handleUpdate = () => {
		const options = {
			day: '2-digit',
			month: 'long',
			weekday: 'short',
			timeZone: 'UTC',
		};
		const newEvent = {
			date: eventData.date.toLocaleDateString('ru-RU', options),
			events: [
				{
					category: eventData.category,
					time: eventData.time.toLocaleTimeString([], {
						hour: '2-digit',
						minute: '2-digit',
					}),
					address: eventData.address,
					description: eventData.description,
					price: eventData.price,
					eventName: eventData.eventName,
				},
			],
		};
		const userTravel = travels.find((card) => card.id === travelId);
		const newObj = { ...userTravel };
		setEvents([...events, newEvent]);
		newObj.travelDaysEvents = events;
		localStorage.setItem('events', JSON.stringify([...events, newEvent]));
		dispatch(editTravel({ id: travelId, data: newObj }));
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setЕventData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleStartDateChange = (date) => {
		setЕventData((prevData) => ({
			...prevData,
			date,
		}));
	};

	const handleStartTimeChange = (time) => {
		setЕventData((prevData) => ({
			...prevData,
			time,
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		handleUpdate();
		closeForm();
	};

	return (
		<form className={styles.form_active} onSubmit={handleSubmit}>
			<h2 className={styles.form__title}>Добавить активность</h2>
			<div className={styles.form__box}>
				<div className={styles.form__inputBox}>
					<div className={styles.form__labelBox}>
						<label htmlFor="eventName" className={styles.form__labelText}>
							Название активности*
						</label>
						<input
							className={`${styles.form__input} ${styles.form__input_title}`}
							type="text"
							id="eventName"
							name="eventName"
							value={eventData.title}
							onChange={handleInputChange}
							required
						/>
					</div>{' '}
					<div className={styles.form__labelBox}>
						<label htmlFor="address" className={styles.form__labelText}>
							Адрес*
						</label>
						<input
							className={`${styles.form__input} ${styles.form__input_title}`}
							type="text"
							id="address"
							name="address"
							value={eventData.title}
							onChange={handleInputChange}
							required
						/>
					</div>{' '}
					<div className={styles.form__dateBox}>
						<div className={styles.form__labelBox}>
							<label htmlFor="date" className={styles.form__labelText}>
								Дата начала* (дд.мм.гггг)
							</label>
							<div className={styles.form__dateInputContainer}>
								<DatePicker
									className={`${styles.form__input} ${styles.form__input_date}`}
									id="date"
									selected={eventData.date}
									onChange={handleStartDateChange}
									dateFormat="dd.MM.yyyy"
									placeholderText=""
									required
								/>
							</div>
						</div>
						<div className={styles.form__labelBox}>
							<label htmlFor="time" className={styles.form__labelText}>
								Время начала* (чч:мм)
							</label>
							<div className={styles.form__timeInputContainer}>
								<DatePicker
									className={`${styles.form__input} ${styles.form__input_date}`}
									id="time"
									selected={eventData.time}
									onChange={handleStartTimeChange}
									showTimeSelect
									showTimeSelectOnly
									timeIntervals={15}
									timeCaption="Time"
									timeFormat="HH:mm"
									dateFormat="HH:mm"
									placeholderText=""
									required
								/>
							</div>
						</div>
					</div>{' '}
					<div className={styles.form__labelBox}>
						<label htmlFor="description" className={styles.form__labelText}>
							Описание
						</label>
						<input
							className={`${styles.form__input} ${styles.form__input_title}`}
							type="text"
							id="description"
							name="description"
							value={eventData.description}
							onChange={handleInputChange}
						/>
					</div>{' '}
					<div className={styles.form__labelBox}>
						<label htmlFor="price" className={styles.form__labelText}>
							Стоимость
						</label>
						<input
							className={`${styles.form__input} ${styles.form__input_title}`}
							type="text"
							id="price"
							name="price"
							value={eventData.price}
							onChange={handleInputChange}
						/>
					</div>{' '}
					<div className={styles.form__labelBox}>
						<label htmlFor="media" className={styles.form__labelText}>
							Прикрепите фото, документы, билеты
						</label>
						<div className={styles.form__files} id="media">
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

export default ActivityForm;

ActivityForm.propTypes = {
	closeForm: PropTypes.func,
};

ActivityForm.defaultProps = {
	closeForm: () => {},
};
