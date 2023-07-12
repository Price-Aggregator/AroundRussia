/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import styles from './Diary.module.css';
import kaliningrad from '../../images/kaliningrad.svg';
import smolensk from '../../images/smolensk.svg';

function Diary() {
	return (
		<section className={styles.diary}>
			<div className={styles.diary__content}>
				<div className={styles.diary__text}>
					<h2 className={styles.diary__title}>Дневник путешественника</h2>
					<p className={styles.diary__subtitle}>
						Поможем спланировать ваше лучшее путешествие!
					</p>
					<button type="submit" className={styles.diary__button}>
						Начать планирование
					</button>
				</div>
				<div className={styles.diary__wrapper}>
					<img
						className={styles.diary__image}
						src={kaliningrad}
						alt="kaliningrad"
					/>
					<img
						className={styles.diary__image_second}
						src={smolensk}
						alt="smolensk"
					/>
				</div>
			</div>
		</section>
	);
}

export default Diary;
