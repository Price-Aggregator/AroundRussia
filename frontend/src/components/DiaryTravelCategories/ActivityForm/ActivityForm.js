/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect, useImmer } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './ActivityForm.module.css';
// import { updateTravel } from '../../../store/Travels/slice';
// import { setTravels } from '../../../store/Travels/slice';
import { editTravel } from '../../../store/Travels/slice';
import { generateUniqueKey, formatDate } from '../../../utils/utils';

function ActivityForm({ closeForm }) {
	const [events, setEvents] = useState([]);
	console.log('events:', events);
	const { travelId } = useParams();
	const dispatch = useDispatch();
	const travels = useSelector((state) => state.travels.travels);

	// const updatedTravels = Object.assign({}, travels);

	// const [updatedTravels, setUpdatedTravels] = useState({

	// })

	const [eventData, setЕventData] = useState({
		category: 'plane',
		eventName: '',
		address: '',
		date: null,
		time: null,
		description: '',
		price: '',
	});

	useEffect(() => {
		// Retrieve data from localStorage when the component mounts
		const storedEvents = JSON.parse(localStorage.getItem('events'));
		if (storedEvents) {
			setEvents(storedEvents);
		}
	}, []);

	const handleUpdate = () => {
		setEvents([]);
		// localStorage.removeItem('events');

		const newEvent = {
			category: eventData.category,
			eventName: eventData.eventName,
			address: eventData.address,
			date: formatDate(eventData.date),
			time: eventData.time,
			description: eventData.description,
			price: eventData.price,
		};

		const testEvent = {
			date: formatDate(eventData.date),
			events: [
				{
					category: eventData.category,
					time: eventData.time,
					adress: eventData.address,
					description: eventData.description,
					price: eventData.price,
					eventName: eventData.eventName,
				},
			],
			// category: eventData.category,
			// eventName: eventData.eventName,
			// address: eventData.address,
			// time: eventData.time,
			// description: eventData.description,
			// price: eventData.price,
		};

		const userTravel = travels.find((card) => card.id === travelId);
		console.log('userTravel:', userTravel);
		const newObj = Object.assign({}, userTravel);
		console.log('newObj:', newObj);
		setEvents([...events, testEvent]);
		newObj.travelDaysEvents = events;
		localStorage.setItem('events', JSON.stringify([...events, testEvent]));
		console.log('newObj.travelDaysEvents:', newObj.travelDaysEvents);
		// dispatch.editTravel(newObj);
		dispatch(editTravel({ id: travelId, data: newObj }));
		// travels.travelDaysEvents = eventData;
		// setTravels((currentTravels) => ({
		//   ...currentTravels,
		//   travelDaysEvents: eventData
		// }));
		// console.log('travels:', travels)
		// const itemIdToUpdate = travelId;
		// const updatedPropertyName = 'travelDaysEvents';
		// const updatedPropertyValue = events;
		// dispatch(
		// 	updateTravel(
		// 		itemIdToUpdate,
		// 		updatedPropertyName,
		// 		updatedPropertyValue
		// 	)
		// );
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
							required
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
							required
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
