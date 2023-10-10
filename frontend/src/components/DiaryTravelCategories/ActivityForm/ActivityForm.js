/* eslint-disable react/button-has-type */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-extraneous-dependencies */
// @ts-ignore
// @typescript-eslint/ban-ts-comment
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import imageToBase64 from 'image-to-base64/browser';
import styles from '../form.module.css';
import {
	fetchAddEvent,
	fetchPatchEvent,
	fetchTravels,
} from '../../../store/Travels/slice';
import { getUserToken } from '../../../store/User/selectors';
import { formatDate } from '../../../utils/utils';
import { TRAVEL_EVENT_EDIT } from '../../../utils/constants';
import pdfIcon from '../../../images/pdf-icon.svg';

const baseStyle = {
	backgroundColor: '#fafafa',
	borderStyle: 'solid',
};

const acceptStyle = {
	borderColor: '#f8c747',
	borderStyle: 'dashed',
};

const rejectStyle = {
	borderColor: '#ff1744',
};
const loadFile = (file) =>
	new Promise((res, rej) => {
		const reader = new FileReader();
		const base = {
			name: file.name,
			size: file.size,
		};
		reader.addEventListener('abort', (e) => rej(`File upload aborted:${e}`));
		reader.addEventListener('error', (e) => rej(`File upload error: ${e}`));
		reader.addEventListener(
			'load',
			() =>
				res({
					...base,
					encoded: reader.result,
				}),
			false
		);
		reader.readAsDataURL(file);
	});

function ActivityForm({ closeForm, actionName, eventId }) {
	const [encodedFiles, setEncodedFiles] = useState([]);
	const [previewFiles, setPreviewFiles] = useState([]);
	const [medias, setMedias] = useState([]);

	const onChange = (newFiles) => {
		const newFilesWithPreview = newFiles.map((file) => ({
			name: file.name,
			preview: URL.createObjectURL(file),
		}));
		setPreviewFiles((prevFiles) => [...prevFiles, ...newFilesWithPreview]);
	};

	const removeFile = (file) => () => {
		const updatedPreviewFiles = previewFiles.filter(
			(f) => f.name !== file.name
		);
		setPreviewFiles(updatedPreviewFiles);

		imageToBase64(file.preview)
			.then((response) => {
				const updatedEncodedFiles = encodedFiles.filter((encodedFile) => {
					if (typeof encodedFile.encoded === 'string') {
						return !encodedFile.encoded.includes(response.slice(0, 100));
					}
					return true;
				});
				setEncodedFiles(updatedEncodedFiles);
			})
			.catch((error) => {
				console.log('error:', error);
			});
	};

	useEffect(() => {
		const updatedMedias = encodedFiles.map((file) => file.encoded);
		setMedias(updatedMedias);
	}, [encodedFiles]);

	function renderFilePreviews(files) {
		files.map((file) => file.preview.toLowerCase().endsWith('.pdf'));
		return files.map((file) => (
			<div key={file.name} className={styles.form__fileBoxContent}>
				<button
					type="button"
					className={styles.dropzoneTrashBag}
					onClick={removeFile(file)}
				>
					{' '}
				</button>
				{file.name.toLowerCase().endsWith('.pdf') ||
				file.preview.toLowerCase().endsWith('.pdf') ? (
					<img
						src={pdfIcon}
						alt={file.name}
						className={styles.filePreviewPDF}
					/>
				) : (
					<img
						src={file.preview}
						alt={file.name}
						className={styles.filePreviewImage}
					/>
				)}
				<p className={styles.form__filename}>{file.name}</p>
			</div>
		));
	}

	const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
		onChange(
			acceptedFiles.map((fl) =>
				Object.assign(fl, {
					preview: URL.createObjectURL(fl),
					base64: localStorage.getItem('base64'),
				})
			)
		);
		acceptedFiles.forEach((file) =>
			loadFile(file)
				.then((encFile) => {
					setEncodedFiles((prevEncodedFiles) => [...prevEncodedFiles, encFile]);
					setMedias((prevMedias) => [...prevMedias, encFile.encoded]);
				})
				.catch((error) => console.log('error:', error))
		);
	}, []);

	const {
		acceptedFiles,
		fileRejections,
		getRootProps,
		getInputProps,
		isDragAccept,
		isDragReject,
	} = useDropzone({
		accept: {
			'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
			'application/pdf': ['.pdf'],
		},
		maxSize: 100000000,
		multiple: true,
		maxFiles: 9,
		onDrop,
		validator: (file) => {
			if (encodedFiles.some((f) => f.name === file.name)) {
				return {
					code: 'name-dublicates',
					message: `Файл ${file.name} уже добавлен`,
				};
			}
			return null;
		},
	});

	const style = useMemo(
		() => ({
			...baseStyle,
			...(isDragAccept ? acceptStyle : {}),
			...(isDragReject ? rejectStyle : {}),
		}),
		[isDragAccept, isDragReject]
	);

	const fileRejectionItems = fileRejections.map(({ file, errors }) => (
		<ul>
			{errors.map((e) => (
				<li key={e.code}>{e.message}</li>
			))}
		</ul>
	));

	const { travelId } = useParams();
	const dispatch = useDispatch();
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
			startTime: startTimeString,
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
