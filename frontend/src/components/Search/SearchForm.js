import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import styles from './Search.module.css';
import calendar from '../../images/calendar.svg';
import { setForm } from '../../store/SearchForm/slice';
import { fetchTickets } from '../../store/Tickets/slice';
import { getAllCities, getCityByLetter } from '../../store/Cities/selectors';
import { clearCitiesByLetter, fetchCitiesByLetter } from '../../store/Cities/slice';

function SearchForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const cities = useSelector(getAllCities)
  const citiesByLetter = useSelector(getCityByLetter)
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
    dispatch(clearCitiesByLetter())
    dispatch(fetchCitiesByLetter(userInput))
    // console.log(citiesByLetter)
    // Filter our suggestions that don't contain the user's input
    // const unLinked = suggestions?.filter(
    //   (suggestion) =>
    //     suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    // );
    setFrom(userInput);
    setActiveSuggestionIndex(0);
    setShowSuggestions(true);
    setShowSuggestionsTo(false);
  };

  const onChangeTo = (e) => {
    const userInput = e.target.value;
    // Filter our suggestions that don't contain the user's input
    // const unLinked = suggestions?.filter(
    //   (suggestion) =>
    //     suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    // );
    dispatch(clearCitiesByLetter())
    dispatch(fetchCitiesByLetter(userInput))

    setTo(userInput);
    // setFilteredSuggestionsTo(unLinked);
    setActiveSuggestionIndexTo(0);
    setShowSuggestions(false)
    setShowSuggestionsTo(true);
  };

  useEffect(() => {
    if (showSuggestions) {
      setFilteredSuggestions(citiesByLetter);
      setFilteredSuggestionsTo([])
    } else
      if (showSuggestionsTo) {
        setFilteredSuggestionsTo(citiesByLetter)
        setFilteredSuggestions([])
      }
  }, [citiesByLetter])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fromCityIATA = cities.find((item) => item.name === from)
    const toCityIATA = cities.find((item) => item.name === to)
    navigate('/result');

    const formData = {
      from: fromCityIATA.code,
      to: toCityIATA.code,
      when,
      whenReturn
    }
    dispatch(setForm(formData))
    dispatch(fetchTickets(formData))
    navigate('/result');

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
        {/* <div className="message">{message ? <p>{message}</p> : null}</div> */}
      </form>
    </>
  );
}

export default SearchForm;
