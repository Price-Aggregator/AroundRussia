import React from 'react';
import PropTypes from 'prop-types';
import styles from './PictureBox.module.css';
import { generateUniqueKey } from '../../../utils/utils';
import defaultPicture from '../../../images/dairy_picture_default.png';

function PictureBox({ card }) {
	return (
		<div className={styles.card__pictureBox}>
			<img
				className={styles.card__mainPicture}
				src={card.pictures[0] ? card.pictures[0] : defaultPicture}
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
	);
}

export default PictureBox;

PictureBox.propTypes = {
	card: PropTypes.shape({
		name: PropTypes.string.isRequired,
		start_date: PropTypes.string.isRequired,
		end_date: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired,
		total_price: PropTypes.number.isRequired,
		pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
		travelDaysEvents: PropTypes.arrayOf(
			PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.number,
				PropTypes.array,
				PropTypes.object,
			])
		),
	}).isRequired,
};
