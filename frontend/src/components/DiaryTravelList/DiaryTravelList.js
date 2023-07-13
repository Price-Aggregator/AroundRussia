import React, { useState } from 'react';
import NewTravelForm from './NewTravelForm/NewTravelForm';
import styles from './DiaryTravelList.module.css';
import DiaryCardPreview from '../DiaryCardPreview/DiaryCardPreview';
import { TRAVEL_LIST_DATA } from '../../utils/constants';

function DiaryTravelList() {
	const [IsActiveForm, setIsActiveForm] = useState(false);

	const openForm = () => {
		setIsActiveForm(true);
	};

	const closeForm = () => {
		setIsActiveForm(false);
	};

	return (
		<section className={styles.diary}>
			<div className={styles.diary__background}>
				<h2 className={styles.diary__title}>Дневник путешественника</h2>
				{TRAVEL_LIST_DATA.length < 1 ? (
					<div className={styles.diary__textbox}>
						<p className={styles.diary__subtitle}>
							У вас пока нет ни одного запланированного путешествия.
						</p>
						<p className={styles.diary__subtitle}>Давайте исправим это!</p>
					</div>
				) : null}
				<button
					className={`${styles.diary__button} ${
						TRAVEL_LIST_DATA.length < 1
							? styles.diary__button_withoutCards
							: styles.diary__button_withCards
					} ${IsActiveForm ? styles.diary__button_grey : null}`}
					type="button"
					onClick={openForm}
				>
					Добавить путешествие
				</button>
			</div>

			{IsActiveForm && <NewTravelForm closeForm={closeForm} />}
			<div
				className={`${styles.dairy__travels} ${
					!IsActiveForm ? styles.dairy__travels_margin : null
				}`}
			>
				{TRAVEL_LIST_DATA.map((card) => (
					<DiaryCardPreview
						title={card.title}
						startDate={card.startDate}
						finishDate={card.finishDate}
						description={card.description}
						pictures={card.pictures}
					/>
				))}
			</div>
		</section>
	);
}

export default DiaryTravelList;
