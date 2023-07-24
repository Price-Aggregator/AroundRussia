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
import { editTravel } from '../../../store/Travels/slice';
import { formatDate } from '../../../utils/utils';

function TransportForm({ closeForm }) {
	const [events, setEvents] = useState([]);
	const { travelId } = useParams();
	const dispatch = useDispatch();
	const travels = useSelector((state) => state.travels.travels);

	const [transportData, setTransportData] = useState({
		category: 'flight',
		eventName: '',
		startAddress: '',
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

	const handleUpdate = () => {
		const options = {
			day: '2-digit',
			month: 'long',
			weekday: 'short',
			timeZone: 'UTC',
		};
		const newTransport = {
			date: transportData.startDate.toLocaleDateString('ru-RU', options),
			events: [
				{
					category: transportData.category,
					eventName: transportData.eventName,
					start_address: transportData.startAddress,
					end_address: transportData.endAddress,
					start_date: formatDate(transportData.startDate),
					time: transportData.startTime.toLocaleTimeString([], {
						hour: '2-digit',
						minute: '2-digit',
					}),
					end_time: transportData.endTime.toLocaleTimeString([], {
						hour: '2-digit',
						minute: '2-digit',
					}),
					end_date: formatDate(transportData.endDate),
					description: transportData.description,
					price: transportData.price,
				},
			],
		};
		const userTravel = travels.find((card) => card.id === travelId);
		const newObj = { ...userTravel };
		setEvents([...events, newTransport]);
		newObj.travelDaysEvents = events;
		localStorage.setItem('events', JSON.stringify([...events, newTransport]));
		dispatch(editTravel({ id: travelId, data: newObj }));
	};

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

	const handleSubmit = (event) => {
		event.preventDefault();
		handleUpdate();
		closeForm();
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
							id="eventName"
							name="eventName"
							value={transportData.eventName}
							onChange={handleInputChange}
							required
						/>
					</div>{' '}
					<div className={styles.form__labelBox}>
						<label htmlFor="startAddress" className={styles.form__labelText}>
							Адрес отправления*
						</label>
						<input
							className={`${styles.form__input} ${styles.form__input_title}`}
							type="text"
							id="startAddress"
							name="startAddress"
							value={transportData.startAddress}
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
								Время начала* (чч:мм)
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
									selected={transportData.endDate}
									onChange={handleEndDateChange}
									dateFormat="dd.MM.yyyy"
									placeholderText=""
									required
								/>
							</div>
						</div>

						<div className={styles.form__labelBox}>
							<label htmlFor="endTime" className={styles.form__labelText}>
								Время окончания* (чч:мм)
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
									required
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
							value={transportData.price}
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
