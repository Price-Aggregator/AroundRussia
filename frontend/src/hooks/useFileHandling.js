import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import imageToBase64 from 'image-to-base64/browser';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from '../components/DiaryTravelCategories/form.module.css';
import pdfIcon from '../images/pdf-icon.svg';
import { TRAVEL_EVENT_EDIT } from '../utils/constants';

export default function useFileHandling({ actionName, setЕventData, eventId }) {
	const [previewFiles, setPreviewFiles] = useState([]);
	const [encodedFiles, setEncodedFiles] = useState([]);
	const [medias, setMedias] = useState([]);
	const travels = useSelector((state) => state.travels.travels);
	const { travelId } = useParams();

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

	useEffect(() => {
		const updatedMedias = encodedFiles.map((file) => ({
			filename: file.name,
			media: file.encoded,
		}));
		setMedias(updatedMedias);
	}, [encodedFiles]);

	function loadFile(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			const base = {
				name: file.name,
				size: file.size,
			};
			reader.addEventListener('abort', (e) =>
				reject(new Error(`File upload aborted: ${e}`))
			);
			reader.addEventListener('error', (e) =>
				reject(new Error(`File upload error: ${e}`))
			);
			reader.addEventListener(
				'load',
				() =>
					resolve({
						...base,
						encoded: reader.result,
					}),
				false
			);
			reader.readAsDataURL(file);
		});
	}

	const onChange = (newFiles) => {
		const newFilesWithPreview = newFiles.map((file) => ({
			name: file.name,
			preview: URL.createObjectURL(file),
		}));
		setPreviewFiles((prevFiles) => [...prevFiles, ...newFilesWithPreview]);
	};

	const onDrop = useCallback((acceptedFiles) => {
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
					console.log('encFile:', encFile);
					setEncodedFiles((prevEncodedFiles) => [...prevEncodedFiles, encFile]);
					const media = { filename: encFile.name, media: encFile.encoded };
					setMedias((prevMedias) => [...prevMedias, media]);
					console.log('medias:', medias);
				})
				.catch((error) => console.log('error:', error))
		);
	}, []);

	const {
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

	const renderFilePreviews = (files) => {
		console.log('files:', files);

		return files.map((file) => (
			<div key={file.name} className={styles.form__fileBoxContent}>
				<button
					type="button"
					className={styles.dropzoneTrashBag}
					onClick={removeFile(
						file,
						previewFiles,
						setPreviewFiles,
						encodedFiles,
						setEncodedFiles
					)}
				>
					{' '}
				</button>
				{file.name &&
				(file.name.toLowerCase().endsWith('.pdf') ||
					(file.preview &&
						file.preview.filename &&
						file.preview.filename.toLowerCase().endsWith('.pdf'))) ? (
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
	};

	const style = useMemo(
		() => ({
			...baseStyle,
			...(isDragAccept ? acceptStyle : {}),
			...(isDragReject ? rejectStyle : {}),
		}),
		[isDragAccept, isDragReject]
	);

	const fileRejectionItems = fileRejections.map(({ errors }) => (
		<ul>
			{errors.map((e) => (
				<li key={e.code}>{e.message}</li>
			))}
		</ul>
	));

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
					const newMediasWithPreview = filteredActivity.medias.map((media) => ({
						name: media.filename,
						preview: media.media,
					}));

					const updatedEventData = {
						category: filteredActivity.category || '',
						eventName: filteredActivity.name || '',
						address: filteredActivity.address || '',
						origin: filteredActivity.origin || '',
						destination: filteredActivity.destination || '',
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
						filteredActivity.medias.map(async (media, filename) => {
							try {
								const encoded = await fetchAndConvertToBase64(media);
								if (encoded) {
									return {
										encoded,
										name: filename, // Customize the name as needed
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

	return {
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
		setPreviewFiles,
	};
}
