/* eslint-disable import/no-unresolved */
import React from 'react';
import NewTravelForm from './NewTravelForm/NewTravelForm';
import styles from './DiaryTravelList.module.css';

function DiaryTravelList() {
	return (
		<section className={styles.diary}>
			<div className={styles.diary__background}>
				<h2 className={styles.diary__title}>Дневник путешественника</h2>
				{/* показывать блок diary__textbox только если карточек нет */}
				<div className={styles.diary__textbox}>
					<p className={styles.diary__subtitle}>
						У вас пока нет ни одного запланированного путешествия.
					</p>
					<p className={styles.diary__subtitle}>Давайте исправим это!</p>
				</div>
				<button
					/* cтиль для ссостояния когда карточки есть ${styles.diary__button_withCards} */
					className={`${styles.diary__button} ${styles.diary__button_withoutCards}`}
					type="button"
					onClick={() => console.log('click')}
				>
					Добавить путешествие
				</button>
			</div>
			<div className={styles.dairy__travels}>
				<NewTravelForm />
				<h2>cards</h2>
			</div>
		</section>
	);
}

export default DiaryTravelList;
