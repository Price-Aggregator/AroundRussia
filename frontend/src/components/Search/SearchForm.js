import React, { useState } from 'react';
import styles from './Search.module.css';
import calendar from '../../images/calendar.svg';
import AutoComplete from '../Autocomplete/Autocomplete';

function SearchForm() {
	const [from, setFrom] = useState('');
	const [to, setTo] = useState('');
	const [when, setWhen] = useState('');
	const [whenReturn, setWhenReturn] = useState('');
	const [message, setMessage] = useState('');

	const handleInput = async () => {
		console.log('i work');
		const list = fetch(`http://62.84.115.87:8000/api/v1/cities/`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((res) => res.json());
		return list;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log('i work');
		try {
			const res = await fetch('http://127.0.0.1:8000/api/v1/airline', {
				method: 'POST',
				body: JSON.stringify({
					from,
					to,
					when,
					whenReturn,
				}),
			});
			console.log(res);
			// eslint-disable-next-line no-unused-vars
			const resJson = await res.json();
			localStorage.setItem('movies', JSON.stringify(resJson));
			if (res.status === 200) {
				setFrom('');
				setTo('');
				setWhen('');
				setWhenReturn('');
				setMessage('User created successfully');
			} else {
				setMessage('Some error occured');
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<p className={styles.search__label}>Авиабилеты</p>
			<form className={styles.search__form} onSubmit={handleSubmit}>
				<input
					type="text"
					className={styles.search__input_left}
					placeholder="Откуда"
					name="from"
					required
					onChange={(e) => setFrom(e.target.value)}
					onInput={handleInput}
					value={from || ''}
				/>
				<AutoComplete
					suggestions={[
						'Alligator',
						'Bask',
						'Crocodilian',
						'Death Roll',
						'Eggs',
						'Jaws',
						'Reptile',
						'Solitary',
						'Tail',
						'Wetlands',
					]}
				/>
				<input
					type="text"
					className={styles.search__input}
					placeholder="Куда"
					name="to"
					required
					onChange={(e) => setTo(e.target.value)}
					value={to || ''}
				/>
				<div className={styles.search__wrapper}>
					<input
						type="text"
						className={styles.search__input}
						placeholder="Когда"
						name="when"
						required
						onChange={(e) => setWhen(e.target.value)}
						value={when || ''}
					/>
					<img className={styles.search__image} alt="calendar" src={calendar} />
				</div>
				<div className={styles.search__wrapper}>
					<input
						type="text"
						className={styles.search__input_right}
						placeholder="Обратно"
						name="whenReturn"
						onChange={(e) => setWhenReturn(e.target.value)}
						value={whenReturn || ''}
					/>
					<img className={styles.search__image} alt="calendar" src={calendar} />
				</div>
				<button className={styles.search__button} type="submit">
					Найти
				</button>
				<div className="message">{message ? <p>{message}</p> : null}</div>
			</form>
		</>
	);
}

export default SearchForm;
