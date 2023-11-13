/* eslint-disable no-shadow */
/* eslint-disable no-unsafe-optional-chaining */
import React, { useState, useCallback, useEffect } from 'react';
import {
	BarChart,
	XAxis,
	Tooltip,
	ResponsiveContainer,
	Bar,
	Cell,
} from 'recharts';
import PropTypes from 'prop-types';
import CustomTooltip from '../сustomTooltip/CustomTooltip';
import CustomizedAxisTick from '../CustomizedAxisTick/CustomizedAxisTick';
import { generateUniqueKey } from '../../../utils/utils';

export default function Graph({ tickets }) {
	const [activeIndex, setActiveIndex] = useState(0);
	const [position, setPosition] = useState(null);

	useEffect(() => {
		const tooltip = document.querySelector('.recharts-tooltip-wrapper');
		if (!tooltip) return;
		const tooltipHeight = tooltip.getBoundingClientRect().height;
		const tooltipWidth = tooltip.getBoundingClientRect().width;
		const spaceForLittleTriangle = 15;

		tooltip.style = `
      transform: translate(${position?.data.x}px, ${position?.data.y}px);
      pointer-events: none;  position: absolute;
      top: -${tooltipHeight + spaceForLittleTriangle}px;
      left: -${tooltipWidth / 2 - position?.data.width / 2}px;
      opacity: ${position?.show ? '1' : 0};
      transition: all 400ms ease 0s;
    `;
	}, [position]);

	const handleMouseEnter = useCallback((entry, index) => {
		setActiveIndex(index);
	}, []);

	const handleMouseLeave = useCallback(() => {
		setActiveIndex(-1);
	}, []);

	const data = tickets.map(({ date, price }) => {
		const [year, month, day] = date.split('-');
		const dateObject = new Date(year, month - 1, day);
		const formattedDate = `${dateObject.getDate()}, ${dateObject.toLocaleDateString(
			'ru-RU',
			{ weekday: 'short' }
		)}`;

		return {
			name: formattedDate,
			uv: price,
			id: generateUniqueKey(),
		};
	});

	return (
		<ResponsiveContainer width="100%" height={100}>
			<BarChart data={data} barGap={20} barSize={40}>
				<XAxis
					tick={<CustomizedAxisTick />}
					margin={{ top: 10 }}
					dataKey="name"
					tickLine={false}
					axisLine={false}
				/>
				<Tooltip
					cursor={false}
					position={{
						x: position?.data.x ?? 0,
						y: position?.data.y ?? 0,
					}}
					content={<CustomTooltip />}
				/>
				<Bar
					dataKey="uv"
					onMouseMove={(data) => {
						setPosition({ data, show: true });
					}}
					onMouseLeave={(data) => {
						setPosition({ data, show: false });
					}}
				>
					{data.map((entry, index) => (
						<Cell
							radius={[5, 5, 0, 0]}
							cursor="pointer"
							fill={index === activeIndex ? '#F8C747' : '#EBA534'}
							filter={
								index === activeIndex
									? 'drop-shadow(0 5px 5px rgba(0, 0, 0, 0.10))'
									: 'none'
							}
							key={entry.id}
							onMouseMove={() => handleMouseEnter(entry, index)}
							onMouseLeave={handleMouseLeave}
						/>
					))}
				</Bar>
			</BarChart>
		</ResponsiveContainer>
	);
}

Graph.propTypes = {
	tickets: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.number.isRequired,
			date: PropTypes.string.isRequired,
			price: PropTypes.number.isRequired,
			from: PropTypes.string.isRequired,
			to: PropTypes.string.isRequired,
		})
	).isRequired,
};
