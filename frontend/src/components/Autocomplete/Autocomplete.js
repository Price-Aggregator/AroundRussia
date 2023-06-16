/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Input from './Input';

function AutoComplete({ suggestions, classInput, placeholder, name  }) {
	const [filteredSuggestions, setFilteredSuggestions] = useState([]);
	const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [input, setInput] = useState('');

	const onClick = (e) => {
		setFilteredSuggestions([]);
		setInput(e.target.innerText);
		setActiveSuggestionIndex(0);
		setShowSuggestions(false);
	};
	const onChange = (e) => {
		const userInput = e.target.value;

		// Filter our suggestions that don't contain the user's input
		const unLinked = suggestions.filter(
			(suggestion) =>
				suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
		);
		setInput(e.target.value);
		setFilteredSuggestions(unLinked);
		setActiveSuggestionIndex(0);
		setShowSuggestions(true);
	};

	return (
		<div className='suggestions__wrapper'>
			<Input
				onChange={onChange}
				input={input}
				classInput={classInput}
				placeholder={placeholder}
				name={name}
			/>
			{showSuggestions &&
				input &&
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
								<li className={className} key={suggestion} onClick={onClick}>
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
	);
}
export default AutoComplete;
