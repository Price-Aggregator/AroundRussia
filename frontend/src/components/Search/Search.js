import React from 'react';
import { useMatch } from 'react-router';
import styles from './Search.module.css';

import SearchForm from './SearchForm';
import SearchText from './SearchText';


// const { pathname } = window.location;

function Search() {
  const match = useMatch('/');
	return (
		<div className={styles.search}>
			<div className={styles.search__container}>
				{match ? (
					<>
						<SearchText />
						<SearchForm />
					</>
				) : (
					<SearchForm />
				)}
			</div>
		</div>
	);
}

export default Search;
