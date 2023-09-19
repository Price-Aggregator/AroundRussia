/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './TransportForm.module.css';
import {
	editTravel,
	fetchAddEventStart,
	fetchAddEventEnd,
	fetchTravels,
	fetchPatchEvent,
} from '../../../store/Travels/slice';
import { formatDate } from '../../../utils/utils';
import { getUserToken } from '../../../store/User/selectors';
import { TRAVEL_EVENT_EDIT } from '../../../utils/constants';

function TransportForm({ closeForm, actionName, eventId }) {
	const [events, setEvents] = useState([]);
	const { travelId } = useParams();
	const dispatch = useDispatch();
	const travels = useSelector((state) => state.travels.travels);
	const token = useSelector(getUserToken);

	const [transportData, setTransportData] = useState({
		category: 'flight',
		eventName: '',
		address: '',
		endAddress: '',
		startDate: null,
		startTime: null,
		endDate: null,
		endTime: null,
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

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setTransportData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleStartDateChange = (date) => {
		setTransportData((prevData) => ({
			...prevData,
			startDate: date,
		}));
	};

	const handleEndDateChange = (date) => {
		setTransportData((prevData) => ({
			...prevData,
			endDate: date,
		}));
	};

	const handleStartTimeChange = (time) => {
		setTransportData((prevData) => ({
			...prevData,
			startTime: time,
		}));
	};

	const handleEndTimeChange = (time) => {
		setTransportData((prevData) => ({
			...prevData,
			endTime: time,
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		let startTimeString = '';
		let endTimeString = '';
		if (transportData.startTime) {
			// Check if eventData.startTime is defined
			startTimeString = transportData.startTime.toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit',
			});
		}
		if (transportData.startTime) {
			// Check if eventData.startTime is defined
			endTimeString = transportData.startTime.toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit',
			});
		}
		const newEvent = {
			startDate: formatDate(transportData.startDate),
			category: transportData.category,
			startTime: startTimeString,
			endDate: formatDate(transportData.endDate),
			endTime: endTimeString,
			origin: transportData.address,
			description: transportData.description,
			price: transportData.price,
			eventName: transportData.eventName,
		};

		if (actionName === TRAVEL_EVENT_EDIT) {
			await dispatch(
				fetchPatchEvent({ travelId, token, data: newEvent, eventId })
			).then(() => {
				dispatch(fetchTravels(token));
			});
		} else {
			await dispatch(
				fetchAddEventStart({ travelId, token, data: newEvent })
			).then(() => {
				dispatch(fetchTravels(token));
			});
			await dispatch(
				fetchAddEventEnd({ travelId, token, data: newEvent })
			).then(() => {
				dispatch(fetchTravels(token));
			});
		}
		closeForm();
	};

	return (
		<form className={styles.form_active} onSubmit={handleSubmit}>
			<h2 className={styles.form__title}>{`${actionName} транспорт`}</h2>
			<div className={styles.form__box}>
				<div className={styles.form__inputBox}>
					<div className={styles.form__labelBox}>
						<label htmlFor="title" className={styles.form__labelText}>
							Название транспорта*
						</label>
						<input
							className={`${styles.form__input} ${styles.form__input_title}`}
							type="text"
							id="eventName"
							name="eventName"
							value={transportData.eventName}
							onChange={handleInputChange}
							required
						/>
					</div>{' '}
					<div className={styles.form__labelBox}>
						<label htmlFor="address" className={styles.form__labelText}>
							Адрес отправления*
						</label>
						<input
							className={`${styles.form__input} ${styles.form__input_title}`}
							type="text"
							id="address"
							name="address"
							value={transportData.address}
							onChange={handleInputChange}
							required
						/>
					</div>{' '}
					<div className={styles.form__labelBox}>
						<label htmlFor="endAddress" className={styles.form__labelText}>
							Адрес прибытия*
						</label>
						<input
							className={`${styles.form__input} ${styles.form__input_title}`}
							type="text"
							id="endAddress"
							name="endAddress"
							value={transportData.endAddress}
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
									selected={transportData.startDate}
									onChange={handleStartDateChange}
									dateFormat="dd.MM.yyyy"
									placeholderText=""
									required
								/>
							</div>
						</div>
						<div className={styles.form__labelBox}>
							<label htmlFor="startTime" className={styles.form__labelText}>
								Время начала (чч:мм)
							</label>
							<div className={styles.form__timeInputContainer}>
								<DatePicker
									className={`${styles.form__input} ${styles.form__input_date}`}
									id="startTime"
									selected={transportData.startTime}
									onChange={handleStartTimeChange}
									showTimeSelect
									showTimeSelectOnly
									timeIntervals={15}
									timeCaption="Time"
									timeFormat="HH:mm"
									dateFormat="HH:mm"
									placeholderText=""
								/>
							</div>
						</div>
					</div>{' '}
					<div className={styles.form__dateBox}>
						<div className={styles.form__labelBox}>
							<label htmlFor="endDate" className={styles.form__labelText}>
								Дата окончания (дд.мм.гггг)
							</label>
							<div className={styles.form__dateInputContainer}>
								<DatePicker
									className={`${styles.form__input} ${styles.form__input_date}`}
									id="endDate"
									selected={transportData.endDate}
									onChange={handleEndDateChange}
									dateFormat="dd.MM.yyyy"
									placeholderText=""
								/>
							</div>
						</div>

						<div className={styles.form__labelBox}>
							<label htmlFor="endTime" className={styles.form__labelText}>
								Время окончания (чч:мм)
							</label>
							<div className={styles.form__timeInputContainer}>
								<DatePicker
									className={`${styles.form__input} ${styles.form__input_date}`}
									id="endTime"
									selected={transportData.endTime}
									onChange={handleEndTimeChange}
									showTimeSelect
									showTimeSelectOnly
									timeIntervals={15}
									timeCaption="Time"
									timeFormat="HH:mm"
									dateFormat="HH:mm"
									placeholderText=""
								/>
							</div>
						</div>
					</div>
					<div className={styles.form__labelBox}>
						<label htmlFor="description" className={styles.form__labelText}>
							Описание
						</label>
						<input
							className={`${styles.form__input} ${styles.form__input_title}`}
							type="text"
							id="description"
							name="description"
							value={transportData.description}
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
							value={transportData.price}
							onChange={handleInputChange}
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
	actionName: PropTypes.string,
	eventId: PropTypes.string,
};

TransportForm.defaultProps = {
	closeForm: () => {},
	actionName: 'Добавить',
	eventId: '',
};
