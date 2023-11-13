import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './Questions.module.css';
import { faq } from '../../utils/constants';

export default function Questions() {
	const [selected, setSelected] = useState(null);

	const toggle = (i) => {
		if (selected === i) {
			return setSelected(null);
		}
		return setSelected(i);
	};

	return (
		<div className={styles.questions} id="faq">
			<ul className={styles.questionsContainer}>
				<h2 className={styles.questionsTitle}>Вопросы и ответы</h2>
				{faq.map((item, i) => (
					<li
						className={
							selected === i
								? classNames(styles.questionsItem, styles.questionsItemActive)
								: styles.questionsItem
						}
						key={item.question}
					>
						<button
							className={styles.questionsHeader}
							onClick={() => toggle(i)}
							type="button"
						>
							<p className={styles.questionsQuestion}>{item.question}</p>
							<div
								className={
									selected === i
										? classNames(
												styles.questionsArrow,
												styles.questionsArrowActive
										  )
										: styles.questionsArrow
								}
							/>
						</button>
						<p
							className={
								selected === i
									? classNames(
											styles.questionsAnswer,
											styles.questionsAnswerActive
									  )
									: styles.questionsAnswer
							}
						>
							{item.answer}
						</p>
					</li>
				))}
			</ul>
		</div>
	);
}
