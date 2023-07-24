import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './DiaryCardPreview.module.css';
import { generateUniqueKey } from '../../utils/utils';
import defaultPicture from '../../images/dairy_picture_default.png';
import { MEDIA_URL } from '../../utils/constants';

function DiaryCardPreview({ card }) {
  const imagesIs = card.images

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
        {imagesIs && <div className={styles.card__pictureBox}>
          <img
            className={styles.card__mainPicture}
            src={card.images && card.images[0] ? `${MEDIA_URL}/${card.images[0]}` : defaultPicture}
            alt={card.name}
          />
          <div className={styles.card__pictureList}>
            {card.images?.slice([1], [4]).map((picture) => (
              <img
                className={styles.card__picture}
                src={picture}
                alt={picture}
                key={generateUniqueKey()}
              />
            ))}
            {card.images.length > 4 ? (
              <div className={styles.card__countBox}>
                <p className={styles.card__countNumber}>
                  +{card.images.length - 4}
                </p>
              </div>
            ) : null}
          </div>
        </div>}
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
    id: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
