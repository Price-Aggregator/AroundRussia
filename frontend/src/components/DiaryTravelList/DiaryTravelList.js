/* eslint-disable import/no-unresolved */
import React from 'react';
import NewTravelForm from './NewTravelForm/NewTravelForm';
import styles from './DiaryTravelList.module.css';
import DiaryCardPreview from '../DiaryCardPreview/DiaryCardPreview';
import { TRAVEL_LIST_DATA } from '../../utils/constants';

function DiaryTravelList() {
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
					/* cтиль для ссостояния когда карточки есть ${styles.diary__button_withCards} */
					className={`${styles.diary__button} ${
						TRAVEL_LIST_DATA.length < 1
							? styles.diary__button_withoutCards
							: styles.diary__button_withCards
					}`}
					type="button"
				>
					Добавить путешествие
				</button>
			</div>
			<div className={styles.dairy__travels}>
				<NewTravelForm />
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
