import React, { useState } from "react";
import PropTypes from 'prop-types';
import styles from './TravelPlan.module.css'
import travelTicket from '../../images/travel-plan/ticket.png'
import { hotel, event, plane } from "../../images/travel-plan";
import TransportForm from "../DiaryTravelCategories/TransportForm/TransportForm";
import ActivityForm from "../DiaryTravelCategories/ActivityForm/ActivityForm";
import PropertyForm from "../DiaryTravelCategories/PropertyForm/PropertyForm";


function EventBox({ category, time, price, description, address, eventName }) {

  const [editForm, setEditForm] = useState(false)

  const image = {
    plane,
    hotel,
    event
  }

  return (
    <div>
      <div className={styles.eventBox}>
        <div className={styles.eventTimeAndIconBox}>
          <div className={styles.eventTimeBox}>
            {/* <span className={styles.eventTime}>14:00</span>  */}
            <span className={styles.eventTime}>{time}</span>
          </div>
          <img src={image[category]} alt="icon" className={styles.eventIcon} />
        </div>
        <div className={styles.eventSecondBox}>
          <div className={styles.eventButtonBox}>
            <h3 className={styles.eventHeaderText}>{eventName}</h3>
            <button type="button" className={styles.eventButton} onClick={() => setEditForm(!editForm)}> </button>
            <button type="button" className={styles.eventButtonTrash}> </button>
          </div>
          <div className={styles.eventDescriptionBox}>
            <p className={styles.eventSmallText}>{address}</p>
            <p className={styles.eventSmallText}>{description}</p>
            {price && <p className={styles.eventPriceText}>{price}
              <span className={styles.eventPriceText}> ₽</span>
            </p>}
          </div>
        </div>
        <div className={styles.eventImageBox}>
          <img src={travelTicket} alt="Ticket" className={styles.eventImage} />
        </div>
      </div>
      {editForm && <div>
        {category === 'plane' && <TransportForm closeForm={() => setEditForm(false)} />}
        {category === 'event' && <ActivityForm closeForm={() => setEditForm(false)} />}
        {category === 'hotel' && <PropertyForm closeForm={() => setEditForm(false)} />}
      </div>}
    </div>
  )
}

function TravelPlanBox({ day }) {
  const [wrap, setWrap] = useState(true)

  const { date, events } = day

  return <div className={styles.box}>
    <div className={styles.dateBox}>
      <h2 className={styles.date}>{date}</h2>
      <button type="button" className={wrap ? styles.triangle : styles.triangleClose} onClick={() => setWrap(!wrap)}> </button>
    </ div>
    {wrap && events && <div style={{ width: '100%' }}>
      {events.map((item, index) =>
        // eslint-disable-next-line
        <EventBox category={item.category} time={item.time} address={item.address} description={item.description} price={item.price} eventName={item.eventName} key={index} />
      )}
    </div>
    }
  </div>
}

EventBox.propTypes = {
  category: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  address: PropTypes.string,
  price: PropTypes.string,
  description: PropTypes.string,
  eventName: PropTypes.string.isRequired
}

EventBox.defaultProps = {
  address: '',
  price: '',
  description: ''
}

TravelPlanBox.propTypes = {
  day: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array
  ])).isRequired
}

export default TravelPlanBox
