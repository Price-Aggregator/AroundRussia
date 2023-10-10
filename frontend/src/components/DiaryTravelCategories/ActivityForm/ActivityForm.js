/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useFileHandling from '../../../utils/useFileHandling';
import styles from '../form.module.css';
import {
	fetchPatchEvent,
	fetchTravels,
	fetchAddEvent,
} from '../../../store/Travels/slice';
import { getUserToken } from '../../../store/User/selectors';
import { formatDate } from '../../../utils/utils';
import { TRAVEL_EVENT_EDIT } from '../../../utils/constants';

function ActivityForm({ closeForm, actionName, eventId }) {
	const [eventData, setЕventData] = useState({
		category: 'activity',
		eventName: '',
		address: '',
		startDate: null,
		startTime: null,
		description: '',
		price: '',
		medias: [],
	});

	const {
		renderFilePreviews,
		medias,
		previewFiles,
		isDragReject,
		fileRejections,
		fileRejectionItems,
		style,
		getRootProps,
		getInputProps,
	} = useFileHandling({ actionName, setЕventData, eventId });

	const { travelId } = useParams();
	const dispatch = useDispatch();
	const token = useSelector(getUserToken);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setЕventData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleStartDateChange = (startDate) => {
		setЕventData((prevData) => ({
			...prevData,
			startDate,
		}));
	};

	const handleStartTimeChange = (startTime) => {
		setЕventData((prevData) => ({
			...prevData,
			startTime,
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		let startTimeString = '';
		if (eventData.startTime) {
			startTimeString = eventData.startTime.toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit',
			});
		}
		eventData.medias = medias;
		const newEvent = {
			startDate: formatDate(eventData.startDate),
			category: eventData.category,
			startTime: startTimeString, // Assign the formatted time string
			// startTime: eventData.startTime.toLocaleTimeString([], {
			// 	hour: '2-digit',
			// 	minute: '2-digit',
			// }),
			address: eventData.address,
			description: eventData.description,
			price: eventData.price,
			eventName: eventData.eventName,
			medias,
		};

		if (actionName === TRAVEL_EVENT_EDIT) {
			await dispatch(
				fetchPatchEvent({ travelId, token, data: newEvent, eventId })
			).then(() => {
				dispatch(fetchTravels(token));
			});
		} else {
			await dispatch(fetchAddEvent({ travelId, token, data: newEvent })).then(
				() => {
					dispatch(fetchTravels(token));
				}
			);
		}

		closeForm();
	};

	return (
		<form className={styles.form_active} onSubmit={handleSubmit}>
			<h2 className={styles.form__title}>{`${actionName} активность`}</h2>
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
							value={eventData.eventName}
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
							value={eventData.address}
							onChange={handleInputChange}
							required
						/>
					</div>{' '}
					<div className={styles.form__dateBox}>
						<div className={styles.form__labelBox}>
							<label htmlFor="startDate" className={styles.form__labelText}>
								Дата начала* (гггг.мм.дд)
							</label>
							<div className={styles.form__dateInputContainer}>
								<DatePicker
									className={`${styles.form__input} ${styles.form__input_date}`}
									id="startDate"
									selected={eventData.startDate}
									onChange={handleStartDateChange}
									dateFormat="yyyy.MM.dd"
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
									selected={eventData.startTime}
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
						<div className={styles.form__filesContainer} id="media">
							<div className={styles.form__filesContainer} id="media">
								{/* Render the FileDropzone component */}
								<div
									{...getRootProps({ style })}
									className={styles.form__dropzone}
								>
									<input {...getInputProps()} />
									<div className={styles.form__fileBox}>
										<button
											className={`${styles.form__button} ${styles.form__button_addFile}`}
											type="button"
										>
											<span>+ Файл</span>
										</button>
									</div>
								</div>
								{isDragReject && <p>только картинки и PDF, пожалуйста</p>}
								{fileRejections && <p>{fileRejectionItems}</p>}
								<div className={styles.form__attachments}>
									{renderFilePreviews(previewFiles)}
								</div>
							</div>
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
	actionName: PropTypes.string,
	eventId: PropTypes.number,
};

ActivityForm.defaultProps = {
	closeForm: () => {},
	actionName: 'Добавить',
	eventId: '',
};
