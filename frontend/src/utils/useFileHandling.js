import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import imageToBase64 from 'image-to-base64/browser';
import styles from '../components/DiaryTravelCategories/form.module.css';
import pdfIcon from '../images/pdf-icon.svg';

export default function useFileHandling() {
	const [previewFiles, setPreviewFiles] = useState([]);
	const [encodedFiles, setEncodedFiles] = useState([]);
	const [medias, setMedias] = useState([]);

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
		const updatedMedias = encodedFiles.map((file) => file.encoded);
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
					setEncodedFiles((prevEncodedFiles) => [...prevEncodedFiles, encFile]);
					setMedias((prevMedias) => [...prevMedias, encFile.encoded]);
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
		console.log('file:', file);
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
		files.map((file) => file.preview.toLowerCase().endsWith('.pdf'));
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
	};
}
