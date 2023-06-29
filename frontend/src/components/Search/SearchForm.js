import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './Search.module.css';

import { setForm } from '../../store/SearchForm/slice';
import { clearTickets, fetchTickets } from '../../store/Tickets/slice';
import { getAllCities, getCityByLetter } from '../../store/Cities/selectors';
import {
	clearCitiesByLetter,
	fetchCitiesByLetter,
} from '../../store/Cities/slice';
import calendar from '../../images/calendar.svg';
import useLocalStorageHook from '../../hooks/UseLocalHook';
import getFiltersState from '../../store/Filter/selector';
import getTickets from '../../store/Tickets/selectors';

function SearchForm() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const tickets = useSelector(getTickets);
	const cities = useSelector(getAllCities);
	const citiesByLetter = useSelector(getCityByLetter);
	const filters = useSelector(getFiltersState);
	const [from, setFrom] = useState('');
	const [to, setTo] = useState('');
	const [when, setWhen] = useState('');
	const [whenReturn, setWhenReturn] = useState('');

	const [filteredSuggestions, setFilteredSuggestions] = useState([]);
	const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
	const [showSuggestions, setShowSuggestions] = useState(false);

	const [filteredSuggestionsTo, setFilteredSuggestionsTo] = useState([]);
	const [activeSuggestionIndexTo, setActiveSuggestionIndexTo] = useState(0);
	const [showSuggestionsTo, setShowSuggestionsTo] = useState(false);

	const [typeIn, setTypeIn] = useState('text');
	const [typeOut, setTypeOut] = useState('text');

	const [formLocaleStorage, setFormLocaleStorage] = useLocalStorageHook(
		'form',
		[]
	);

	useEffect(() => {
		setFrom(formLocaleStorage.from);
		setTo(formLocaleStorage.to);
		setWhen(formLocaleStorage.when);
		setWhenReturn(formLocaleStorage.whenReturn);
	}, [formLocaleStorage]);

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
		dispatch(clearCitiesByLetter());
		dispatch(fetchCitiesByLetter(userInput));
		setFrom(userInput);
		setActiveSuggestionIndex(0);
		setShowSuggestions(true);
		setShowSuggestionsTo(false);
	};

	const onChangeTo = (e) => {
		const userInput = e.target.value;
		dispatch(clearCitiesByLetter());
		dispatch(fetchCitiesByLetter(userInput));
		setTo(userInput);
		setActiveSuggestionIndexTo(0);
		setShowSuggestions(false);
		setShowSuggestionsTo(true);
	};

	useEffect(() => {
		if (showSuggestions) {
			setFilteredSuggestions(citiesByLetter);
			setFilteredSuggestionsTo([]);
		} else if (showSuggestionsTo) {
			setFilteredSuggestionsTo(citiesByLetter);
			setFilteredSuggestions([]);
		}
	}, [citiesByLetter]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const fromCityIATA = cities.find(
			(item) => item.name.toLowerCase() === from.toLowerCase()
		);
		const toCityIATA = cities.find(
			(item) => item.name.toLowerCase() === to.toLowerCase()
		);

		const formData = {
			from: fromCityIATA?.code || '',
			to: toCityIATA?.code || '',
			when,
			whenReturn,
			sortingMode: filters.sorting,
			isDirect: filters.direct,
		};

		const formForLocale = {
			from,
			to,
			when,
			whenReturn,
			sortingMode: filters.sorting,
			isDirect: filters.direct,
		};

		dispatch(setForm(formData));
		await setFormLocaleStorage(formForLocale);
		dispatch(clearTickets());
		dispatch(fetchTickets(formData));
		navigate('/result');
	};
	useEffect(() => {
		if (tickets?.length > 0 && cities.length > 0) {
			const fromCityIATA = cities.find(
				(item) => item.name.toLowerCase() === from.toLowerCase()
			);
			const toCityIATA = cities.find(
				(item) => item.name.toLowerCase() === to.toLowerCase()
			);
			const formData = {
				from: fromCityIATA?.code || '',
				to: toCityIATA?.code || '',
				when,
				whenReturn,
				sortingMode: filters.sorting,
				isDirect: filters.direct,
			};
      const formForLocale = {
        from,
        to,
        when,
        whenReturn,
        sortingMode: filters.sorting,
        isDirect: filters.direct,
      };
			dispatch(setForm(formData));
      setFormLocaleStorage(formForLocale);
      dispatch(clearTickets());
			dispatch(fetchTickets(formData));
		}
	}, [filters.sorting, filters.direct]);

	return (
		<>
			<p className={styles.search__label}>Авиабилеты</p>
			<form className={styles.search__form} onSubmit={handleSubmit}>
				<div className={styles.suggestions__wrapper}>
					<input
						onChange={onChangeFrom}
						value={from || ''}
						className={styles.search__input_left}
						placeholder="Откуда"
						name={from}
					/>
					{filteredSuggestions &&
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
											key={suggestion.code}
											onClick={onClickFrom}
										>
											{suggestion.name}
										</li>
									);
								})}
							</ul>
						) : (
							<div className={styles.noSuggestions}>
								{/* <em>Предположений нет!</em> */}
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
					{filteredSuggestionsTo &&
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
											key={suggestion.code}
											onClick={onClickTo}
										>
											{suggestion.name}
										</li>
									);
								})}
							</ul>
						) : (
							<div className={styles.noSuggestions}>
								{/* <em>Предположений нет!</em> */}
							</div>
						))}
				</div>
				<div className={styles.search__wrapper}>
					<input
						type={typeIn}
						className={styles.search__input}
						placeholder="Когда"
						name="when"
						required
						onChange={(e) => setWhen(e.target.value)}
						value={when || ''}
						onFocus={() => setTypeIn('date')}
						onBlur={() => setTypeIn('text')}
					/>
					{typeIn === 'text' ? (
						<img
							className={styles.search__image}
							alt="calendar"
							src={calendar}
						/>
					) : (
						<section />
					)}
				</div>
				<div className={styles.search__wrapper}>
					<input
						type={typeOut}
						className={styles.search__input_right}
						placeholder="Обратно"
						name="whenReturn"
						onChange={(e) => setWhenReturn(e.target.value)}
						value={whenReturn || ''}
						onFocus={() => setTypeOut('date')}
						onBlur={() => setTypeOut('text')}
					/>
					{typeOut === 'text' ? (
						<img
							className={styles.search__image}
							alt="calendar"
							src={calendar}
						/>
					) : (
						<section />
					)}
				</div>
				<button className={styles.search__button} type="submit">
					Найти
				</button>
				{/* <div className="message">{message ? <p>{message}</p> : null}</div> */}
			</form>
		</>
	);
}

export default SearchForm;
