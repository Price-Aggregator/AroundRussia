import React from 'react';
import PropTypes from 'prop-types';
import styles from './BudgetBox.module.css';

function BudgetBox({ budget }) {
	return (
		<div className={styles.card__budgetBackground}>
			<p className={styles.card__budgetText}>
				Бюджет
				<span className={styles.card__budgetStrong}>{` ${
					budget || 0
				} р.`}</span>
			</p>
		</div>
	);
}

export default BudgetBox;

BudgetBox.propTypes = {
	budget: PropTypes.number,
};

BudgetBox.defaultProps = {
	budget: 0,
};
