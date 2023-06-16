import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Search.module.css';
import calendar from '../../images/calendar.svg';
import { api } from '../../utils/Api';

function SearchForm() {
	const navigate = useNavigate();
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

 api.getCities().then((res) => {
		localStorage.setItem('data', JSON.stringify(res));
		const cities = JSON.parse(localStorage.getItem('data')).map(
			(item) => item.name
		);
//		console.log(cities);
    return cities;
	});
const suggestions = ['Москва', 'Воронеж']
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		navigate('/result');

		try {
			const res = api.addDataTicket(from, to, when, whenReturn);
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
//			console.log(err);
		}
	};

	return (
		<>
			<p className={styles.search__label}>Авиабилеты</p>
			<form className={styles.search__form} onSubmit={handleSubmit}>
				<div className={styles.suggestions__wrapper}>
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
							<ul className={styles.suggestions}>
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
							<div className={styles.no - suggestions}>
								<em>Предположений нет!</em>
							</div>
						))}
				</div>
				<div className={styles.suggestions__wrapper}>
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
							<ul className={styles.suggestions}>
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
							<div className={styles.no - suggestions}>
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
