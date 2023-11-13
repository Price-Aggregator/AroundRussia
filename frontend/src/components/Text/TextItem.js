/* eslint-disable react/prop-types */
import React from 'react';
import styles from './Text.module.css';

function TextItem(props) {
  const {text, image, alt} = props;
	return (
			<div className={styles.text__item}>
				<img src={image} alt={alt} />
				<p className={styles.text__content}>
					{text}
				</p>
			</div>
	);
}

export default TextItem;
