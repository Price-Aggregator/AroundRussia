import React from 'react';
import styles from './Search.module.css';
import SearchForm from './SearchForm';
import SearchText from './SearchText';

const { pathname } = window.location;
function Search() {
	return (
		<div className={styles.search}>
			{pathname === '/' ? (
				<>
					<SearchText />
					<SearchForm />
				</>
			) : (
				<SearchForm />
			)}
		</div>
	);
}

export default Search;
