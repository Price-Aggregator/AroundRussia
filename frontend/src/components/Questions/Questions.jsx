/* eslint react/prop-types: 0 */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Accordion, AccordionItem as Item } from '@szhsin/react-accordion';
import styles from './Questions.module.css'
import chevron from '../../images/chevron-right.svg'

const items = [
  {
    header: 'Мне не пришел билет. Что делать?',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing...'
  },
  {
    header: 'Я хочу вернуть билет. Что делать?',
    content: 'Quisque eget luctus mi, vehicula mollis lorem...'
  },
  {
    header: 'Как добавить багаж?',
    content: 'Suspendisse massa risus, pretium id interdum in...'
  },
  {
    header: 'Рейс задержали. Что делать?',
    content: 'Quisque eget luctus mi, vehicula mollis lorem...'
  },
  {
    header: 'Куда лететь на Новый год?',
    content: 'Quisque eget luctus mi, vehicula mollis lorem...'
  },
  {
    header: 'Как путешествовать с животными?',
    content: 'Для путешествия с животными, пожалуйста, свяжитесь с нашим отделом обслуживания клиентов или ознакомьтесь с условиями перевозки животных на нашем веб-сайте. Мы предлагаем определенные услуги и требования, чтобы обеспечить комфорт и безопасность как для вас, так и для вашего питомца во время полета. Пожалуйста, ознакомьтесь с правилами, документами и требованиями, чтобы быть готовыми к перевозке вашего животного.'
  },
];





/**
 * @type {React.ExoticComponent<import('@szhsin/react-accordion').AccordionItemProps>}
 */
function AccordionItem({ header, ...rest }) {
  return <Item
    {...rest}
    header={
      <>
        {header}
        <img className={styles.questionsChevron} src={chevron} alt="Chevron Down" />
      </>
    }
    className={styles.questionsItem}
    buttonProps={{
      className: ({ isEnter }) =>
        `${styles.questionsItemBtn} ${isEnter && styles.questionsitemBtnExpanded}`
    }}
    contentProps={{ className: styles.questionsAnswer }}
    panelProps={{ className: styles.questionsItemPanel }}
  />
}

export default function Questions() {
  return (
    <section className={styles.questions}>
      <a name='faq' href='a' className={styles.questionsAnkor}><h2 className={styles.questionsTitle}>Вопросы и ответы</h2></a>
      {/* `transitionTimeout` prop should be equal to the transition duration in CSS */}
      <Accordion transition transitionTimeout={250}>
        {items.map(({ header, content }) => (
          <AccordionItem header={header} key={header}>
            {content}
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
