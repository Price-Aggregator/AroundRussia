import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './DiaryCardPreview.module.css';
import { generateUniqueKey } from '../../utils/utils';

function DiaryCardPreview({ card }) {
	return (
		<Link to={`/diary/${card.id}`} className={styles.card__link}>
			<article className={styles.card}>
				<div className={styles.card__textContentBox}>
					<h3 className={styles.card__title}>{card.name}</h3>
					<p
						className={styles.card__dates}
					>{`${card.start_date} — ${card.end_date}`}</p>
					<p className={styles.card__description}>{card.description}</p>
				</div>
				<div className={styles.card__pictureBox}>
					<img
						className={styles.card__mainPicture}
						src={card.pictures[0]}
						alt={card.name}
					/>
					<div className={styles.card__pictureList}>
						{card.pictures.slice([1], [4]).map((picture) => (
							<img
								className={styles.card__picture}
								src={picture}
								alt={picture}
								key={generateUniqueKey()}
							/>
						))}
						{card.pictures.length > 4 ? (
							<div className={styles.card__countBox}>
								<p className={styles.card__countNumber}>
									+{card.pictures.length - 4}
								</p>
							</div>
						) : null}
					</div>
				</div>
			</article>
		</Link>
	);
}

export default DiaryCardPreview;

DiaryCardPreview.propTypes = {
	card: PropTypes.shape({
		name: PropTypes.string.isRequired,
		start_date: PropTypes.string.isRequired,
		end_date: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired,
		pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
	}).isRequired,
};
