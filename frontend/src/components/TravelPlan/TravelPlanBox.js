import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styles from './TravelPlan.module.css';
import {
	hotel,
	activity,
	flight,
	defaultImage,
} from '../../images/travel-plan';
import TransportForm from '../DiaryTravelCategories/TransportForm/TransportForm';
import ActivityForm from '../DiaryTravelCategories/ActivityForm/ActivityForm';
import PropertyForm from '../DiaryTravelCategories/PropertyForm/PropertyForm';
import {
	dayOfWeek,
	monthsInTicket,
	TRAVEL_EVENT_EDIT,
} from '../../utils/constants';
import { fetchRemoveEvent, fetchTravels } from '../../store/Travels/slice';
import { getUserToken } from '../../store/User/selectors';

function EventBox({
	category,
	time,
	price,
	description,
	address,
	eventName,
	media,
	eventId,
}) {
	const dispatch = useDispatch();
	const token = useSelector(getUserToken);

	const [editForm, setEditForm] = useState(false);

	const image = {
		flight,
		hotel,
		activity,
	};

	const onDelete = async () => {
		await dispatch(fetchRemoveEvent({ eventId, token })).then(() => {
			dispatch(fetchTravels(token));
		});
	};

	return (
		<div>
			<div className={styles.eventBox}>
				<div className={styles.eventTimeAndIconBox}>
					<div className={styles.eventTimeBox}>
						{/* <span className={styles.eventTime}>14:00</span>  */}
						<span className={styles.eventTime}>{time.slice(0, 5)}</span>
					</div>
					<img src={image[category]} alt="icon" className={styles.eventIcon} />
				</div>
				<div className={styles.eventSecondBox}>
					<div className={styles.eventButtonBox}>
						<h3 className={styles.eventHeaderText}>{eventName}</h3>
						<button
							type="button"
							className={styles.eventButton}
							onClick={() => setEditForm(!editForm)}
						>
							{' '}
						</button>
						<button
							type="button"
							className={styles.eventButtonTrash}
							onClick={onDelete}
						>
							{' '}
						</button>
					</div>
					<div className={styles.eventDescriptionBox}>
						<p className={styles.eventSmallText}>{address}</p>
						<p className={styles.eventSmallText}>{description}</p>
						{(price || price === 0) && (
							<p className={styles.eventPriceText}>
								{price}
								<span className={styles.eventPriceText}> ₽</span>
							</p>
						)}
					</div>
				</div>
				<div className={styles.eventImageBox}>
					<img
						src={media || defaultImage}
						alt="Изображение"
						className={styles.eventImage}
					/>
				</div>
			</div>
			{editForm && (
				<div>
					{category === 'flight' && (
						<TransportForm
							closeForm={() => setEditForm(false)}
							actionName={TRAVEL_EVENT_EDIT}
							eventId={eventId}
						/>
					)}
					{category === 'activity' && (
						<ActivityForm
							closeForm={() => setEditForm(false)}
							actionName={TRAVEL_EVENT_EDIT}
							eventId={eventId}
						/>
					)}
					{category === 'hotel' && (
						<PropertyForm
							closeForm={() => setEditForm(false)}
							actionName={TRAVEL_EVENT_EDIT}
							eventId={eventId}
						/>
					)}
				</div>
			)}
		</div>
	);
}

function TravelPlanBox({ day, activities }) {
	const [wrap, setWrap] = useState(true);

	const events = activities
		.filter((item) => item.date === day)
		.sort((a, b) => a.time.localeCompare(b.time));

	const dayDate = new Date(day);
	const dayOnWeek = dayDate.toUTCString().slice(0, 3);
	const dayEvent = dayDate.getDate();
	const mounth = dayDate.getMonth() + 1;

	return (
		<div className={styles.box}>
			<div className={styles.dateBox}>
				<h2
					className={styles.date}
				>{`${dayEvent} ${monthsInTicket[mounth]}, ${dayOfWeek[dayOnWeek]}`}</h2>
				<button
					type="button"
					className={wrap ? styles.triangle : styles.triangleClose}
					onClick={() => setWrap(!wrap)}
				>
					{' '}
				</button>
			</div>
			{wrap && events && (
				<div style={{ width: '100%' }}>
					{events.map((item) => (
						// eslint-disable-next-line
						<EventBox
							category={item.category}
							time={item.time}
							address={item.address || item.origin}
							description={item.description}
							price={item.price}
							eventName={item.name}
							key={item.id}
							media={item.media}
							eventId={item.id}
						/>
					))}
				</div>
			)}
		</div>
	);
}

EventBox.propTypes = {
	category: PropTypes.string.isRequired,
	time: PropTypes.string.isRequired,
	address: PropTypes.string,
	price: PropTypes.string,
	description: PropTypes.string,
	eventName: PropTypes.string.isRequired,
	media: PropTypes.string,
	eventId: PropTypes.number.isRequired,
};

EventBox.defaultProps = {
	address: '',
	price: '',
	description: '',
	media: '',
};

TravelPlanBox.propTypes = {
	activities: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array])
	).isRequired,
	day: PropTypes.string.isRequired,
};

export default TravelPlanBox;
