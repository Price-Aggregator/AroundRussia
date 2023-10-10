/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
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
    setEncodedFiles,
    setPreviewFiles
	} = useFileHandling();

	const { travelId } = useParams();
	const dispatch = useDispatch();
  const travels = useSelector((state) => state.travels.travels);
	const token = useSelector(getUserToken);

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

	function inferBlobTypeFromUrl(url) {
		const fileExtension = url.split('.').pop();
		switch (fileExtension.toLowerCase()) {
			case 'pdf':
				return 'application/pdf';
			case 'png':
				return 'image/png';
			case 'jpg':
			case 'jpeg':
				return 'image/jpeg';
			case 'gif':
				return 'image/gif';
			case 'bmp':
				return 'image/bmp';
			default:
				return null;
		}
	}

	useEffect(() => {
		const fetchAndConvertToBase64 = async (url) => {
			try {
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error(`Failed to fetch ${url}`);
				}
				const blob = await response.blob();
				const blobType = inferBlobTypeFromUrl(url); // Infer the blob type based on the URL
				const reader = new FileReader();
				return new Promise((resolve, reject) => {
					reader.onload = () => {
						if (reader.result) {
							const base64String = reader.result.split(',')[1]; // Get the base64-encoded data
							if (base64String) {
								const base64URL = `data:${blobType};base64,${base64String}`;
								resolve(base64URL);
							} else {
								reject(new Error('Base64 conversion failed'));
							}
						} else {
							reject(new Error('Base64 conversion failed'));
						}
					};
					reader.onerror = (error) => {
						reject(error);
					};
					reader.readAsDataURL(blob);
				});
			} catch (error) {
				console.error('Error fetching and converting to base64:', error);
				return null;
			}
		};

		const populateEncodedFiles = async () => {
			const filteredTravel = travels.find((travel) => travel.id === +travelId);
			if (filteredTravel) {
				const filteredActivity = filteredTravel.activities.find(
					(activity) => activity.id === eventId
				);
				if (filteredActivity) {
					const newMediasWithPreview = filteredActivity.medias.map(
						(media, index) => ({
							name: index.toString(),
							preview: media,
						})
					);

					const updatedEventData = {
						category: 'activity',
						eventName: filteredActivity.name || '',
						address: filteredActivity.address || '',
						startDate:
							new Date(filteredActivity.date.replace(/-/g, '/')) || null,
						startTime: null,
						description: filteredActivity.description || '',
						price: filteredActivity.price || '',
						medias: newMediasWithPreview.length > 0 ? newMediasWithPreview : [],
					};

					const startTimeParts = (filteredActivity.time || '').split(':');
					if (startTimeParts.length === 3) {
						const hours = parseInt(startTimeParts[0], 10);
						const minutes = parseInt(startTimeParts[1], 10);
						const seconds = parseInt(startTimeParts[2], 10);
						if (
							!Number.isNaN(hours) &&
							!Number.isNaN(minutes) &&
							!Number.isNaN(seconds)
						) {
							const updatedStartDate = new Date(updatedEventData.startDate);
							updatedStartDate.setHours(hours, minutes, seconds);
							updatedEventData.startTime = updatedStartDate || null;
						}
					}
					const newMediasWithEncoded = await Promise.all(
						filteredActivity.medias.map(async (media, index) => {
							try {
								const encoded = await fetchAndConvertToBase64(media);
								if (encoded) {
									return {
										encoded,
										name: `File${index + 1}.pdf`, // Customize the name as needed
									};
								}
								return null;
							} catch (error) {
								console.error(
									'Error fetching and converting to base64:',
									error
								);
								return null;
							}
						})
					);

					const filteredNewMedias = newMediasWithEncoded.filter(
						(media) => media !== null
					);

					setEncodedFiles(filteredNewMedias);
					setЕventData(updatedEventData);
					setPreviewFiles(updatedEventData.medias);
				}
			}
		};

		populateEncodedFiles();
	}, [actionName, TRAVEL_EVENT_EDIT]);

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
