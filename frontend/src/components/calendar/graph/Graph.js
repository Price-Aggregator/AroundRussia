/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useCallback } from 'react';
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

export default function Graph({ tickets }) {
	const [activeIndex, setActiveIndex] = useState(0);

	const handleMouseEnter = useCallback((entry, index) => {
		setActiveIndex(index);
	}, []);

	const handleMouseLeave = useCallback(() => {
		setActiveIndex(-1);
	}, []);

	const data = tickets.map(({ date, price, _id, from, to }) => ({
		name: date,
		uv: price,
		id: _id,
		destination: to,
		departure: from,
	}));

	return (
		<ResponsiveContainer width="100%" height={100}>
			<BarChart data={data} barGap={20} barSize={40}>
				<XAxis
					tick={{
						fontSize: 15,
						fontFamily: 'Roboto',
						fontStyle: 'normal',
						fontWeight: 400,
						lineHeight: 18,
						fill: '#8A8A8A',
					}}
					margin={{ top: 10 }}
					dataKey="name"
					tickLine={false}
					axisLine={false}
				/>
				<Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
				<Bar dataKey="uv">
					{data.map((entry, index) => (
						<Cell
							radius={[5, 5, 0, 0]}
							cursor="pointer"
							fill={index === activeIndex ? '#F8C747' : '#EBA534'}
							key={entry.id}
							onMouseEnter={() => handleMouseEnter(entry, index)}
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
