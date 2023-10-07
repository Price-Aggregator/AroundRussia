import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import styles from './TravelPlan.module.css';
import {
	hotel,
	activity,
	flight,
	// defaultImage,
} from '../../images/travel-plan';
import pdfIcon from '../../images/pdf-icon.svg';

import TransportForm from '../DiaryTravelCategories/TransportForm/TransportForm';
import ActivityForm from '../DiaryTravelCategories/ActivityForm/ActivityForm';
import PropertyForm from '../DiaryTravelCategories/PropertyForm/PropertyForm';
import {
	dayOfWeek,
	monthsInTicket,
	TRAVEL_EVENT_EDIT,
	MEDIA_FILES,
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
						{time ? (
							<span className={styles.eventTime}>{time.slice(0, 5)}</span>
						) : (
							<div className={styles.eventEmptyTime} />
						)}
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
					{media.map((mediaItem, index) => (
						// eslint-disable-next-line react/no-array-index-key
						<div key={index} className={styles.eventImageContainer}>
							{mediaItem.toLowerCase().startsWith('data:application/pdf') ? (
								<img
									src={pdfIcon} // Replace with the source of your PDF image
									alt="PDF Document"
									className={styles.eventPDF}
								/>
							) : (
								<Zoom>
									<img
										src={mediaItem}
										alt="Изображение"
										className={styles.eventImage}
									/>
								</Zoom>
							)}
						</div>
					))}
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
		.sort((a, b) => {
			if (a.time && b.time) {
				return a.time.localeCompare(b.time);
			}
			if (!a.time && !b.time) {
				return 0;
			}
			if (!a.time) {
				return 1;
			}
			return -1;
		});
	// eslint-disable-next-line
	const dayDate = new Date(day.replace(/-/g, '/'));
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
							time={item.time || ''}
							address={item.address || item.origin}
							description={item.description}
							price={item.price}
							eventName={item.name}
							key={item.id}
							media={MEDIA_FILES}
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
	time: PropTypes.string,
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
	time: '',
};

TravelPlanBox.propTypes = {
	activities: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array])
	).isRequired,
	day: PropTypes.string.isRequired,
};

export default TravelPlanBox;
