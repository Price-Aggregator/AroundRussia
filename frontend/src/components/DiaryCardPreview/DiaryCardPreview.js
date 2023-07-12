import React from 'react';
import PropTypes from 'prop-types';
import styles from './DiaryCardPreview.module.css';

function DiaryCardPreview({
	title,
	startDate,
	finishDate,
	description,
	pictures,
}) {
	return (
		<article className={styles.card}>
			<div>
				<h3>{title}</h3>
				<p>{`${startDate} — ${finishDate}`}</p>
				<p>{description}</p>
			</div>
			<div>
				<img src={pictures[0]} alt={title} />
				<div>
					{pictures.slice([1], [4]).map((picture) => (
						<img src={picture} alt={picture} />
					))}
					{pictures.length > 4 ? (
						<div>
							<p>+{pictures.length - 4}</p>
						</div>
					) : null}
				</div>
			</div>
		</article>
	);
}

export default DiaryCardPreview;

DiaryCardPreview.propTypes = {
	title: PropTypes.string.isRequired,
	startDate: PropTypes.string.isRequired,
	finishDate: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
};
