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
			<div className={styles.card__textContentBox}>
				<h3 className={styles.card__title}>{title}</h3>
				<p className={styles.card__dates}>{`${startDate} — ${finishDate}`}</p>
				<p className={styles.card__description}>{description}</p>
			</div>
			<div className={styles.card__pictureBox}>
				<img
					className={styles.card__mainPicture}
					src={pictures[0]}
					alt={title}
				/>
				<div className={styles.card__pictureList}>
					{pictures.slice([1], [4]).map((picture) => (
						<img className={styles.card__picture} src={picture} alt={picture} />
					))}
					{pictures.length > 4 ? (
						<div className={styles.card__countBox}>
							<p className={styles.card__countNumber}>+{pictures.length - 4}</p>
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
