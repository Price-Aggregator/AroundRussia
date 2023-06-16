import React, { useState } from 'react';
import styles from './Search.module.css';
import calendar from '../../images/calendar.svg';

function SearchForm() {
	const [from, setFrom] = useState('');
	const [to, setTo] = useState('');
	const [when, setWhen] = useState('');
	const [whenReturn, setWhenReturn] = useState('');
	const [message, setMessage] = useState('');

	const [filteredSuggestions, setFilteredSuggestions] = useState([]);
	const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
	const [showSuggestions, setShowSuggestions] = useState(false);

  const [filteredSuggestionsTo, setFilteredSuggestionsTo] = useState([]);
	const [activeSuggestionIndexTo, setActiveSuggestionIndexTo] = useState(0);
	const [showSuggestionsTo, setShowSuggestionsTo] = useState(false);

	const suggestions = ['Москва', 'Воронеж', 'Екатеринбург', 'Новосибирск', 'Сочи'];

	const onClickFrom = (e) => {
		setFilteredSuggestions([]);
		setFrom(e.target.innerText);
		setActiveSuggestionIndex(0);
		setShowSuggestions(false);
	};

  const onClickTo = (e) => {
		setFilteredSuggestionsTo([]);
		setTo(e.target.innerText);
		setActiveSuggestionIndexTo(0);
		setShowSuggestionsTo(false);
	};

	const onChangeFrom = (e) => {
		const userInput = e.target.value;

		// Filter our suggestions that don't contain the user's input
		const unLinked = suggestions.filter(
			(suggestion) =>
				suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
		);
		setFrom(e.target.value);
		setFilteredSuggestions(unLinked);
		setActiveSuggestionIndex(0);
		setShowSuggestions(true);
	};

	const onChangeTo = (e) => {
		const userInput = e.target.value;

		// Filter our suggestions that don't contain the user's input
		const unLinked = suggestions.filter(
			(suggestion) =>
				suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
		);
		setTo(e.target.value);
		setFilteredSuggestionsTo(unLinked);
		setActiveSuggestionIndexTo(0);
		setShowSuggestionsTo(true);
	};

	/* const handleInput = async () => {
		console.log('i work');
		const list = fetch(`http://62.84.115.87:8000/api/v1/cities/`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((res) => res.json());
		return list;
	}; */

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log('i work');
		console.log({
			from,
			to,
			when,
			whenReturn,
		});
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
				setMessage('Search is completed');
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
				<div className="suggestions__wrapper">
					<input
						onChange={onChangeFrom}
						value={from || ''}
						className={styles.search__input_right}
						placeholder="Откуда"
						name={from}
					/>
					{showSuggestions &&
						from &&
						(filteredSuggestions.length ? (
							<ul className="suggestions">
								{filteredSuggestions.map((suggestion, index) => {
									let className;
									// Flag the active suggestion with a class
									if (index === activeSuggestionIndex) {
										className = 'suggestion-active';
									}
									return (
										// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
										<li
											className={className}
											key={suggestion}
											onClick={onClickFrom}
										>
											{suggestion}
										</li>
									);
								})}
							</ul>
						) : (
							<div className="no-suggestions">
								<em>Предположений нет!</em>
							</div>
						))}
				</div>
				<div className="suggestions__wrapper">
					<input
						type="text"
						className={styles.search__input}
						placeholder="Куда"
						name="to"
						required
						onChange={onChangeTo}
						value={to || ''}
					/>
					{showSuggestionsTo &&
						to &&
						(filteredSuggestionsTo.length ? (
							<ul className="suggestions">
								{filteredSuggestionsTo.map((suggestion, index) => {
									let className;
									// Flag the active suggestion with a class
									if (index === activeSuggestionIndexTo) {
										className = 'suggestion-active';
									}
									return (
										// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
										<li
											className={className}
											key={suggestion}
											onClick={onClickTo}
										>
											{suggestion}
										</li>
									);
								})}
							</ul>
						) : (
							<div className="no-suggestions">
								<em>Предположений нет!</em>
							</div>
						))}
				</div>
				<div className={styles.search__wrapper}>
					<input
						type="date"
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
						type="date"
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
