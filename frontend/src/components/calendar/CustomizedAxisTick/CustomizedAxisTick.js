import React from 'react';
import PropTypes from 'prop-types';
import styles from './CustomizedAxisTick.module.css';

export default function CustomizedAxisTick({ x, y, payload }) {
	return (
		<g transform={`translate(${x},${y})`}>
			<text
				className={styles.customizedAxisTick__text}
				dy={16}
				textAnchor="middle"
				fill={
					payload.value.includes('сб') || payload.value.includes('вс')
						? '#132529'
						: '#8A8A8A'
				}
			>
				{payload.value}
			</text>
		</g>
	);
}

CustomizedAxisTick.propTypes = {
	x: PropTypes.number,
	y: PropTypes.number,
	payload: PropTypes.shape({
		value: PropTypes.string.isRequired,
	}).isRequired,
};

CustomizedAxisTick.defaultProps = {
	x: 0,
	y: 0,
};
