/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './DiaryTravel.module.css';
import TransportForm from '../DiaryTravelCategories/TransportForm/TransportForm';
import PropertyForm from '../DiaryTravelCategories/PropertyForm/PropertyForm';
import ActivityForm from '../DiaryTravelCategories/ActivityForm/ActivityForm';
import NewTravelForm from '../DiaryTravelList/NewTravelForm/NewTravelForm';
import TravelPlan from '../TravelPlan/TravelPlan';
import ActivityButton from './ActivityButton/ActivityButton';
import PictureBox from './PictureBox/PictureBox';
import BudgetBox from './BudgetBox/BudgetBox';
import { removeTravel } from '../../store/Travels/slice';
import getTravels from '../../store/Travels/selectors';

function DiaryTravel({ card }) {
	const [isEmpty, setIsEmpty] = useState(false);
	const [IsActiveEditForm, setIsActiveEditForm] = useState(false);
	const [IsActiveTransportForm, setIsActiveTransportForm] = useState(false);
	const [IsActivePropertyForm, setIsActivePropertyForm] = useState(false);
	const [IsActiveActivityForm, setIsActiveActivityForm] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const travels = useSelector(getTravels);

	const openEditForm = () => {
		setIsActiveEditForm(true);
		setIsActivePropertyForm(false);
		setIsActiveActivityForm(false);
		setIsActiveTransportForm(false);
	};

	const closeEditForm = () => {
		setIsActiveEditForm(false);
	};

	const openTransportForm = () => {
		setIsActiveEditForm(false);
		setIsActivePropertyForm(false);
		setIsActiveActivityForm(false);
		setIsActiveTransportForm(true);
	};

	const closeTransportForm = () => {
		setIsActiveTransportForm(false);
	};

	const openPropertyForm = () => {
		setIsActiveEditForm(false);
		setIsActiveTransportForm(false);
		setIsActiveActivityForm(false);
		setIsActivePropertyForm(true);
	};

	const closePropertyForm = () => {
		setIsActivePropertyForm(false);
	};

	const openActivityForm = () => {
		setIsActiveEditForm(false);
		setIsActiveTransportForm(false);
		setIsActivePropertyForm(false);
		setIsActiveActivityForm(true);
	};

	const closeActivityForm = () => {
		setIsActiveActivityForm(false);
	};

	const handleDelete = () => {
		dispatch(removeTravel(card.id));
		localStorage.setItem(
			'travels',
			JSON.stringify(travels.filter((travel) => travel.id !== card.id))
		);
		navigate('/diary');
	};

	useEffect(() => {
		if (card && card.travelDaysEvents.length > 1) {
			setIsEmpty(false);
		} else {
			setIsEmpty(true);
		}
	}, [card]);

	return (
		<div className={styles.card__box}>
			<Link to="/diary" className={styles.card__link}>
				Назад к путешествиям
			</Link>
			<article className={styles.card}>
				<div className={styles.card__textContentBox}>
					<div className={styles.card__textAndBudgetBox}>
						<div className={styles.card__titleAndDateBox}>
							<div className={styles.card__titleBox}>
								<h3 className={styles.card__title}>{card.name}</h3>
								<div className={styles.card__titleButtonBox}>
									<button
										type="button"
										className={`${styles.card__titleButton} ${styles.card__titleButton_edit}`}
										onClick={openEditForm}
									/>
									<button
										type="button"
										className={`${styles.card__titleButton} ${styles.card__titleButton_delete}`}
										onClick={handleDelete}
									/>
								</div>
							</div>
							<p
								className={styles.card__dates}
							>{`${card.start_date} — ${card.end_date}`}</p>
						</div>
						{!isEmpty && <BudgetBox budget={card.total_price} />}
					</div>
					<div className={styles.card__buttonBox}>
						<ActivityButton
							handleClick={openTransportForm}
							buttonName="Транспорт"
						/>
						<ActivityButton handleClick={openPropertyForm} buttonName="Жилье" />
						<ActivityButton
							handleClick={openActivityForm}
							buttonName="Активности"
						/>
					</div>
				</div>
				<PictureBox card={card} />
			</article>
			{IsActiveTransportForm && (
				<TransportForm closeForm={closeTransportForm} />
			)}
			{IsActivePropertyForm && <PropertyForm closeForm={closePropertyForm} />}
			{IsActiveActivityForm && <ActivityForm closeForm={closeActivityForm} />}
			{IsActiveEditForm && <NewTravelForm closeForm={closeEditForm} />}
			{isEmpty &&
				!IsActiveEditForm &&
				!IsActiveTransportForm &&
				!IsActivePropertyForm &&
				!IsActiveActivityForm && (
					<div className={styles.card__emptyBunner}>
						<p className={styles.card__emptyText}>
							Здесь пока пусто. Давайте начнём планировать путешествие!
						</p>
					</div>
				)}
			{!isEmpty && <TravelPlan travelPlan={card.travelDaysEvents} />}
		</div>
	);
}

export default DiaryTravel;

DiaryTravel.propTypes = {
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
