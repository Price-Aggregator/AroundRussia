/* eslint react/prop-types: 0 */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Accordion, AccordionItem as Item } from '@szhsin/react-accordion';
import styles from './Filters.module.css';
import chevron from '../../images/chevron-down.svg'

/**
 * @type {React.ExoticComponent<import('@szhsin/react-accordion').AccordionItemProps>}
 */
function AccordionItem({ header, ...rest }) {
  return <Item
    {...rest}
    header={
      <>
        <h3 className={styles.filter__header}>{header}</h3>
        <img className={styles.filtersChevron} src={chevron} alt="Chevron Down" />
      </>
    }
    className={styles.filtersItem}
    buttonProps={{
      className: ({ isEnter }) =>
        `${styles.filtersItemBtn} ${isEnter && styles.filtersitemBtnExpanded}`
    }}
    panelProps={{ className: styles.filterstemPanel }}
  />
}

export default function Filters() {
  return (
    <section className={styles.filters}>
			<h2 className={styles.filters__title}>Фильтры</h2>
      {/* `transitionTimeout` prop should be equal to the transition duration in CSS */}
      <Accordion transition transitionTimeout={250}>
          <AccordionItem header='Пересадки'>
					<div className={styles.filter__group}>
						<label htmlFor="radio-no-transfer">
							<input
								className={styles.filter__radio}
								type="radio"
								name="transfer"
								id="radio-no-transfer"
							/>
							Без пересадок
						</label>
						<label htmlFor="radio-1-transfer">
							<input
								className={styles.filter__radio}
								type="radio"
								name="transfer"
								id="radio-1-transfer"
							/>
							1 пересадка
						</label>
					</div>
          </AccordionItem>
      </Accordion>
      <Accordion transition transitionTimeout={250}>
      <AccordionItem header='Сортировка'>
					<div className={styles.filter__group}>
						<label htmlFor="radio-suggested-filter">
							<input
								className={styles.filter__radio}
								type="radio"
								name="filter"
								id="radio-suggested-filter"
							/>
							Сначала рекомендуемые
						</label>
						<label htmlFor="radio-cheapest-filter">
							<input
								className={styles.filter__radio}
								type="radio"
								name="filter"
								id="radio-cheapest-filter"
							/>
							Сначала дешёвые
						</label>
            <label htmlFor="radio-time-filter">
							<input
								className={styles.filter__radio}
								type="radio"
								name="filter"
								id="radio-time-filter"
							/>
							Время вылета
						</label>
					</div>
          </AccordionItem>
      </Accordion>
    </section>
  );
}
